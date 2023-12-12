import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day7b(dataPath?: string) {
  const data = await readData(dataPath);
  const entries: { hand: string[]; bid: number; score: number }[] = [];

  for (const line of data) {
    if (line) {
      const hand = line.split(' ')[0].split('');
      const bid = parseInt(line.split(' ')[1], 10);

      entries.push({
        hand,
        bid,
        score: scoreHand(hand),
      });
    }
  }

  const sorted = entries.sort(sortEntries).reverse();
  console.log(sorted);
  const winnings = sorted.reduce((acc, entry, index) => {
    return acc + (index + 1) * entry.bid;
  }, 0);

  return winnings;
}

const answer = await day7b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function scoreHand(hand: string[]) {
  const buckets = hand.reduce((acc: Record<string, number>, card) => {
    if (acc.hasOwnProperty(card)) acc[card]++;
    else acc[card] = 1;
    return acc;
  }, {});

  const jokers = buckets['J'] || 0;
  const [max, secondMax] = Object.keys(buckets)
    .map((key) => (key === 'J' ? -1 : buckets[key]))
    .sort((a, b) => b - a);

  return (max + jokers) * 3 + secondMax;
}

function sortEntries(
  entry1: { hand: string[]; bid: number; score: number },
  entry2: { hand: string[]; bid: number; score: number },
) {
  if (entry1.score < entry2.score) {
    return -1;
  } else if (entry1.score > entry2.score) {
    return 1;
  } else {
    return sortHandsByCards(entry1.hand, entry2.hand);
  }
}

function sortHandsByCards(hand1: string[], hand2: string[]): number {
  const values = [
    'A',
    'K',
    'Q',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
    'J',
  ];

  for (let i = 0; i < Math.max(hand1.length, hand2.length); i++) {
    const v1 = values.indexOf(hand1[i]);
    const v2 = values.indexOf(hand2[i]);

    // this is reverse!
    if (v1 > v2) {
      return 1;
    } else if (v2 > v1) {
      return -1;
    }
  }

  return 0;
}
