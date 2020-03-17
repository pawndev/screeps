export enum Level {
  ALL = 'ALL',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL'
};

const getColor = (level: Level): string => {
  switch (level) {
    case Level.WARN:
      return 'orange'
    case Level.ERROR:
    case Level.FATAL:
      return 'red';
    case Level.ALL:
    case Level.TRACE:
    case Level.DEBUG:
    case Level.INFO:
    default:
      return '';

  }
}

export class Logger {
  public static log(level: Level, ...args: any[]) {
    const levelColor = getColor(level);
    const spanOpen = levelColor ? '<span style="color: ' + levelColor + '">' : '';
    const spanClose = levelColor ? '</span>' : '';
    const message = args.map(arg => arg.toString()).join(' ')
    console.log(`${spanOpen}[${this.name}] [${level}] ${message}${spanClose}`);
  }

  public static fatal(...messages: any[]) {
    Logger.log.call(this, Level.FATAL, messages);
  }

  public static error(...messages: any[]) {
    Logger.log.call(this, Level.ERROR, messages);
  }

  public static warn(...messages: any[]) {
    Logger.log.call(this, Level.WARN, messages);
  }

  public static info(...messages: any[]) {
    Logger.log.call(this, Level.INFO, messages);
  }

  public static debug(...messages: any[]) {
    Logger.log.call(this, Level.DEBUG, messages);
  }

  public static trace(...messages: any[]) {
    Logger.log.call(this, Level.TRACE, messages);
  }
}
