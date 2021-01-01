import { Response } from 'express';
import { IRegisterResJson, ILoginResJson } from '../../../shared';

type TSend<T = Response, B = null> = (body?: B) => T;

export interface IRegisterRes extends Response {
  json: TSend<this, IRegisterResJson>;
}

export interface ILoginRes extends Response {
  json: TSend<this, ILoginResJson>;
}
