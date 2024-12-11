import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            },
            globals: globals.browser
        },
        plugins: {
            "@typescript-eslint": tseslint
        },
        rules: {
            // Reglas básicas
            indent: ["error", 4],
            "linebreak-style": ["error", "unix"],
            quotes: ["error", "double"],
            semi: ["error", "always"],

            // Longitud máxima de línea
            "max-len": [
                "error",
                {
                    code: 80,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreComments: true
                }
            ],

            // Estilo de llaves
            "brace-style": ["error", "stroustrup"],
            "space-before-blocks": "error",
            "space-before-function-paren": ["error", "always"],

            // Variables no usadas
            "no-unused-vars": "error",

            // Líneas vacías
            "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],

            // Línea final
            "eol-last": "error"
        }
    },
    pluginJs.configs.recommended, // Configuración recomendada de ESLint
    {
        files: ["**/*.ts"], // Configuración específica para TypeScript
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: "./tsconfig.json" // Usa el archivo tsconfig.json
            }
        },
        plugins: {
            "@typescript-eslint": tseslint
        },
        rules: {
            ...tseslint.configs.recommended.rules // Configuración recomendada de @typescript-eslint
        }
    }
];
