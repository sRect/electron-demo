module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard',
    'plugin:prettier/recommended',
  ], // 如果prettier和standard冲突，则使用standard，这里standard要放在prettier的前面
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-use-before-define': 'off',
  },
};
