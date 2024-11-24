import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import scss from "rollup-plugin-scss";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
    scss({
      fileName: "styles.css",
      outputStyle: "compressed",
      sourceMap: true,
    }),
  ],
});