import GameSavingLoader from '../GameSavingLoader';
import GameSaving from '../GameSaving';

test('test function GameSaving', () => {
  const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
  const result = new GameSaving(JSON.parse(data));
  const expected = {
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1,
      name: 'Hitman',
      level: 10,
      points: 2000,
    },
  };
  expect(result).toEqual(expected);
});

/* eslint quote-props: ["error", "consistent-as-needed"] */

test('test function GameSavingLoader', async () => {
  const received = await GameSavingLoader.load();
  const expected = {
    created: 1546300800,
    id: 9,
    userInfo: {
      id: 1, level: 10, name: 'Hitman', points: 2000,
    },
  };
  expect(received).toEqual(expected);
});
