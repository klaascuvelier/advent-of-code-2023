import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Grab = { red?: number; green?: number; blue?: number };

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  let total = 0;

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

    const minimum = {
      red: grabs.reduce((v, g) => (g.red && g.red > v ? g.red : v), 0),
      green: grabs.reduce((v, g) => (g.green && g.green > v ? g.green : v), 0),
      blue: grabs.reduce((v, g) => (g.blue && g.blue > v ? g.blue : v), 0),
    };
    const power = minimum.red * minimum.green * minimum.blue;

    console.log(minimum, power);

    total += power;
  }

  return total;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
