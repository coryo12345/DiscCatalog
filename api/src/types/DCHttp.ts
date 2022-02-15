import { Request } from "express";

export type DCRequest = Request & {
  disc: {
    id: number
  }
};