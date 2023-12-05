import { readData } from '../../shared.ts';
import chalk from 'chalk';

// Warning: this is incredibly slow.

export type MapDefinition = {
  destination: number;
  source: number;
  range: number;
};

export async function day5b(dataPath?: string) {
  const data = await readData(dataPath);
  const maps = new Map<string, MapDefinition[]>();
  let seedInfo: number[] = [];
  let currentMap: string | undefined;
  let closestDestination: number | undefined;

  for (const line of data) {
    if (line.startsWith('seeds:')) {
      seedInfo = line
        .split(': ')[1]
        .split(' ')
        .map((seed) => parseInt(seed));

      // seedInfo = [3640773763, 2];
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

  const seeds = [];
  const pairs = seedInfo.length / 2;
  for (let pairIndex = 0; pairIndex < pairs; pairIndex++) {
    const start = seedInfo[pairIndex * 2];
    const range = seedInfo[pairIndex * 2 + 1];

    for (let offset = 0; offset < range; offset++) {
      const seed = start + offset;
      const location = findLocation(seed);
      console.log(seed);
      if (!closestDestination || location < closestDestination) {
        console.log(closestDestination);
        closestDestination = location;
      }
    }
  }

  function findLocation(seed) {
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

    // console.log({
    //   seed,
    //   soil,
    //   fertilizer,
    //   water,
    //   light,
    //   temperature,
    //   humidity,
    //   location,
    // });
    return location;
  }

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

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
