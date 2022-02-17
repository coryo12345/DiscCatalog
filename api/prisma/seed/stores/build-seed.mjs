
// get title from URLs
import axios from '../../../node_modules/axios/index.js';
import fs from 'fs/promises';
const data = await fs.readFile('./urls.json', { encoding: 'utf8' });
const stores = JSON.parse(data);

const pattern = /<title>([^<>]*)<\/title>/m;
const out = [];

const INVALID_NAMES = [
    'home',
    'shop',
    'shop online',
    'shop all',
    'top',
    ' ',
    ''
]

const AMT = stores.length;
for (let i = 0; i < AMT; i++) {
    try {
        const link = stores[i]
        const resp = await axios.get(link);
        const st = resp.data.replace(/(\r\n|\n|\r)/gm, "");
        const match = pattern.exec(st);
        if (match == null) {
            console.log(`Skipping ${stores[i]}...`);
        } else {
            // clean up name
            let name = match[1].trim();
            ['-', '|', '–', ';', '&'].forEach(char => {
                name = name.split(char)[0].trim();
            });
            // if its a bad result lets try something else
            if (INVALID_NAMES.includes(name.toLowerCase().trim()) || name.length > 30) {
                const prefixes = [
                    'https://www.',
                    'https://',
                    'http://www.',
                    'http://'
                ];
                const suffixes = [
                    '.com',
                    '.shop',
                    '.square.site',
                    '.net',
                    '.co'
                ];
                let pi = 0;
                let si = link.length;
                for (let j = 0; j < prefixes.length; j++) {
                    let idx = link.indexOf(prefixes[j]);
                    if (idx !== -1) {
                        pi = idx + prefixes[j].length;
                        j = prefixes.length;
                    }
                }
                for (let j = 0; j < suffixes.length; j++) {
                    let idx = link.indexOf(suffixes[j]);
                    if (idx !== -1) {
                        si = idx;
                        j = suffixes.length;
                    }
                }
                name = link.substring(pi, si);
            }
            out.push({
                id: i,
                display_name: name,
                link: link,
                store_type: guessType(link, name),
            });
        }
    } catch (err) {
        console.log(`Skipping ${stores[i]}...`);
    }
}

fs.writeFile('./stores.json', JSON.stringify(out), 'utf-8');

function guessType(link, name) {
    const types = {
        player: 'PLAYER',
        retailer: 'RETAILER',
        factory: 'FACTORY'
    };

    // check if player
    const names = ['paul', 'mcbeth', 'paige', 'sockibomb', 'barsby'];
    for (let i = 0; i < names.length; i++) {
        let n = names[i]
        if (link.toLowerCase().indexOf(n) >= 0) return types.player;
        if (name.toLowerCase().indexOf(n) >= 0) return types.player;
    }

    // guess if retailer
    if (link.toLowerCase().indexOf('discgolf') >= 0) {
        if (link.toLowerCase().indexOf('.discgolf.com') < 0) {
            return types.retailer;
        }
    } else if (name.toLowerCase().replaceAll(' ', '').indexOf('discgolf') >= 0) {
        if (name.toLowerCase().indexOf(' discgolf.com') < 0) {
            return types.retailer;
        }
    }

    // otherwise factory
    return types.factory;
}