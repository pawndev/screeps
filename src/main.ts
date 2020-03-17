import { Logger } from "logger";
import { ErrorMapper } from "utils/ErrorMapper";
import { getCurrentSongLine } from "utils/sing";
import { CreepLeader } from './creeps/leader';
import { CreepManager } from './creeps/manager';
// import './prototypes/Room';
import { GarbageMan } from './utils/GarbageMan';

const eboueur = new GarbageMan();
const boss = new CreepManager();
const lead = new CreepLeader();

export const loop = ErrorMapper.wrapLoop(() => {
  eboueur.collect();
  eboueur.recycle();

  for (const spawn_name in Game.spawns) {
    const spawn = Game.spawns[spawn_name];
    const jobs = boss.checkJobOpening(spawn);

    jobs.map(job => {
      const haveEnoughEnergy = boss.checkIfEnoughResourceToHire(spawn, job.body);
      if (haveEnoughEnergy) {
        boss.hireCreep(spawn, job);
      }
    });
  }

  for (const creep_name in Game.creeps) {
    const creep = Game.creeps[creep_name];

    if (creep.spawning) {
      continue;
    }

    lead.giveWork(creep);
    const songLine = getCurrentSongLine();
    if (songLine) {
      creep.say(songLine);
    }
  }
});
