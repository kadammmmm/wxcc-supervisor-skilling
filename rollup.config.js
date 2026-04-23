import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/supervisor-skilling.js',
  output: {
    file: 'dist/supervisor-skilling.js',
    format: 'iife',
    name: 'SupervisorSkilling',
    sourcemap: true
  },
  plugins: [
    // browser:true picks browser-targeted builds and handles `window` references
    resolve({ browser: true, preferBuiltins: false }),
    // commonjs converts the SDK's UMD bundle so rollup can read its exports
    commonjs({ transformMixedEsModules: true }),
    terser()
  ]
};
