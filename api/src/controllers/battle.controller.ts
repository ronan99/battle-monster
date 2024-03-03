import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';
import calculateBattle from '../lib/battle';
import { Id } from 'objection';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const battle = async (req: Request, res: Response): Promise<Response> => {
  const {monsterA, monsterB } = req.body;
  if(!monsterA || !monsterB){
    return res.sendStatus(StatusCodes.BAD_REQUEST)
  }
  const mA = await Monster.query().findById(monsterA)
  const mB = await Monster.query().findById(monsterB)

  
  if(!mA || !mB){
    return res.sendStatus(StatusCodes.BAD_REQUEST)
  }
  const copyMA = {...mA}
  const copyMB = {...mB}
  const winner = calculateBattle(mA, mB)

  const battle = await Battle.query().insertGraph(
    {
      monsterA: mA,
      monsterB: mB,
      winner: (copyMA.id == winner.id) ? copyMA : copyMB
    }
  )

  return res.status(StatusCodes.OK).json(battle);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;

  if(! await Battle.query().deleteById(id)){
    return res.sendStatus(StatusCodes.NOT_FOUND)
  }
  return res.sendStatus(StatusCodes.NO_CONTENT);
};

export const BattleController = {
  list,
  battle,
  remove
};
