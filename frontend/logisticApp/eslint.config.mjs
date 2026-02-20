// @ts-check
import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        browser: true,
      },
    },

    rules: {
      // Порядок импортов
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          pathGroups: [
            { pattern: "@/**", group: "internal", position: "after" },
            { pattern: "**/*.{css,scss}", group: "index", position: "after" },
            {
              pattern: "**/*.{png,jpg,jpeg,svg}",
              group: "index",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },

    ignores: ["dist"],
  },
);
