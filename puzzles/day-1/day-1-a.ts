import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  let totalCalibrationValue = 0;

  for (const line of data) {
    if (line) {
      const numbers = [...line.matchAll(/[0-9]/g)].map((m) => m[0]);
      const first = numbers[0];
      const last = numbers[numbers.length - 1];
      const calibrationValue = parseInt(`${first}${last}`, 10);
      console.log(calibrationValue);
      totalCalibrationValue += calibrationValue;
    }
  }

  return totalCalibrationValue;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
