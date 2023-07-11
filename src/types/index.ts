import {Response} from 'express';

interface JSON {
  success: boolean;
  data: any;
}

type Send<T = Response> = (body?: JSON) => T;

export interface CustomResponse extends Response {
  json: Send<this>;
}
