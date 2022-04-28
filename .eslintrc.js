module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSXJavaScript and TypeScript
        },
    },
    extends: [
        'airbnb',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:react/recommended',
        'prettier',
    ],
    plugins: ['react', 'react-hooks', 'prettier'],
    rules: {
        // JS common rules
        'global-require': 0,
        'arrow-parens': 0,
        'arrow-body-style': ['error', 'as-needed'],
        'function-paren-newline': 0,
        'object-curly-newline': 0,
        'no-prototype-builtins': 0,
        'no-restricted-syntax': 0,
        'func-names': [
            'error',
            'always',
            {
                generators: 'never',
            },
        ],
        'implicit-arrow-linebreak': 0,
        'operator-linebreak': 0,
        'newline-per-chained-call': 0,
        'no-confusing-arrow': 0,
        'no-console': 1,
        'no-use-before-define': 0,
        'no-plusplus': 0,
        'prefer-template': 2,
        'require-yield': 0,
        'comma-dangle': ['error', 'always-multiline'],

        // Import rules
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/no-unresolved': 2,
        'import/prefer-default-export': 0,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
            },
        ],

        // React rules
        'react/require-default-props': 0,
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'function-declaration',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react/prop-types': 0,

        // JSX rules
        'react/jsx-filename-extension': 0,
        'react/jsx-no-target-blank': 0,
        'react/jsx-wrap-multilines': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-curly-brace-presence': [
            2,
            {
                props: 'never',
                children: 'never',
            },
        ],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',

        // React hooks rules
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        'prettier/prettier': 'error',
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx'],
            },
        },
    },
}
