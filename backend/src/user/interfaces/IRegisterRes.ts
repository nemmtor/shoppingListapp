import { Response } from 'express';
import { IRegisterResJson } from '../../../../shared/IRegistedResJson';

type Send<T = Response> = (body?: IRegisterResJson) => T;

export interface IRegisterRes extends Response {
  json: Send<this>;
}
