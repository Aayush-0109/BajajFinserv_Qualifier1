export class HcfService {
  async execute(input: number[]): Promise<number> {
    if (input.length === 0) {
      return 0;
    }

    return input.reduce((acc, value) => this.gcd(acc, value));
  }

  private gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);

    while (y !== 0) {
      const temp = y;
      y = x % y;
      x = temp;
    }

    return x;
  }
}
