import { Response } from 'express';
import jwtDecode from 'jwt-decode';
import { JWT } from '../types/JWT';
import checkJwt from './checkJwt';
import { prismaAccessor } from '../dbClient';
import { DCRequest } from '../types/DCHttp';
const prisma = prismaAccessor();

const dcUserRow = function (req: DCRequest, res: Response, next: Function) {
  checkJwt(req, res, async function () {
    // should be present & safe because checkJwt middleware already validated auth token.
    const accessToken = (req.headers.authorization as String).split(' ')[1];
    const userToken: JWT = jwtDecode(accessToken);
    // make sure token is not expired
    const now = Math.floor(new Date().getTime() / 1000);
    if (now > userToken.exp) {
      res.status(401);
    }

    // make sure row exists
    const userId = userToken.sub;
    const users = await prisma.user.findMany({
      select: { id: true },
      where: { authId: userId }
    });
    let id = -1;
    if (users.length < 1) {
      // insert row first
      const u = await prisma.user.create({
        data: {
          authId: userId,
          displayName: ''
        },
        select: {
          id: true
        }
      });
      id = u.id;
    } else {
      id = users[0].id;
    }
    req.disc = { id: id };
    next();
  });
};

export default dcUserRow;
