import js from "@eslint/js";

const browserGlobals = {
  document: "readonly",
  window: "readonly",
  localStorage: "readonly",
  crypto: "readonly",
  alert: "readonly",
  confirm: "readonly",
  HTMLInputElement: "readonly",
  HTMLTextAreaElement: "readonly",
};

export default [
  {
    ignores: ["node_modules/", "dist/", "build/", "coverage/", "test-results/", "playwright-report/", "*.min.js"],
  },
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: browserGlobals,
    },
    rules: {
      "no-console": "error",
    },
  },
  {
    files: ["tests/**/*.js", "playwright.config.js"],
    languageOptions: {
      globals: {
        process: "readonly",
        DOMException: "readonly",
        Storage: "readonly",
        getComputedStyle: "readonly",
      },
    },
  },
];
