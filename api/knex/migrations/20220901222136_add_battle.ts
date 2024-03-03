import { Knex } from 'knex';
import { Battle } from '../../src/models';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Battle.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.integer('winner').unsigned().references('monster.id');
    table.integer('monsterA').unsigned().references('monster.id');
    table.integer('monsterB').unsigned().references('monster.id');
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Battle.tableName);
