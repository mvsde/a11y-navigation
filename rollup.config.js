import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import filesize from 'rollup-plugin-filesize'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'

const ext = process.env.MINIFY ? 'min.js' : 'js'
const banner = `/*!
 * A11Y Navigation v0.1.0
 *
 * Copyright (c) 2018 Fynn Becker
 * This source code is licensed under the MIT license.
 */`

const config = {
  input: 'src/index.js',
  output: [
    {
      file: `dist/a11y-navigation.common.${ext}`,
      format: 'cjs',
      banner
    },
    {
      file: `dist/a11y-navigation.esm.${ext}`,
      format: 'es',
      banner
    },
    {
      file: `dist/a11y-navigation.${ext}`,
      format: 'umd',
      name: 'A11yNavigation',
      banner
    }
  ],
  plugins: [
    eslint(),
    babel({ exclude: 'node_modules/**' })
  ]
}

if (process.env.NODE_ENV === 'development') {
  config.plugins.push(serve())
  config.plugins.push(livereload())
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(filesize())
}

if (process.env.MINIFY) {
  config.plugins.push(terser({
    output: {
      comments: /^!/
    }
  }))
}

export default config
