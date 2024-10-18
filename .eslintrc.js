module.exports = {
    root: true,
    env: { browser: true, es6: true, node: true },
    extends: ['eslint-config-ali/react', 'eslint-config-ali/jsx-a11y', 'plugin:prettier/recommended'],
    globals: {
        REACT_APP_ENV: true,
        document: true,
        localStorage: true,
        window: true,
        React: true,
        echarts: true,
        XLSX: true,
        XStyle: true,
    },
    parser: '@babel/eslint-parser', // 指定parser
    parserOptions: {
        ecmaFeatures: { jsx: true }, // 支持解析JSX
        ecmaVersion: 'latest', // 让parser按更新的语法来解析
        sourceType: 'module', // 让parser按ESM解析
    },
    plugins: ['simple-import-sort', 'prettier'], // 启用插件
    // 此处书写需要覆盖的配置
    rules: {
        'react/forbid-prop-types': [0, { forbid: ['object'] }],
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                singleQuote: true,
                endOfLine: 'auto',
                printWidth: 120,
                semi: true,
            },
        ],
        'no-unused-vars': [
            1,
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_|^err|^ev', // _xxx, err, error, ev, event
            },
        ],
        'import/no-unresolved': [
            2,
            {
                ignore: ['@'], // @ 是设置的路径别名
            },
        ],
        // import 导入顺序
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // Packages `react` related packages come first.
                    ['^react', '^@?\\w'],
                    // Internal packages.
                    ['^(@|components)(/.*|$)'],
                    // Side effect imports.
                    ['^\\u0000'],
                    // Parent imports. Put `..` last.
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    // Style imports.
                    ['^.+\\.?(css)$'],
                ],
            },
        ],
        'no-console': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'no-param-reassign': 0,
    },
};
