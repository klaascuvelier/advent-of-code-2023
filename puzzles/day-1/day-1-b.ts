import * as process from 'process';
import { readData } from '../../shared.ts';
import chalk from 'chalk';

const textNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);

  let totalCalibrationValue = 0;

  for (const line of data) {
    if (line) {
      const numbers = getNumbers(line);
      const first = numbers[0];
      const last = numbers[numbers.length - 1];
      const calibrationValue = parseInt(`${first}${last}`, 10);
      totalCalibrationValue += calibrationValue;
    }
  }

  return totalCalibrationValue;
}

function getNumbers(text): number[] {
  let numbers = [];

  const regex = new RegExp(
    Object.keys(textNumbers)
      .concat(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
      .join('|'),
    'ig',
  );

  let result;
  while ((result = regex.exec(text)) !== null) {
    numbers.push(transformNumber(result[0]));
    regex.lastIndex = result.index + 1;
  }

  return numbers;
}

function transformNumber(text: string): number {
  if (textNumbers[text]) {
    return textNumbers[text];
  }
  return parseInt(text, 10);
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
