import { Response } from 'express';
import { ILoginResJson } from '../../../../shared/ILoginResJson';

type Send<T = Response> = (body?: ILoginResJson) => T;

export interface ILoginRes extends Response {
  json: Send<this>;
}
