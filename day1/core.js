export function parse(input) {
  const data = input.trim().split('\n\n');

  const loads = data.map(elf => {
    return elf.split('\n').reduce((a, nb) => a + parseInt(nb), 0);
  });

  return loads;
}
