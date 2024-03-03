import factories from '../../factories';
import calculateBattle, { calculateHpAfterDmg } from '../battle';

Object.defineProperty(global, 'performance', {
  writable: true,
});

beforeAll(() => jest.useFakeTimers());

describe('Battle', () => {
  describe('calculateBattle', () => {
    test('should calculate a battle', async () => {
      const monsterA = factories.monster.build({attack:100, hp: 100,speed: 100, defense:100})
      const monsterB = factories.monster.build({attack:50, hp: 50,speed: 50, defense:50})

      const result = calculateBattle(monsterA, monsterB)
      expect(result.id).toBe(monsterA.id);
    });
    test('should calculate a battle with monster 1 speed higher, winner 2', async () => {
      const monsterA = factories.monster.build({attack:50, hp: 50,speed: 100, defense:50})
      const monsterB = factories.monster.build({attack:100, hp: 50,speed: 50, defense:50})

      const result = calculateBattle(monsterA, monsterB)
      expect(result.id).toBe(monsterA.id);
    });
    test('should calculate a battle with monster 2 speed higher, winner 1', async () => {
      const monsterA = factories.monster.build({attack:100, hp: 50,speed: 50, defense:50})
      const monsterB = factories.monster.build({attack:50, hp: 50,speed: 100, defense:50})

      const result = calculateBattle(monsterA, monsterB)
      expect(result.id).toBe(monsterA.id);
    });
    test('should calculate a battle with monster 2 speed higher, winner 2', async () => {
      const monsterA = factories.monster.build({attack:50, hp: 50,speed: 50, defense:50})
      const monsterB = factories.monster.build({attack:100, hp: 50,speed: 100, defense:50})

      const result = calculateBattle(monsterA, monsterB)
      expect(result.id).toBe(monsterA.id);
    });

    test('should calculate a battle with same speed, winner 1', async () => {
      const monsterA = factories.monster.build({attack:100, hp: 50,speed: 100, defense:50})
      const monsterB = factories.monster.build({attack:50, hp: 50,speed: 100, defense:50})

      const result = calculateBattle(monsterA, monsterB)
      expect(result.id).toBe(monsterA.id);
    });
    test('should calculate a battle with same speed, winner 2', async () => {
      const monsterA = factories.monster.build({attack:50, hp: 50,speed: 100, defense:50})
      const monsterB = factories.monster.build({attack:100, hp: 50,speed: 100, defense:50})

      const result = calculateBattle(monsterA, monsterB)
      expect(result.id).toBe(monsterA.id);
    });

    test('should calculate a battle with same speed, winner 2', async () => {
      const monsterA = factories.monster.build({attack:51, hp: 50,speed: 100, defense:50})
      const monsterB = factories.monster.build({attack:50, hp: 150,speed: 100, defense:50})

      const result = calculateBattle(monsterA, monsterB)
      expect(result.id).toBe(monsterA.id);
    });
    test('should calculate a battle with same speed, winner 2', async () => {
      const monsterA = factories.monster.build({attack:50, hp: 150,speed: 100, defense:50})
      const monsterB = factories.monster.build({attack:51, hp: 50,speed: 100, defense:50})

      const result = calculateBattle(monsterA, monsterB)
      expect(result.id).toBe(monsterA.id);
    });

  });

  describe('calculateDamage', () => {
    test('should calculate the hp after dmg with higher defense attacking', async () => {
      const monsterA = factories.monster.build({attack:100, hp: 100,speed: 100, defense:100})
      const monsterB = factories.monster.build({attack:50, hp: 50,speed: 50, defense: 50})

      const result = calculateHpAfterDmg(monsterA, monsterB)
      expect(result).toEqual(99);
    });

    test('should calculate the hp after dmg with lower defense attacking', async () => {
      const monsterA = factories.monster.build({attack:50, hp: 50,speed: 50, defense:50})
      const monsterB = factories.monster.build({attack:100, hp: 100,speed: 100, defense: 100})

      const result = calculateHpAfterDmg(monsterA, monsterB)
      expect(result).toEqual(0);
    });
  });
});
