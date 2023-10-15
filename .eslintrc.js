module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['airbnb-typescript'],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		ecmaVersion: 'esnext',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		project: './tsconfig.json',
	},
	rules: {},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
