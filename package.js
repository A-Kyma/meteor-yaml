Package.describe({
  name: 'akyma:yaml',
  summary: 'Import/require YAML 1.2 files as JS objects in Meteor v3 project',
  version: '2.0.1',
})

Package.registerBuildPlugin({
  name: 'compile-yaml',
  use: ['caching-compiler@2.0.0', 'ecmascript@0.16.8'],
  sources: ['compile-yaml.js'],
  npmDependencies: {
    'js-yaml': '4.1.0'
  },
})

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0');
})
