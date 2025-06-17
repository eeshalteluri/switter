import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extends Next.js + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignore files
  {
    ignores: ["src/generated/**"], // ⬅️ Ignore Prisma generated files
  },

  // Apply rules globally
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // ⬅️ Turn off the 'no-explicit-any' rule
    },
  },
];

export default eslintConfig;
