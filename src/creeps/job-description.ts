import { CreepRole } from "enums";

export class JobDescription {
  public role: CreepRole;
  public body: BodyPartConstant[];

  constructor(role: CreepRole) {
    this.role = role;

    switch (role) {
      case CreepRole.HARVESTER:
        this.body = [WORK, CARRY, MOVE];
        break;
      case CreepRole.UPGRADER:
        this.body = [WORK, CARRY, MOVE];
        break;
      default:
        this.body = [WORK, CARRY, MOVE];
        break;
    }
  }
}
