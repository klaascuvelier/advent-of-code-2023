import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);

  const instructions = data[0].split('');
  const maps = new Map<string, { L: string; R: string }>();
  const regexp = /([A-Z]+)\s=\s\(([A-Z]+),\s([A-Z]+)\)/i;

  for (let i = 2; i < data.length; i++) {
    if (data[i]) {
      const [, identifier, left, right] = data[i].match(regexp);
      maps.set(identifier, { L: left, R: right });
    }
  }

  let pos = 'AAA';
  let index = 0;
  while (pos !== 'ZZZ') {
    console.log(pos);
    const instruction = instructions[index % instructions.length];
    const { L, R } = maps.get(pos)!;
    pos = instruction === 'L' ? L : R;
    index++;
  }
  console.log(pos, index);

  return index;
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
