export default function parse(input) {
  const data = input.split('\n').filter(x => x);

  console.log('DATA', data);

  return data;
}
