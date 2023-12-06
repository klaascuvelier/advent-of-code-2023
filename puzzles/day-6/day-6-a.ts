import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);

  const timeData = getLineValues(data[0]);
  const distanceData = getLineValues(data[1]);
  let answer = 0;

  for (let index = 0; index < timeData.length; index++) {
    const time = timeData[index];
    const distance = distanceData[index];
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

    if (waysToWin > 0) {
      answer = (answer === 0 ? 1 : answer) * waysToWin;
    }
  }

  return answer;
}

function getLineValues(line: string): number[] {
  return line
    .split(':')[1]
    .split(' ')
    .filter((i) => i.length)
    .map(Number);
}

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
