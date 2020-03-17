import { Logger } from "logger";
import { CreepRole, Find } from "../enums";

export class CreepLeader {
  public giveWork(creep: Creep) {
    switch (creep.memory.role) {
      case CreepRole.HARVESTER:
        this.harvesterWork(creep);
        break;
      case CreepRole.UPGRADER:
        this.upgraderWork(creep);
        break;
      default:
        Logger.warn(`There is no work planned for ${creep.name}`);
        break;
    }
  }

  private harvesterWork(creep: Creep) {
    Logger.debug(`${creep.name} has ${creep.store.getFreeCapacity(RESOURCE_ENERGY)} free capacity`);
    Logger.debug(`${creep.name} has ${creep.store.getUsedCapacity()} used capacity`);
    Logger.debug(`${creep.name} is ${creep.memory.working ? '' : 'not'} working`);
    if (creep.memory.working) {
      if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
        creep.memory.working = false;
      }
    } else {
      if (creep.store.getUsedCapacity() === 0) {
        creep.memory.working = true;
      }
    }

    if (creep.memory.working) {
      const source = creep.room.find(Find.SOURCES as FIND_SOURCES)[0];
      if (creep.pos.isNearTo(source)) {
        const res = creep.harvest(source);
        if (res !== OK) {
          Logger.error(`Could not harvest for ${creep.name} on source ${source}`);
        }
      } else {
        creep.moveTo(source);
      }
    } else {
      const targets = creep.room.find(Find.STRUCTURES as FIND_STRUCTURES, {
        filter: structure => (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
  }

  private upgraderWork(creep: Creep) {
    if (creep.memory.working) {
      if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
        creep.memory.working = false;
      }
    } else {
      if (creep.store.getUsedCapacity() === 0) {
        creep.memory.working = true;
      }
    }

    if (creep.memory.working) {
      const source = creep.room.find(Find.SOURCES as FIND_SOURCES)[0];
      if (creep.pos.isNearTo(source)) {
        const res = creep.harvest(source);
        if (res !== OK) {
          Logger.error(`Could not harvest for ${creep.name} on source ${source}`);
        }
      } else {
        creep.moveTo(source);
      }
    } else {
      const controller_target = creep.room.controller;
      if (!controller_target) {
        Logger.warn(`There is no controller in room ${creep.room.name}. ${creep.name} will take a coffee break.`);

        return;
      }
      const res = creep.upgradeController(controller_target);
      if (res === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller_target);
      } else if (res !== OK) {
        Logger.warn(`Couldn't upgrade controller: ${res}`);
      }
    }
  }
}
