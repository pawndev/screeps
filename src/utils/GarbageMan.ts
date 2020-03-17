// tslint:disable: max-classes-per-file
import { Logger } from '../logger'

type Collectable = 'creep' | 'heap'

class CreepGarbage {
  constructor(private creeps?: string[]) { }

  public recycle() {
    const _deleted_screeps = this.creeps && this.creeps.map(creep_name => {
      Logger.info(`Delete dead creep ${creep_name} from the heap.`)
      return delete Memory.creeps[creep_name]
    })

    return true
  }
}
export class GarbageMan {
  public creep?: CreepGarbage;

  public collectAll() {
    return this.collectCreep();
  }

  public recycleAll() {
    return this.recycleCreep();
  }

  public collect(type?: Collectable) {
    // If there are no type provided, then, clean all
    if (!type) {
      return this.collectAll()
    }

    switch (type) {
      case 'creep':
        return this.collectCreep();
      case 'heap':
        return;
      default:
        throw new Error(`${type} is not a Collectable Object`);
    }
  }

  public recycle(type?: Collectable) {
    if (!type) {
      return this.recycleAll()
    }

    switch (type) {
      case 'creep':
        return this.recycleCreep()
      case 'heap':
        return;
      default:
        throw new Error(`${type} is not a Collectable Object`);
    }
  }

  public collectCreep() {
    Logger.info('Looking for dead creeps to collect..')
    const creeps = Object.keys(Memory.creeps);
    this.creep = new CreepGarbage(creeps.filter(creep_name => !Game.creeps[creep_name]));
  }

  public recycleCreep() {
    return this.creep && this.creep instanceof CreepGarbage && this.creep.recycle();
  }
}
