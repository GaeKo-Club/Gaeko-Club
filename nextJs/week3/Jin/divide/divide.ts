const ERROR_MESSAGES = {
  NOT_A_NUMBER: "숫자만 입력 가능합니다.",
  DIVIDE_BY_ZERO: "0으로 나눌 수 없습니다.",
};

export function divide(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error(ERROR_MESSAGES.NOT_A_NUMBER);
  }

  if (b === 0) {
    throw new Error(ERROR_MESSAGES.DIVIDE_BY_ZERO);
  }

  return a / b;
}
