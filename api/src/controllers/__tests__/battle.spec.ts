import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import factories from '../../factories';
import { Monster } from '../../models';

const server = app.listen();

Object.defineProperty(global, 'performance', {
  writable: true,
});

beforeAll(() => jest.useFakeTimers());
afterAll(() => server.close());

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Battle', () => {
    test('should fail when trying a battle of monsters with an undefined monster', async () => {
      const response = await request(server).post('/battle');
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    test('should fail when trying a battle of monsters with an inexistent monster', async () => {
      const response = await request(server).post('/battle').send({monsterA: 9999, monsterB: 10000});
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    test('should insert a battle of monsters successfully with monster 1 winning', async () => {
      const monsterA = factories.monster.build({attack:100, hp: 100,speed: 100})
      const monsterB = factories.monster.build({attack:50, hp: 50,speed: 50})

      const {id: maId} = await Monster.query().insert(monsterA)
      const {id: mbId} = await Monster.query().insert(monsterB)

      const response = await request(server).post('/battle').send({monsterA: maId, monsterB: mbId});
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.winner.id).toBe(maId)

    });

    test('should insert a battle of monsters successfully with monster 2 winning', async () => {
      const monsterA = factories.monster.build({attack:50, hp: 50,speed: 50})
      const monsterB = factories.monster.build({attack:100, hp: 100,speed: 100})

      const {id: maId} = await Monster.query().insert(monsterA)
      const {id: mbId} = await Monster.query().insert(monsterB)

      const response = await request(server).post('/battle').send({monsterA: maId, monsterB: mbId});
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.winner.id).toBe(mbId)
    });
  });

  describe('Delete Battle', () => {
    test('should delete a battle successfully', async () => {
      const monsterA = factories.monster.build({attack:50, hp: 50,speed: 50})
      const monsterB = factories.monster.build({attack:100, hp: 100,speed: 100})

      const {id: maId} = await Monster.query().insert(monsterA)
      const {id: mbId} = await Monster.query().insert(monsterB)

      const response = await request(server).post('/battle').send({monsterA: maId, monsterB: mbId});

      const deleteResponse = await request(server).delete(`/battle/${response.body.id}`);
      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });

    test("should return 404 if the battle doesn't exists", async () => {
      const response = await request(server).delete(`/battle/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
