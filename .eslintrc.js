module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: ['airbnb-typescript/base', 'prettier'],
  rules: {
    "max-classes-per-file": "off",
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
  }
};
