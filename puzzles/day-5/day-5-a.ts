import { readData } from '../../shared.ts';
import chalk from 'chalk';

export type MapDefinition = {
  destination: number;
  source: number;
  range: number;
};

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  const maps = new Map<string, MapDefinition[]>();
  let seeds: Set<number> | undefined;
  let currentMap: string | undefined;
  let closestDestination: number | undefined;

  for (const line of data) {
    if (line.startsWith('seeds:')) {
      seeds = new Set(
        line
          .split(': ')[1]
          .split(' ')
          .map((seed) => parseInt(seed)),
      );
    } else if (line.endsWith(' map:')) {
      currentMap = line.split(' ')[0];
      maps.set(currentMap, []);
    } else if (currentMap && line.length) {
      const [destination, source, range] = line
        .split(' ')
        .map((value) => parseInt(value));
      maps.get(currentMap)?.push({ destination, source, range });
    } else {
      // console.log('Invalid line:', line);
    }
  }

  seeds.forEach((seed) => {
    const soil = findDestination(maps.get('seed-to-soil'), seed);
    const fertilizer = findDestination(maps.get('soil-to-fertilizer'), soil);
    const water = findDestination(maps.get('fertilizer-to-water'), fertilizer);
    const light = findDestination(maps.get('water-to-light'), water);
    const temperature = findDestination(
      maps.get('light-to-temperature'),
      light,
    );
    const humidity = findDestination(
      maps.get('temperature-to-humidity'),
      temperature,
    );
    const location = findDestination(
      maps.get('humidity-to-location'),
      humidity,
    );

    console.log({
      seed,
      soil,
      fertilizer,
      water,
      light,
      temperature,
      humidity,
      location,
    });

    if (!closestDestination || location < closestDestination) {
      closestDestination = location;
    }
  });

  return closestDestination;

  function findDestination(definitions: MapDefinition[], seed: number): number {
    const definition = definitions.find((definition) => {
      return (
        seed >= definition.source &&
        seed <= definition.source + definition.range
      );
    });

    if (!definition) {
      return seed;
    }

    // console.log('definition', definition);
    return definition.destination - definition.source + seed;
  }
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
