import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import replace from "@rollup/plugin-replace";
import analyze from "rollup-plugin-analyzer";
import visualizer from "rollup-plugin-visualizer";

const { TARGET_ENV } = process.env;
const packageJson = require("./package.json");

export default [
    {
      input: "src/index.ts",
      output: [
        {
          file: packageJson.main,
          format: "cjs",
          sourcemap: true,
        },
        {
          file: packageJson.module,
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify(
            TARGET_ENV === 'production' ? 'production' : 'development'
          )
        }),
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        postcss(),
        terser(),
        analyze({
          hideDeps: true,
          // summaryOnly: true,
        }),
        visualizer()
      ],
    },
    {
      input: "dist/esm/index.d.ts",
      output: [{ file: "dist/index.d.ts", format: "esm" }],
      plugins: [dts()],
      external: ["react", "react-dom", "@mui/material", "react-table", "styled-components" ]
    //   external: [/\.(css|less|scss)$/],
    },
  ];