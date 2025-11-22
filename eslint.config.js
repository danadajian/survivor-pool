import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import noOnlyTests from "eslint-plugin-no-only-tests";
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
    ignores: ["test/**/*", "cypress/**/*"],
  },
  {
    ignores: ["**/*.js", "public", "scripts"],
  },
];
