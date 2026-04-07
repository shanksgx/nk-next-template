import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "dist",
    "*.css",
  ]),
  // Allow @ts-expect-error comments
  // Allow missing deps in useEffect/useCallback when acceptable
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/refs": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      'react-hooks/exhaustive-deps': 'off'
    },
  },
]);

export default eslintConfig;
