// import {uglify} from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import typescript from "rollup-plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/NavMeshPathFinding.ts',
    output: {
        name: 'NavMeshPathFinding',
        format: 'esm',
        file: 'dist/export/pathFinding.js',
    },
    plugins: [
        typescript({module: "commonjs",target: "es6"}),
        commonjs({extensions: ['.js', '.ts']}), // converts date-fns to ES modules
        // terser()
    ]
}
