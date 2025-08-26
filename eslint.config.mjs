import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Añadimos esta sección para sobreescribir las reglas por defecto
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Cambiado de error a advertencia
      "prefer-const": "warn", // Cambiado de error a advertencia
      "react-hooks/exhaustive-deps": "warn" // Cambiado de error a advertencia
    },
  },
];

export default eslintConfig;