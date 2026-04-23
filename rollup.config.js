import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/supervisor-skilling.js',
  output: {
    file: 'dist/supervisor-skilling.js',
    format: 'iife',
    name: 'SupervisorSkilling',
    sourcemap: true
  },
  // @wxcc-desktop/sdk is UMD-only and provided by the WxCC runtime as window.Desktop
  external: ['@wxcc-desktop/sdk'],
  plugins: [
    resolve(),
    terser()
  ]
};
