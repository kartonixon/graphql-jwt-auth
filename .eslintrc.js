module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    "max-classes-per-file": "off",
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ]
  },
  settings: {
    'import/resolver': {
        node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            moduleDirectory: ['node_modules', 'src/'],
        },
    },
}
};
