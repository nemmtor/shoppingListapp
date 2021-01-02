import { Response } from 'express';
import { IAuthResJson } from '../../../shared';

type TSend<T = Response, B = null> = (body?: B) => T;

export interface IAuthRes extends Response {
  json: TSend<this, IAuthResJson>;
}
