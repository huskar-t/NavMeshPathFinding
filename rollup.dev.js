import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'

export default {
    input: 'src/NavMeshPathFinding.ts',
    // input: 'dist/temp-js/NavMeshPathFinding.js',
    output: {
        name: 'NavMeshPathFinding',
        format: 'iife',
        file: 'dist/js/pathFinding.js',
        external: [ 'createjs' ],
        sourcemap: 'inline',
    },
    plugins: [
        resolve({
            browser: true,
        }),
        typescript({module: 'CommonJS',target: "es5"}),
        commonjs({extensions: ['.js', '.ts']}), // converts date-fns to ES modules
    ]
}
