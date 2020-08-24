export function format(first: string, middle: string, last: string): string {
  return (
    (first || "") + (middle ? ` ${middle}` : "") + (last ? ` ${last}` : "")
  );
}

export function pickRandomFromRange(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}
