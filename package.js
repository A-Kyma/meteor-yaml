Package.describe({
  name: 'slaivyn:yaml',
  summary: 'Import/require YAML 1.2 files as JS objects in Meteor project',
  version: '1.0.1',
})

Package.registerBuildPlugin({
  name: 'compile-yaml',
  use: ['caching-compiler@1.2.1', 'ecmascript@0.12.4'],
  sources: ['compile-yaml.js'],
  npmDependencies: {
    'js-yaml': '3.12.2'
  },
})

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0')
})
