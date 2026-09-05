import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import { defineConfig, includeIgnoreFile } from 'eslint/config'
import globals from 'globals'
import path from 'node:path'
import ts from 'typescript-eslint'

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore')

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.strictTypeChecked,
	ts.configs.stylisticTypeChecked,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,

	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				project: './tsconfig.eslint.json',
				extraFileExtensions: ['.svelte'],
			},
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
		},
	},

	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.eslint.json',
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
			},
		},
	},
	{
		// Override or add rule settings here, such as:
		// 'svelte/button-has-type': 'error'
		rules: {
			'@typescript-eslint/class-methods-use-this': [
				'error',
				{
					ignoreClassesThatImplementAnInterface: true,
					ignoreOverrideMethods: true,
				},
			],
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ fixStyle: 'separate-type-imports' },
			],
			'@typescript-eslint/default-param-last': 'error',
			'@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
			'@typescript-eslint/method-signature-style': 'error',
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/no-unnecessary-qualifier': 'error',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-useless-empty-export': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: true }],
			'@typescript-eslint/prefer-readonly': 'error',
			'@typescript-eslint/prefer-regexp-exec': 'error',
			'@typescript-eslint/promise-function-async': ['error', { checkArrowFunctions: false }],
			'@typescript-eslint/require-array-sort-compare': 'error',
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{
					allowBoolean: true,
					allowNullish: true,
					allowNumber: true,
					allowRegExp: true,
				},
			],
			'@typescript-eslint/return-await': 'error',
			'@typescript-eslint/sort-type-constituents': 'error',
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'func-style': ['error', 'declaration'],

			// Unsafe call of a type that could not be resolved.
			'@typescript-eslint/no-unsafe-call': 'off',
			// Unsafe assignment of an error typed value.
			'@typescript-eslint/no-unsafe-assignment': 'off',
		},
	},

	{ extends: [ts.configs.disableTypeChecked], files: ['**/*.js'] },

	{
		ignores: [
			'.pnpm-store/',
			'coverage/',
			'dist/',
			'docs/',
			'node_modules/',

			'package-lock.json',
			'pnpm-lock.yaml',
		],
	},
)
