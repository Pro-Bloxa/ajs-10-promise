import read from './reader';
import json from './parser';
import GameSaving from './GameSaving';

export default class GameSavingLoader {
  static load() {
    return read()
      .then((response) => {
        const value = json(response);
        return value;
      }).then((value) => {
        const obj = new GameSaving(JSON.parse(value));
        return obj;
      });
  }
}
