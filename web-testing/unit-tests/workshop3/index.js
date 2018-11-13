export function avg(...numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  return sum(...numbers) / numbers.length;
}

export function sum(...numbers) {
  return numbers.reduce((result, next) => {
    return result + next;
  }, 0);
}

export function sort(...numbers) {
  return numbers.sort((a, b) => (a >= b ? 1 : -1));
}

export function median(...numbers) {
  const sortedNumbers = sort(...numbers);

  if (isEven(sortedNumbers.length)) {
    const pivot = sortedNumbers.length / 2 - 1;

    return avg(sortedNumbers[pivot], sortedNumbers[pivot + 1]);
  } else {
    const pivot = (sortedNumbers.length + 1) / 2 - 1;

    return sortedNumbers[pivot];
  }
}

export function isEven(number) {
  return number % 2 === 0;
}
