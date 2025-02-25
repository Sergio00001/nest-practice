import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envFiles = ['.env', '.env.local'];
  private readonly envProvider: Record<string, string> = {};

  constructor() {
    this.envFiles.map((fileName) => {
      if (fs.existsSync(fileName)) {
        Object.assign(this.envProvider, parse(fs.readFileSync(fileName)));
      }
    });
  }

  private get(key: string): string {
    if (key in this.envProvider) return this.envProvider[key];
    else throw new Error(`Environment variable ${key} is not defined`);
  }

  private getBoolean(key: string): boolean {
    return this.get(key) === 'true';
  }

  private getNumber(key: string): number {
    return Number(this.get(key));
  }

  get typeormConfig() {
    return {
      host: this.get('POSTGRES_HOST'),
      port: this.getNumber('POSTGRES_PORT'),
      username: this.get('POSTGRES_USER'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DB'),
      logging: this.getBoolean('POSTGRES_LOGGING'),
    };
  }

  get server() {
    return {
      host: this.get('SERVER_HOST'),
      port: this.getNumber('SERVER_PORT'),
    };
  }
}
