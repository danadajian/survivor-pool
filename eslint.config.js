import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import noOnlyTests from "eslint-plugin-no-only-tests";
import reactPlugin from "eslint-plugin-react";
import typescriptEslint from "typescript-eslint";

export default [
  ...typescriptEslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint.plugin,
      "simple-import-sort": eslintPluginSimpleImportSort,
      "no-only-tests": noOnlyTests,
      react: reactPlugin,
    },
    rules: {
      "no-console": "error",
      "simple-import-sort/imports": "error",
      "no-only-tests/no-only-tests": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
    },
    ignores: ["test/**/*"],
  },
  {
    files: ["**/*.tsx"],
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "error",
    },
  },
  {
    ignores: ["**/*.js", "public", "scripts"],
  },
];
