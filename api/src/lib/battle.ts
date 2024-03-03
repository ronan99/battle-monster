import { Monster } from "../models";

const calculateBattle = (monsterA: Monster, monsterB: Monster): Monster => {

    if(monsterA.speed > monsterB.speed){
        monsterB.hp = calculateHpAfterDmg(monsterB, monsterA)

        if(monsterB.hp <= 0) return monsterA;
        monsterA.hp = calculateHpAfterDmg(monsterA, monsterB)

        if(monsterA.hp <= 0) return monsterB;
    }

    if(monsterB.speed > monsterA.speed){
        monsterA.hp = calculateHpAfterDmg(monsterA, monsterB)

        if(monsterA.hp <= 0) return monsterB;
        monsterB.hp = calculateHpAfterDmg(monsterB, monsterA)

        if(monsterB.hp <= 0) return monsterA;
    }

    if(monsterA.speed == monsterB.speed){
        if(monsterA.attack >= monsterB.attack){
            monsterB.hp = calculateHpAfterDmg(monsterB, monsterA)

            if(monsterB.hp <= 0) return monsterA;
            monsterA.hp = calculateHpAfterDmg(monsterA, monsterB)

            if(monsterA.hp <= 0) return monsterB;
        }

        if(monsterB.attack > monsterA.attack){
            monsterB.hp = calculateHpAfterDmg(monsterB, monsterA)

            if(monsterB.hp <= 0) return monsterA;
            monsterA.hp = calculateHpAfterDmg(monsterA, monsterB)

            if(monsterA.hp <= 0) return monsterB;
        }
        
    }

    return calculateBattle(monsterA,monsterB)

};

export const calculateHpAfterDmg = (monsterDefending: Monster, monsterAttacking: Monster): number => {
    if(monsterAttacking.attack <= monsterDefending.defense) return monsterDefending.hp - 1

    return monsterDefending.hp - (monsterAttacking.attack - monsterDefending.defense)
}



export default calculateBattle