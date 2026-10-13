// ESM-only packages (uuid, got and got's ESM-only transitive dependencies) that Jest must transform
const esmDependencies = [
  'uuid',
  'got',
  '@sindresorhus/is',
  '@keyv/serialize',
  '@sec-ant/readable-stream',
  'byte-counter',
  'cacheable-request',
  'chunk-data',
  'decompress-response',
  'get-stream',
  'is-stream',
  'keyv',
  'lowercase-keys',
  'mimic-response',
  'normalize-url',
  'responselike',
  'tagged-tag',
  'type-fest',
  'uint8array-extras',
];

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          esModuleInterop: true,
        },
      },
    ],
    '^.+\\.js$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    `node_modules/(?!(${esmDependencies.join('|')})/)`,
  ],
};