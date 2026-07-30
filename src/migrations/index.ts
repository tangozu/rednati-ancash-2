import * as migration_20260507_221443_initial from './20260507_221443_initial';
import * as migration_20260730_020832 from './20260730_020832';

export const migrations = [
  {
    up: migration_20260507_221443_initial.up,
    down: migration_20260507_221443_initial.down,
    name: '20260507_221443_initial',
  },
  {
    up: migration_20260730_020832.up,
    down: migration_20260730_020832.down,
    name: '20260730_020832'
  },
];
