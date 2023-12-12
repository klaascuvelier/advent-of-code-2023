import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day7a(dataPath?: string) {
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

  const winnings = sorted.reduce((acc, entry, index) => {
    return acc + (index + 1) * entry.bid;
  }, 0);

  return winnings;
}

const answer = await day7a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function scoreHand(hand: string[]) {
  // Five of a kind
  if (hand.every((n) => n === hand[0])) {
    return 0;
  }
  // Four of a kind
  else if (hand.find((n) => hand.filter((m) => m === n).length === 4)) {
    return 1;
  }
  // Full house
  else if (
    hand.find((n) => hand.filter((m) => m === n).length === 3) &&
    hand.find((n) => hand.filter((m) => m === n).length === 2)
  ) {
    return 2;
  }
  // Three of a kind
  else if (hand.find((n) => hand.filter((m) => m === n).length === 3)) {
    return 3;
  }
  // One and Two pair
  else if (hand.find((n) => hand.filter((m) => m === n).length === 2)) {
    const firstPair = hand.find(
      (n) => hand.filter((m) => m === n).length === 2,
    );

    // Two pair
    if (
      hand.find(
        (n) => hand.filter((m) => m !== firstPair && m === n).length === 2,
      )
    ) {
      return 4;
    }

    // One pair
    return 5;
  }
  // High card
  else if (
    hand.filter((n, i) => hand.indexOf(n) === i).length === hand.length
  ) {
    return 6;
  }

  return 10;
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
    'J',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
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
