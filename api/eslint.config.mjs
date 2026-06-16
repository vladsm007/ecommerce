import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuração base para todos os arquivos JS
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  // CommonJS para arquivos .js
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  // Globals do Jest para os arquivos de teste
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
]);
