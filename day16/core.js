export function parse(input) {
  let data = input.trim().split('\n');

  const spots = data.map(line => {
    console.log('line', line);
    const m = line
      .replace('valves', 'valve')
      .replace('tunnels', 'tunnel')
      .replace('leads', 'lead')
      .match(
        /Valve ([A-Z][A-Z]) has flow rate=(\d+); tunnel lead to valve (.+)/,
      );

    const position = m[1];
    const rate = parseInt(m[2]);
    const options = m[3].split(',').map(d => d.trim());

    return { position, rate, options, open: false };
  });

  console.log('spots', spots);

  return spots;
}
