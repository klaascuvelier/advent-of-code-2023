import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Grab = { red?: number; green?: number; blue?: number };

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  const required = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const matchingGameIds: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (!data[i]) {
      continue;
    }

    const [game, grabsRaw] = data[i].split(':');
    const grabs: Grab[] = grabsRaw.split(';').map((x) => {
      const grab = {};
      let result;
      const regexp = /([0-9]+)\s(blue|red|green)/gi;
      while ((result = regexp.exec(x)) !== null) {
        grab[result[2] as 'red' | 'green' | 'blue'] = parseInt(result[1], 10);
      }
      return grab;
    });

    if (
      grabs.every((grab) => {
        const redOk = !grab.red || grab.red <= required.red;
        const greenOk = !grab.green || grab.green <= required.green;
        const blueOk = !grab.blue || grab.blue <= required.blue;

        return redOk && blueOk && greenOk;
      })
    ) {
      matchingGameIds.push(parseInt(game.split('Game ')[1], 10));
    }
  }

  console.log(matchingGameIds);

  return matchingGameIds.reduce((a, b) => a + b, 0);
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
