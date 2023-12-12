import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day9a(dataPath?: string) {
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
    differences[differences.length - 1].push(0);

    // calc value for others
    for (let index = differences.length - 2; index >= 0; index--) {
      differences[index].push(
        differences[index][differences[index].length - 1] +
          differences[index + 1][differences[index + 1].length - 1],
      );
    }

    // calc next value for sequence
    const nextValue =
      numbers[numbers.length - 1] + differences[0][differences[0].length - 1];

    total += nextValue;
  }

  return total;
}

const answer = await day9a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
