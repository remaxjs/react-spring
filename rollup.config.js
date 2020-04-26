import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

const root = process.platform === 'win32' ? path.resolve('/') : '/'
const external = id => !id.startsWith('.') && !id.startsWith(root)
const extensions = ['.js', '.jsx', '.ts', '.tsx']
const getBabelOptions = ({ useESModules }, targets) => ({
  babelrc: false,
  extensions,
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  presets: [
    ['@babel/preset-env', { loose: true, modules: false, targets }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['transform-react-remove-prop-types', { removeImport: true }],
    ['@babel/transform-runtime', { regenerator: false, useESModules }],
  ],
})

function createConfig(entry, out) {
  return [
    {
      input: `./src/${entry}/index`,
      output: { file: `dist/${out}.js`, format: 'esm' },
      external,
      plugins: [
        babel(
          getBabelOptions(
            { useESModules: true },
            '>1%, not dead, not ie 11, not op_mini all'
          )
        ),
        sizeSnapshot(),
        resolve({ extensions }),
      ],
    },
    {
      input: `./src/${entry}/index`,
      output: { file: `dist/${out}.cjs.js`, format: 'cjs' },
      external,
      plugins: [
        babel(getBabelOptions({ useESModules: false })),
        sizeSnapshot(),
        resolve({ extensions }),
      ],
    },
  ]
}

function createCjs(entry, out) {
  return [
    {
      input: `./src/${entry}/index`,
      output: { file: `dist/${out}.js`, format: 'cjs' },
      external,
      plugins: [
        babel(
          getBabelOptions(
            { useESModules: true },
            '>1%, not dead, not ie 11, not op_mini all'
          )
        ),
        sizeSnapshot(),
        resolve({ extensions }),
      ],
    },
    {
      input: `./src/${entry}/index`,
      output: { file: `dist/${out}.cjs.js`, format: 'cjs' },
      external,
      plugins: [
        babel(getBabelOptions({ useESModules: false })),
        sizeSnapshot(),
        resolve({ extensions }),
      ],
    },
  ]
}

export default [
  ...createConfig('targets/web', 'web'),
  ...createConfig('targets/remax', 'remax'),
  {
    input: `./src/targets/cookbook/index`,
    output: { file: `dist/cookbook.js`, format: 'esm' },
    external,
    plugins: [
      babel(
        getBabelOptions(
          { useESModules: true },
          '>1%, not dead, not ie 11, not op_mini all'
        )
      ),
      resolve({ extensions }),
    ],
  },
  ...createCjs('renderprops/targets/web', 'renderprops'),
  ...createCjs('renderprops/addons', 'renderprops-addons'),
]
