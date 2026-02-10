export class PrimeService {
  async execute(input: number[]): Promise<number[]> {
    return input.filter((value) => this.isPrime(value));
  }

  private isPrime(n: number): boolean {
    if (n < 2) {
      return false;
    }

    if (n === 2) {
      return true;
    }

    if (n % 2 === 0) {
      return false;
    }

    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) {
        return false;
      }
    }

    return true;
  }
}
