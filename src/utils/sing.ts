const LINE_HOLD_TIME = 1;
const SILENT_TIME = 10;

const SONGS: { [key: string]: string[] } = {
  'I am machine': [
    'I am', 'machine',
    'I never', 'sleep',
    'I keep', 'my eyes', 'wide open',
    'I am', 'machine',
    'A part', 'of me',
    'Wishes I', 'just could', 'feel', 'something',
    'I am', 'machine',
    'I never', 'sleep',
    'Until I', 'fix what\'s', 'broken',
    'I am', 'machine',
    'A part', 'of me',
    'Wishes I', 'just could', 'feel', 'something',
  ],
  'We will rock you': [
    'You\'ve got', 'mud on', 'yo face',
    'You big', 'disgrace',
    'Kickin\'', 'your can', 'all over', 'the place',
    'Singin\'',
    'We', 'will', 'we', 'will', 'rock', 'you',
    'We', 'will', 'we', 'will', 'rock', 'you'
  ],
  'X gon give it to ya': [
    'X gon\'', 'give it', 'to ya',
    'Fuck', 'waitin\'', 'for you', 'to get', 'it on', 'your own',
    'X gon\'', 'deliver it', 'to ya',
    'Knock', 'knock', 'open up', 'the door', 'it\'s real',
    'with the', 'non-stop', 'pew pew', 'of', 'restless', 'creeps'
  ]
};

export function getCurrentSongLine(): string | null {
  if (!Memory.songMemory) {
    Memory.songMemory = {
      currentLine: 0,
      lastLineChange: 0,
      lastSongFinish: 0
    }
  }

  const mem: SongMemory = Memory.songMemory;
  if (!mem.currentSong && Game.time >= mem.lastSongFinish + SILENT_TIME) {
    const titles = _.keys(SONGS);
    mem.currentSong = titles[_.random(0, titles.length)];
    mem.currentLine = 0;
    mem.lastLineChange = Game.time;
  }

  if (!mem.currentSong) {
    return null;
  }

  const lines = SONGS[mem.currentSong];
  if (Game.time >= mem.lastLineChange + LINE_HOLD_TIME) {
    mem.currentLine += 1;
    mem.lastLineChange = Game.time;
  }

  if (mem.currentLine >= lines.length) {
    mem.currentSong = undefined;
    mem.lastSongFinish = Game.time;
    return null;
  }

  return lines[mem.currentLine];
}
