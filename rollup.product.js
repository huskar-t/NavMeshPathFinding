import {uglify} from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from "rollup-plugin-typescript";

export default {
    input: 'src/NavMeshPathFinding.ts',
    output: {
        name: 'NavMeshPathFinding',
        format: 'iife',
        file: 'dist/js/pathFinding.min.js',
    },
    plugins: [
        resolve({
            browser: true,
        }),
        typescript({module: 'CommonJS'}),
        commonjs({extensions: ['.js', '.ts']}), // converts date-fns to ES modules
        uglify()
    ]
}
