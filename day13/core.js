export function parse(input) {
  let data = input.trim().split('\n\n');

  data = data.map(block => block.split('\n').map(line => JSON.parse(line)));

  return data;
}

export function compare(left, right) {
  left = [...left];
  right = [...right];

  while (left.length && right.length) {
    let firstL = left.shift();
    let firstR = right.shift();

    if (Array.isArray(firstL) && Array.isArray(firstR)) {
      const order = compare(firstL, firstR);
      if (order !== 0) return order;
    } else if (Array.isArray(firstL) && !Array.isArray(firstR)) {
      const order = compare(firstL, [firstR]);
      if (order !== 0) return order;
    } else if (!Array.isArray(firstL) && Array.isArray(firstR)) {
      const order = compare([firstL], firstR);
      if (order !== 0) return order;
    } else {
      if (firstL !== firstR) return firstL < firstR ? 1 : -1;
    }
  }

  if (left.length === 0 && right.length > 0) {
    return 1;
  } else if (left.length > 0 && right.length === 0) {
    return -1;
  }
  return 0;
}
