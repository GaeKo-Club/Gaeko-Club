import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // describe, test, expect를 전역으로 쓰기 위함
    environment: "jsdom", // DOM 환경 설정
    setupFiles: "./src/setupTests.ts", // 테스트 전 설정 파일 경로
  },
});
