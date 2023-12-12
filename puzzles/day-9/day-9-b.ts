import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day9b(dataPath?: string) {
  const data = await readData(dataPath);
  let total = 0;

  function getDifferences(numbers: number[]) {
    return numbers.reduce((acc, number, index, array) => {
      if (array[index + 1] !== undefined) {
        acc.push(array[index + 1] - number);
      }

      return acc;
    }, []);
  }

  for (const line of data) {
    if (line.length === 0) {
      continue;
    }

    const numbers = line.split(' ').map((n) => parseInt(n, 10));
    const differences: number[][] = [getDifferences(numbers)];

    while (!differences[differences.length - 1].every((n) => n === 0)) {
      differences.push(getDifferences(differences[differences.length - 1]));
    }

    // add 0 to last array
    differences[differences.length - 1].unshift(0);

    // calc value for others
    for (let index = differences.length - 2; index >= 0; index--) {
      differences[index].unshift(
        differences[index][0] - differences[index + 1][0],
      );
    }

    // calc next value for sequence
    const nextValue = numbers[0] - differences[0][0];
    console.log(numbers, nextValue);
    total += nextValue;
  }

  return total;
}

const answer = await day9b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
