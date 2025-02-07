module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "@vue/typescript/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "vue/valid-attribute-name": "off",
    "prettier/prettier": "warn",
    "vue/v-on-event-hyphenation": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    "vue/attribute-hyphenation": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  ignorePatterns: ["dist", "assets"],
};
