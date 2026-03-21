import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    globals: true,
    css: false,
    alias: {
      "@/": path.resolve(__dirname, "./"),
      "@workspace/ui/": path.resolve(__dirname, "../../packages/ui/src/"),
    },
  },
})
