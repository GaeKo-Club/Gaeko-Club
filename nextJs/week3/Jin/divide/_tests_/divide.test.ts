// __tests__/divide.test.ts
import { divide } from "../divide";

describe("divide 함수 동작", () => {
  test("10 ÷ 2는 5를 반환해야 한다", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("9 ÷ 3은 3을 반환해야 한다", () => {
    expect(divide(9, 3)).toBe(3);
  });
});

describe("divide 함수 에러처리", () => {
  test("0으로 나누면 에러를 던져야 한다", () => {
    expect(() => divide(10, 0)).toThrow("0으로 나눌 수 없습니다.");
  });

  test("숫자가 아닌 값이 들어오면 에러를 던져야 한다", () => {
    // @ts-expect-error
    expect(() => divide("10", 2)).toThrow("숫자만 입력 가능합니다.");
  });
});
