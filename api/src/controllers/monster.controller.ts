import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DBError, Id, NotNullViolationError } from 'objection';
import { Monster } from '../models';
import csv from 'csvtojson';
import { readFileSync } from 'fs';

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id: Id = req.params.id;

  const monster = await Monster.query().findById(id);

  if(!monster){
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }
  return res.status(StatusCodes.OK).json(monster);
};

export const getAll = async (_: Request, res: Response): Promise<Response> => {
  const monster = await Monster.query()
  return res.status(StatusCodes.OK).json(monster);
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const monster = await Monster.query().insert(req.body);
  return res.status(StatusCodes.CREATED).json(monster);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;
  if(! await Monster.query().findById(id).patch(req.body)){
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }
  
  return res.sendStatus(StatusCodes.OK);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;
  if(! await Monster.query().deleteById(id)){
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }
  return res.sendStatus(StatusCodes.NO_CONTENT);
};

export const importCsv = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const content = readFileSync(req.file!.path, { encoding: 'utf-8' });
  const data = await csv().fromString(content);
  try {
    await Monster.query().insertGraph(data);
  } catch (e) {
    if (e instanceof NotNullViolationError || e instanceof DBError) {
      const message = 'Wrong data mapping.';
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }
  }
  return res.sendStatus(StatusCodes.CREATED);
};

export const MonsterController = {
  get,
  getAll,
  create,
  update,
  remove,
  importCsv,
};
