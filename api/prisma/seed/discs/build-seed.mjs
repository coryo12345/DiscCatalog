import fs from 'fs/promises';
const data = await fs.readFile('./config.json', { encoding: 'utf-8' });
const config = JSON.parse(data);
const discs = [];

const BRANDS = Object.keys(config.discs);
let count = 0;

for (let userId = 1; userId <= config.users.num; userId++) {
    for (let i = 0; i < config.users.discs; i++) {
        const brand = r(BRANDS);
        const mold = r(config.discs[brand].molds);
        const plastic = r(config.discs[brand].plastics);
        const weight = Math.floor(Math.random() * (config.weight.max - config.weight.min) + config.weight.min);
        const run = r(config.discs[brand].runs);
        const foil = r(config.foils);
        const stamp = r(config.stamps);
        const color = r(config.colors);
        const shared = Math.round(Math.random()) ? true : false;

        discs.push({
            id: count,
            userId,
            brand,
            mold,
            plastic,
            weight,
            run,
            foil,
            stamp,
            color,
            shared
        });
        count++;
    }
}

const out = {
    users: config.users.num,
    discs: discs
};
fs.writeFile('./discs.json', JSON.stringify(out), 'utf-8');

function r(list) {
    return list[Math.floor(Math.random() * list.length)];
}