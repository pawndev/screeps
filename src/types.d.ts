// memory extension samples
interface CreepMemory {
  role: string;
  working?: boolean;
}

interface SongMemory {
  currentLine: number;
  lastLineChange: number;
  lastSongFinish: number;
  currentSong?: string;
}

interface Memory {
  uuid: number;
  log: any;
  songMemory: SongMemory;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
