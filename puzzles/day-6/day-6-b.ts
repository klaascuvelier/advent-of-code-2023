import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);

  const time = getLineValue(data[0]);
  const distance = getLineValue(data[1]);

  let waysToWin = 0;

  for (let chargeTime = 0; chargeTime < time; chargeTime++) {
    // chargeTime is also speed
    const speed = chargeTime;
    const raceTime = time - chargeTime;
    const distanceTraveled = raceTime * speed;

    // win
    if (distanceTraveled > distance) {
      waysToWin++;
    }
  }

  return waysToWin;
}

function getLineValue(line: string): number {
  return Number(line.split(':')[1].replace(/\s/g, ''));
}

const answer = await day6b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
