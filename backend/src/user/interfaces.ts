import { Response } from 'express';
import { IAuthResJson, IMiddlewareResJson } from '../../../shared';

type TSend<T = Response, B = null> = (body?: B) => T;

export interface IAuthRes extends Response {
  json: TSend<this, IAuthResJson>;
}

export interface IMiddlewareErrorRes extends Response {
  json: TSend<this, IMiddlewareResJson>;
}
