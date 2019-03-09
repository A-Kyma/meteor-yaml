import yaml from 'js-yaml'

Plugin.registerCompiler({
  extensions: ['yaml', 'yml'],
  archMatching: 'web'
}, () => new YamlCompiler())


// CompileResult is { source }.
class YamlCompiler extends CachingCompiler {
  constructor() {
    super({
      compilerName: 'yaml',
      defaultCacheSize: 1024 * 1024 * 10,
    })
  }
  getCacheKey(inputFile) {
    return inputFile.getSourceHash()
  }
  compileResultSize(compileResult) {
    return compileResult.source.length
  }
  compileOneFileLater(inputFile, getResult) {
    inputFile.addJavaScript({
      path: inputFile.getPathInPackage(),
    }, async () => {
      const result = await getResult()
      return result && {
        data: result.source,
      }
    })
  }
  compileOneFile(inputFile) {
    const options = {}
    const source = inputFile.getContentsAsString()
    try {
      const output = [
        'module.exportDefault(',
        "  " + JSON.stringify(yaml.load(source, options)),
        ");",
        ""
      ].join("\n")
      return { source: output }
    } catch (e) {
      inputFile.error({
        message: `Yaml compiler error: ${e.formatted}\n`,
        sourcePath: inputFile.getDisplayPath(),
      })
      return null
    }
  }
  addCompileResult(inputFile, compileResult) {
    inputFile.addJavaScript({
      data: compileResult.source,
      path: inputFile.getPathInPackage(),
    })
  }
}
