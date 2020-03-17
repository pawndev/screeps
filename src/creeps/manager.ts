import { isDefined } from 'ts-is-present';
import { CreepRole } from "../enums";
import { JobDescription } from "./job-description";

export class CreepManager {
  private getCreepByRole(room_name: string, role: CreepRole) {
    return Object.values(Game.creeps).filter(creep => creep.room.name === room_name).filter(creep => creep.memory.role === role);
  }

  public checkIfEnoughResourceToHire(spawn: StructureSpawn, body: BodyPartConstant[]) {
    return spawn.energy >= body.map(role => BODYPART_COST[role]).reduce((a, b) => a + b, 0)
  }

  public checkJobOpening(spawn: StructureSpawn) {
    const harvester = this.getCreepByRole(spawn.room.name, CreepRole.HARVESTER);
    const upgrader = this.getCreepByRole(spawn.room.name, CreepRole.UPGRADER);
    const jobs_open: JobDescription[] = [
      harvester.length < 1 ? new JobDescription(CreepRole.HARVESTER) : undefined,
      upgrader.length < 2 ? new JobDescription(CreepRole.UPGRADER) : undefined
    ].filter(isDefined);
    return jobs_open
  }

  public hireCreep(spawn: StructureSpawn, job: JobDescription) {
    const name = `${job.role}-${Game.time}`;
    const creep_options: SpawnOptions = { memory: { role: job.role, working: false } };
    spawn.spawnCreep(job.body, name, creep_options);
  }
}
