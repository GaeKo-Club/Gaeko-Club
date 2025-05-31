import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter 컴포넌트 테스트", () => {
  test("초기값은 0이다", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("Increase 버튼 클릭 시 카운트가 1 증가한다", async () => {
    render(<Counter />);
    const user = userEvent.setup();

    const increaseBtn = screen.getByRole("button", { name: /increase/i });
    await user.click(increaseBtn);

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  test("Decrease 버튼 클릭 시 카운트가 1 감소한다", async () => {
    render(<Counter />);
    const user = userEvent.setup();

    const decreaseBtn = screen.getByRole("button", { name: /decrease/i });
    await user.click(decreaseBtn);

    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });
});
