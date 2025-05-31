import { defineConfig } from "vitest/config.js";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // describe, test, expect를 전역으로 쓰기 위함
    environment: "jsdom", // DOM 환경 설정
    setupFiles: "./src/setupTests.ts", // 테스트 전 설정 파일 경로
    coverage: {
      reporter: ["text", "json", "html"], // 커버리지 리포트 생성
    },
  },
});
