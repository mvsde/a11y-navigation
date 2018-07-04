import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/a11y-navigation.common.js',
      format: 'cjs'
    },
    {
      file: 'dist/a11y-navigation.esm.js',
      format: 'es'
    },
    {
      file: 'dist/a11y-navigation.js',
      format: 'umd',
      name: 'A11yNavigation'
    }
  ],
  plugins: [
    eslint(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

if (process.env.NODE_ENV === 'development') {
  config.plugins.push(serve())
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(terser())
}

export default config
