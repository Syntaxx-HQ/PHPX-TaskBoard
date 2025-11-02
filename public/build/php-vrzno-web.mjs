
var createPhpModule = (() => {
  var _scriptDir = import.meta.url;
  
  return (
function(createPhpModule = {})  {

var Module = typeof createPhpModule != "undefined" ? createPhpModule : {};

var readyPromiseResolve, readyPromiseReject;

Module["ready"] = new Promise(function(resolve, reject) {
 readyPromiseResolve = resolve;
 readyPromiseReject = reject;
});

var moduleOverrides = Object.assign({}, Module);

  var Module = typeof createPhpModule != 'undefined' ? createPhpModule : {};

  Module['expectedDataFileDownloads'] ??= 0;
  Module['expectedDataFileDownloads']++;
  (() => {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker) return;
    function loadPackage(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'build/php-web.data';
      var REMOTE_PACKAGE_BASE = '/build/php-web.data';
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        
        Module['dataFileDownloads'] ??= {};
        fetch(packageName)
          .catch((cause) => Promise.reject(new Error(`Network Error: ${packageName}`, {cause}))) // If fetch fails, rewrite the error to include the failing URL & the cause.
          .then((response) => {
            if (!response.ok) {
              return Promise.reject(new Error(`${response.status}: ${response.url}`));
            }

            if (!response.body && response.arrayBuffer) { // If we're using the polyfill, readers won't be available...
              return response.arrayBuffer().then(callback);
            }

            const reader = response.body.getReader();
            const iterate = () => reader.read().then(handleChunk).catch((cause) => {
              return Promise.reject(new Error(`Unexpected error while handling : ${response.url} ${cause}`, {cause}));
            });

            const chunks = [];
            const headers = response.headers;
            const total = Number(headers.get('Content-Length') ?? packageSize);
            let loaded = 0;

            const handleChunk = ({done, value}) => {
              if (!done) {
                chunks.push(value);
                loaded += value.length;
                Module['dataFileDownloads'][packageName] = {loaded, total};

                let totalLoaded = 0;
                let totalSize = 0;

                for (const download of Object.values(Module['dataFileDownloads'])) {
                  totalLoaded += download.loaded;
                  totalSize += download.total;
                }

                Module['setStatus']?.(`Downloading data... (${totalLoaded}/${totalSize})`);
                return iterate();
              } else {
                const packageData = new Uint8Array(chunks.map((c) => c.length).reduce((a, b) => a + b, 0));
                let offset = 0;
                for (const chunk of chunks) {
                  packageData.set(chunk, offset);
                  offset += chunk.length;
                }
                callback(packageData.buffer);
              }
            };

            Module['setStatus']?.('Downloading data...');
            return iterate();
          });
      };

      function handleError(error) {
        console.error('package error:', error);
      };

    function runWithFS(Module) {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module["FS_createPath"]("/", "app", true, true);
Module["FS_createPath"]("/app", "src", true, true);
Module["FS_createPath"]("/app/src", "Components", true, true);
Module["FS_createPath"]("/app/src", "debug", true, true);
Module["FS_createPath"]("/app", "vendor", true, true);
Module["FS_createPath"]("/app/vendor", "composer", true, true);
Module["FS_createPath"]("/app/vendor", "syntaxx", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "phpx-framework", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework", ".git", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git", "hooks", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git", "info", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git", "logs", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/logs", "refs", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/logs/refs", "heads", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/logs/refs", "remotes", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/logs/refs/remotes", "origin", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git", "objects", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "08", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "09", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "0c", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "0d", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "19", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "1e", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "24", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "27", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "3b", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "49", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "5c", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "71", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "73", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "8d", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "8f", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "a1", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "bb", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "be", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "d7", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "df", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "ec", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "ed", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "f1", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "fa", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/objects", "pack", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git", "refs", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/refs", "heads", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/refs", "remotes", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/.git/refs/remotes", "origin", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework", "demo", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Commit", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Core", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "DOM", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Fiber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Reconciler", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "VirtualDOM", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework", "vendor", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor", "bin", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor", "composer", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor", "myclabs", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs", "deep-copy", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src", "DeepCopy", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy", "Filter", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Filter", "Doctrine", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy", "Matcher", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Matcher", "Doctrine", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy", "Reflection", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy", "TypeFilter", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter", "Date", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter", "Spl", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy", "TypeMatcher", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor", "nikic", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic", "php-parser", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser", "bin", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser", "lib", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib", "PhpParser", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser", "Builder", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser", "Comment", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser", "ErrorHandler", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser", "Internal", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser", "Lexer", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer", "TokenEmulator", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser", "Node", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node", "Expr", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr", "AssignOp", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr", "BinaryOp", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr", "Cast", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node", "Name", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node", "Scalar", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar", "MagicConst", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node", "Stmt", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt", "TraitUseAdaptation", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser", "NodeVisitor", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser", "Parser", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser", "PrettyPrinter", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor", "phar-io", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io", "manifest", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest", ".github", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/.github", "workflows", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src", "exceptions", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src", "values", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src", "xml", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest", "tools", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/tools", "php-cs-fixer.d", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io", "version", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src", "constraints", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src", "exceptions", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor", "phpunit", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit", "php-code-coverage", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src", "Data", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src", "Driver", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src", "Node", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src", "Report", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report", "Html", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html", "Renderer", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer", "Template", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template", "css", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template", "icons", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template", "js", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report", "Xml", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src", "StaticAnalysis", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src", "TestSize", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src", "TestStatus", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src", "Util", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit", "php-file-iterator", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-file-iterator", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit", "php-invoker", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker", ".psalm", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker/src", "exceptions", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit", "php-text-template", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-text-template", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-text-template/src", "exceptions", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit", "php-timer", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer/src", "exceptions", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit", "phpunit", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit", "schema", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src", "Event", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event", "Dispatcher", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event", "Emitter", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event", "Events", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events", "Application", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events", "Test", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test", "Assertion", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test", "HookMethod", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test", "Issue", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test", "Lifecycle", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test", "Outcome", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test", "TestDouble", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events", "TestRunner", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events", "TestSuite", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event", "Value", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value", "Runtime", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value", "Telemetry", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value", "Test", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test", "TestData", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value", "TestSuite", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src", "Framework", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework", "Assert", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework", "Attributes", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework", "Constraint", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Boolean", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Cardinality", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Equality", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Filesystem", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Math", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Object", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Operator", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "String", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Traversable", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint", "Type", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception", "Incomplete", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception", "ObjectEquals", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception", "Skipped", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework", "MockObject", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject", "Generator", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator", "templates", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject", "Runtime", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime", "Api", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime", "Builder", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime", "Interface", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime", "Rule", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime", "Stub", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework", "TestSize", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework", "TestStatus", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src", "Logging", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging", "JUnit", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit", "Subscriber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging", "TeamCity", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity", "Subscriber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging", "TestDox", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox", "TestResult", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult", "Subscriber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src", "Metadata", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata", "Api", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata", "Parser", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Parser", "Annotation", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata", "Version", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src", "Runner", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner", "Baseline", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline", "Subscriber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner", "Extension", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner", "Filter", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner", "GarbageCollection", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/GarbageCollection", "Subscriber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner", "ResultCache", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache", "Subscriber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner", "TestResult", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult", "Subscriber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src", "TextUI", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI", "Command", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command", "Commands", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI", "Configuration", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration", "Cli", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration", "Value", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration", "Xml", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml", "CodeCoverage", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/CodeCoverage", "Report", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml", "Logging", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Logging", "TestDox", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml", "Migration", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration", "Migrations", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml", "SchemaDetector", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml", "Validator", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI", "Output", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output", "Default", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default", "ProgressPrinter", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter", "Subscriber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output", "Printer", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output", "TestDox", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src", "Util", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util", "Http", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util", "PHP", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/PHP", "Template", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util", "Xml", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor", "sebastian", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "cli-parser", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser/src", "exceptions", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "code-unit-reverse-lookup", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit-reverse-lookup", ".psalm", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit-reverse-lookup", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "code-unit", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src", "exceptions", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "comparator", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src", "exceptions", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "complexity", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src", "Complexity", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src", "Visitor", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "diff", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src", "Output", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "environment", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/environment", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "exporter", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/exporter", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "global-state", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state/src", "exceptions", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "lines-of-code", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/src", "Exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "object-enumerator", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/object-enumerator", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "object-reflector", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/object-reflector", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "recursion-context", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/recursion-context", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "type", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src", "exception", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src", "type", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian", "version", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/sebastian/version", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor", "theseer", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/theseer", "tokenizer", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "wasm-php-runtime-vrzno", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/wasm-php-runtime-vrzno", "src", true, true);
      

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

        var PACKAGE_UUID = metadata['package_uuid'];
        var IDB_RO = "readonly";
        var IDB_RW = "readwrite";
        var DB_NAME = "EM_PRELOAD_CACHE";
        var DB_VERSION = 1;
        var METADATA_STORE_NAME = 'METADATA';
        var PACKAGE_STORE_NAME = 'PACKAGES';
        function openDatabase(callback, errback) {
          var indexedDB;
          if (typeof window === 'object') {
            indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
          } else if (typeof location !== 'undefined') {
            // worker
            indexedDB = self.indexedDB;
          } else {
            throw 'using IndexedDB to cache data can only be done on a web page or in a web worker';
          }
          try {
            var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
          } catch (e) {
            return errback(e);
          }
          openRequest.onupgradeneeded = (event) => {
            var db = /** @type {IDBDatabase} */ (event.target.result);

            if (db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
              db.deleteObjectStore(PACKAGE_STORE_NAME);
            }
            var packages = db.createObjectStore(PACKAGE_STORE_NAME);

            if (db.objectStoreNames.contains(METADATA_STORE_NAME)) {
              db.deleteObjectStore(METADATA_STORE_NAME);
            }
            var metadata = db.createObjectStore(METADATA_STORE_NAME);
          };
          openRequest.onsuccess = (event) => {
            var db = /** @type {IDBDatabase} */ (event.target.result);
            callback(db);
          };
          openRequest.onerror = (error) => errback(error);
        };

        // This is needed as chromium has a limit on per-entry files in IndexedDB
        // https://cs.chromium.org/chromium/src/content/renderer/indexed_db/webidbdatabase_impl.cc?type=cs&sq=package:chromium&g=0&l=177
        // https://cs.chromium.org/chromium/src/out/Debug/gen/third_party/blink/public/mojom/indexeddb/indexeddb.mojom.h?type=cs&sq=package:chromium&g=0&l=60
        // We set the chunk size to 64MB to stay well-below the limit
        var CHUNK_SIZE = 64 * 1024 * 1024;

        function cacheRemotePackage(
          db,
          packageName,
          packageData,
          packageMeta,
          callback,
          errback
        ) {
          var transactionPackages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
          var packages = transactionPackages.objectStore(PACKAGE_STORE_NAME);
          var chunkSliceStart = 0;
          var nextChunkSliceStart = 0;
          var chunkCount = Math.ceil(packageData.byteLength / CHUNK_SIZE);
          var finishedChunks = 0;
          for (var chunkId = 0; chunkId < chunkCount; chunkId++) {
            nextChunkSliceStart += CHUNK_SIZE;
            var putPackageRequest = packages.put(
              packageData.slice(chunkSliceStart, nextChunkSliceStart),
              `package/${packageName}/${chunkId}`
            );
            chunkSliceStart = nextChunkSliceStart;
            putPackageRequest.onsuccess = (event) => {
              finishedChunks++;
              if (finishedChunks == chunkCount) {
                var transaction_metadata = db.transaction(
                  [METADATA_STORE_NAME],
                  IDB_RW
                );
                var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
                var putMetadataRequest = metadata.put(
                  {
                    'uuid': packageMeta.uuid,
                    'chunkCount': chunkCount
                  },
                  `metadata/${packageName}`
                );
                putMetadataRequest.onsuccess = (event) =>  callback(packageData);
                putMetadataRequest.onerror = (error) => errback(error);
              }
            };
            putPackageRequest.onerror = (error) => errback(error);
          }
        }

        /* Check if there's a cached package, and if so whether it's the latest available */
        function checkCachedPackage(db, packageName, callback, errback) {
          var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
          var metadata = transaction.objectStore(METADATA_STORE_NAME);
          var getRequest = metadata.get(`metadata/${packageName}`);
          getRequest.onsuccess = (event) => {
            var result = event.target.result;
            if (!result) {
              return callback(false, null);
            } else {
              return callback(PACKAGE_UUID === result['uuid'], result);
            }
          };
          getRequest.onerror = (error) => errback(error);
        }

        function fetchCachedPackage(db, packageName, metadata, callback, errback) {
          var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
          var packages = transaction.objectStore(PACKAGE_STORE_NAME);

          var chunksDone = 0;
          var totalSize = 0;
          var chunkCount = metadata['chunkCount'];
          var chunks = new Array(chunkCount);

          for (var chunkId = 0; chunkId < chunkCount; chunkId++) {
            var getRequest = packages.get(`package/${packageName}/${chunkId}`);
            getRequest.onsuccess = (event) => {
              if (!event.target.result) {
                errback(new Error(`CachedPackageNotFound for: ${packageName}`));
                return;
              }
              // If there's only 1 chunk, there's nothing to concatenate it with so we can just return it now
              if (chunkCount == 1) {
                callback(event.target.result);
              } else {
                chunksDone++;
                totalSize += event.target.result.byteLength;
                chunks.push(event.target.result);
                if (chunksDone == chunkCount) {
                  if (chunksDone == 1) {
                    callback(event.target.result);
                  } else {
                    var tempTyped = new Uint8Array(totalSize);
                    var byteOffset = 0;
                    for (var chunkId in chunks) {
                      var buffer = chunks[chunkId];
                      tempTyped.set(new Uint8Array(buffer), byteOffset);
                      byteOffset += buffer.byteLength;
                      buffer = undefined;
                    }
                    chunks = undefined;
                    callback(tempTyped.buffer);
                    tempTyped = undefined;
                  }
                }
              }
            };
            getRequest.onerror = (error) => errback(error);
          }
        }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_build/php-web.data');

      };
      Module['addRunDependency']('datafile_build/php-web.data');

      Module['preloadResults'] ??= {};

        function preloadFallback(error) {
          console.error(error);
          console.error('falling back to default preload behavior');
          fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
        };

        openDatabase(
          (db) => checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
              (useCached, metadata) => {
                Module['preloadResults'][PACKAGE_NAME] = {fromCache: useCached};
                if (useCached) {
                  fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, metadata, processPackageData, preloadFallback);
                } else {
                  fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                    (packageData) => {
                      cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                        (error) => {
                          console.error(error);
                          processPackageData(packageData);
                        });
                    }
                  , preloadFallback);
                }
              }, preloadFallback)
        , preloadFallback);

        Module['setStatus']?.('Downloading...');

    }
    if (Module['calledRun']) {
      runWithFS(Module);
    } else {
      (Module['preRun'] ??= []).push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files":[{"filename":"/app/bootstrap.php","start":0,"end":523},{"filename":"/app/src/App.php","start":523,"end":1333},{"filename":"/app/src/App.phpx","start":1333,"end":2229},{"filename":"/app/src/Components/BenchmarkApp.php","start":2229,"end":14466},{"filename":"/app/src/Components/BenchmarkApp.phpx","start":14466,"end":28969},{"filename":"/app/src/Components/Board.php","start":28969,"end":33457},{"filename":"/app/src/Components/Board.phpx","start":33457,"end":38895},{"filename":"/app/src/Components/Card.php","start":38895,"end":45296},{"filename":"/app/src/Components/Card.phpx","start":45296,"end":54063},{"filename":"/app/src/Components/Column.php","start":54063,"end":59169},{"filename":"/app/src/Components/Column.phpx","start":59169,"end":65739},{"filename":"/app/src/debug/Components-Board.php.ai.map","start":65739,"end":67941},{"filename":"/app/src/debug/Components-Card.php.ai.map","start":67941,"end":69228},{"filename":"/app/src/debug/Components-Column.php.ai.map","start":69228,"end":70806},{"filename":"/app/src/debug/index.json","start":70806,"end":72149},{"filename":"/app/src/debug/main.php.ai.map","start":72149,"end":73449},{"filename":"/app/src/main.php","start":73449,"end":74049},{"filename":"/app/src/main.phpx","start":74049,"end":74648},{"filename":"/app/src/php-vrzno-web.mjs","start":74648,"end":292927},{"filename":"/app/src/php-vrzno-web.wasm","start":292927,"end":7849819},{"filename":"/app/src/php-web.data","start":7849819,"end":7966908},{"filename":"/app/src/php-web.data.js","start":7966908,"end":7984737},{"filename":"/app/vendor/autoload.php","start":7984737,"end":7985508},{"filename":"/app/vendor/composer/ClassLoader.php","start":7985508,"end":8001886},{"filename":"/app/vendor/composer/InstalledVersions.php","start":8001886,"end":8018108},{"filename":"/app/vendor/composer/autoload_classmap.php","start":8018108,"end":8018362},{"filename":"/app/vendor/composer/autoload_files.php","start":8018362,"end":8018627},{"filename":"/app/vendor/composer/autoload_namespaces.php","start":8018627,"end":8018798},{"filename":"/app/vendor/composer/autoload_psr4.php","start":8018798,"end":8019178},{"filename":"/app/vendor/composer/autoload_real.php","start":8019178,"end":8020800},{"filename":"/app/vendor/composer/autoload_static.php","start":8020800,"end":8022424},{"filename":"/app/vendor/composer/installed.json","start":8022424,"end":8025379},{"filename":"/app/vendor/composer/installed.php","start":8025379,"end":8027007},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/COMMIT_EDITMSG","start":8027007,"end":8027017},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/HEAD","start":8027017,"end":8027045},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/config","start":8027045,"end":8027317},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/description","start":8027317,"end":8027390},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/applypatch-msg.sample","start":8027390,"end":8027868},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/commit-msg.sample","start":8027868,"end":8028764},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/fsmonitor-watchman.sample","start":8028764,"end":8033419},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/post-update.sample","start":8033419,"end":8033608},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/pre-applypatch.sample","start":8033608,"end":8034032},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/pre-commit.sample","start":8034032,"end":8035675},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/pre-merge-commit.sample","start":8035675,"end":8036091},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/pre-push.sample","start":8036091,"end":8037465},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/pre-rebase.sample","start":8037465,"end":8042363},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/pre-receive.sample","start":8042363,"end":8042907},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/prepare-commit-msg.sample","start":8042907,"end":8044399},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/push-to-checkout.sample","start":8044399,"end":8047182},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/hooks/update.sample","start":8047182,"end":8050832},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/index","start":8050832,"end":8053248},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/info/exclude","start":8053248,"end":8053488},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/logs/HEAD","start":8053488,"end":8054368},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/logs/refs/heads/virtual-dom","start":8054368,"end":8055055},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/logs/refs/remotes/origin/HEAD","start":8055055,"end":8055243},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/logs/refs/remotes/origin/virtual-dom","start":8055243,"end":8055393},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/08/c27217bbea4dba8071664266085eac51d47127","start":8055393,"end":8055454},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/09/b91f51ffc574e2ba3189f6139874c79c8d7504","start":8055454,"end":8056471},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/0c/69cba72e6ab1999b14bc7201e359079daa45cf","start":8056471,"end":8056558},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/0d/e1aa147b87ebc1fa1e23ebba2e55d26bf15c40","start":8056558,"end":8057986},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/19/3ee379f07d431b484444831a837e1cc92a2f20","start":8057986,"end":8058449},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/1e/3d7890ebf267c274050dfcfc3b99c51c1edd26","start":8058449,"end":8061493},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/24/d1a97ceceefe2e049579dd073ed2937313e9f0","start":8061493,"end":8063323},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/27/c558b4f7695c082383f2f0405f1e73db3cd84d","start":8063323,"end":8063490},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/3b/090026fb6417cae42bbe2cc58bb1f6cf6ad067","start":8063490,"end":8064894},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/49/8f7a93044d23e7f9c084540d714c1ed4614be9","start":8064894,"end":8066585},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/5c/dfb2d7f52020ecec6a0edb339601f502f8a13f","start":8066585,"end":8066952},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/71/cdfb7420eb6b2ca52d2ec58be992c9d2df0fdc","start":8066952,"end":8067068},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/73/fa9c2f06ec53b94854e115ddb826415ed17266","start":8067068,"end":8067532},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/8d/817ceb946be5966f5fae9946073fd455f86e31","start":8067532,"end":8070738},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/8f/3ff29eed2236a4b078283ad302b4a925f83288","start":8070738,"end":8070803},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/a1/e48f464b01e64389fa738973fe58c11d33cc1d","start":8070803,"end":8070906},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/bb/ef84aac435aef0e4e5bcc2359af3c2fedc6898","start":8070906,"end":8070967},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/be/d94958c237b56c817978532cfa93e1d9a8161d","start":8070967,"end":8074730},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/d7/259c806567c866ebdf56436a882c8f208ca71e","start":8074730,"end":8074893},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/df/74089f68f048f2ddd3519fa20715f42d17bb25","start":8074893,"end":8076847},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/ec/0da47b4d537a2179e74c97a32968c4e0b374f7","start":8076847,"end":8077106},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/ec/d98ee2719af4d3132499b40ef333b180b955cd","start":8077106,"end":8077171},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/ed/9e2999502924087017f28533c7d1c7c090ef7a","start":8077171,"end":8077429},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/f1/87e5a8eafef38f8f19482bf5ac1f554aca556f","start":8077429,"end":8079191},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/fa/c1a9bdf93d942defd1a100259737bf88feff5a","start":8079191,"end":8080066},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/pack/pack-dfd7027c660225fefaaaf74a0915bb762792fa81.idx","start":8080066,"end":8081614},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/objects/pack/pack-dfd7027c660225fefaaaf74a0915bb762792fa81.pack","start":8081614,"end":8089659},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/packed-refs","start":8089659,"end":8089829},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/refs/heads/virtual-dom","start":8089829,"end":8089870},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/refs/remotes/origin/HEAD","start":8089870,"end":8089900},{"filename":"/app/vendor/syntaxx/phpx-framework/.git/refs/remotes/origin/virtual-dom","start":8089900,"end":8089941},{"filename":"/app/vendor/syntaxx/phpx-framework/CLAUDE.md","start":8089941,"end":8089941},{"filename":"/app/vendor/syntaxx/phpx-framework/demo/app.php","start":8089941,"end":8090810},{"filename":"/app/vendor/syntaxx/phpx-framework/phpunit.xml","start":8090810,"end":8091455},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Commit/FocusManager.php","start":8091455,"end":8097550},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Component.php","start":8097550,"end":8098969},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Core/VrznoContext.php","start":8098969,"end":8103902},{"filename":"/app/vendor/syntaxx/phpx-framework/src/DOM/DOMChildrenOperations.php","start":8103902,"end":8106345},{"filename":"/app/vendor/syntaxx/phpx-framework/src/DOM/DOMPropertyOperations.php","start":8106345,"end":8112628},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Document.php","start":8112628,"end":8113815},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Element.php","start":8113815,"end":8116201},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Fiber/FiberNode.php","start":8116201,"end":8122152},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Fiber/FiberRoot.php","start":8122152,"end":8124931},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Framework.php","start":8124931,"end":8127836},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/SimpleReconciler.php","start":8127836,"end":8138280},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Runtime.php","start":8138280,"end":8152065},{"filename":"/app/vendor/syntaxx/phpx-framework/src/TextNode.php","start":8152065,"end":8152318},{"filename":"/app/vendor/syntaxx/phpx-framework/src/VirtualDOM/VNode.php","start":8152318,"end":8156132},{"filename":"/app/vendor/syntaxx/phpx-framework/src/VirtualDOM/VNodeBuilder.php","start":8156132,"end":8161067},{"filename":"/app/vendor/syntaxx/phpx-framework/src/VirtualDOM/VText.php","start":8161067,"end":8161814},{"filename":"/app/vendor/syntaxx/phpx-framework/src/bootstrap.php","start":8161814,"end":8161814},{"filename":"/app/vendor/syntaxx/phpx-framework/src/useState.php","start":8161814,"end":8161946},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/autoload.php","start":8161946,"end":8162717},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/bin/php-parse","start":8162717,"end":8166065},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/bin/php-parse.bat","start":8166065,"end":8166201},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/bin/phpunit","start":8166201,"end":8169890},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/bin/phpunit.bat","start":8169890,"end":8170024},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/ClassLoader.php","start":8170024,"end":8186402},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/InstalledVersions.php","start":8186402,"end":8202624},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/autoload_classmap.php","start":8202624,"end":8367026},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/autoload_files.php","start":8367026,"end":8367448},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/autoload_namespaces.php","start":8367448,"end":8367587},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/autoload_psr4.php","start":8367587,"end":8368004},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/autoload_real.php","start":8368004,"end":8369626},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/autoload_static.php","start":8369626,"end":8546401},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/installed.json","start":8546401,"end":8611872},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/composer/installed.php","start":8611872,"end":8622385},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/DeepCopy.php","start":8622385,"end":8631164},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Exception/CloneException.php","start":8631164,"end":8631291},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Exception/PropertyException.php","start":8631291,"end":8631411},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Filter/ChainableFilter.php","start":8631411,"end":8631860},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Filter/Doctrine/DoctrineCollectionFilter.php","start":8631860,"end":8632700},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Filter/Doctrine/DoctrineEmptyCollectionFilter.php","start":8632700,"end":8633457},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Filter/Doctrine/DoctrineProxyFilter.php","start":8633457,"end":8633860},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Filter/Filter.php","start":8633860,"end":8634208},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Filter/KeepFilter.php","start":8634208,"end":8634471},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Filter/ReplaceFilter.php","start":8634471,"end":8635435},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Filter/SetNullFilter.php","start":8635435,"end":8635969},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Matcher/Doctrine/DoctrineProxyMatcher.php","start":8635969,"end":8636329},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Matcher/Matcher.php","start":8636329,"end":8636542},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Matcher/PropertyMatcher.php","start":8636542,"end":8637233},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Matcher/PropertyNameMatcher.php","start":8637233,"end":8637737},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Matcher/PropertyTypeMatcher.php","start":8637737,"end":8639105},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/Reflection/ReflectionHelper.php","start":8639105,"end":8641279},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter/Date/DateIntervalFilter.php","start":8641279,"end":8641918},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter/Date/DatePeriodFilter.php","start":8641918,"end":8643016},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter/ReplaceFilter.php","start":8643016,"end":8643540},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter/ShallowCopyFilter.php","start":8643540,"end":8643763},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter/Spl/ArrayObjectFilter.php","start":8643763,"end":8644483},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter/Spl/SplDoublyLinkedList.php","start":8644483,"end":8644659},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter/Spl/SplDoublyLinkedListFilter.php","start":8644659,"end":8645699},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeFilter/TypeFilter.php","start":8645699,"end":8645893},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/TypeMatcher/TypeMatcher.php","start":8645893,"end":8646361},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/myclabs/deep-copy/src/DeepCopy/deep_copy.php","start":8646361,"end":8646757},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/bin/php-parse","start":8646757,"end":8653306},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder.php","start":8653306,"end":8653508},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/ClassConst.php","start":8653508,"end":8657383},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Class_.php","start":8657383,"end":8661554},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Declaration.php","start":8661554,"end":8662815},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/EnumCase.php","start":8662815,"end":8664819},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Enum_.php","start":8664819,"end":8668077},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/FunctionLike.php","start":8668077,"end":8669883},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Function_.php","start":8669883,"end":8671574},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Interface_.php","start":8671574,"end":8674202},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Method.php","start":8674202,"end":8677958},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Namespace_.php","start":8677958,"end":8679031},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Param.php","start":8679031,"end":8683497},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Property.php","start":8683497,"end":8689244},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/TraitUse.php","start":8689244,"end":8690898},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/TraitUseAdaptation.php","start":8690898,"end":8695164},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Trait_.php","start":8695164,"end":8697520},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Builder/Use_.php","start":8697520,"end":8698797},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/BuilderFactory.php","start":8698797,"end":8709346},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/BuilderHelpers.php","start":8709346,"end":8719308},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Comment.php","start":8719308,"end":8726215},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Comment/Doc.php","start":8726215,"end":8726318},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/ConstExprEvaluationException.php","start":8726318,"end":8726430},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/ConstExprEvaluator.php","start":8726430,"end":8735981},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Error.php","start":8735981,"end":8740933},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/ErrorHandler.php","start":8740933,"end":8741233},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/ErrorHandler/Collecting.php","start":8741233,"end":8742102},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/ErrorHandler/Throwing.php","start":8742102,"end":8742470},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Internal/DiffElem.php","start":8742470,"end":8743233},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Internal/Differ.php","start":8743233,"end":8748326},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Internal/PrintableNewAnonClassNode.php","start":8748326,"end":8750995},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Internal/TokenPolyfill.php","start":8750995,"end":8760627},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Internal/TokenStream.php","start":8760627,"end":8769866},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/JsonDecoder.php","start":8769866,"end":8773386},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer.php","start":8773386,"end":8777752},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/Emulative.php","start":8777752,"end":8786278},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/AsymmetricVisibilityTokenEmulator.php","start":8786278,"end":8789622},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/AttributeEmulator.php","start":8789622,"end":8791095},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/EnumTokenEmulator.php","start":8791095,"end":8791796},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/ExplicitOctalEmulator.php","start":8791796,"end":8793365},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/KeywordEmulator.php","start":8793365,"end":8795200},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/MatchTokenEmulator.php","start":8795200,"end":8795622},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/NullsafeTokenEmulator.php","start":8795622,"end":8797904},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/PipeOperatorEmulator.php","start":8797904,"end":8799348},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/PropertyTokenEmulator.php","start":8799348,"end":8799785},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/ReadonlyFunctionTokenEmulator.php","start":8799785,"end":8800761},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/ReadonlyTokenEmulator.php","start":8800761,"end":8801666},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/ReverseEmulator.php","start":8801666,"end":8802679},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/TokenEmulator.php","start":8802679,"end":8803498},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Lexer/TokenEmulator/VoidCastEmulator.php","start":8803498,"end":8806606},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Modifiers.php","start":8806606,"end":8809385},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NameContext.php","start":8809385,"end":8819438},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node.php","start":8819438,"end":8823560},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Arg.php","start":8823560,"end":8824859},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/ArrayItem.php","start":8824859,"end":8826071},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Attribute.php","start":8826071,"end":8826891},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/AttributeGroup.php","start":8826891,"end":8827538},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/ClosureUse.php","start":8827538,"end":8828511},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/ComplexType.php","start":8828511,"end":8828834},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Const_.php","start":8828834,"end":8829805},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/DeclareItem.php","start":8829805,"end":8830797},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr.php","start":8830797,"end":8830930},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/ArrayDimFetch.php","start":8830930,"end":8831752},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/ArrayItem.php","start":8831752,"end":8832057},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Array_.php","start":8832057,"end":8832888},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/ArrowFunction.php","start":8832888,"end":8835440},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Assign.php","start":8835440,"end":8836214},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp.php","start":8836214,"end":8836940},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/BitwiseAnd.php","start":8836940,"end":8837175},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/BitwiseOr.php","start":8837175,"end":8837408},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/BitwiseXor.php","start":8837408,"end":8837643},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/Coalesce.php","start":8837643,"end":8837874},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/Concat.php","start":8837874,"end":8838101},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/Div.php","start":8838101,"end":8838322},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/Minus.php","start":8838322,"end":8838547},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/Mod.php","start":8838547,"end":8838768},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/Mul.php","start":8838768,"end":8838989},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/Plus.php","start":8838989,"end":8839212},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/Pow.php","start":8839212,"end":8839433},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/ShiftLeft.php","start":8839433,"end":8839666},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignOp/ShiftRight.php","start":8839666,"end":8839901},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/AssignRef.php","start":8839901,"end":8840724},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp.php","start":8840724,"end":8841819},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/BitwiseAnd.php","start":8841819,"end":8842130},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/BitwiseOr.php","start":8842130,"end":8842439},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/BitwiseXor.php","start":8842439,"end":8842750},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/BooleanAnd.php","start":8842750,"end":8843062},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/BooleanOr.php","start":8843062,"end":8843372},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Coalesce.php","start":8843372,"end":8843680},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Concat.php","start":8843680,"end":8843983},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Div.php","start":8843983,"end":8844280},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Equal.php","start":8844280,"end":8844582},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Greater.php","start":8844582,"end":8844887},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/GreaterOrEqual.php","start":8844887,"end":8845207},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Identical.php","start":8845207,"end":8845518},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/LogicalAnd.php","start":8845518,"end":8845831},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/LogicalOr.php","start":8845831,"end":8846141},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/LogicalXor.php","start":8846141,"end":8846454},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Minus.php","start":8846454,"end":8846755},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Mod.php","start":8846755,"end":8847052},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Mul.php","start":8847052,"end":8847349},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/NotEqual.php","start":8847349,"end":8847657},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/NotIdentical.php","start":8847657,"end":8847974},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Pipe.php","start":8847974,"end":8848274},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Plus.php","start":8848274,"end":8848573},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Pow.php","start":8848573,"end":8848871},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/ShiftLeft.php","start":8848871,"end":8849181},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/ShiftRight.php","start":8849181,"end":8849493},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Smaller.php","start":8849493,"end":8849798},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/SmallerOrEqual.php","start":8849798,"end":8850118},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BinaryOp/Spaceship.php","start":8850118,"end":8850429},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BitwiseNot.php","start":8850429,"end":8851081},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/BooleanNot.php","start":8851081,"end":8851733},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/CallLike.php","start":8851733,"end":8853538},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Cast.php","start":8853538,"end":8854105},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Cast/Array_.php","start":8854105,"end":8854315},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Cast/Bool_.php","start":8854315,"end":8854663},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Cast/Double.php","start":8854663,"end":8855064},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Cast/Int_.php","start":8855064,"end":8855408},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Cast/Object_.php","start":8855408,"end":8855620},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Cast/String_.php","start":8855620,"end":8855974},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Cast/Unset_.php","start":8855974,"end":8856184},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Cast/Void_.php","start":8856184,"end":8856392},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/ClassConstFetch.php","start":8856392,"end":8857378},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Clone_.php","start":8857378,"end":8858015},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Closure.php","start":8858015,"end":8860851},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/ClosureUse.php","start":8860851,"end":8861160},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/ConstFetch.php","start":8861160,"end":8861843},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Empty_.php","start":8861843,"end":8862483},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Error.php","start":8862483,"end":8863240},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/ErrorSuppress.php","start":8863240,"end":8863902},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Eval_.php","start":8863902,"end":8864539},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Exit_.php","start":8864539,"end":8865297},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/FuncCall.php","start":8865297,"end":8866291},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Include_.php","start":8866291,"end":8867242},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Instanceof_.php","start":8867242,"end":8868102},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Isset_.php","start":8868102,"end":8868744},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/List_.php","start":8868744,"end":8869623},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Match_.php","start":8869623,"end":8870405},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/MethodCall.php","start":8870405,"end":8871682},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/New_.php","start":8871682,"end":8872783},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/NullsafeMethodCall.php","start":8872783,"end":8874083},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/NullsafePropertyFetch.php","start":8874083,"end":8875054},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/PostDec.php","start":8875054,"end":8875693},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/PostInc.php","start":8875693,"end":8876332},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/PreDec.php","start":8876332,"end":8876968},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/PreInc.php","start":8876968,"end":8877604},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Print_.php","start":8877604,"end":8878244},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/PropertyFetch.php","start":8878244,"end":8879189},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/ShellExec.php","start":8879189,"end":8879984},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/StaticCall.php","start":8879984,"end":8881272},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/StaticPropertyFetch.php","start":8881272,"end":8882286},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Ternary.php","start":8882286,"end":8883253},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Throw_.php","start":8883253,"end":8883921},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/UnaryMinus.php","start":8883921,"end":8884573},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/UnaryPlus.php","start":8884573,"end":8885222},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Variable.php","start":8885222,"end":8885859},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/YieldFrom.php","start":8885859,"end":8886525},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Expr/Yield_.php","start":8886525,"end":8887371},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/FunctionLike.php","start":8887371,"end":8888102},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Identifier.php","start":8888102,"end":8890219},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/InterpolatedStringPart.php","start":8890219,"end":8891069},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/IntersectionType.php","start":8891069,"end":8891734},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/MatchArm.php","start":8891734,"end":8892386},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Name.php","start":8892386,"end":8901057},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Name/FullyQualified.php","start":8901057,"end":8902227},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Name/Relative.php","start":8902227,"end":8903394},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/NullableType.php","start":8903394,"end":8904073},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Param.php","start":8904073,"end":8907860},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/PropertyHook.php","start":8907860,"end":8911291},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/PropertyItem.php","start":8911291,"end":8912363},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar.php","start":8912363,"end":8912461},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/DNumber.php","start":8912461,"end":8912745},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/Encapsed.php","start":8912745,"end":8913066},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/EncapsedStringPart.php","start":8913066,"end":8913449},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/Float_.php","start":8913449,"end":8915550},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/Int_.php","start":8915550,"end":8918062},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/InterpolatedString.php","start":8918062,"end":8918995},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/LNumber.php","start":8918995,"end":8919273},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst.php","start":8919273,"end":8919875},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst/Class_.php","start":8919875,"end":8920190},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst/Dir.php","start":8920190,"end":8920498},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst/File.php","start":8920498,"end":8920809},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst/Function_.php","start":8920809,"end":8921133},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst/Line.php","start":8921133,"end":8921444},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst/Method.php","start":8921444,"end":8921761},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst/Namespace_.php","start":8921761,"end":8922088},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst/Property.php","start":8922088,"end":8922411},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/MagicConst/Trait_.php","start":8922411,"end":8922726},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Scalar/String_.php","start":8922726,"end":8927803},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/StaticVar.php","start":8927803,"end":8928802},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt.php","start":8928802,"end":8928935},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Block.php","start":8928935,"end":8929581},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Break_.php","start":8929581,"end":8930279},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Case_.php","start":8930279,"end":8931148},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Catch_.php","start":8931148,"end":8932262},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/ClassConst.php","start":8932262,"end":8934394},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/ClassLike.php","start":8934394,"end":8937438},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/ClassMethod.php","start":8937438,"end":8942154},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Class_.php","start":8942154,"end":8945369},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Const_.php","start":8945369,"end":8946336},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Continue_.php","start":8946336,"end":8947049},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/DeclareDeclare.php","start":8947049,"end":8947382},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Declare_.php","start":8947382,"end":8948294},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Do_.php","start":8948294,"end":8949113},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Echo_.php","start":8949113,"end":8949772},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/ElseIf_.php","start":8949772,"end":8950598},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Else_.php","start":8950598,"end":8951260},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/EnumCase.php","start":8951260,"end":8952426},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Enum_.php","start":8952426,"end":8954004},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Expression.php","start":8954004,"end":8954730},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Finally_.php","start":8954730,"end":8955400},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/For_.php","start":8955400,"end":8956835},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Foreach_.php","start":8956835,"end":8958545},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Function_.php","start":8958545,"end":8961217},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Global_.php","start":8961217,"end":8961895},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Goto_.php","start":8961895,"end":8962652},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/GroupUse.php","start":8962652,"end":8963713},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/HaltCompiler.php","start":8963713,"end":8964481},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/If_.php","start":8964481,"end":8965873},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/InlineHTML.php","start":8965873,"end":8966532},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Interface_.php","start":8966532,"end":8967857},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Label.php","start":8967857,"end":8968576},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Namespace_.php","start":8968576,"end":8969533},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Nop.php","start":8969533,"end":8969828},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Property.php","start":8969828,"end":8973254},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/PropertyProperty.php","start":8973254,"end":8973593},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Return_.php","start":8973593,"end":8974272},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/StaticVar.php","start":8974272,"end":8974577},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Static_.php","start":8974577,"end":8975298},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Switch_.php","start":8975298,"end":8976106},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/TraitUse.php","start":8976106,"end":8976995},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/TraitUseAdaptation.php","start":8976995,"end":8977288},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/TraitUseAdaptation/Alias.php","start":8977288,"end":8978584},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/TraitUseAdaptation/Precedence.php","start":8978584,"end":8979637},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Trait_.php","start":8979637,"end":8980708},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/TryCatch.php","start":8980708,"end":8981753},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Unset_.php","start":8981753,"end":8982423},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/UseUse.php","start":8982423,"end":8982732},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/Use_.php","start":8982732,"end":8984180},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/Stmt/While_.php","start":8984180,"end":8985002},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/UnionType.php","start":8985002,"end":8985679},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/UseItem.php","start":8985679,"end":8987356},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/VarLikeIdentifier.php","start":8987356,"end":8987858},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Node/VariadicPlaceholder.php","start":8987858,"end":8988511},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeAbstract.php","start":8988511,"end":8993881},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeDumper.php","start":8993881,"end":9004366},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeFinder.php","start":9004366,"end":9006973},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeTraverser.php","start":9006973,"end":9017302},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeTraverserInterface.php","start":9017302,"end":9017900},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeVisitor.php","start":9017900,"end":9022079},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeVisitor/CloningVisitor.php","start":9022079,"end":9022581},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeVisitor/CommentAnnotatingVisitor.php","start":9022581,"end":9025358},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeVisitor/FindingVisitor.php","start":9025358,"end":9026501},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeVisitor/FirstFindingVisitor.php","start":9026501,"end":9027752},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeVisitor/NameResolver.php","start":9027752,"end":9038122},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeVisitor/NodeConnectingVisitor.php","start":9038122,"end":9040451},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeVisitor/ParentConnectingVisitor.php","start":9040451,"end":9041792},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/NodeVisitorAbstract.php","start":9041792,"end":9042239},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Parser.php","start":9042239,"end":9043004},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Parser/Php7.php","start":9043004,"end":9236975},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Parser/Php8.php","start":9236975,"end":9430498},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/ParserAbstract.php","start":9430498,"end":9482602},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/ParserFactory.php","start":9482602,"end":9484050},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/PhpVersion.php","start":9484050,"end":9488778},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/PrettyPrinter.php","start":9488778,"end":9490477},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/PrettyPrinter/Standard.php","start":9490477,"end":9544355},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/PrettyPrinterAbstract.php","start":9544355,"end":9616805},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/Token.php","start":9616805,"end":9617292},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/nikic/php-parser/lib/PhpParser/compatibility_tokens.php","start":9617292,"end":9619807},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/.github/FUNDING.yml","start":9619807,"end":9619872},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/.github/workflows/ci.yml","start":9619872,"end":9621908},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/.php-cs-fixer.dist.php","start":9621908,"end":9634053},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/CHANGELOG.md","start":9634053,"end":9635566},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/manifest.xsd","start":9635566,"end":9639274},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/ManifestDocumentMapper.php","start":9639274,"end":9644266},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/ManifestLoader.php","start":9644266,"end":9645706},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/ManifestSerializer.php","start":9645706,"end":9651729},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/ElementCollectionException.php","start":9651729,"end":9652249},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/Exception.php","start":9652249,"end":9652705},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/InvalidApplicationNameException.php","start":9652705,"end":9653266},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/InvalidEmailException.php","start":9653266,"end":9653781},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/InvalidUrlException.php","start":9653781,"end":9654294},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/ManifestDocumentException.php","start":9654294,"end":9654797},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/ManifestDocumentLoadingException.php","start":9654797,"end":9656072},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/ManifestDocumentMapperException.php","start":9656072,"end":9656581},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/ManifestElementException.php","start":9656581,"end":9657083},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/ManifestLoaderException.php","start":9657083,"end":9657555},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/exceptions/NoEmailAddressException.php","start":9657555,"end":9658072},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/Application.php","start":9658072,"end":9658576},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/ApplicationName.php","start":9658576,"end":9659756},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/Author.php","start":9659756,"end":9661060},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/AuthorCollection.php","start":9661060,"end":9662106},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/AuthorCollectionIterator.php","start":9662106,"end":9663263},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/BundledComponent.php","start":9663263,"end":9664103},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/BundledComponentCollection.php","start":9664103,"end":9665289},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/BundledComponentCollectionIterator.php","start":9665289,"end":9666566},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/CopyrightInformation.php","start":9666566,"end":9667426},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/Email.php","start":9667426,"end":9668338},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/Extension.php","start":9668338,"end":9669768},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/Library.php","start":9669768,"end":9670264},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/License.php","start":9670264,"end":9671028},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/Manifest.php","start":9671028,"end":9673633},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/PhpExtensionRequirement.php","start":9673633,"end":9674315},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/PhpVersionRequirement.php","start":9674315,"end":9675119},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/Requirement.php","start":9675119,"end":9675543},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/RequirementCollection.php","start":9675543,"end":9676659},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/RequirementCollectionIterator.php","start":9676659,"end":9677876},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/Type.php","start":9677876,"end":9679063},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/values/Url.php","start":9679063,"end":9680002},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/AuthorElement.php","start":9680002,"end":9680732},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/AuthorElementCollection.php","start":9680732,"end":9681327},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/BundlesElement.php","start":9681327,"end":9681961},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/ComponentElement.php","start":9681961,"end":9682607},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/ComponentElementCollection.php","start":9682607,"end":9683211},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/ContainsElement.php","start":9683211,"end":9684116},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/CopyrightElement.php","start":9684116,"end":9684896},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/ElementCollection.php","start":9684896,"end":9686635},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/ExtElement.php","start":9686635,"end":9687173},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/ExtElementCollection.php","start":9687173,"end":9687759},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/ExtensionElement.php","start":9687759,"end":9688409},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/LicenseElement.php","start":9688409,"end":9689045},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/ManifestDocument.php","start":9689045,"end":9692385},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/ManifestElement.php","start":9692385,"end":9694543},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/PhpElement.php","start":9694543,"end":9695342},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/src/xml/RequiresElement.php","start":9695342,"end":9695929},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/tools/php-cs-fixer.d/PhpdocSingleLineVarFixer.php","start":9695929,"end":9697991},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/manifest/tools/php-cs-fixer.d/header.txt","start":9697991,"end":9698302},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/CHANGELOG.md","start":9698302,"end":9702035},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/BuildMetaData.php","start":9702035,"end":9702754},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/PreReleaseSuffix.php","start":9702754,"end":9704640},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/Version.php","start":9704640,"end":9710571},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/VersionConstraintParser.php","start":9710571,"end":9714410},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/VersionConstraintValue.php","start":9714410,"end":9717008},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/VersionNumber.php","start":9717008,"end":9717681},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/constraints/AbstractVersionConstraint.php","start":9717681,"end":9718368},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/constraints/AndVersionConstraintGroup.php","start":9718368,"end":9719351},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/constraints/AnyVersionConstraint.php","start":9719351,"end":9719927},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/constraints/ExactVersionConstraint.php","start":9719927,"end":9720639},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/constraints/GreaterThanOrEqualToVersionConstraint.php","start":9720639,"end":9721539},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/constraints/OrVersionConstraintGroup.php","start":9721539,"end":9722562},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/constraints/SpecificMajorAndMinorVersionConstraint.php","start":9722562,"end":9723518},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/constraints/SpecificMajorVersionConstraint.php","start":9723518,"end":9724280},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/constraints/VersionConstraint.php","start":9724280,"end":9724773},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/exceptions/Exception.php","start":9724773,"end":9725197},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/exceptions/InvalidPreReleaseSuffixException.php","start":9725197,"end":9725340},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/exceptions/InvalidVersionException.php","start":9725340,"end":9725489},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/exceptions/NoBuildMetaDataException.php","start":9725489,"end":9725624},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/exceptions/NoPreReleaseSuffixException.php","start":9725624,"end":9725762},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phar-io/version/src/exceptions/UnsupportedVersionConstraintException.php","start":9725762,"end":9726229},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/ChangeLog-10.1.md","start":9726229,"end":9731150},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/SECURITY.md","start":9731150,"end":9733059},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/CodeCoverage.php","start":9733059,"end":9750864},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Data/ProcessedCodeCoverageData.php","start":9750864,"end":9761099},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Data/RawCodeCoverageData.php","start":9761099,"end":9770398},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Driver/Driver.php","start":9770398,"end":9773602},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Driver/PcovDriver.php","start":9773602,"end":9775611},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Driver/Selector.php","start":9775611,"end":9777410},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Driver/XdebugDriver.php","start":9777410,"end":9782079},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/BranchAndPathCoverageNotSupportedException.php","start":9782079,"end":9782521},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/DeadCodeDetectionNotSupportedException.php","start":9782521,"end":9782959},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/DirectoryCouldNotBeCreatedException.php","start":9782959,"end":9783445},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/Exception.php","start":9783445,"end":9783817},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/FileCouldNotBeWrittenException.php","start":9783817,"end":9784247},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/InvalidArgumentException.php","start":9784247,"end":9784657},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/NoCodeCoverageDriverAvailableException.php","start":9784657,"end":9785207},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/NoCodeCoverageDriverWithPathCoverageSupportAvailableException.php","start":9785207,"end":9785807},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/ParserException.php","start":9785807,"end":9786222},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/PathExistsButIsNotDirectoryException.php","start":9786222,"end":9786874},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/PcovNotAvailableException.php","start":9786874,"end":9787466},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/ReflectionException.php","start":9787466,"end":9787885},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/ReportAlreadyFinalizedException.php","start":9787885,"end":9788446},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/StaticAnalysisCacheNotConfiguredException.php","start":9788446,"end":9788887},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/TestIdMissingException.php","start":9788887,"end":9789406},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/UnintentionallyCoveredCodeException.php","start":9789406,"end":9790606},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/WriteOperationFailedException.php","start":9790606,"end":9791237},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/XdebugNotAvailableException.php","start":9791237,"end":9791833},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/XdebugNotEnabledException.php","start":9791833,"end":9792499},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Exception/XmlException.php","start":9792499,"end":9792911},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Filter.php","start":9792911,"end":9796163},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Node/AbstractNode.php","start":9796163,"end":9802928},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Node/Builder.php","start":9802928,"end":9810183},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Node/CrapIndex.php","start":9810183,"end":9811444},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Node/Directory.php","start":9811444,"end":9821185},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Node/File.php","start":9821185,"end":9846159},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Node/Iterator.php","start":9846159,"end":9848064},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Clover.php","start":9848064,"end":9858990},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Cobertura.php","start":9858990,"end":9871832},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Crap4j.php","start":9871832,"end":9877539},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Colors.php","start":9877539,"end":9879283},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/CustomCssFile.php","start":9879283,"end":9880377},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Facade.php","start":9880377,"end":9885779},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer.php","start":9885779,"end":9896006},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Dashboard.php","start":9896006,"end":9906238},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Directory.php","start":9906238,"end":9911528},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/File.php","start":9911528,"end":9953057},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/branches.html.dist","start":9953057,"end":9953557},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/coverage_bar.html.dist","start":9953557,"end":9953852},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/coverage_bar_branch.html.dist","start":9953852,"end":9954147},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/css/bootstrap.min.css","start":9954147,"end":10116411},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/css/custom.css","start":10116411,"end":10116411},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/css/nv.d3.min.css","start":10116411,"end":10125971},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/css/octicons.css","start":10125971,"end":10126059},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/css/style.css","start":10126059,"end":10128691},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/dashboard.html.dist","start":10128691,"end":10135758},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/dashboard_branch.html.dist","start":10135758,"end":10142825},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/directory.html.dist","start":10142825,"end":10144863},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/directory_branch.html.dist","start":10144863,"end":10147059},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/directory_item.html.dist","start":10147059,"end":10147892},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/directory_item_branch.html.dist","start":10147892,"end":10149231},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/file.html.dist","start":10149231,"end":10151615},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/file_branch.html.dist","start":10151615,"end":10154156},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/file_item.html.dist","start":10154156,"end":10155038},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/file_item_branch.html.dist","start":10155038,"end":10156426},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/icons/file-code.svg","start":10156426,"end":10156730},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/icons/file-directory.svg","start":10156730,"end":10156964},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/js/bootstrap.min.js","start":10156964,"end":10219527},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/js/d3.min.js","start":10219527,"end":10371252},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/js/file.js","start":10371252,"end":10372781},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/js/jquery.min.js","start":10372781,"end":10462445},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/js/nv.d3.min.js","start":10462445,"end":10680263},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/js/popper.min.js","start":10680263,"end":10701496},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/line.html.dist","start":10701496,"end":10701693},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/lines.html.dist","start":10701693,"end":10701794},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/method_item.html.dist","start":10701794,"end":10702477},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/method_item_branch.html.dist","start":10702477,"end":10703666},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Html/Renderer/Template/paths.html.dist","start":10703666,"end":10704164},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/PHP.php","start":10704164,"end":10705432},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Text.php","start":10705432,"end":10716787},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Thresholds.php","start":10716787,"end":10718167},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/BuildInformation.php","start":10718167,"end":10720581},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Coverage.php","start":10720581,"end":10722368},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Directory.php","start":10722368,"end":10722847},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Facade.php","start":10722847,"end":10731885},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/File.php","start":10731885,"end":10733972},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Method.php","start":10733972,"end":10735570},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Node.php","start":10735570,"end":10737779},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Project.php","start":10737779,"end":10740243},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Report.php","start":10740243,"end":10742859},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Source.php","start":10742859,"end":10744000},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Tests.php","start":10744000,"end":10745215},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Totals.php","start":10745215,"end":10749557},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Report/Xml/Unit.php","start":10749557,"end":10751682},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/StaticAnalysis/CacheWarmer.php","start":10751682,"end":10752635},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/StaticAnalysis/CachingFileAnalyser.php","start":10752635,"end":10757929},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/StaticAnalysis/CodeUnitFindingVisitor.php","start":10757929,"end":10768130},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/StaticAnalysis/ExecutableLinesFindingVisitor.php","start":10768130,"end":10780897},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/StaticAnalysis/FileAnalyser.php","start":10780897,"end":10782938},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/StaticAnalysis/IgnoredLinesFindingVisitor.php","start":10782938,"end":10786608},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/StaticAnalysis/ParsingFileAnalyser.php","start":10786608,"end":10794637},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestSize/Known.php","start":10794637,"end":10795225},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestSize/Large.php","start":10795225,"end":10795924},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestSize/Medium.php","start":10795924,"end":10796626},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestSize/Small.php","start":10796626,"end":10797312},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestSize/TestSize.php","start":10797312,"end":10798717},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestSize/Unknown.php","start":10798717,"end":10799322},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestStatus/Failure.php","start":10799322,"end":10799926},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestStatus/Known.php","start":10799926,"end":10800454},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestStatus/Success.php","start":10800454,"end":10801058},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestStatus/TestStatus.php","start":10801058,"end":10802271},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/TestStatus/Unknown.php","start":10802271,"end":10802880},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Util/Filesystem.php","start":10802880,"end":10803899},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Util/Percentage.php","start":10803899,"end":10805273},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-code-coverage/src/Version.php","start":10805273,"end":10805938},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-file-iterator/ChangeLog.md","start":10805938,"end":10811896},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-file-iterator/SECURITY.md","start":10811896,"end":10813805},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-file-iterator/src/ExcludeIterator.php","start":10813805,"end":10815673},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-file-iterator/src/Facade.php","start":10815673,"end":10817087},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-file-iterator/src/Factory.php","start":10817087,"end":10820175},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-file-iterator/src/Iterator.php","start":10820175,"end":10823245},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker/.psalm/baseline.xml","start":10823245,"end":10823465},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker/.psalm/config.xml","start":10823465,"end":10823931},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker/ChangeLog.md","start":10823931,"end":10825600},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker/SECURITY.md","start":10825600,"end":10826192},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker/src/Invoker.php","start":10826192,"end":10827936},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker/src/exceptions/Exception.php","start":10827936,"end":10828297},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker/src/exceptions/ProcessControlExtensionNotLoadedException.php","start":10828297,"end":10828727},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-invoker/src/exceptions/TimeoutException.php","start":10828727,"end":10829132},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-text-template/ChangeLog.md","start":10829132,"end":10830698},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-text-template/SECURITY.md","start":10830698,"end":10832607},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-text-template/src/Template.php","start":10832607,"end":10835156},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-text-template/src/exceptions/Exception.php","start":10835156,"end":10835524},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-text-template/src/exceptions/InvalidArgumentException.php","start":10835524,"end":10835930},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-text-template/src/exceptions/RuntimeException.php","start":10835930,"end":10836358},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer/ChangeLog.md","start":10836358,"end":10841329},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer/SECURITY.md","start":10841329,"end":10841921},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer/src/Duration.php","start":10841921,"end":10844500},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer/src/ResourceUsageFormatter.php","start":10844500,"end":10846617},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer/src/Timer.php","start":10846617,"end":10847547},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer/src/exceptions/Exception.php","start":10847547,"end":10847904},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer/src/exceptions/NoActiveTimerException.php","start":10847904,"end":10848307},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/php-timer/src/exceptions/TimeSinceStartOfRequestNotAvailableException.php","start":10848307,"end":10848736},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/ChangeLog-10.5.md","start":10848736,"end":10876692},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/DEPRECATIONS.md","start":10876692,"end":10890420},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/SECURITY.md","start":10890420,"end":10892717},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/phpunit","start":10892717,"end":10895490},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/phpunit.xsd","start":10895490,"end":10913885},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/10.0.xsd","start":10913885,"end":10929505},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/10.1.xsd","start":10929505,"end":10946572},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/10.2.xsd","start":10946572,"end":10964317},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/10.3.xsd","start":10964317,"end":10982251},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/10.4.xsd","start":10982251,"end":11000242},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/8.5.xsd","start":11000242,"end":11017349},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/9.0.xsd","start":11017349,"end":11034297},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/9.1.xsd","start":11034297,"end":11051406},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/9.2.xsd","start":11051406,"end":11068522},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/9.3.xsd","start":11068522,"end":11086374},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/9.4.xsd","start":11086374,"end":11104304},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/schema/9.5.xsd","start":11104304,"end":11122292},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Dispatcher/CollectingDispatcher.php","start":11122292,"end":11123224},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Dispatcher/DeferringDispatcher.php","start":11123224,"end":11124792},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Dispatcher/DirectDispatcher.php","start":11124792,"end":11128528},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Dispatcher/Dispatcher.php","start":11128528,"end":11129148},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Dispatcher/SubscribableDispatcher.php","start":11129148,"end":11129890},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Emitter/DispatchingEmitter.php","start":11129890,"end":11166557},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Emitter/Emitter.php","start":11166557,"end":11178096},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Application/Finished.php","start":11178096,"end":11179293},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Application/FinishedSubscriber.php","start":11179293,"end":11179831},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Application/Started.php","start":11179831,"end":11181032},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Application/StartedSubscriber.php","start":11181032,"end":11181568},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Event.php","start":11181568,"end":11182074},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/EventCollection.php","start":11182074,"end":11183387},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/EventCollectionIterator.php","start":11183387,"end":11184574},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Assertion/AssertionFailed.php","start":11184574,"end":11186415},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Assertion/AssertionFailedSubscriber.php","start":11186415,"end":11186978},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Assertion/AssertionSucceeded.php","start":11186978,"end":11188825},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Assertion/AssertionSucceededSubscriber.php","start":11188825,"end":11189394},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/ComparatorRegistered.php","start":11189394,"end":11190727},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/ComparatorRegisteredSubscriber.php","start":11190727,"end":11191282},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterLastTestMethodCalled.php","start":11191282,"end":11192976},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterLastTestMethodCalledSubscriber.php","start":11192976,"end":11193541},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterLastTestMethodErrored.php","start":11193541,"end":11195646},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterLastTestMethodErroredSubscriber.php","start":11195646,"end":11196213},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterLastTestMethodFinished.php","start":11196213,"end":11198172},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterLastTestMethodFinishedSubscriber.php","start":11198172,"end":11198741},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterTestMethodCalled.php","start":11198741,"end":11200426},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterTestMethodCalledSubscriber.php","start":11200426,"end":11200983},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterTestMethodErrored.php","start":11200983,"end":11203079},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterTestMethodErroredSubscriber.php","start":11203079,"end":11203638},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterTestMethodFinished.php","start":11203638,"end":11205588},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/AfterTestMethodFinishedSubscriber.php","start":11205588,"end":11206149},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeFirstTestMethodCalled.php","start":11206149,"end":11207847},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeFirstTestMethodCalledSubscriber.php","start":11207847,"end":11208416},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeFirstTestMethodErrored.php","start":11208416,"end":11210525},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeFirstTestMethodErroredSubscriber.php","start":11210525,"end":11211096},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeFirstTestMethodFinished.php","start":11211096,"end":11213058},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeFirstTestMethodFinishedSubscriber.php","start":11213058,"end":11213631},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeTestMethodCalled.php","start":11213631,"end":11215318},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeTestMethodCalledSubscriber.php","start":11215318,"end":11215877},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeTestMethodErrored.php","start":11215877,"end":11217975},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeTestMethodErroredSubscriber.php","start":11217975,"end":11218536},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeTestMethodFinished.php","start":11218536,"end":11220488},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/BeforeTestMethodFinishedSubscriber.php","start":11220488,"end":11221051},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PostConditionCalled.php","start":11221051,"end":11222738},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PostConditionCalledSubscriber.php","start":11222738,"end":11223291},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PostConditionErrored.php","start":11223291,"end":11225389},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PostConditionErroredSubscriber.php","start":11225389,"end":11225944},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PostConditionFinished.php","start":11225944,"end":11227896},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PostConditionFinishedSubscriber.php","start":11227896,"end":11228453},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PreConditionCalled.php","start":11228453,"end":11230137},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PreConditionCalledSubscriber.php","start":11230137,"end":11230688},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PreConditionErrored.php","start":11230688,"end":11232784},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PreConditionErroredSubscriber.php","start":11232784,"end":11233337},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PreConditionFinished.php","start":11233337,"end":11235287},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/HookMethod/PreConditionFinishedSubscriber.php","start":11235287,"end":11235842},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/ConsideredRisky.php","start":11235842,"end":11237439},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/ConsideredRiskySubscriber.php","start":11237439,"end":11237984},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/DeprecationTriggered.php","start":11237984,"end":11241279},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/DeprecationTriggeredSubscriber.php","start":11241279,"end":11241834},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/ErrorTriggered.php","start":11241834,"end":11244423},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/ErrorTriggeredSubscriber.php","start":11244423,"end":11244966},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/NoticeTriggered.php","start":11244966,"end":11247964},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/NoticeTriggeredSubscriber.php","start":11247964,"end":11248509},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpDeprecationTriggered.php","start":11248509,"end":11251811},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpDeprecationTriggeredSubscriber.php","start":11251811,"end":11252372},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpNoticeTriggered.php","start":11252372,"end":11255377},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpNoticeTriggeredSubscriber.php","start":11255377,"end":11255928},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpWarningTriggered.php","start":11255928,"end":11258935},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpWarningTriggeredSubscriber.php","start":11258935,"end":11259488},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpunitDeprecationTriggered.php","start":11259488,"end":11261193},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpunitDeprecationTriggeredSubscriber.php","start":11261193,"end":11261762},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpunitErrorTriggered.php","start":11261762,"end":11263480},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpunitErrorTriggeredSubscriber.php","start":11263480,"end":11264037},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpunitWarningTriggered.php","start":11264037,"end":11265734},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/PhpunitWarningTriggeredSubscriber.php","start":11265734,"end":11266295},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/WarningTriggered.php","start":11266295,"end":11269295},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Issue/WarningTriggeredSubscriber.php","start":11269295,"end":11269842},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/DataProviderMethodCalled.php","start":11269842,"end":11271512},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/DataProviderMethodCalledSubscriber.php","start":11271512,"end":11272075},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/DataProviderMethodFinished.php","start":11272075,"end":11273998},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/DataProviderMethodFinishedSubscriber.php","start":11273998,"end":11274565},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/Finished.php","start":11274565,"end":11276040},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/FinishedSubscriber.php","start":11276040,"end":11276571},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/PreparationFailed.php","start":11276571,"end":11277754},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/PreparationFailedSubscriber.php","start":11277754,"end":11278303},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/PreparationStarted.php","start":11278303,"end":11279488},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/PreparationStartedSubscriber.php","start":11279488,"end":11280039},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/Prepared.php","start":11280039,"end":11281203},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Lifecycle/PreparedSubscriber.php","start":11281203,"end":11281734},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/Errored.php","start":11281734,"end":11283330},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/ErroredSubscriber.php","start":11283330,"end":11283859},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/Failed.php","start":11283859,"end":11286134},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/FailedSubscriber.php","start":11286134,"end":11286661},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/MarkedIncomplete.php","start":11286661,"end":11288276},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/MarkedIncompleteSubscriber.php","start":11288276,"end":11288823},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/Passed.php","start":11288823,"end":11289983},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/PassedSubscriber.php","start":11289983,"end":11290510},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/Skipped.php","start":11290510,"end":11292015},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/Outcome/SkippedSubscriber.php","start":11292015,"end":11292544},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/PrintedUnexpectedOutput.php","start":11292544,"end":11293919},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/PrintedUnexpectedOutputSubscriber.php","start":11293919,"end":11294480},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectCreated.php","start":11294480,"end":11295808},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectCreatedSubscriber.php","start":11295808,"end":11296357},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectForAbstractClassCreated.php","start":11296357,"end":11297701},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectForAbstractClassCreatedSubscriber.php","start":11297701,"end":11298282},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectForIntersectionOfInterfacesCreated.php","start":11298282,"end":11299689},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectForIntersectionOfInterfacesCreatedSubscriber.php","start":11299689,"end":11300292},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectForTraitCreated.php","start":11300292,"end":11301628},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectForTraitCreatedSubscriber.php","start":11301628,"end":11302193},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectFromWsdlCreated.php","start":11302193,"end":11304883},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/MockObjectFromWsdlCreatedSubscriber.php","start":11304883,"end":11305448},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/PartialMockObjectCreated.php","start":11305448,"end":11307088},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/PartialMockObjectCreatedSubscriber.php","start":11307088,"end":11307651},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/TestProxyCreated.php","start":11307651,"end":11309241},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/TestProxyCreatedSubscriber.php","start":11309241,"end":11309788},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/TestStubCreated.php","start":11309788,"end":11311100},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/TestStubCreatedSubscriber.php","start":11311100,"end":11311645},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/TestStubForIntersectionOfInterfacesCreated.php","start":11311645,"end":11313048},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/Test/TestDouble/TestStubForIntersectionOfInterfacesCreatedSubscriber.php","start":11313048,"end":11313647},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/BootstrapFinished.php","start":11313647,"end":11314816},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/BootstrapFinishedSubscriber.php","start":11314816,"end":11315371},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/Configured.php","start":11315371,"end":11316520},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ConfiguredSubscriber.php","start":11316520,"end":11317061},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/DeprecationTriggered.php","start":11317061,"end":11318242},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/DeprecationTriggeredSubscriber.php","start":11318242,"end":11318803},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/EventFacadeSealed.php","start":11318803,"end":11319702},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/EventFacadeSealedSubscriber.php","start":11319702,"end":11320257},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExecutionAborted.php","start":11320257,"end":11321165},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExecutionAbortedSubscriber.php","start":11321165,"end":11321718},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExecutionFinished.php","start":11321718,"end":11322628},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExecutionFinishedSubscriber.php","start":11322628,"end":11323183},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExecutionStarted.php","start":11323183,"end":11324488},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExecutionStartedSubscriber.php","start":11324488,"end":11325041},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExtensionBootstrapped.php","start":11325041,"end":11326742},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExtensionBootstrappedSubscriber.php","start":11326742,"end":11327305},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExtensionLoadedFromPhar.php","start":11327305,"end":11328856},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/ExtensionLoadedFromPharSubscriber.php","start":11328856,"end":11329423},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/Finished.php","start":11329423,"end":11330314},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/FinishedSubscriber.php","start":11330314,"end":11330851},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/GarbageCollectionDisabled.php","start":11330851,"end":11331778},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/GarbageCollectionDisabledSubscriber.php","start":11331778,"end":11332349},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/GarbageCollectionEnabled.php","start":11332349,"end":11333274},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/GarbageCollectionEnabledSubscriber.php","start":11333274,"end":11333843},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/GarbageCollectionTriggered.php","start":11333843,"end":11334772},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/GarbageCollectionTriggeredSubscriber.php","start":11334772,"end":11335345},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/Started.php","start":11335345,"end":11336234},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/StartedSubscriber.php","start":11336234,"end":11336769},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/WarningTriggered.php","start":11336769,"end":11337942},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestRunner/WarningTriggeredSubscriber.php","start":11337942,"end":11338495},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/Filtered.php","start":11338495,"end":11339742},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/FilteredSubscriber.php","start":11339742,"end":11340278},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/Finished.php","start":11340278,"end":11341567},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/FinishedSubscriber.php","start":11341567,"end":11342103},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/Loaded.php","start":11342103,"end":11343346},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/LoadedSubscriber.php","start":11343346,"end":11343878},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/Skipped.php","start":11343878,"end":11345269},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/SkippedSubscriber.php","start":11345269,"end":11345803},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/Sorted.php","start":11345803,"end":11347395},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/SortedSubscriber.php","start":11347395,"end":11347927},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/Started.php","start":11347927,"end":11349214},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Events/TestSuite/StartedSubscriber.php","start":11349214,"end":11349748},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/EventAlreadyAssignedException.php","start":11349748,"end":11350255},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/EventFacadeIsSealedException.php","start":11350255,"end":11350761},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/Exception.php","start":11350761,"end":11351091},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/InvalidArgumentException.php","start":11351091,"end":11351579},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/InvalidEventException.php","start":11351579,"end":11352078},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/InvalidSubscriberException.php","start":11352078,"end":11352582},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/MapError.php","start":11352582,"end":11353068},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/MoreThanOneDataSetFromDataProviderException.php","start":11353068,"end":11353627},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/NoComparisonFailureException.php","start":11353627,"end":11354167},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/NoDataSetFromDataProviderException.php","start":11354167,"end":11354717},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/NoPreviousThrowableException.php","start":11354717,"end":11355223},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/NoTestCaseObjectOnCallStackException.php","start":11355223,"end":11355983},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/RuntimeException.php","start":11355983,"end":11356455},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/SubscriberTypeAlreadyRegisteredException.php","start":11356455,"end":11356973},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/UnknownEventException.php","start":11356973,"end":11357472},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/UnknownEventTypeException.php","start":11357472,"end":11357975},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/UnknownSubscriberException.php","start":11357975,"end":11358479},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Exception/UnknownSubscriberTypeException.php","start":11358479,"end":11358987},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Facade.php","start":11358987,"end":11367602},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Subscriber.php","start":11367602,"end":11368019},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Tracer.php","start":11368019,"end":11368512},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/TypeMap.php","start":11368512,"end":11374219},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/ClassMethod.php","start":11374219,"end":11375399},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/ComparisonFailure.php","start":11375399,"end":11376402},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/ComparisonFailureBuilder.php","start":11376402,"end":11378286},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Runtime/OperatingSystem.php","start":11378286,"end":11379239},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Runtime/PHP.php","start":11379239,"end":11381638},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Runtime/PHPUnit.php","start":11381638,"end":11382521},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Runtime/Runtime.php","start":11382521,"end":11383888},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/Duration.php","start":11383888,"end":11387431},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/GarbageCollectorStatus.php","start":11387431,"end":11392207},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/GarbageCollectorStatusProvider.php","start":11392207,"end":11392804},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/HRTime.php","start":11392804,"end":11395402},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/Info.php","start":11395402,"end":11397771},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/MemoryMeter.php","start":11397771,"end":11398396},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/MemoryUsage.php","start":11398396,"end":11399266},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/Php81GarbageCollectorStatusProvider.php","start":11399266,"end":11400327},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/Php83GarbageCollectorStatusProvider.php","start":11400327,"end":11401503},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/Snapshot.php","start":11401503,"end":11402944},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/StopWatch.php","start":11402944,"end":11403505},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/System.php","start":11403505,"end":11404851},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/SystemMemoryMeter.php","start":11404851,"end":11405724},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/SystemStopWatch.php","start":11405724,"end":11406506},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Telemetry/SystemStopWatchWithOffset.php","start":11406506,"end":11407598},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/Phpt.php","start":11407598,"end":11408438},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/Test.php","start":11408438,"end":11409707},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestCollection.php","start":11409707,"end":11410976},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestCollectionIterator.php","start":11410976,"end":11412157},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestData/DataFromDataProvider.php","start":11412157,"end":11413716},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestData/DataFromTestDependency.php","start":11413716,"end":11414449},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestData/TestData.php","start":11414449,"end":11415415},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestData/TestDataCollection.php","start":11415415,"end":11417968},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestData/TestDataCollectionIterator.php","start":11417968,"end":11419167},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestDox.php","start":11419167,"end":11420483},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestDoxBuilder.php","start":11420483,"end":11422096},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestMethod.php","start":11422096,"end":11425735},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Test/TestMethodBuilder.php","start":11425735,"end":11428911},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/TestSuite/TestSuite.php","start":11428911,"end":11430581},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/TestSuite/TestSuiteBuilder.php","start":11430581,"end":11434015},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/TestSuite/TestSuiteForTestClass.php","start":11434015,"end":11435452},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/TestSuite/TestSuiteForTestMethodWithDataProvider.php","start":11435452,"end":11437360},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/TestSuite/TestSuiteWithName.php","start":11437360,"end":11437978},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/Throwable.php","start":11437978,"end":11440369},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Event/Value/ThrowableBuilder.php","start":11440369,"end":11441544},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Exception.php","start":11441544,"end":11441875},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Assert.php","start":11441875,"end":11510359},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Assert/Functions.php","start":11510359,"end":11596054},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/After.php","start":11596054,"end":11596561},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/AfterClass.php","start":11596561,"end":11597073},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/BackupGlobals.php","start":11597073,"end":11597825},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/BackupStaticProperties.php","start":11597825,"end":11598586},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/Before.php","start":11598586,"end":11599094},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/BeforeClass.php","start":11599094,"end":11599607},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/CodeCoverageIgnore.php","start":11599607,"end":11600228},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/CoversClass.php","start":11600228,"end":11601153},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/CoversFunction.php","start":11601153,"end":11602114},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/CoversNothing.php","start":11602114,"end":11602655},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DataProvider.php","start":11602655,"end":11603601},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DataProviderExternal.php","start":11603601,"end":11604882},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/Depends.php","start":11604882,"end":11605823},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DependsExternal.php","start":11605823,"end":11607099},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DependsExternalUsingDeepClone.php","start":11607099,"end":11608389},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DependsExternalUsingShallowClone.php","start":11608389,"end":11609682},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DependsOnClass.php","start":11609682,"end":11610611},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DependsOnClassUsingDeepClone.php","start":11610611,"end":11611554},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DependsOnClassUsingShallowClone.php","start":11611554,"end":11612500},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DependsUsingDeepClone.php","start":11612500,"end":11613455},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DependsUsingShallowClone.php","start":11613455,"end":11614413},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/DoesNotPerformAssertions.php","start":11614413,"end":11614965},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/ExcludeGlobalVariableFromBackup.php","start":11614965,"end":11616012},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/ExcludeStaticPropertyFromBackup.php","start":11616012,"end":11617346},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/Group.php","start":11617346,"end":11618269},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/IgnoreClassForCodeCoverage.php","start":11618269,"end":11619284},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/IgnoreDeprecations.php","start":11619284,"end":11619830},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/IgnoreFunctionForCodeCoverage.php","start":11619830,"end":11620881},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/IgnoreMethodForCodeCoverage.php","start":11620881,"end":11622243},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/Large.php","start":11622243,"end":11622749},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/Medium.php","start":11622749,"end":11623256},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/PostCondition.php","start":11623256,"end":11623771},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/PreCondition.php","start":11623771,"end":11624285},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/PreserveGlobalState.php","start":11624285,"end":11625043},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RequiresFunction.php","start":11625043,"end":11626033},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RequiresMethod.php","start":11626033,"end":11627334},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RequiresOperatingSystem.php","start":11627334,"end":11628339},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RequiresOperatingSystemFamily.php","start":11628339,"end":11629378},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RequiresPhp.php","start":11629378,"end":11630378},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RequiresPhpExtension.php","start":11630378,"end":11631786},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RequiresPhpunit.php","start":11631786,"end":11632790},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RequiresSetting.php","start":11632790,"end":11634056},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RunClassInSeparateProcess.php","start":11634056,"end":11634582},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RunInSeparateProcess.php","start":11634582,"end":11635104},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/RunTestsInSeparateProcesses.php","start":11635104,"end":11635632},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/Small.php","start":11635632,"end":11636138},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/Test.php","start":11636138,"end":11636644},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/TestDox.php","start":11636644,"end":11637542},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/TestWith.php","start":11637542,"end":11638275},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/TestWithJson.php","start":11638275,"end":11639179},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/Ticket.php","start":11639179,"end":11640103},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/UsesClass.php","start":11640103,"end":11641026},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/UsesFunction.php","start":11641026,"end":11641985},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Attributes/WithoutErrorHandler.php","start":11641985,"end":11642506},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Boolean/IsFalse.php","start":11642506,"end":11643338},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Boolean/IsTrue.php","start":11643338,"end":11644167},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Callback.php","start":11644167,"end":11645949},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Cardinality/Count.php","start":11645949,"end":11649193},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Cardinality/GreaterThan.php","start":11649193,"end":11650272},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Cardinality/IsEmpty.php","start":11650272,"end":11651936},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Cardinality/LessThan.php","start":11651936,"end":11653009},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Cardinality/SameSize.php","start":11653009,"end":11653721},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Constraint.php","start":11653721,"end":11662097},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Equality/IsEqual.php","start":11662097,"end":11665566},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Equality/IsEqualCanonicalizing.php","start":11665566,"end":11668469},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Equality/IsEqualIgnoringCase.php","start":11668469,"end":11671393},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Equality/IsEqualWithDelta.php","start":11671393,"end":11674078},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Exception/Exception.php","start":11674078,"end":11676226},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Exception/ExceptionCode.php","start":11676226,"end":11677842},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Exception/ExceptionMessageIsOrContains.php","start":11677842,"end":11679740},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Exception/ExceptionMessageMatchesRegularExpression.php","start":11679740,"end":11681826},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Filesystem/DirectoryExists.php","start":11681826,"end":11683105},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Filesystem/FileExists.php","start":11683105,"end":11684379},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Filesystem/IsReadable.php","start":11684379,"end":11685653},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Filesystem/IsWritable.php","start":11685653,"end":11686927},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/IsAnything.php","start":11686927,"end":11688313},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/IsIdentical.php","start":11688313,"end":11692115},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/JsonMatches.php","start":11692115,"end":11694774},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Math/IsFinite.php","start":11694774,"end":11695634},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Math/IsInfinite.php","start":11695634,"end":11696502},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Math/IsNan.php","start":11696502,"end":11697350},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Object/ObjectEquals.php","start":11697350,"end":11701731},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Object/ObjectHasProperty.php","start":11701731,"end":11703779},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Operator/BinaryOperator.php","start":11703779,"end":11707071},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Operator/LogicalAnd.php","start":11707071,"end":11708410},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Operator/LogicalNot.php","start":11708410,"end":11711994},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Operator/LogicalOr.php","start":11711994,"end":11713304},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Operator/LogicalXor.php","start":11713304,"end":11714983},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Operator/Operator.php","start":11714983,"end":11716441},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Operator/UnaryOperator.php","start":11716441,"end":11719939},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/String/IsJson.php","start":11719939,"end":11722535},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/String/RegularExpression.php","start":11722535,"end":11723660},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/String/StringContains.php","start":11723660,"end":11728058},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/String/StringEndsWith.php","start":11728058,"end":11729293},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/String/StringEqualsStringIgnoringLineEndings.php","start":11729293,"end":11730720},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/String/StringMatchesFormatDescription.php","start":11730720,"end":11734067},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/String/StringStartsWith.php","start":11734067,"end":11735310},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Traversable/ArrayHasKey.php","start":11735310,"end":11736945},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Traversable/IsList.php","start":11736945,"end":11738282},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Traversable/TraversableContains.php","start":11738282,"end":11739704},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Traversable/TraversableContainsEqual.php","start":11739704,"end":11740741},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Traversable/TraversableContainsIdentical.php","start":11740741,"end":11741720},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Traversable/TraversableContainsOnly.php","start":11741720,"end":11743746},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Type/IsInstanceOf.php","start":11743746,"end":11745778},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Type/IsNull.php","start":11745778,"end":11746607},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Constraint/Type/IsType.php","start":11746607,"end":11751427},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/DataProviderTestSuite.php","start":11751427,"end":11753484},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/AssertionFailedError.php","start":11753484,"end":11754210},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/CodeCoverageException.php","start":11754210,"end":11754748},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/EmptyStringException.php","start":11754748,"end":11755306},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/Exception.php","start":11755306,"end":11757910},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/ExpectationFailedException.php","start":11757910,"end":11759111},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/GeneratorNotSupportedException.php","start":11759111,"end":11759987},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/Incomplete/IncompleteTest.php","start":11759987,"end":11760538},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/Incomplete/IncompleteTestError.php","start":11760538,"end":11761117},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/InvalidArgumentException.php","start":11761117,"end":11761667},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/InvalidCoversTargetException.php","start":11761667,"end":11762230},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/InvalidDataProviderException.php","start":11762230,"end":11762781},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/InvalidDependencyException.php","start":11762781,"end":11763364},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/NoChildTestSuiteException.php","start":11763364,"end":11763912},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/ObjectEquals/ActualValueIsNotAnObjectException.php","start":11763912,"end":11764599},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/ObjectEquals/ComparisonMethodDoesNotAcceptParameterTypeException.php","start":11764599,"end":11765536},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/ObjectEquals/ComparisonMethodDoesNotDeclareBoolReturnTypeException.php","start":11765536,"end":11766432},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/ObjectEquals/ComparisonMethodDoesNotDeclareExactlyOneParameterException.php","start":11766432,"end":11767338},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/ObjectEquals/ComparisonMethodDoesNotDeclareParameterTypeException.php","start":11767338,"end":11768242},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/ObjectEquals/ComparisonMethodDoesNotExistException.php","start":11768242,"end":11769103},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/PhptAssertionFailedError.php","start":11769103,"end":11770534},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/ProcessIsolationException.php","start":11770534,"end":11771082},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/Skipped/SkippedTest.php","start":11771082,"end":11771630},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/Skipped/SkippedTestSuiteError.php","start":11771630,"end":11772208},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/Skipped/SkippedWithMessageException.php","start":11772208,"end":11772792},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/UnknownClassOrInterfaceException.php","start":11772792,"end":11773600},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Exception/UnknownTypeException.php","start":11773600,"end":11774380},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/ExecutionOrderDependency.php","start":11774380,"end":11779394},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/ConfigurableMethod.php","start":11779394,"end":11781532},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/BadMethodCallException.php","start":11781532,"end":11782123},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/CannotUseOnlyMethodsException.php","start":11782123,"end":11783062},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/Exception.php","start":11783062,"end":11783619},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/IncompatibleReturnValueException.php","start":11783619,"end":11784657},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/MatchBuilderNotFoundException.php","start":11784657,"end":11785510},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/MatcherAlreadyRegisteredException.php","start":11785510,"end":11786355},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/MethodCannotBeConfiguredException.php","start":11786355,"end":11787298},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/MethodNameAlreadyConfiguredException.php","start":11787298,"end":11788020},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/MethodNameNotConfiguredException.php","start":11788020,"end":11788734},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/MethodParametersAlreadyConfiguredException.php","start":11788734,"end":11789465},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/NeverReturningMethodException.php","start":11789465,"end":11790397},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/NoMoreReturnValuesConfiguredException.php","start":11790397,"end":11791421},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/ReturnValueNotConfiguredException.php","start":11791421,"end":11792382},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Exception/RuntimeException.php","start":11792382,"end":11792961},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/CannotUseAddMethodsException.php","start":11792961,"end":11793955},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/ClassIsEnumerationException.php","start":11793955,"end":11794826},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/ClassIsFinalException.php","start":11794826,"end":11795693},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/ClassIsReadonlyException.php","start":11795693,"end":11796566},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/DuplicateMethodException.php","start":11796566,"end":11797711},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/Exception.php","start":11797711,"end":11798332},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/InvalidMethodNameException.php","start":11798332,"end":11799189},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/NameAlreadyInUseException.php","start":11799189,"end":11800097},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/OriginalConstructorInvocationRequiredException.php","start":11800097,"end":11800877},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/ReflectionException.php","start":11800877,"end":11801480},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/RuntimeException.php","start":11801480,"end":11802080},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/SoapExtensionNotAvailableException.php","start":11802080,"end":11802866},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/UnknownClassException.php","start":11802866,"end":11803706},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/UnknownTraitException.php","start":11803706,"end":11804621},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Exception/UnknownTypeException.php","start":11804621,"end":11805463},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/Generator.php","start":11805463,"end":11840587},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/MockClass.php","start":11840587,"end":11842421},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/MockMethod.php","start":11842421,"end":11854462},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/MockMethodSet.php","start":11854462,"end":11855666},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/MockTrait.php","start":11855666,"end":11856903},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/MockType.php","start":11856903,"end":11857525},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/TemplateLoader.php","start":11857525,"end":11858567},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/templates/deprecation.tpl","start":11858567,"end":11858626},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/templates/doubled_method.tpl","start":11858626,"end":11860248},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/templates/doubled_static_method.tpl","start":11860248,"end":11860486},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/templates/intersection.tpl","start":11860486,"end":11860562},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/templates/proxied_method.tpl","start":11860562,"end":11862252},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/templates/test_double_class.tpl","start":11862252,"end":11862354},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/templates/trait_class.tpl","start":11862354,"end":11862435},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/templates/wsdl_class.tpl","start":11862435,"end":11862640},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Generator/templates/wsdl_method.tpl","start":11862640,"end":11862700},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/MockBuilder.php","start":11862700,"end":11875389},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Api/DoubledCloneMethod.php","start":11875389,"end":11876056},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Api/Method.php","start":11876056,"end":11876977},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Api/MockObjectApi.php","start":11876977,"end":11878715},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Api/ProxiedCloneMethod.php","start":11878715,"end":11879410},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Api/StubApi.php","start":11879410,"end":11881297},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Builder/Identity.php","start":11881297,"end":11882005},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Builder/InvocationMocker.php","start":11882005,"end":11891075},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Builder/InvocationStubber.php","start":11891075,"end":11892230},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Builder/MethodNameMatch.php","start":11892230,"end":11893036},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Builder/ParametersMatch.php","start":11893036,"end":11894679},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Builder/Stub.php","start":11894679,"end":11895494},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Interface/MockObject.php","start":11895494,"end":11896185},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Interface/MockObjectInternal.php","start":11896185,"end":11896966},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Interface/Stub.php","start":11896966,"end":11897505},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Interface/StubInternal.php","start":11897505,"end":11898388},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Invocation.php","start":11898388,"end":11902358},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/InvocationHandler.php","start":11902358,"end":11906344},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Matcher.php","start":11906344,"end":11912837},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/MethodNameConstraint.php","start":11912837,"end":11913915},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/ReturnValueGenerator.php","start":11913915,"end":11921543},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/AnyInvokedCount.php","start":11921543,"end":11922407},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/AnyParameters.php","start":11922407,"end":11923151},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/InvocationOrder.php","start":11923151,"end":11924498},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/InvokedAtLeastCount.php","start":11924498,"end":11926497},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/InvokedAtLeastOnce.php","start":11926497,"end":11927845},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/InvokedAtMostCount.php","start":11927845,"end":11929832},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/InvokedCount.php","start":11929832,"end":11932570},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/MethodName.php","start":11932570,"end":11934232},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/Parameters.php","start":11934232,"end":11938695},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Rule/ParametersRule.php","start":11938695,"end":11939442},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Stub/ConsecutiveCalls.php","start":11939442,"end":11940925},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Stub/Exception.php","start":11940925,"end":11941825},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Stub/ReturnArgument.php","start":11941825,"end":11942718},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Stub/ReturnCallback.php","start":11942718,"end":11943664},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Stub/ReturnReference.php","start":11943664,"end":11944500},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Stub/ReturnSelf.php","start":11944500,"end":11945301},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Stub/ReturnStub.php","start":11945301,"end":11946119},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Stub/ReturnValueMap.php","start":11946119,"end":11947385},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/MockObject/Runtime/Stub/Stub.php","start":11947385,"end":11948125},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Reorderable.php","start":11948125,"end":11948893},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/SelfDescribing.php","start":11948893,"end":11949524},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/Test.php","start":11949524,"end":11950006},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestBuilder.php","start":11950006,"end":11960545},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestCase.php","start":11960545,"end":12034769},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestRunner.php","start":12034769,"end":12050911},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestSize/Known.php","start":12050911,"end":12051663},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestSize/Large.php","start":12051663,"end":12052526},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestSize/Medium.php","start":12052526,"end":12053392},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestSize/Small.php","start":12053392,"end":12054242},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestSize/TestSize.php","start":12054242,"end":12055811},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestSize/Unknown.php","start":12055811,"end":12056580},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Deprecation.php","start":12056580,"end":12057428},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Error.php","start":12057428,"end":12058252},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Failure.php","start":12058252,"end":12059084},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Incomplete.php","start":12059084,"end":12059928},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Known.php","start":12059928,"end":12060620},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Notice.php","start":12060620,"end":12061448},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Risky.php","start":12061448,"end":12062272},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Skipped.php","start":12062272,"end":12063104},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Success.php","start":12063104,"end":12063936},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/TestStatus.php","start":12063936,"end":12067972},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Unknown.php","start":12067972,"end":12068810},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestStatus/Warning.php","start":12068810,"end":12069642},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestSuite.php","start":12069642,"end":12088928},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Framework/TestSuiteIterator.php","start":12088928,"end":12090819},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/EventLogger.php","start":12090819,"end":12092716},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/JunitXmlLogger.php","start":12092716,"end":12106219},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/Subscriber.php","start":12106219,"end":12106979},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestErroredSubscriber.php","start":12106979,"end":12107839},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestFailedSubscriber.php","start":12107839,"end":12108693},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestFinishedSubscriber.php","start":12108693,"end":12109559},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestMarkedIncompleteSubscriber.php","start":12109559,"end":12110473},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestPreparationFailedSubscriber.php","start":12110473,"end":12111387},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestPreparationStartedSubscriber.php","start":12111387,"end":12112313},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestPreparedSubscriber.php","start":12112313,"end":12113173},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestPrintedUnexpectedOutputSubscriber.php","start":12113173,"end":12114029},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestRunnerExecutionFinishedSubscriber.php","start":12114029,"end":12114845},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestSkippedSubscriber.php","start":12114845,"end":12115705},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestSuiteFinishedSubscriber.php","start":12115705,"end":12116485},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/JUnit/Subscriber/TestSuiteStartedSubscriber.php","start":12116485,"end":12117265},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/Subscriber.php","start":12117265,"end":12118028},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestConsideredRiskySubscriber.php","start":12118028,"end":12118939},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestErroredSubscriber.php","start":12118939,"end":12119802},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestFailedSubscriber.php","start":12119802,"end":12120659},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestFinishedSubscriber.php","start":12120659,"end":12121528},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestMarkedIncompleteSubscriber.php","start":12121528,"end":12122445},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestPreparedSubscriber.php","start":12122445,"end":12123214},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestRunnerExecutionFinishedSubscriber.php","start":12123214,"end":12124033},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestSkippedSubscriber.php","start":12124033,"end":12124896},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestSuiteBeforeFirstTestMethodErroredSubscriber.php","start":12124896,"end":12125886},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestSuiteFinishedSubscriber.php","start":12125886,"end":12126675},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestSuiteSkippedSubscriber.php","start":12126675,"end":12127558},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/Subscriber/TestSuiteStartedSubscriber.php","start":12127558,"end":12128341},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TeamCity/TeamCityLogger.php","start":12128341,"end":12140610},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/HtmlRenderer.php","start":12140610,"end":12144351},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/NamePrettifier.php","start":12144351,"end":12153293},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/PlainTextRenderer.php","start":12153293,"end":12155332},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/Subscriber.php","start":12155332,"end":12156127},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestConsideredRiskySubscriber.php","start":12156127,"end":12156940},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestErroredSubscriber.php","start":12156940,"end":12157705},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestFailedSubscriber.php","start":12157705,"end":12158464},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestFinishedSubscriber.php","start":12158464,"end":12159335},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestMarkedIncompleteSubscriber.php","start":12159335,"end":12160154},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestPassedSubscriber.php","start":12160154,"end":12160913},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestPreparedSubscriber.php","start":12160913,"end":12161684},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestSkippedSubscriber.php","start":12161684,"end":12162449},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestTriggeredDeprecationSubscriber.php","start":12162449,"end":12163292},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestTriggeredNoticeSubscriber.php","start":12163292,"end":12164105},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestTriggeredPhpDeprecationSubscriber.php","start":12164105,"end":12164966},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestTriggeredPhpNoticeSubscriber.php","start":12164966,"end":12165797},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestTriggeredPhpWarningSubscriber.php","start":12165797,"end":12166634},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestTriggeredPhpunitDeprecationSubscriber.php","start":12166634,"end":12167519},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestTriggeredPhpunitErrorSubscriber.php","start":12167519,"end":12168368},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestTriggeredPhpunitWarningSubscriber.php","start":12168368,"end":12169229},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/Subscriber/TestTriggeredWarningSubscriber.php","start":12169229,"end":12170048},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/TestResult.php","start":12170048,"end":12171464},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/TestResultCollection.php","start":12171464,"end":12172798},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/TestResultCollectionIterator.php","start":12172798,"end":12174142},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Logging/TestDox/TestResult/TestResultCollector.php","start":12174142,"end":12186775},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/After.php","start":12186775,"end":12187358},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/AfterClass.php","start":12187358,"end":12187956},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Api/CodeCoverage.php","start":12187956,"end":12198732},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Api/DataProvider.php","start":12198732,"end":12209809},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Api/Dependencies.php","start":12209809,"end":12211491},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Api/Groups.php","start":12211491,"end":12215382},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Api/HookMethods.php","start":12215382,"end":12219239},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Api/Requirements.php","start":12219239,"end":12224670},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/BackupGlobals.php","start":12224670,"end":12225589},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/BackupStaticProperties.php","start":12225589,"end":12226535},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Before.php","start":12226535,"end":12227121},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/BeforeClass.php","start":12227121,"end":12227722},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Covers.php","start":12227722,"end":12228770},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/CoversClass.php","start":12228770,"end":12230095},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/CoversDefaultClass.php","start":12230095,"end":12231188},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/CoversFunction.php","start":12231188,"end":12232524},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/CoversNothing.php","start":12232524,"end":12233131},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/DataProvider.php","start":12233131,"end":12234552},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/DependsOnClass.php","start":12234552,"end":12236013},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/DependsOnMethod.php","start":12236013,"end":12237824},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/DoesNotPerformAssertions.php","start":12237824,"end":12238464},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Exception/AnnotationsAreNotSupportedForInternalClassesException.php","start":12238464,"end":12239481},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Exception/Exception.php","start":12239481,"end":12239814},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Exception/InvalidAttributeException.php","start":12239814,"end":12241106},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Exception/InvalidVersionRequirementException.php","start":12241106,"end":12241508},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Exception/NoVersionRequirementException.php","start":12241508,"end":12241905},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Exception/ReflectionException.php","start":12241905,"end":12242520},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/ExcludeGlobalVariableFromBackup.php","start":12242520,"end":12243727},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/ExcludeStaticPropertyFromBackup.php","start":12243727,"end":12245221},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Group.php","start":12245221,"end":12246287},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/IgnoreClassForCodeCoverage.php","start":12246287,"end":12247479},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/IgnoreDeprecations.php","start":12247479,"end":12248101},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/IgnoreFunctionForCodeCoverage.php","start":12248101,"end":12249335},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/IgnoreMethodForCodeCoverage.php","start":12249335,"end":12250876},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Metadata.php","start":12250876,"end":12272074},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/MetadataCollection.php","start":12272074,"end":12286417},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/MetadataCollectionIterator.php","start":12286417,"end":12287634},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Parser/Annotation/DocBlock.php","start":12287634,"end":12297417},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Parser/Annotation/Registry.php","start":12297417,"end":12300419},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Parser/AnnotationParser.php","start":12300419,"end":12319741},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Parser/AttributeParser.php","start":12319741,"end":12344713},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Parser/CachingParser.php","start":12344713,"end":12347236},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Parser/Parser.php","start":12347236,"end":12348330},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Parser/ParserChain.php","start":12348330,"end":12350558},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Parser/Registry.php","start":12350558,"end":12351607},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/PostCondition.php","start":12351607,"end":12352214},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/PreCondition.php","start":12352214,"end":12352818},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/PreserveGlobalState.php","start":12352818,"end":12353755},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RequiresFunction.php","start":12353755,"end":12354875},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RequiresMethod.php","start":12354875,"end":12356302},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RequiresOperatingSystem.php","start":12356302,"end":12357461},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RequiresOperatingSystemFamily.php","start":12357461,"end":12358683},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RequiresPhp.php","start":12358683,"end":12359726},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RequiresPhpExtension.php","start":12359726,"end":12361510},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RequiresPhpunit.php","start":12361510,"end":12362565},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RequiresSetting.php","start":12362565,"end":12363959},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RunClassInSeparateProcess.php","start":12363959,"end":12364602},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RunInSeparateProcess.php","start":12364602,"end":12365230},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/RunTestsInSeparateProcesses.php","start":12365230,"end":12365879},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Test.php","start":12365879,"end":12366459},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/TestDox.php","start":12366459,"end":12367496},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/TestWith.php","start":12367496,"end":12368385},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Uses.php","start":12368385,"end":12369427},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/UsesClass.php","start":12369427,"end":12370746},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/UsesDefaultClass.php","start":12370746,"end":12371833},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/UsesFunction.php","start":12371833,"end":12373160},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Version/ComparisonRequirement.php","start":12373160,"end":12374263},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Version/ConstraintRequirement.php","start":12374263,"end":12375586},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/Version/Requirement.php","start":12375586,"end":12377446},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Metadata/WithoutErrorHandler.php","start":12377446,"end":12378071},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Baseline.php","start":12378071,"end":12379661},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Exception/CannotLoadBaselineException.php","start":12379661,"end":12380298},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Exception/FileDoesNotHaveLineException.php","start":12380298,"end":12381200},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Generator.php","start":12381200,"end":12385209},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Issue.php","start":12385209,"end":12388761},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Reader.php","start":12388761,"end":12391916},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/RelativePathCalculator.php","start":12391916,"end":12394767},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Subscriber/Subscriber.php","start":12394767,"end":12395532},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Subscriber/TestTriggeredDeprecationSubscriber.php","start":12395532,"end":12396516},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Subscriber/TestTriggeredNoticeSubscriber.php","start":12396516,"end":12397475},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Subscriber/TestTriggeredPhpDeprecationSubscriber.php","start":12397475,"end":12398474},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Subscriber/TestTriggeredPhpNoticeSubscriber.php","start":12398474,"end":12399448},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Subscriber/TestTriggeredPhpWarningSubscriber.php","start":12399448,"end":12400427},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Subscriber/TestTriggeredWarningSubscriber.php","start":12400427,"end":12401391},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Baseline/Writer.php","start":12401391,"end":12403369},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/CodeCoverage.php","start":12403369,"end":12417460},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ErrorHandler.php","start":12417460,"end":12424005},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/ClassCannotBeFoundException.php","start":12424005,"end":12424879},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/ClassDoesNotExtendTestCaseException.php","start":12424879,"end":12425797},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/ClassIsAbstractException.php","start":12425797,"end":12426673},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/DirectoryDoesNotExistException.php","start":12426673,"end":12427537},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/ErrorException.php","start":12427537,"end":12428100},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/Exception.php","start":12428100,"end":12428636},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/FileDoesNotExistException.php","start":12428636,"end":12429455},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/InvalidOrderException.php","start":12429455,"end":12430047},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/InvalidPhptFileException.php","start":12430047,"end":12430642},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/ParameterDoesNotExistException.php","start":12430642,"end":12431471},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/PhptExternalFileCannotBeLoadedException.php","start":12431471,"end":12432375},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Exception/UnsupportedPhptSectionException.php","start":12432375,"end":12433223},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Extension/Extension.php","start":12433223,"end":12433815},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Extension/ExtensionBootstrapper.php","start":12433815,"end":12436663},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Extension/Facade.php","start":12436663,"end":12439499},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Extension/ParameterCollection.php","start":12439499,"end":12440757},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Extension/PharLoader.php","start":12440757,"end":12445493},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Filter/ExcludeGroupFilterIterator.php","start":12445493,"end":12446195},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Filter/Factory.php","start":12446195,"end":12448309},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Filter/GroupFilterIterator.php","start":12448309,"end":12450071},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Filter/IncludeGroupFilterIterator.php","start":12450071,"end":12450772},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Filter/NameFilterIterator.php","start":12450772,"end":12454824},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Filter/TestIdFilterIterator.php","start":12454824,"end":12456660},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/GarbageCollection/GarbageCollectionHandler.php","start":12456660,"end":12458980},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/GarbageCollection/Subscriber/ExecutionFinishedSubscriber.php","start":12458980,"end":12460020},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/GarbageCollection/Subscriber/ExecutionStartedSubscriber.php","start":12460020,"end":12461053},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/GarbageCollection/Subscriber/Subscriber.php","start":12461053,"end":12461860},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/GarbageCollection/Subscriber/TestFinishedSubscriber.php","start":12461860,"end":12462791},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/PhptTestCase.php","start":12462791,"end":12486565},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/DefaultResultCache.php","start":12486565,"end":12490661},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/NullResultCache.php","start":12490661,"end":12491683},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/ResultCache.php","start":12491683,"end":12492554},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/ResultCacheHandler.php","start":12492554,"end":12496926},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/Subscriber.php","start":12496926,"end":12497709},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/TestConsideredRiskySubscriber.php","start":12497709,"end":12498523},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/TestErroredSubscriber.php","start":12498523,"end":12499289},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/TestFailedSubscriber.php","start":12499289,"end":12500049},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/TestFinishedSubscriber.php","start":12500049,"end":12500980},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/TestMarkedIncompleteSubscriber.php","start":12500980,"end":12501800},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/TestPreparedSubscriber.php","start":12501800,"end":12502572},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/TestSkippedSubscriber.php","start":12502572,"end":12503497},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/TestSuiteFinishedSubscriber.php","start":12503497,"end":12504283},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/ResultCache/Subscriber/TestSuiteStartedSubscriber.php","start":12504283,"end":12505063},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Collector.php","start":12505063,"end":12524647},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Facade.php","start":12524647,"end":12527635},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Issue.php","start":12527635,"end":12530403},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/PassedTests.php","start":12530403,"end":12533514},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/AfterTestClassMethodErroredSubscriber.php","start":12533514,"end":12534393},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/BeforeTestClassMethodErroredSubscriber.php","start":12534393,"end":12535282},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/ExecutionStartedSubscriber.php","start":12535282,"end":12536161},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/Subscriber.php","start":12536161,"end":12536932},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestConsideredRiskySubscriber.php","start":12536932,"end":12537751},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestErroredSubscriber.php","start":12537751,"end":12538522},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestFailedSubscriber.php","start":12538522,"end":12539287},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestFinishedSubscriber.php","start":12539287,"end":12540064},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestMarkedIncompleteSubscriber.php","start":12540064,"end":12540889},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestPreparedSubscriber.php","start":12540889,"end":12541660},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestRunnerTriggeredDeprecationSubscriber.php","start":12541660,"end":12542533},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestRunnerTriggeredWarningSubscriber.php","start":12542533,"end":12543382},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestSkippedSubscriber.php","start":12543382,"end":12544153},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestSuiteFinishedSubscriber.php","start":12544153,"end":12544950},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestSuiteSkippedSubscriber.php","start":12544950,"end":12545741},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestSuiteStartedSubscriber.php","start":12545741,"end":12546532},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredDeprecationSubscriber.php","start":12546532,"end":12547381},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredErrorSubscriber.php","start":12547381,"end":12548194},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredNoticeSubscriber.php","start":12548194,"end":12549013},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredPhpDeprecationSubscriber.php","start":12549013,"end":12549880},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredPhpNoticeSubscriber.php","start":12549880,"end":12550717},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredPhpWarningSubscriber.php","start":12550717,"end":12551560},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredPhpunitDeprecationSubscriber.php","start":12551560,"end":12552451},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredPhpunitErrorSubscriber.php","start":12552451,"end":12553306},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredPhpunitWarningSubscriber.php","start":12553306,"end":12554173},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/Subscriber/TestTriggeredWarningSubscriber.php","start":12554173,"end":12554998},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestResult/TestResult.php","start":12554998,"end":12572193},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestSuiteLoader.php","start":12572193,"end":12576226},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/TestSuiteSorter.php","start":12576226,"end":12586263},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Runner/Version.php","start":12586263,"end":12587874},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Application.php","start":12587874,"end":12614057},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Command.php","start":12614057,"end":12614611},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/AtLeastVersionCommand.php","start":12614611,"end":12615570},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/CheckPhpConfigurationCommand.php","start":12615570,"end":12620511},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/GenerateConfigurationCommand.php","start":12620511,"end":12623355},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/ListGroupsCommand.php","start":12623355,"end":12625678},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/ListTestSuitesCommand.php","start":12625678,"end":12627847},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/ListTestsAsTextCommand.php","start":12627847,"end":12630319},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/ListTestsAsXmlCommand.php","start":12630319,"end":12634624},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/MigrateConfigurationCommand.php","start":12634624,"end":12636389},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/ShowHelpCommand.php","start":12636389,"end":12637273},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/ShowVersionCommand.php","start":12637273,"end":12637901},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/VersionCheckCommand.php","start":12637901,"end":12640304},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Commands/WarmCodeCoverageCacheCommand.php","start":12640304,"end":12642910},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Command/Result.php","start":12642910,"end":12644155},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Builder.php","start":12644155,"end":12645886},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Cli/Builder.php","start":12645886,"end":12683286},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Cli/Configuration.php","start":12683286,"end":12744276},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Cli/Exception.php","start":12744276,"end":12744878},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Cli/XmlConfigurationFileFinder.php","start":12744878,"end":12746779},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/CodeCoverageFilterRegistry.php","start":12746779,"end":12748702},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Configuration.php","start":12748702,"end":12793540},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/CannotFindSchemaException.php","start":12793540,"end":12794197},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/CodeCoverageReportNotConfiguredException.php","start":12794197,"end":12794822},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/ConfigurationCannotBeBuiltException.php","start":12794822,"end":12795442},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/Exception.php","start":12795442,"end":12796003},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/FilterNotConfiguredException.php","start":12796003,"end":12796616},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/LoggingNotConfiguredException.php","start":12796616,"end":12797230},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/NoBaselineException.php","start":12797230,"end":12797834},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/NoBootstrapException.php","start":12797834,"end":12798439},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/NoCacheDirectoryException.php","start":12798439,"end":12799049},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/NoCliArgumentException.php","start":12799049,"end":12799656},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/NoConfigurationFileException.php","start":12799656,"end":12800269},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/NoCoverageCacheDirectoryException.php","start":12800269,"end":12800887},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/NoCustomCssFileException.php","start":12800887,"end":12801496},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/NoDefaultTestSuiteException.php","start":12801496,"end":12802108},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Exception/NoPharExtensionDirectoryException.php","start":12802108,"end":12802726},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Merger.php","start":12802726,"end":12842575},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/PhpHandler.php","start":12842575,"end":12846459},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Registry.php","start":12846459,"end":12849868},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/SourceFilter.php","start":12849868,"end":12851097},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/SourceMapper.php","start":12851097,"end":12853657},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/TestSuiteBuilder.php","start":12853657,"end":12857991},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/Constant.php","start":12857991,"end":12858821},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/ConstantCollection.php","start":12858821,"end":12860168},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/ConstantCollectionIterator.php","start":12860168,"end":12861542},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/Directory.php","start":12861542,"end":12862197},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/DirectoryCollection.php","start":12862197,"end":12863656},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/DirectoryCollectionIterator.php","start":12863656,"end":12865047},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/ExtensionBootstrap.php","start":12865047,"end":12866253},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/ExtensionBootstrapCollection.php","start":12866253,"end":12867628},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/ExtensionBootstrapCollectionIterator.php","start":12867628,"end":12869112},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/File.php","start":12869112,"end":12869926},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/FileCollection.php","start":12869926,"end":12871292},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/FileCollectionIterator.php","start":12871292,"end":12872622},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/FilterDirectory.php","start":12872622,"end":12873781},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/FilterDirectoryCollection.php","start":12873781,"end":12875295},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/FilterDirectoryCollectionIterator.php","start":12875295,"end":12876716},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/Group.php","start":12876716,"end":12877367},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/GroupCollection.php","start":12877367,"end":12878871},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/GroupCollectionIterator.php","start":12878871,"end":12880212},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/IniSetting.php","start":12880212,"end":12881029},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/IniSettingCollection.php","start":12881029,"end":12882410},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/IniSettingCollectionIterator.php","start":12882410,"end":12883806},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/Php.php","start":12883806,"end":12887032},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/Source.php","start":12887032,"end":12892617},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/TestDirectory.php","start":12892617,"end":12894348},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/TestDirectoryCollection.php","start":12894348,"end":12895839},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/TestDirectoryCollectionIterator.php","start":12895839,"end":12897250},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/TestFile.php","start":12897250,"end":12898456},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/TestFileCollection.php","start":12898456,"end":12899853},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/TestFileCollectionIterator.php","start":12899853,"end":12901203},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/TestSuite.php","start":12901203,"end":12902678},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/TestSuiteCollection.php","start":12902678,"end":12904128},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/TestSuiteCollectionIterator.php","start":12904128,"end":12905513},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/Variable.php","start":12905513,"end":12906479},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/VariableCollection.php","start":12906479,"end":12907826},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Value/VariableCollectionIterator.php","start":12907826,"end":12909200},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/CodeCoverage/CodeCoverage.php","start":12909200,"end":12917101},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/CodeCoverage/Report/Clover.php","start":12917101,"end":12917914},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/CodeCoverage/Report/Cobertura.php","start":12917914,"end":12918730},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/CodeCoverage/Report/Crap4j.php","start":12918730,"end":12919721},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/CodeCoverage/Report/Html.php","start":12919721,"end":12922684},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/CodeCoverage/Report/Php.php","start":12922684,"end":12923494},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/CodeCoverage/Report/Text.php","start":12923494,"end":12924766},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/CodeCoverage/Report/Xml.php","start":12924766,"end":12925596},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Configuration.php","start":12925596,"end":12928373},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/DefaultConfiguration.php","start":12928373,"end":12933346},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Exception.php","start":12933346,"end":12933952},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Generator.php","start":12933952,"end":12936204},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Groups.php","start":12936204,"end":12937436},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/LoadedFromFileConfiguration.php","start":12937436,"end":12939434},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Loader.php","start":12939434,"end":12978204},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Logging/Junit.php","start":12978204,"end":12979004},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Logging/Logging.php","start":12979004,"end":12981631},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Logging/TeamCity.php","start":12981631,"end":12982434},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Logging/TestDox/Html.php","start":12982434,"end":12983241},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Logging/TestDox/Text.php","start":12983241,"end":12984048},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/MigrationBuilder.php","start":12984048,"end":12986980},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/MigrationException.php","start":12986980,"end":12987609},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/ConvertLogTypes.php","start":12987609,"end":12989241},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/CoverageCloverToReport.php","start":12989241,"end":12990172},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/CoverageCrap4jToReport.php","start":12990172,"end":12991171},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/CoverageHtmlToReport.php","start":12991171,"end":12992183},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/CoveragePhpToReport.php","start":12992183,"end":12993095},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/CoverageTextToReport.php","start":12993095,"end":12994108},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/CoverageXmlToReport.php","start":12994108,"end":12995025},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/IntroduceCacheDirectoryAttribute.php","start":12995025,"end":12995961},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/IntroduceCoverageElement.php","start":12995961,"end":12996807},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/LogToReportMigration.php","start":12996807,"end":12999069},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/Migration.php","start":12999069,"end":12999671},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/MoveAttributesFromFilterWhitelistToCoverage.php","start":12999671,"end":13001208},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/MoveAttributesFromRootToCoverage.php","start":13001208,"end":13002718},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/MoveCoverageDirectoriesToSource.php","start":13002718,"end":13004392},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/MoveWhitelistExcludesToCoverage.php","start":13004392,"end":13006617},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/MoveWhitelistIncludesToCoverage.php","start":13006617,"end":13008156},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveBeStrictAboutResourceUsageDuringSmallTestsAttribute.php","start":13008156,"end":13009141},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveBeStrictAboutTodoAnnotatedTestsAttribute.php","start":13009141,"end":13010093},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveCacheResultFileAttribute.php","start":13010093,"end":13010997},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveCacheTokensAttribute.php","start":13010997,"end":13011889},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveConversionToExceptionsAttributes.php","start":13011889,"end":13013259},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveCoverageElementCacheDirectoryAttribute.php","start":13013259,"end":13014239},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveCoverageElementProcessUncoveredFilesAttribute.php","start":13014239,"end":13015240},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveEmptyFilter.php","start":13015240,"end":13016910},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveListeners.php","start":13016910,"end":13017792},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveLogTypes.php","start":13017792,"end":13018964},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveLoggingElements.php","start":13018964,"end":13020362},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveNoInteractionAttribute.php","start":13020362,"end":13021260},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemovePrinterAttributes.php","start":13021260,"end":13022263},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveTestDoxGroupsElement.php","start":13022263,"end":13023160},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveTestSuiteLoaderAttributes.php","start":13023160,"end":13024203},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RemoveVerboseAttribute.php","start":13024203,"end":13025083},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RenameBackupStaticAttributesAttribute.php","start":13025083,"end":13026220},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RenameBeStrictAboutCoversAnnotationAttribute.php","start":13026220,"end":13027399},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/RenameForceCoversAnnotationAttribute.php","start":13027399,"end":13028534},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrations/UpdateSchemaLocation.php","start":13028534,"end":13029560},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/Migrator.php","start":13029560,"end":13031092},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Migration/SnapshotNodeList.php","start":13031092,"end":13032326},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/PHPUnit.php","start":13032326,"end":13050426},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/SchemaDetector/FailedSchemaDetectionResult.php","start":13050426,"end":13051025},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/SchemaDetector/SchemaDetectionResult.php","start":13051025,"end":13051944},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/SchemaDetector/SchemaDetector.php","start":13051944,"end":13053121},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/SchemaDetector/SuccessfulSchemaDetectionResult.php","start":13053121,"end":13054262},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/SchemaFinder.php","start":13054262,"end":13056242},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/TestSuiteMapper.php","start":13056242,"end":13060412},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Validator/ValidationResult.php","start":13060412,"end":13062268},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Configuration/Xml/Validator/Validator.php","start":13062268,"end":13063383},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Exception/CannotOpenSocketException.php","start":13063383,"end":13064244},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Exception/Exception.php","start":13064244,"end":13064791},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Exception/InvalidSocketException.php","start":13064791,"end":13065638},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Exception/RuntimeException.php","start":13065638,"end":13066203},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Exception/TestDirectoryNotFoundException.php","start":13066203,"end":13067032},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Exception/TestFileNotFoundException.php","start":13067032,"end":13067851},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Help.php","start":13067851,"end":13086253},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/ProgressPrinter.php","start":13086253,"end":13098480},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/BeforeTestClassMethodErroredSubscriber.php","start":13098480,"end":13099377},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/Subscriber.php","start":13099377,"end":13100170},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestConsideredRiskySubscriber.php","start":13100170,"end":13100997},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestErroredSubscriber.php","start":13100997,"end":13101782},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestFailedSubscriber.php","start":13101782,"end":13102555},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestFinishedSubscriber.php","start":13102555,"end":13103340},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestMarkedIncompleteSubscriber.php","start":13103340,"end":13104173},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestPreparedSubscriber.php","start":13104173,"end":13104958},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestRunnerExecutionStartedSubscriber.php","start":13104958,"end":13105821},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestSkippedSubscriber.php","start":13105821,"end":13106600},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestTriggeredDeprecationSubscriber.php","start":13106600,"end":13107463},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestTriggeredErrorSubscriber.php","start":13107463,"end":13108290},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestTriggeredNoticeSubscriber.php","start":13108290,"end":13109123},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestTriggeredPhpDeprecationSubscriber.php","start":13109123,"end":13110004},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestTriggeredPhpNoticeSubscriber.php","start":13110004,"end":13110855},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestTriggeredPhpWarningSubscriber.php","start":13110855,"end":13111712},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestTriggeredPhpunitDeprecationSubscriber.php","start":13111712,"end":13112611},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestTriggeredPhpunitWarningSubscriber.php","start":13112611,"end":13113486},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ProgressPrinter/Subscriber/TestTriggeredWarningSubscriber.php","start":13113486,"end":13114325},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/ResultPrinter.php","start":13114325,"end":13135356},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Default/UnexpectedOutputPrinter.php","start":13135356,"end":13136433},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Facade.php","start":13136433,"end":13145830},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Printer/DefaultPrinter.php","start":13145830,"end":13148969},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Printer/NullPrinter.php","start":13148969,"end":13149615},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/Printer/Printer.php","start":13149615,"end":13150218},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/SummaryPrinter.php","start":13150218,"end":13155710},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/Output/TestDox/ResultPrinter.php","start":13155710,"end":13165667},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/ShellExitCodeCalculator.php","start":13165667,"end":13170555},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/TestRunner.php","start":13170555,"end":13173095},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/TextUI/TestSuiteFilterProcessor.php","start":13173095,"end":13175578},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Cloner.php","start":13175578,"end":13176444},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Color.php","start":13176444,"end":13181295},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Exception/Exception.php","start":13181295,"end":13181840},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Exception/InvalidDirectoryException.php","start":13181840,"end":13182666},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Exception/InvalidJsonException.php","start":13182666,"end":13183255},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Exception/InvalidVersionOperatorException.php","start":13183255,"end":13184108},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Exception/PhpProcessException.php","start":13184108,"end":13184728},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Exception/XmlException.php","start":13184728,"end":13185341},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/ExcludeList.php","start":13185341,"end":13191140},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Exporter.php","start":13191140,"end":13192721},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Filesystem.php","start":13192721,"end":13194082},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Filter.php","start":13194082,"end":13197684},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/GlobalState.php","start":13197684,"end":13206695},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Http/Downloader.php","start":13206695,"end":13207317},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Http/PhpDownloader.php","start":13207317,"end":13208076},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Json.php","start":13208076,"end":13211207},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/PHP/AbstractPhpProcess.php","start":13211207,"end":13219636},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/PHP/DefaultPhpProcess.php","start":13219636,"end":13223279},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/PHP/Template/PhptTestCase.tpl","start":13223279,"end":13224466},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/PHP/Template/TestCaseClass.tpl","start":13224466,"end":13227638},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/PHP/Template/TestCaseMethod.tpl","start":13227638,"end":13230816},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Reflection.php","start":13230816,"end":13233762},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Test.php","start":13233762,"end":13234807},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/ThrowableToStringMapper.php","start":13234807,"end":13236255},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/VersionComparisonOperator.php","start":13236255,"end":13237828},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Xml/Loader.php","start":13237828,"end":13241121},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/phpunit/phpunit/src/Util/Xml/Xml.php","start":13241121,"end":13243318},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser/ChangeLog.md","start":13243318,"end":13244162},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser/SECURITY.md","start":13244162,"end":13246071},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser/src/Parser.php","start":13246071,"end":13251874},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser/src/exceptions/AmbiguousOptionException.php","start":13251874,"end":13252517},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser/src/exceptions/Exception.php","start":13252517,"end":13252881},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser/src/exceptions/OptionDoesNotAllowArgumentException.php","start":13252881,"end":13253549},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser/src/exceptions/RequiredOptionArgumentMissingException.php","start":13253549,"end":13254226},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/cli-parser/src/exceptions/UnknownOptionException.php","start":13254226,"end":13254862},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit-reverse-lookup/.psalm/baseline.xml","start":13254862,"end":13255154},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit-reverse-lookup/.psalm/config.xml","start":13255154,"end":13255620},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit-reverse-lookup/ChangeLog.md","start":13255620,"end":13256839},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit-reverse-lookup/SECURITY.md","start":13256839,"end":13257431},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit-reverse-lookup/src/Wizard.php","start":13257431,"end":13260674},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/ChangeLog.md","start":13260674,"end":13263177},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/SECURITY.md","start":13263177,"end":13263769},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/ClassMethodUnit.php","start":13263769,"end":13264292},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/ClassUnit.php","start":13264292,"end":13264797},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/CodeUnit.php","start":13264797,"end":13277136},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/CodeUnitCollection.php","start":13277136,"end":13278701},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/CodeUnitCollectionIterator.php","start":13278701,"end":13279810},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/FileUnit.php","start":13279810,"end":13280312},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/FunctionUnit.php","start":13280312,"end":13280826},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/InterfaceMethodUnit.php","start":13280826,"end":13281357},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/InterfaceUnit.php","start":13281357,"end":13281874},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/Mapper.php","start":13281874,"end":13289257},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/TraitMethodUnit.php","start":13289257,"end":13289780},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/TraitUnit.php","start":13289780,"end":13290285},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/exceptions/Exception.php","start":13290285,"end":13290647},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/exceptions/InvalidCodeUnitException.php","start":13290647,"end":13291061},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/exceptions/NoTraitException.php","start":13291061,"end":13291467},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/code-unit/src/exceptions/ReflectionException.php","start":13291467,"end":13291876},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/ChangeLog.md","start":13291876,"end":13298021},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/SECURITY.md","start":13298021,"end":13299930},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/ArrayComparator.php","start":13299930,"end":13303828},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/Comparator.php","start":13303828,"end":13304666},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/ComparisonFailure.php","start":13304666,"end":13306460},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/DOMNodeComparator.php","start":13306460,"end":13308831},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/DateTimeComparator.php","start":13308831,"end":13311143},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/ExceptionComparator.php","start":13311143,"end":13312120},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/Factory.php","start":13312120,"end":13315536},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/MockObjectComparator.php","start":13315536,"end":13316616},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/NumericComparator.php","start":13316616,"end":13318599},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/ObjectComparator.php","start":13318599,"end":13321484},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/ResourceComparator.php","start":13321484,"end":13322640},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/ScalarComparator.php","start":13322640,"end":13325468},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/SplObjectStorageComparator.php","start":13325468,"end":13327257},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/TypeComparator.php","start":13327257,"end":13328465},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/exceptions/Exception.php","start":13328465,"end":13328830},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/comparator/src/exceptions/RuntimeException.php","start":13328830,"end":13329217},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/ChangeLog.md","start":13329217,"end":13331157},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/SECURITY.md","start":13331157,"end":13333066},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src/Calculator.php","start":13333066,"end":13335427},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src/Complexity/Complexity.php","start":13335427,"end":13336766},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src/Complexity/ComplexityCollection.php","start":13336766,"end":13339691},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src/Complexity/ComplexityCollectionIterator.php","start":13339691,"end":13340738},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src/Exception/Exception.php","start":13340738,"end":13341103},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src/Exception/RuntimeException.php","start":13341103,"end":13341490},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src/Visitor/ComplexityCalculatingVisitor.php","start":13341490,"end":13345002},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/complexity/src/Visitor/CyclomaticComplexityCalculatingVisitor.php","start":13345002,"end":13346671},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/ChangeLog.md","start":13346671,"end":13351799},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/SECURITY.md","start":13351799,"end":13353708},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Chunk.php","start":13353708,"end":13356194},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Diff.php","start":13356194,"end":13358329},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Differ.php","start":13358329,"end":13365062},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Exception/ConfigurationException.php","start":13365062,"end":13366023},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Exception/Exception.php","start":13366023,"end":13366376},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Exception/InvalidArgumentException.php","start":13366376,"end":13366761},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Line.php","start":13366761,"end":13368065},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/LongestCommonSubsequenceCalculator.php","start":13368065,"end":13368551},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/MemoryEfficientLongestCommonSubsequenceCalculator.php","start":13368551,"end":13371226},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Output/AbstractChunkOutputBuilder.php","start":13371226,"end":13372764},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Output/DiffOnlyOutputBuilder.php","start":13372764,"end":13374861},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Output/DiffOutputBuilderInterface.php","start":13374861,"end":13375382},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Output/StrictUnifiedDiffOutputBuilder.php","start":13375382,"end":13386306},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Output/UnifiedDiffOutputBuilder.php","start":13386306,"end":13394687},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/Parser.php","start":13394687,"end":13397869},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/diff/src/TimeEfficientLongestCommonSubsequenceCalculator.php","start":13397869,"end":13400237},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/environment/ChangeLog.md","start":13400237,"end":13407159},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/environment/SECURITY.md","start":13407159,"end":13409068},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/environment/src/Console.php","start":13409068,"end":13414089},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/environment/src/Runtime.php","start":13414089,"end":13421444},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/exporter/ChangeLog.md","start":13421444,"end":13422587},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/exporter/SECURITY.md","start":13422587,"end":13424496},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/exporter/src/Exporter.php","start":13424496,"end":13434278},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state/ChangeLog.md","start":13434278,"end":13437939},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state/SECURITY.md","start":13437939,"end":13439848},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state/src/CodeExporter.php","start":13439848,"end":13442470},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state/src/ExcludeList.php","start":13442470,"end":13445055},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state/src/Restorer.php","start":13445055,"end":13448566},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state/src/Snapshot.php","start":13448566,"end":13458911},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state/src/exceptions/Exception.php","start":13458911,"end":13459279},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/global-state/src/exceptions/RuntimeException.php","start":13459279,"end":13459669},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/ChangeLog.md","start":13459669,"end":13461196},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/SECURITY.md","start":13461196,"end":13463105},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/src/Counter.php","start":13463105,"end":13465431},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/src/Exception/Exception.php","start":13465431,"end":13465800},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/src/Exception/IllogicalValuesException.php","start":13465800,"end":13466217},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/src/Exception/NegativeValueException.php","start":13466217,"end":13466652},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/src/Exception/RuntimeException.php","start":13466652,"end":13467043},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/src/LineCountingVisitor.php","start":13467043,"end":13469375},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/lines-of-code/src/LinesOfCode.php","start":13469375,"end":13472797},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/object-enumerator/ChangeLog.md","start":13472797,"end":13475348},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/object-enumerator/SECURITY.md","start":13475348,"end":13475940},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/object-enumerator/phpunit.xml","start":13475940,"end":13476730},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/object-enumerator/src/Enumerator.php","start":13476730,"end":13478563},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/object-reflector/ChangeLog.md","start":13478563,"end":13480513},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/object-reflector/SECURITY.md","start":13480513,"end":13481105},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/object-reflector/src/ObjectReflector.php","start":13481105,"end":13482119},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/recursion-context/ChangeLog.md","start":13482119,"end":13483786},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/recursion-context/SECURITY.md","start":13483786,"end":13485695},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/recursion-context/src/Context.php","start":13485695,"end":13489339},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/ChangeLog.md","start":13489339,"end":13495114},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/SECURITY.md","start":13495114,"end":13495706},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/infection.json","start":13495706,"end":13495880},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/Parameter.php","start":13495880,"end":13496640},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/ReflectionMapper.php","start":13496640,"end":13502062},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/TypeName.php","start":13502062,"end":13503918},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/exception/Exception.php","start":13503918,"end":13504271},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/exception/RuntimeException.php","start":13504271,"end":13504646},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/CallableType.php","start":13504646,"end":13508951},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/FalseType.php","start":13508951,"end":13509831},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/GenericObjectType.php","start":13509831,"end":13510876},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/IntersectionType.php","start":13510876,"end":13513671},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/IterableType.php","start":13513671,"end":13515178},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/MixedType.php","start":13515178,"end":13515972},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/NeverType.php","start":13515972,"end":13516686},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/NullType.php","start":13516686,"end":13517477},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/ObjectType.php","start":13517477,"end":13519040},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/SimpleType.php","start":13519040,"end":13520886},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/StaticType.php","start":13520886,"end":13522350},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/TrueType.php","start":13522350,"end":13523225},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/Type.php","start":13523225,"end":13527490},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/UnionType.php","start":13527490,"end":13530449},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/UnknownType.php","start":13530449,"end":13531228},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/type/src/type/VoidType.php","start":13531228,"end":13531938},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/version/ChangeLog.md","start":13531938,"end":13533092},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/version/SECURITY.md","start":13533092,"end":13533684},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/sebastian/version/src/Version.php","start":13533684,"end":13535730},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer/CHANGELOG.md","start":13535730,"end":13537841},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer/src/Exception.php","start":13537841,"end":13537943},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer/src/NamespaceUri.php","start":13537943,"end":13538538},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer/src/NamespaceUriException.php","start":13538538,"end":13538651},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer/src/Token.php","start":13538651,"end":13539295},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer/src/TokenCollection.php","start":13539295,"end":13541533},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer/src/TokenCollectionException.php","start":13541533,"end":13541649},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer/src/Tokenizer.php","start":13541649,"end":13545230},{"filename":"/app/vendor/syntaxx/phpx-framework/vendor/theseer/tokenizer/src/XMLSerializer.php","start":13545230,"end":13547517},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Installer.php","start":13547517,"end":13553362},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Installer.php:Zone.Identifier","start":13553362,"end":13553362},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Plugin.php","start":13553362,"end":13554320}],"remote_package_size":13554320,"package_uuid":"sha256-c591d0469e081e79b93c084634ff1a24074d03c3b13035913584fa7efea43176"});

  })();


var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = true;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (typeof document != "undefined" && document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (_scriptDir) {
  scriptDirectory = _scriptDir;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 {
  read_ = url => {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = url => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(xhr.response);
   };
  }
  readAsync = (url, onload, onerror) => {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = () => {
    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
 setWindowTitle = title => document.title = title;
} else {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.warn.bind(console);

Object.assign(Module, moduleOverrides);

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

var noExitRuntime = Module["noExitRuntime"] || true;

if (typeof WebAssembly != "object") {
 abort("no native wasm support detected");
}

var wasmMemory;

var ABORT = false;

var EXITSTATUS;

function assert(condition, text) {
 if (!condition) {
  abort(text);
 }
}

var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateMemoryViews() {
 var b = wasmMemory.buffer;
 Module["HEAP8"] = HEAP8 = new Int8Array(b);
 Module["HEAP16"] = HEAP16 = new Int16Array(b);
 Module["HEAP32"] = HEAP32 = new Int32Array(b);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
}

var wasmTable;

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
 return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 FS.ignorePermissions = false;
 TTY.init();
 SOCKFS.root = FS.mount(SOCKFS, {}, null);
 PIPEFS.root = FS.mount(PIPEFS, {}, null);
 callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
 return id;
}

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 what = "Aborted(" + what + ")";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what += ". Build with -sASSERTIONS for more info.";
 var e = new WebAssembly.RuntimeError(what);
 readyPromiseReject(e);
 throw e;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return filename.startsWith(dataURIPrefix);
}

var wasmBinaryFile;

if (Module["locateFile"]) {
 wasmBinaryFile = "php-vrzno-web.wasm";
 if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
 }
} else {
 wasmBinaryFile = new URL("php-vrzno-web.wasm", import.meta.url).href;
}

function getBinary(file) {
 try {
  if (file == wasmBinaryFile && wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
   return readBinary(file);
  }
  throw "both async and sync fetching of the wasm failed";
 } catch (err) {
  abort(err);
 }
}

function getBinaryPromise(binaryFile) {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
  if (typeof fetch == "function") {
   return fetch(binaryFile, {
    credentials: "same-origin"
   }).then(function(response) {
    if (!response["ok"]) {
     throw "failed to load wasm binary file at '" + binaryFile + "'";
    }
    return response["arrayBuffer"]();
   }).catch(function() {
    return getBinary(binaryFile);
   });
  }
 }
 return Promise.resolve().then(function() {
  return getBinary(binaryFile);
 });
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
 return getBinaryPromise(binaryFile).then(function(binary) {
  return WebAssembly.instantiate(binary, imports);
 }).then(function(instance) {
  return instance;
 }).then(receiver, function(reason) {
  err("failed to asynchronously prepare wasm: " + reason);
  abort(reason);
 });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
 if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
  return fetch(binaryFile, {
   credentials: "same-origin"
  }).then(function(response) {
   var result = WebAssembly.instantiateStreaming(response, imports);
   return result.then(callback, function(reason) {
    err("wasm streaming compile failed: " + reason);
    err("falling back to ArrayBuffer instantiation");
    return instantiateArrayBuffer(binaryFile, imports, callback);
   });
  });
 } else {
  return instantiateArrayBuffer(binaryFile, imports, callback);
 }
}

function createWasm() {
 var info = {
  "env": wasmImports,
  "wasi_snapshot_preview1": wasmImports
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  Module["asm"] = exports;
  wasmMemory = Module["asm"]["memory"];
  updateMemoryViews();
  wasmTable = Module["asm"]["__indirect_function_table"];
  addOnInit(Module["asm"]["__wasm_call_ctors"]);
  removeRunDependency("wasm-instantiate");
  return exports;
 }
 addRunDependency("wasm-instantiate");
 function receiveInstantiationResult(result) {
  receiveInstance(result["instance"]);
 }
 if (Module["instantiateWasm"]) {
  try {
   return Module["instantiateWasm"](info, receiveInstance);
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   readyPromiseReject(e);
  }
 }
 instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
 return {};
}

var tempDouble;

var tempI64;

var ASM_CONSTS = {
 1923868: ($0, $1, $2) => {
  const target = Module.targets.get($0);
  const property = UTF8ToString($1);
  const rv = $2;
  if (!(property in target)) {
   return Module.jsToZval(undefined, rv);
  }
  Module.jsToZval(target[property], rv);
 },
 1924069: ($0, $1, $2, $3, $4) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   const funcPtr = $2;
   target[property] = Module.callableToJs(funcPtr);
   const gc = Module.ccall("vrzno_expose_closure", "number", [ "number" ], [ funcPtr ]);
   Module.fRegistry.register(target[property], gc, target[property]);
  })();
 },
 1924426: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   const zvalPtr = $2;
   const zo = Module.ccall("vrzno_expose_object", "number", [ "number" ], [ zvalPtr ]);
   target[property] = Module.marshalZObject(zo);
  })();
 },
 1924669: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   const zvalPtr = $2;
   const za = Module.ccall("vrzno_expose_array", "number", [ "number" ], [ zvalPtr ]);
   target[property] = Module.marshalZArray(za);
  })();
 },
 1924910: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   delete target[property];
  })();
 },
 1925026: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = null;
  })();
 },
 1925142: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = false;
  })();
 },
 1925259: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = true;
  })();
 },
 1925375: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = $2;
  })();
 },
 1925489: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   target[property] = $2;
  })();
 },
 1925603: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   const newValue = UTF8ToString($2);
   target[property] = newValue;
  })();
 },
 1925758: ($0, $1, $2) => {
  let target = Module.targets.get($0);
  const property = $1;
  const rv = $2;
  if (target instanceof ArrayBuffer) {
   if (!Module.bufferMaps.has(target)) {
    Module.bufferMaps.set(target, new Uint8Array(target));
   }
   target = Module.bufferMaps.get(target);
  }
  if (!(property in target)) {
   return Module.jsToZval(undefined, rv);
  }
  Module.jsToZval(target[property], rv);
 },
 1926115: ($0, $1, $2, $3) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   const funcPtr = $2;
   target[property] = Module.callableToJs(funcPtr);
   const gc = Module.ccall("vrzno_expose_closure", "number", [ "number" ], [ funcPtr ]);
   Module.fRegistry.register(target[property], gc, target[property]);
  })();
 },
 1926436: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   const zvalPtr = $2;
   const zo = Module.ccall("vrzno_expose_object", "number", [ "number" ], [ zvalPtr ]);
   target[property] = Module.marshalZObject(zo);
  })();
 },
 1926665: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   const zvalPtr = $2;
   const za = Module.ccall("vrzno_expose_array", "number", [ "number" ], [ zvalPtr ]);
   target[property] = Module.marshalZArray(za);
  })();
 },
 1926892: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   delete target[property];
  })();
 },
 1926994: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = null;
  })();
 },
 1927096: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = false;
  })();
 },
 1927199: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = true;
  })();
 },
 1927301: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = $2;
  })();
 },
 1927401: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   target[property] = $2;
  })();
 },
 1927501: ($0, $1, $2) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   const newValue = UTF8ToString($2);
   target[property] = newValue;
  })();
 },
 1927642: ($0, $1, $2) => {
  const target = Module.targets.get($0);
  const property = $1;
  const check_empty = $2;
  if (Array.isArray(target)) {
   return typeof target[property] !== "undefined";
  }
  if (target instanceof ArrayBuffer) {
   if (!Module.bufferMaps.has(target)) {
    Module.bufferMaps.set(target, new Uint8Array(target));
   }
   const targetBytes = Module.bufferMaps.get(target);
   return targetBytes[property] !== "undefined";
  }
  if (!check_empty) {
   return property in target;
  } else {
   return !!target[property];
  }
 },
 1928121: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = UTF8ToString($1);
   delete target[property];
  })();
 },
 1928237: ($0, $1) => {
  (() => {
   const target = Module.targets.get($0);
   const property = $1;
   delete target[property];
  })();
 },
 1928339: $0 => {
  const target = Module.targets.get($0);
  let json;
  if (typeof target === "function") {
   json = JSON.stringify({});
  } else {
   try {
    json = JSON.stringify({
     ...target
    });
   } catch {
    json = JSON.stringify({});
   }
  }
  const str = String(json);
  const len = 1 + lengthBytesUTF8(str);
  const loc = _malloc(len);
  stringToUTF8(str, loc, len);
  return loc;
 },
 1928676: ($0, $1) => {
  const target = Module.targets.get($0);
  const property = UTF8ToString($1);
  return property in target;
 },
 1928781: $0 => {
  const target = Module.targets.get($0);
  const str = target.constructor && target.constructor.name || "Object";
  const loc = 1 + lengthBytesUTF8(name);
  const len = _malloc(name);
  stringToUTF8(str, loc, len);
  return namePtr;
 },
 1929008: ($0, $1, $2) => {
  const target = Module.targets.get($0);
  const property_name = UTF8ToString($1);
  const rv = $2;
  return Module.jsToZval(target[property_name], rv);
 },
 1929157: ($0, $1, $2, $3, $4, $5) => {
  const target = Module.targets.get($0);
  const method_name = UTF8ToString($1);
  const argp = $2;
  const argc = $3;
  const size = $4;
  const rv = $5;
  const args = [];
  for (let i = 0; i < argc; i++) {
   const loc = argp + i * size;
   const ptr = Module.getValue(loc, "*");
   const arg = Module.zvalToJS(ptr);
   args.push(arg);
  }
  Module.jsToZval(target[method_name](...args), rv);
 },
 1929524: ($0, $1, $2, $3, $4) => {
  const target = Module.targets.get($0);
  const argv = $1;
  const argc = $2;
  const size = $3;
  const rv = $4;
  const args = [];
  for (let i = 0; i < argc; i++) {
   args.push(Module.zvalToJS(argv + i * size));
  }
  return Module.jsToZval(target(...args), rv);
 },
 1929774: ($0, $1, $2, $3) => {
  const _class = Module._classes.get($0);
  const argv = $1;
  const argc = $2;
  const size = $3;
  const args = [];
  for (let i = 0; i < argc; i++) {
   args.push(Module.zvalToJS(argv + i * size));
  }
  const _object = new _class(...args);
  const index = Module.targets.add(_object);
  Module.tacked.add(_object);
  return index;
 },
 1930087: $0 => {
  const target = Module.targets.get($0);
  Module.tacked.delete(target);
  Module.targets.remove(target);
 },
 1930191: $0 => {
  const target = Module.targets.get($0);
  const str = String(target);
  const len = 1 + lengthBytesUTF8(str);
  const loc = _malloc(len);
  stringToUTF8(str, loc, len);
  return loc;
 },
 1930367: () => {
  const context = {};
  Module.tacked.add(context);
  return Module.targets.add(context);
 },
 1930455: ($0, $1) => {
  const context = Module.targets.get($0);
  const method = UTF8ToString($1);
  context.method = method;
 },
 1930561: ($0, $1) => {
  (() => {
   const context = Module.targets.get($0);
   const headerLine = UTF8ToString($1);
   const colon = headerLine.indexOf(":");
   const key = headerLine.substr(0, colon).trim();
   const val = headerLine.substr(1 + colon).trim();
   context.headers = (context.headers ?? {});
   context.headers[key] = val;
  })();
 },
 1930861: ($0, $1) => {
  (() => {
   const context = Module.targets.get($0);
   const headerLines = UTF8ToString($1);
   headerLines.split("\n").forEach(headerLine => {
    const context = Module.targets.get($0);
    const colon = headerLine.indexOf(":");
    const key = headerLine.substr(0, colon).trim();
    const val = headerLine.substr(1 + colon).trim();
    context.headers = (context.headers ?? {});
    context.headers[key] = val;
   });
  })();
 },
 1931254: ($0, $1, $2) => {
  (() => {
   const context = Module.targets.get($0);
   context.body = Module.HEAPU8.slice($1, $1 + $2);
  })();
 },
 1931361: ($0, $1) => {
  const context = Module.targets.get($0);
  context.ignoreErrors = $1;
 },
 1931436: $0 => {
  const parsed = Module.targets.get($0);
  if (parsed.status < 0) {
   Module.tacked.delete(parsed);
  }
  return parsed.status;
 },
 1931561: $0 => {
  const str = String(eval(UTF8ToString($0)));
  const len = lengthBytesUTF8(str) + 1;
  const loc = _malloc(len);
  stringToUTF8(str, loc, len);
  return loc;
 },
 1931714: ($0, $1) => {
  const funcName = UTF8ToString($0);
  const argJson = UTF8ToString($1);
  const func = globalThis[funcName];
  const args = JSON.parse(argJson || "[]") || [];
  const str = String(func(...args));
  const len = lengthBytesUTF8(str) + 1;
  const loc = _malloc(len);
  stringToUTF8(str, loc, len);
  return loc;
 },
 1932010: ($0, $1) => {
  const timeout = Number(UTF8ToString($0));
  const funcPtr = $1;
  setTimeout(() => {
   Module.ccall("vrzno_exec_callback", "number", [ "number", "number", "number", "number" ], [ funcPtr, null, 0, 0 ]);
   Module.ccall("vrzno_del_callback", "number", [ "number" ], [ funcPtr ]);
  }, timeout);
 },
 1932294: ($0, $1) => {
  const name = UTF8ToString($0);
  const rv = $1;
  Module.jsToZval(Module[name], rv);
 },
 1932379: ($0, $1) => {
  const name = UTF8ToString($0);
  const rv = $1;
  Module.jsToZval(Module.shared[name], rv);
 },
 1932471: ($0, $1) => {
  const name = UTF8ToString($0);
  const rv = $1;
  Module.jsToZval(import(name), rv);
 },
 1932556: () => {
  Module.tacked.clear();
  Module.classes = new WeakMap();
  Module._classes = new Module.WeakerMap();
  Module.callables = new WeakMap();
  Module._callables = new Module.WeakerMap();
  [ ...Module.registered.entries() ].forEach(([gc, unregisterToken]) => {
   Module.fRegistry.unregister(unregisterToken);
   Module.registered.delete(gc);
  });
 },
 1932883: () => {
  Module.hasVrzno = true;
  const IS_UNDEF = 0;
  const IS_NULL = 1;
  const IS_FALSE = 2;
  const IS_TRUE = 3;
  const IS_LONG = 4;
  const IS_DOUBLE = 5;
  const IS_STRING = 6;
  const IS_ARRAY = 7;
  const IS_OBJECT = 8;
  Module.tacked = new Set();
  const _FinalizationRegistry = globalThis.FinalizationRegistry || class {
   register() {}
   unregister() {}
  };
  const FinalizationRegistryWrapper = class {
   constructor(callback) {
    this.registry = new _FinalizationRegistry(gc => {
     Module.ccall("vrzno_expose_dec_refcount", "number", [ "number" ], [ gc ]);
    });
   }
   register(target, gc, unregisterToken) {
    if (Module.unregisterTokens.has(unregisterToken)) {
     return;
    }
    Module.ccall("vrzno_expose_inc_refcount", "number", [ "number" ], [ gc ]);
    this.registry.register(target, gc, unregisterToken);
    Module.unregisterTokens.set(unregisterToken, gc);
    Module.registered.set(gc, unregisterToken);
   }
   unregister(unregisterToken) {
    this.registry.unregister(unregisterToken);
    if (Module.unregisterTokens.has(unregisterToken)) {
     const gc = Module.unregisterTokens.get(unregisterToken);
     Module.unregisterTokens.delete(unregisterToken);
     Module.registered.delete(gc);
    }
   }
  };
  const wRef = globalThis.WeakRef || class {
   constructor(val) {
    this.val = val;
   }
   deref() {
    return this.val;
   }
  };
  Module.fRegistry = new FinalizationRegistryWrapper();
  Module.bufferMaps = new WeakMap();
  const getRegistry = weakerMap => {
   const registry = new _FinalizationRegistry(key => {
    if (weakerMap.registry !== registry) {
     return;
    }
    if (weakerMap.map.has(key) && weakerMap.map.get(key).deref()) {
     return;
    }
    weakerMap.delete(key);
   });
   return registry;
  };
  Module.WeakerMap = Module.WeakerMap || class WeakerMap {
   constructor(entries) {
    this.map = new Map();
    this.registry = getRegistry(this);
    entries && entries.forEach(([key, value]) => this.set(key, value));
   }
   get size() {
    return this.map.size;
   }
   clear() {
    this.registry = getRegistry(this);
    this.map.clear();
   }
   delete(key) {
    if (!this.has(key)) {
     return;
    }
    this.registry.unregister(this.get(key));
    this.map.delete(key);
   }
   [Symbol.iterator]() {
    const mapIterator = this.map[Symbol.iterator]();
    return {
     next: () => {
      do {
       const entry = mapIterator.next();
       if (entry.done) {
        return {
         done: true
        };
       }
       const [key, ref] = entry.value;
       const value = ref.deref();
       if (!value) {
        this.map.delete(key);
        continue;
       }
       return {
        done: false,
        value: [ key, value ]
       };
      } while (true);
     }
    };
   }
   entries() {
    return {
     [Symbol.iterator]: () => this[Symbol.iterator]()
    };
   }
   forEach(callback) {
    for (const [k, v] of this) {
     callback(v, k, this);
    }
   }
   get(key) {
    if (!this.has(key)) {
     return;
    }
    const value = this.map.get(key).deref();
    if (!value) {
     this.map.delete(key);
    }
    return value;
   }
   has(key) {
    if (!this.map.has(key)) {
     return false;
    }
    const result = this.map.get(key).deref();
    if (!result) {
     this.map.delete(key);
    }
    return Boolean(result);
   }
   keys() {
    return [ ...this ].map(v => v[0]);
   }
   set(key, value) {
    if (typeof value !== "function" && typeof value !== "object") {
     throw new Error("WeakerMap values must be objects.");
    }
    if (this.has(key)) {
     this.registry.unregister(this.get(key));
    }
    this.registry.register(value, key, value);
    return this.map.set(key, new wRef(value));
   }
   values() {
    return [ ...this ].map(v => v[1]);
   }
  };
  Module.unregisterTokens = new WeakMap();
  Module.registered = new Module.WeakerMap();
  Module.marshalZObject = (zo, type) => {
   const nativeTargetId = Module.ccall("vrzno_expose_target", "number", [ "number" ], [ zo ]);
   if (nativeTargetId) {
    return Module.targets.get(nativeTargetId);
   }
   const proxy = new Proxy({}, {
    ownKeys: target => {
     const keysLoc = Module.ccall("vrzno_expose_object_keys", "number", [ "number" ], [ zo ]);
     if (keysLoc) {
      const keyJson = UTF8ToString(keysLoc);
      const keys = JSON.parse(keyJson);
      _free(keysLoc);
      keys.push(...Reflect.ownKeys(target));
      return keys;
     }
     return [];
    },
    has: (target, prop) => {
     const len = lengthBytesUTF8(prop) + 1;
     const namePtr = _malloc(len);
     stringToUTF8(prop, namePtr, len);
     const propPtr = Module.ccall("vrzno_expose_property_pointer", "number", [ "number", "number" ], [ zo, namePtr ]);
     _free(namePtr);
     return propPtr;
    },
    get: (target, prop) => {
     let retPtr;
     if (prop === Symbol.iterator) {
      return;
      const keysLoc = Module.ccall("vrzno_expose_object_keys", "number", [ "number" ], [ zo ]);
      const keyJson = UTF8ToString(keysLoc);
      const keys = JSON.parse(keyJson);
      _free(keysLoc);
      const iterator = () => {
       let current = -1;
       return {
        next() {
         const done = ++current >= keys.length;
         return {
          done: done,
          value: [ keys[current], Module.zvalToJS(Module.ccall("vrzno_expose_property_pointer", "number", [ "number", "string" ], [ zo, keys[current] ])) ]
         };
        }
       };
      };
      Module.fRegistry.register(iterator, zo, iterator);
      return iterator;
     }
     if (prop === Symbol.toPrimitive) {
      const method = "__toString";
      const len = lengthBytesUTF8(method) + 1;
      const loc = _malloc(len);
      stringToUTF8(method, loc, len);
      const methodPtr = Module.ccall("vrzno_expose_method_pointer", "number", [ "number", "number" ], [ zo, loc ]);
      _free(loc);
      return () => Module.callableToJs(methodPtr, zo)();
     }
     prop = String(prop);
     const len = lengthBytesUTF8(prop) + 1;
     const loc = _malloc(len);
     stringToUTF8(prop, loc, len);
     const methodPtr = Module.ccall("vrzno_expose_method_pointer", "number", [ "number", "number" ], [ zo, loc ]);
     if (methodPtr) {
      const wrapped = Module.callableToJs(methodPtr, zo);
      const gc = Module.ccall("vrzno_expose_closure", "number", [ "number" ], [ methodPtr ]);
      Module.fRegistry.register(wrapped, gc, wrapped);
      return wrapped;
     }
     retPtr = Module.ccall("vrzno_expose_property_pointer", "number", [ "number", "number" ], [ zo, loc ]);
     _free(loc);
     if (!retPtr) {
      return;
     }
     return Module.zvalToJS(retPtr) ?? Reflect.get(target, prop);
    },
    getOwnPropertyDescriptor: (target, prop) => {
     prop = String(prop);
     const len = lengthBytesUTF8(prop) + 1;
     const namePtr = _malloc(len);
     stringToUTF8(prop, namePtr, len);
     const retPtr = Module.ccall("vrzno_expose_property_pointer", "number", [ "number", "number" ], [ zo, namePtr ]);
     _free(namePtr);
     const proxy = Module.zvalToJS(retPtr);
     return {
      configurable: true,
      enumerable: true,
      value: target[prop]
     };
    }
   });
   Module.fRegistry.register(proxy, zo, proxy);
   return proxy;
  };
  Module.marshalZArray = (za, type) => {
   const proxy = new Proxy({}, {
    ownKeys: target => {
     const keysLoc = Module.ccall("vrzno_expose_array_keys", "number", [ "number" ], [ za ]);
     if (keysLoc) {
      const keyJson = UTF8ToString(keysLoc);
      const keys = JSON.parse(keyJson);
      _free(keysLoc);
      keys.push(...Reflect.ownKeys(target));
      return keys;
     }
     return [];
    },
    has: (target, prop) => {
     switch (typeof prop) {
     case "number":
      return !!Module.ccall("vrzno_expose_dimension_pointer", "number", [ "number", "number" ], [ za, prop ]);

     case "string":
      const len = lengthBytesUTF8(prop) + 1;
      const namePtr = _malloc(len);
      stringToUTF8(prop, namePtr, len);
      const propPtr = Module.ccall("vrzno_expose_key_pointer", "number", [ "number", "number" ], [ za, namePtr ]);
      _free(namePtr);
      return propPtr;

     default:
      return false;
     }
    },
    get: (target, prop) => {
     let retPtr;
     if (prop === Symbol.iterator) {
      const max = Module.ccall("vrzno_expose_array_length", "number", [ "number" ], [ za ]);
      const iterator = () => {
       let current = -1;
       return {
        next() {
         const done = ++current >= max;
         return {
          done: done,
          value: Module.zvalToJS(Module.ccall("vrzno_expose_dimension_pointer", "number", [ "number", "number" ], [ za, current ]))
         };
        }
       };
      };
      Module.fRegistry.register(iterator, za, iterator);
      return iterator;
     }
     if (prop === Symbol.toPrimitive) {}
     switch (typeof prop) {
     case "number":
      retPtr = Module.ccall("vrzno_expose_dimension_pointer", "number", [ "number", "number" ], [ za, prop ]);
      break;

     case "string":
      prop = String(prop);
      const len = lengthBytesUTF8(prop) + 1;
      const loc = _malloc(len);
      stringToUTF8(prop, loc, len);
      retPtr = Module.ccall("vrzno_expose_key_pointer", "number", [ "number", "number" ], [ za, loc ]);
      _free(loc);
      break;

     default:
      return false;
     }
     if (!retPtr) {
      return;
     }
     const proxy = Module.zvalToJS(retPtr);
     return proxy ?? Reflect.get(target, prop);
    },
    getOwnPropertyDescriptor: (target, prop) => {
     let retPtr;
     switch (typeof prop) {
     case "number":
      retPtr = Module.ccall("vrzno_expose_dimension_pointer", "number", [ "number", "number" ], [ za, prop ]);
      break;

     case "string":
      const len = lengthBytesUTF8(prop) + 1;
      const namePtr = _malloc(len);
      stringToUTF8(prop, namePtr, len);
      retPtr = Module.ccall("vrzno_expose_key_pointer", "number", [ "number", "number" ], [ za, namePtr ]);
      _free(namePtr);
      break;

     default:
      return false;
     }
     const proxy = Module.zvalToJS(retPtr);
     return {
      configurable: true,
      enumerable: true,
      value: target[prop]
     };
    }
   });
   Module.fRegistry.register(proxy, za, proxy);
   return proxy;
  };
  Module.callableToJs = (funcPtr, zo = null) => {
   if (Module._callables.has(funcPtr)) {
    return Module._callables.get(funcPtr);
   }
   const wrapped = (...args) => {
    if (!Module.callables.has(wrapped)) {
     console.warn(`Tried to call ${wrapped.name}, but PHPs memory has been refreshed.`);
     return;
    }
    let paramsPtr = null;
    if (args.length) {
     paramsPtr = Module.ccall("vrzno_expose_create_params", "number", [ "number" ], [ args.length ]);
     for (let i = 0; i < args.length; i++) {
      Module.jsToZval(args[i], getValue(i * 4 + paramsPtr, "*"));
     }
    }
    const zv = Module.ccall("vrzno_exec_callback", "number", [ "number", "number", "number", "number" ], [ funcPtr, paramsPtr, args.length, zo ]);
    if (args.length) {
     Module.ccall("vrzno_expose_efree", "number", [ "number" ], [ paramsPtr ]);
    }
    if (zv) {
     return Module.zvalToJS(zv);
    }
   };
   Object.defineProperty(wrapped, "name", {
    value: `PHP_@{${funcPtr.toString()}}`
   });
   Module.callables.set(wrapped, funcPtr);
   Module._callables.set(funcPtr, wrapped);
   return wrapped;
  };
  Module.zvalToJS = Module.zvalToJS || (zv => {
   if (!zv) {
    return;
   }
   zv = Module.ccall("vrzno_expose_zval_deref", "number", [ "number" ], [ zv ]);
   const nativeTargetId = Module.ccall("vrzno_expose_zval_target", "number", [ "number" ], [ zv ]);
   if (nativeTargetId) {
    return Module.targets.get(nativeTargetId);
   }
   const type = Module.ccall("vrzno_expose_type", "number", [ "number" ], [ zv ]);
   const zf = Module.ccall("vrzno_expose_callable", "number", [ "number" ], [ zv ]);
   if (zf && type !== IS_STRING) {
    const wrapped = Module.callableToJs(zf);
    const gc = Module.ccall("vrzno_expose_closure", "number", [ "number" ], [ zf ]);
    Module.fRegistry.register(wrapped, gc, wrapped);
    return wrapped;
   }
   let valPtr;
   switch (type) {
   case IS_UNDEF:
    return undefined;
    break;

   case IS_NULL:
    return null;
    break;

   case IS_TRUE:
    return true;
    break;

   case IS_FALSE:
    return false;
    break;

   case IS_LONG:
    return Module.ccall("vrzno_expose_long", "number", [ "number" ], [ zv ]);
    break;

   case IS_DOUBLE:
    valPtr = Module.ccall("vrzno_expose_double", "number", [ "number" ], [ zv ]);
    if (!valPtr) {
     return null;
    }
    return getValue(valPtr, "double");
    break;

   case IS_STRING:
    valPtr = Module.ccall("vrzno_expose_string", "number", [ "number" ], [ zv ]);
    if (!valPtr) {
     return null;
    }
    return UTF8ToString(valPtr);
    break;

   case IS_ARRAY:
    const za = Module.ccall("vrzno_expose_array", "number", [ "number" ], [ zv ]);
    return Module.marshalZArray(za, type);
    break;

   case IS_OBJECT:
    const zo = Module.ccall("vrzno_expose_object", "number", [ "number" ], [ zv ]);
    return Module.marshalZObject(zo, type);
    break;

   default:
    return null;
    break;
   }
  });
  Module.jsToZval = Module.jsToZval || ((value, rv) => {
   if (typeof value === "undefined") {
    Module.ccall("vrzno_expose_create_null", "number", [ "number" ], [ rv ]);
   } else if (value === null) {
    Module.ccall("vrzno_expose_create_null", "number", [ "number" ], [ rv ]);
   } else if ([ true, false ].includes(value)) {
    Module.ccall("vrzno_expose_create_bool", "number", [ "number", "number" ], [ value, rv ]);
   } else if (value && [ "function", "object" ].includes(typeof value)) {
    const index = Module.targets.add(value);
    const isFunction = typeof value === "function" ? index : 0;
    const isConstructor = isFunction && !!(value.prototype && value.prototype.constructor);
    Module.tacked.add(value);
    Module.ccall("vrzno_expose_create_object_for_target", "number", [ "number", "number", "number", "number" ], [ index, isFunction, isConstructor, rv ]);
   } else if (typeof value === "number") {
    if (Number.isInteger(value)) {
     Module.ccall("vrzno_expose_create_long", "number", [ "number", "number" ], [ value, rv ]);
    } else if (Number.isFinite(value)) {
     Module.ccall("vrzno_expose_create_double", "number", [ "number", "number" ], [ value, rv ]);
    }
   } else if (typeof value === "string") {
    const len = lengthBytesUTF8(value) + 1;
    const loc = _malloc(len);
    stringToUTF8(value, loc, len);
    Module.ccall("vrzno_expose_create_string", "number", [ "number", "number" ], [ loc, rv ]);
    _free(loc);
   }
  });
  Module.UniqueIndex = Module.UniqueIndex || class UniqueIndex {
   constructor() {
    this.byObject = new WeakMap();
    this.byInteger = new Module.WeakerMap();
    this.id = 0;
    Object.defineProperty(this, "add", {
     configurable: false,
     writable: false,
     value: callback => {
      if (this.byObject.has(callback)) {
       const id = this.byObject.get(callback);
       return id;
      }
      const newid = ++this.id;
      this.byObject.set(callback, newid);
      this.byInteger.set(newid, callback);
      return newid;
     }
    });
    Object.defineProperty(this, "has", {
     configurable: false,
     writable: false,
     value: obj => {
      if (this.byObject.has(obj)) {
       return this.byObject.get(obj);
      }
     }
    });
    Object.defineProperty(this, "hasId", {
     configurable: false,
     writable: false,
     value: address => {
      if (this.byInteger.has(address)) {
       return this.byInteger.get(address);
      }
     }
    });
    Object.defineProperty(this, "get", {
     configurable: false,
     writable: false,
     value: address => {
      if (this.byInteger.has(address)) {
       return this.byInteger.get(address);
      }
     }
    });
    Object.defineProperty(this, "getId", {
     configurable: false,
     writable: false,
     value: obj => {
      if (this.byObject.has(obj)) {
       return this.byObject.get(obj);
      }
     }
    });
    Object.defineProperty(this, "remove", {
     configurable: false,
     writable: false,
     value: address => {
      const obj = this.byInteger.get(address);
      if (obj) {
       this.byObject.delete(obj);
       this.byInteger.delete(address);
      }
     }
    });
   }
  };
  Module.classes = new WeakMap();
  Module._classes = new Module.WeakerMap();
  Module.targets = new Module.UniqueIndex();
  Module.callables = new WeakMap();
  Module._callables = new Module.WeakerMap();
  Module.targets.add(globalThis);
  Module.PdoParams = new WeakMap();
 },
 1947099: $0 => {
  const target = Module.targets.get($0);
  return Module.classes.get(target);
 },
 1947177: ($0, $1) => {
  const target = Module.targets.get($0);
  Module.classes.set(target, $1);
  Module._classes.set($1, target);
 },
 1947285: ($0, $1, $2, $3) => {
  const target = Module.targets.get($0);
  const dest = $1;
  const fpos = $2;
  let count = $3;
  if (target.status >= 400 && !target.context.ignoreErrors) {
   return 0;
  }
  if (fpos >= target.buffer.length) {
   count = 0;
  } else if (fpos + count > target.buffer.length) {
   count = target.buffer.length - fpos;
  }
  if (count) {
   Module.HEAPU8.set(target.buffer.slice(fpos, fpos + count), dest);
  }
  return count;
 },
 1947677: $0 => {
  const parsed = Module.targets.get($0);
  Module.tacked.delete(parsed);
 },
 1947750: $0 => {
  const _class = Module._classes.get($0);
  if (_class) {
   return Module.targets.getId(_class);
  }
  return Module.targets.add(globalThis);
 },
 1947885: ($0, $1) => {
  let target = Module.targets.get($0);
  const property = $1;
  if (target instanceof ArrayBuffer) {
   if (!Module.bufferMaps.has(target)) {
    Module.bufferMaps.set(target, new Uint8Array(target));
   }
   target = Module.bufferMaps.get(target);
  }
  if (Array.isArray(target) || ArrayBuffer.isView(target)) {
   if (property >= 0 && property < target.length) {
    return 1;
   }
  }
  return 0;
 },
 1948248: ($0, $1, $2) => {
  let target = Module.targets.get($0);
  const property = $1;
  const rv = $2;
  if (target instanceof ArrayBuffer) {
   if (!Module.bufferMaps.has(target)) {
    Module.bufferMaps.set(target, new Uint8Array(target));
   }
   target = Module.bufferMaps.get(target);
  }
  return Module.jsToZval(target[property], rv);
 },
 1948543: $0 => {
  const target = Module.targets.get($0);
  if (target) {
   Module.tacked.delete(target);
  }
 }
};

function __asyncjs__php_stream_fetch_real_open(path, _context, ptrsize, headersv, headersc) {
 return Asyncify.handleAsync(async () => {
  const pathString = UTF8ToString(path);
  const context = Module.targets.get(_context) || {};
  try {
   const response = await fetch(pathString, context);
   const buffer = new Uint8Array(await response.arrayBuffer());
   const status = response.status;
   const headerLines = [ ...response.headers.entries() ].map(([key, val]) => `${key}: ${val}`);
   headerLines.unshift(`HTTP/1.1 ${response.status} ${response.statusText}`);
   const headersloc = _malloc(ptrsize * headerLines.length);
   setValue(headersv, headersloc, "*");
   setValue(headersc, headerLines.length, "i32");
   let i = 0;
   for (const line of headerLines) {
    const len = lengthBytesUTF8(line) + 1;
    const loc = _malloc(len);
    stringToUTF8(line, loc, len);
    setValue(headersloc + i * ptrsize, loc, "i" + 8 * ptrsize);
    i++;
   }
   const parsed = {
    status: status,
    buffer: buffer,
    context: context
   };
   Module.tacked.add(parsed);
   Module.tacked.delete(context);
   return Module.targets.add(parsed);
  } catch (error) {
   const parsed = {
    status: -1,
    buffer: new TextEncoder().encode(error),
    context: context
   };
   Module.tacked.add(parsed);
   Module.tacked.delete(context);
   return Module.targets.add(parsed);
  }
 });
}

function __asyncjs__vrzno_await_internal(targetId, rv) {
 return Asyncify.handleAsync(async () => {
  const target = Module.targets.get(targetId);
  const result = await target;
  Module.jsToZval(result, rv);
 });
}

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}

function callRuntimeCallbacks(callbacks) {
 while (callbacks.length > 0) {
  callbacks.shift()(Module);
 }
}

function getValue(ptr, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  return HEAP8[ptr >> 0];

 case "i8":
  return HEAP8[ptr >> 0];

 case "i16":
  return HEAP16[ptr >> 1];

 case "i32":
  return HEAP32[ptr >> 2];

 case "i64":
  return HEAP32[ptr >> 2];

 case "float":
  return HEAPF32[ptr >> 2];

 case "double":
  return HEAPF64[ptr >> 3];

 case "*":
  return HEAPU32[ptr >> 2];

 default:
  abort("invalid type for getValue: " + type);
 }
}

function setValue(ptr, value, type = "i8") {
 if (type.endsWith("*")) type = "*";
 switch (type) {
 case "i1":
  HEAP8[ptr >> 0] = value;
  break;

 case "i8":
  HEAP8[ptr >> 0] = value;
  break;

 case "i16":
  HEAP16[ptr >> 1] = value;
  break;

 case "i32":
  HEAP32[ptr >> 2] = value;
  break;

 case "i64":
  tempI64 = [ value >>> 0, (tempDouble = value, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
  break;

 case "float":
  HEAPF32[ptr >> 2] = value;
  break;

 case "double":
  HEAPF64[ptr >> 3] = value;
  break;

 case "*":
  HEAPU32[ptr >> 2] = value;
  break;

 default:
  abort("invalid type for setValue: " + type);
 }
}

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
  return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
 }
 var str = "";
 while (idx < endPtr) {
  var u0 = heapOrArray[idx++];
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = heapOrArray[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode((u0 & 31) << 6 | u1);
   continue;
  }
  var u2 = heapOrArray[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = (u0 & 15) << 12 | u1 << 6 | u2;
  } else {
   u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  }
 }
 return str;
}

function UTF8ToString(ptr, maxBytesToRead) {
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}

function ___assert_fail(condition, filename, line, func) {
 abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
}

var wasmTableMirror = [];

function getWasmTableEntry(funcPtr) {
 var func = wasmTableMirror[funcPtr];
 if (!func) {
  if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
  wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
 }
 return func;
}

function ___call_sighandler(fp, sig) {
 getWasmTableEntry(fp)(sig);
}

var dlopenMissingError = "To use dlopen, you need enable dynamic linking, see https://github.com/emscripten-core/emscripten/wiki/Linking";

function ___dlsym(handle, symbol) {
 abort(dlopenMissingError);
}

var PATH = {
 isAbs: path => path.charAt(0) === "/",
 splitPath: filename => {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: (parts, allowAboveRoot) => {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: path => {
  var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: path => {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: path => {
  if (path === "/") return "/";
  path = PATH.normalize(path);
  path = path.replace(/\/$/, "");
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments);
  return PATH.normalize(paths.join("/"));
 },
 join2: (l, r) => {
  return PATH.normalize(l + "/" + r);
 }
};

function initRandomFill() {
 if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
  return view => crypto.getRandomValues(view);
 } else abort("initRandomDevice");
}

function randomFill(view) {
 return (randomFill = initRandomFill())(view);
}

var PATH_FS = {
 resolve: function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = i >= 0 ? arguments[i] : FS.cwd();
   if (typeof path != "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = PATH.isAbs(path);
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 },
 relative: (from, to) => {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

function lengthBytesUTF8(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var c = str.charCodeAt(i);
  if (c <= 127) {
   len++;
  } else if (c <= 2047) {
   len += 2;
  } else if (c >= 55296 && c <= 57343) {
   len += 4;
   ++i;
  } else {
   len += 3;
  }
 }
 return len;
}

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++] = 192 | u >> 6;
   heap[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++] = 224 | u >> 12;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   heap[outIdx++] = 240 | u >> 18;
   heap[outIdx++] = 128 | u >> 12 & 63;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  }
 }
 heap[outIdx] = 0;
 return outIdx - startIdx;
}

function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var TTY = {
 ttys: [],
 init: function() {},
 shutdown: function() {},
 register: function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open: function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close: function(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  fsync: function(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  read: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char: function(tty) {
   if (!tty.input.length) {
    var result = null;
    if (typeof window != "undefined" && typeof window.prompt == "function") {
     result = window.prompt("Input: ");
     if (result !== null) {
      result += "\n";
     }
    } else if (typeof readline == "function") {
     result = readline();
     if (result !== null) {
      result += "\n";
     }
    }
    if (!result) {
     return null;
    }
    tty.input = intArrayFromString(result, true);
   }
   return tty.input.shift();
  },
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync: function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 },
 default_tty1_ops: {
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync: function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

function zeroMemory(address, size) {
 HEAPU8.fill(0, address, address + size);
 return address;
}

function alignMemory(size, alignment) {
 return Math.ceil(size / alignment) * alignment;
}

function mmapAlloc(size) {
 size = alignMemory(size, 65536);
 var ptr = _emscripten_builtin_memalign(65536, size);
 if (!ptr) return 0;
 return zeroMemory(ptr, size);
}

var MEMFS = {
 ops_table: null,
 mount: function(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 },
 createNode: function(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
   parent.timestamp = node.timestamp;
  }
  return node;
 },
 getFileDataAsTypedArray: function(node) {
  if (!node.contents) return new Uint8Array(0);
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage: function(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
 },
 resizeFileStorage: function(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
  } else {
   var oldContents = node.contents;
   node.contents = new Uint8Array(newSize);
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
  }
 },
 node_ops: {
  getattr: function(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup: function(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod: function(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename: function(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.parent.timestamp = Date.now();
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   new_dir.timestamp = old_node.parent.timestamp;
   old_node.parent = new_dir;
  },
  unlink: function(parent, name) {
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  rmdir: function(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  readdir: function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink: function(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink: function(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write: function(stream, buffer, offset, length, position, canOwn) {
   if (buffer.buffer === HEAP8.buffer) {
    canOwn = false;
   }
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = buffer.slice(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) {
    node.contents.set(buffer.subarray(offset, offset + length), position);
   } else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate: function(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap: function(stream, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < contents.length) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    ptr = mmapAlloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    HEAP8.set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync: function(stream, buffer, offset, length, mmapFlags) {
   MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

function asyncLoad(url, onload, onerror, noRunDep) {
 var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
 readAsync(url, arrayBuffer => {
  assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
  onload(new Uint8Array(arrayBuffer));
  if (dep) removeRunDependency(dep);
 }, event => {
  if (onerror) {
   onerror();
  } else {
   throw 'Loading data file "' + url + '" failed.';
  }
 });
 if (dep) addRunDependency(dep);
}

var IDBFS = {
 dbs: {},
 indexedDB: () => {
  if (typeof indexedDB != "undefined") return indexedDB;
  var ret = null;
  if (typeof window == "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  assert(ret, "IDBFS used, but indexedDB not supported");
  return ret;
 },
 DB_VERSION: 21,
 DB_STORE_NAME: "FILE_DATA",
 mount: function(mount) {
  return MEMFS.mount.apply(null, arguments);
 },
 syncfs: (mount, populate, callback) => {
  IDBFS.getLocalSet(mount, (err, local) => {
   if (err) return callback(err);
   IDBFS.getRemoteSet(mount, (err, remote) => {
    if (err) return callback(err);
    var src = populate ? remote : local;
    var dst = populate ? local : remote;
    IDBFS.reconcile(src, dst, callback);
   });
  });
 },
 quit: () => {
  Object.values(IDBFS.dbs).forEach(value => value.close());
  IDBFS.dbs = {};
 },
 getDB: (name, callback) => {
  var db = IDBFS.dbs[name];
  if (db) {
   return callback(null, db);
  }
  var req;
  try {
   req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
  } catch (e) {
   return callback(e);
  }
  if (!req) {
   return callback("Unable to connect to IndexedDB");
  }
  req.onupgradeneeded = e => {
   var db = e.target.result;
   var transaction = e.target.transaction;
   var fileStore;
   if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
    fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
   } else {
    fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
   }
   if (!fileStore.indexNames.contains("timestamp")) {
    fileStore.createIndex("timestamp", "timestamp", {
     unique: false
    });
   }
  };
  req.onsuccess = () => {
   db = req.result;
   IDBFS.dbs[name] = db;
   callback(null, db);
  };
  req.onerror = e => {
   callback(this.error);
   e.preventDefault();
  };
 },
 getLocalSet: (mount, callback) => {
  var entries = {};
  function isRealDir(p) {
   return p !== "." && p !== "..";
  }
  function toAbsolute(root) {
   return p => {
    return PATH.join2(root, p);
   };
  }
  var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  while (check.length) {
   var path = check.pop();
   var stat;
   try {
    stat = FS.stat(path);
   } catch (e) {
    return callback(e);
   }
   if (FS.isDir(stat.mode)) {
    check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
   }
   entries[path] = {
    "timestamp": stat.mtime
   };
  }
  return callback(null, {
   type: "local",
   entries: entries
  });
 },
 getRemoteSet: (mount, callback) => {
  var entries = {};
  IDBFS.getDB(mount.mountpoint, (err, db) => {
   if (err) return callback(err);
   try {
    var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readonly");
    transaction.onerror = e => {
     callback(this.error);
     e.preventDefault();
    };
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    var index = store.index("timestamp");
    index.openKeyCursor().onsuccess = event => {
     var cursor = event.target.result;
     if (!cursor) {
      return callback(null, {
       type: "remote",
       db: db,
       entries: entries
      });
     }
     entries[cursor.primaryKey] = {
      "timestamp": cursor.key
     };
     cursor.continue();
    };
   } catch (e) {
    return callback(e);
   }
  });
 },
 loadLocalEntry: (path, callback) => {
  var stat, node;
  try {
   var lookup = FS.lookupPath(path);
   node = lookup.node;
   stat = FS.stat(path);
  } catch (e) {
   return callback(e);
  }
  if (FS.isDir(stat.mode)) {
   return callback(null, {
    "timestamp": stat.mtime,
    "mode": stat.mode
   });
  } else if (FS.isFile(stat.mode)) {
   node.contents = MEMFS.getFileDataAsTypedArray(node);
   return callback(null, {
    "timestamp": stat.mtime,
    "mode": stat.mode,
    "contents": node.contents
   });
  } else {
   return callback(new Error("node type not supported"));
  }
 },
 storeLocalEntry: (path, entry, callback) => {
  try {
   if (FS.isDir(entry["mode"])) {
    FS.mkdirTree(path, entry["mode"]);
   } else if (FS.isFile(entry["mode"])) {
    FS.writeFile(path, entry["contents"], {
     canOwn: true
    });
   } else {
    return callback(new Error("node type not supported"));
   }
   FS.chmod(path, entry["mode"]);
   FS.utime(path, entry["timestamp"], entry["timestamp"]);
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 removeLocalEntry: (path, callback) => {
  try {
   var stat = FS.stat(path);
   if (FS.isDir(stat.mode)) {
    FS.rmdir(path);
   } else if (FS.isFile(stat.mode)) {
    FS.unlink(path);
   }
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 loadRemoteEntry: (store, path, callback) => {
  var req = store.get(path);
  req.onsuccess = event => {
   callback(null, event.target.result);
  };
  req.onerror = e => {
   callback(this.error);
   e.preventDefault();
  };
 },
 storeRemoteEntry: (store, path, entry, callback) => {
  try {
   var req = store.put(entry, path);
  } catch (e) {
   callback(e);
   return;
  }
  req.onsuccess = () => {
   callback(null);
  };
  req.onerror = e => {
   callback(this.error);
   e.preventDefault();
  };
 },
 removeRemoteEntry: (store, path, callback) => {
  var req = store.delete(path);
  req.onsuccess = () => {
   callback(null);
  };
  req.onerror = e => {
   callback(this.error);
   e.preventDefault();
  };
 },
 reconcile: (src, dst, callback) => {
  var total = 0;
  var create = [];
  Object.keys(src.entries).forEach(function(key) {
   var e = src.entries[key];
   var e2 = dst.entries[key];
   if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
    create.push(key);
    total++;
   }
  });
  var remove = [];
  Object.keys(dst.entries).forEach(function(key) {
   if (!src.entries[key]) {
    remove.push(key);
    total++;
   }
  });
  if (!total) {
   return callback(null);
  }
  var errored = false;
  var db = src.type === "remote" ? src.db : dst.db;
  var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readwrite");
  var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  function done(err) {
   if (err && !errored) {
    errored = true;
    return callback(err);
   }
  }
  transaction.onerror = e => {
   done(this.error);
   e.preventDefault();
  };
  transaction.oncomplete = e => {
   if (!errored) {
    callback(null);
   }
  };
  create.sort().forEach(path => {
   if (dst.type === "local") {
    IDBFS.loadRemoteEntry(store, path, (err, entry) => {
     if (err) return done(err);
     IDBFS.storeLocalEntry(path, entry, done);
    });
   } else {
    IDBFS.loadLocalEntry(path, (err, entry) => {
     if (err) return done(err);
     IDBFS.storeRemoteEntry(store, path, entry, done);
    });
   }
  });
  remove.sort().reverse().forEach(path => {
   if (dst.type === "local") {
    IDBFS.removeLocalEntry(path, done);
   } else {
    IDBFS.removeRemoteEntry(store, path, done);
   }
  });
 }
};

var LZ4 = {
 DIR_MODE: 16895,
 FILE_MODE: 33279,
 CHUNK_SIZE: -1,
 codec: null,
 init: function() {
  if (LZ4.codec) return;
  LZ4.codec = function() {
   var MiniLZ4 = function() {
    var exports = {};
    exports.uncompress = function(input, output, sIdx, eIdx) {
     sIdx = sIdx || 0;
     eIdx = eIdx || input.length - sIdx;
     for (var i = sIdx, n = eIdx, j = 0; i < n; ) {
      var token = input[i++];
      var literals_length = token >> 4;
      if (literals_length > 0) {
       var l = literals_length + 240;
       while (l === 255) {
        l = input[i++];
        literals_length += l;
       }
       var end = i + literals_length;
       while (i < end) output[j++] = input[i++];
       if (i === n) return j;
      }
      var offset = input[i++] | input[i++] << 8;
      if (offset === 0) return j;
      if (offset > j) return -(i - 2);
      var match_length = token & 15;
      var l = match_length + 240;
      while (l === 255) {
       l = input[i++];
       match_length += l;
      }
      var pos = j - offset;
      var end = j + match_length + 4;
      while (j < end) output[j++] = output[pos++];
     }
     return j;
    };
    var maxInputSize = 2113929216, minMatch = 4, hashLog = 16, hashShift = minMatch * 8 - hashLog, copyLength = 8, mfLimit = copyLength + minMatch, skipStrength = 6, mlBits = 4, mlMask = (1 << mlBits) - 1, runBits = 8 - mlBits, runMask = (1 << runBits) - 1, hasher = 2654435761;
    assert(hashShift === 16);
    var hashTable = new Int16Array(1 << 16);
    var empty = new Int16Array(hashTable.length);
    exports.compressBound = function(isize) {
     return isize > maxInputSize ? 0 : isize + isize / 255 + 16 | 0;
    };
    exports.compress = function(src, dst, sIdx, eIdx) {
     hashTable.set(empty);
     return compressBlock(src, dst, 0, sIdx || 0, eIdx || dst.length);
    };
    function compressBlock(src, dst, pos, sIdx, eIdx) {
     var dpos = sIdx;
     var dlen = eIdx - sIdx;
     var anchor = 0;
     if (src.length >= maxInputSize) throw new Error("input too large");
     if (src.length > mfLimit) {
      var n = exports.compressBound(src.length);
      if (dlen < n) throw Error("output too small: " + dlen + " < " + n);
      var step = 1, findMatchAttempts = (1 << skipStrength) + 3, srcLength = src.length - mfLimit;
      while (pos + minMatch < srcLength) {
       var sequenceLowBits = src[pos + 1] << 8 | src[pos];
       var sequenceHighBits = src[pos + 3] << 8 | src[pos + 2];
       var hash = Math.imul(sequenceLowBits | sequenceHighBits << 16, hasher) >>> hashShift;
       var ref = hashTable[hash] - 1;
       hashTable[hash] = pos + 1;
       if (ref < 0 || pos - ref >>> 16 > 0 || ((src[ref + 3] << 8 | src[ref + 2]) != sequenceHighBits || (src[ref + 1] << 8 | src[ref]) != sequenceLowBits)) {
        step = findMatchAttempts++ >> skipStrength;
        pos += step;
        continue;
       }
       findMatchAttempts = (1 << skipStrength) + 3;
       var literals_length = pos - anchor;
       var offset = pos - ref;
       pos += minMatch;
       ref += minMatch;
       var match_length = pos;
       while (pos < srcLength && src[pos] == src[ref]) {
        pos++;
        ref++;
       }
       match_length = pos - match_length;
       var token = match_length < mlMask ? match_length : mlMask;
       if (literals_length >= runMask) {
        dst[dpos++] = (runMask << mlBits) + token;
        for (var len = literals_length - runMask; len > 254; len -= 255) {
         dst[dpos++] = 255;
        }
        dst[dpos++] = len;
       } else {
        dst[dpos++] = (literals_length << mlBits) + token;
       }
       for (var i = 0; i < literals_length; i++) {
        dst[dpos++] = src[anchor + i];
       }
       dst[dpos++] = offset;
       dst[dpos++] = offset >> 8;
       if (match_length >= mlMask) {
        match_length -= mlMask;
        while (match_length >= 255) {
         match_length -= 255;
         dst[dpos++] = 255;
        }
        dst[dpos++] = match_length;
       }
       anchor = pos;
      }
     }
     if (anchor == 0) return 0;
     literals_length = src.length - anchor;
     if (literals_length >= runMask) {
      dst[dpos++] = runMask << mlBits;
      for (var ln = literals_length - runMask; ln > 254; ln -= 255) {
       dst[dpos++] = 255;
      }
      dst[dpos++] = ln;
     } else {
      dst[dpos++] = literals_length << mlBits;
     }
     pos = anchor;
     while (pos < src.length) {
      dst[dpos++] = src[pos++];
     }
     return dpos;
    }
    exports.CHUNK_SIZE = 2048;
    exports.compressPackage = function(data, verify) {
     if (verify) {
      var temp = new Uint8Array(exports.CHUNK_SIZE);
     }
     assert(data instanceof ArrayBuffer);
     data = new Uint8Array(data);
     console.log("compressing package of size " + data.length);
     var compressedChunks = [];
     var successes = [];
     var offset = 0;
     var total = 0;
     while (offset < data.length) {
      var chunk = data.subarray(offset, offset + exports.CHUNK_SIZE);
      offset += exports.CHUNK_SIZE;
      var bound = exports.compressBound(chunk.length);
      var compressed = new Uint8Array(bound);
      var compressedSize = exports.compress(chunk, compressed);
      if (compressedSize > 0) {
       assert(compressedSize <= bound);
       compressed = compressed.subarray(0, compressedSize);
       compressedChunks.push(compressed);
       total += compressedSize;
       successes.push(1);
       if (verify) {
        var back = exports.uncompress(compressed, temp);
        assert(back === chunk.length, [ back, chunk.length ]);
        for (var i = 0; i < chunk.length; i++) {
         assert(chunk[i] === temp[i]);
        }
       }
      } else {
       assert(compressedSize === 0);
       compressedChunks.push(chunk);
       total += chunk.length;
       successes.push(0);
      }
     }
     data = null;
     var compressedData = {
      "data": new Uint8Array(total + exports.CHUNK_SIZE * 2),
      "cachedOffset": total,
      "cachedIndexes": [ -1, -1 ],
      "cachedChunks": [ null, null ],
      "offsets": [],
      "sizes": [],
      "successes": successes
     };
     offset = 0;
     for (var i = 0; i < compressedChunks.length; i++) {
      compressedData["data"].set(compressedChunks[i], offset);
      compressedData["offsets"][i] = offset;
      compressedData["sizes"][i] = compressedChunks[i].length;
      offset += compressedChunks[i].length;
     }
     console.log("compressed package into " + [ compressedData["data"].length ]);
     assert(offset === total);
     return compressedData;
    };
    assert(exports.CHUNK_SIZE < 1 << 15);
    return exports;
   }();
   return MiniLZ4;
  }();
  LZ4.CHUNK_SIZE = LZ4.codec.CHUNK_SIZE;
 },
 loadPackage: function(pack, preloadPlugin) {
  LZ4.init();
  var compressedData = pack["compressedData"];
  if (!compressedData) compressedData = LZ4.codec.compressPackage(pack["data"]);
  assert(compressedData["cachedIndexes"].length === compressedData["cachedChunks"].length);
  for (var i = 0; i < compressedData["cachedIndexes"].length; i++) {
   compressedData["cachedIndexes"][i] = -1;
   compressedData["cachedChunks"][i] = compressedData["data"].subarray(compressedData["cachedOffset"] + i * LZ4.CHUNK_SIZE, compressedData["cachedOffset"] + (i + 1) * LZ4.CHUNK_SIZE);
   assert(compressedData["cachedChunks"][i].length === LZ4.CHUNK_SIZE);
  }
  pack["metadata"].files.forEach(function(file) {
   var dir = PATH.dirname(file.filename);
   var name = PATH.basename(file.filename);
   FS.createPath("", dir, true, true);
   var parent = FS.analyzePath(dir).object;
   LZ4.createNode(parent, name, LZ4.FILE_MODE, 0, {
    compressedData: compressedData,
    start: file.start,
    end: file.end
   });
  });
  if (preloadPlugin) {
   Browser.init();
   pack["metadata"].files.forEach(function(file) {
    var handled = false;
    var fullname = file.filename;
    Module["preloadPlugins"].forEach(function(plugin) {
     if (handled) return;
     if (plugin["canHandle"](fullname)) {
      var dep = getUniqueRunDependency("fp " + fullname);
      addRunDependency(dep);
      var finish = function() {
       removeRunDependency(dep);
      };
      var byteArray = FS.readFile(fullname);
      plugin["handle"](byteArray, fullname, finish, finish);
      handled = true;
     }
    });
   });
  }
 },
 createNode: function(parent, name, mode, dev, contents, mtime) {
  var node = FS.createNode(parent, name, mode);
  node.mode = mode;
  node.node_ops = LZ4.node_ops;
  node.stream_ops = LZ4.stream_ops;
  node.timestamp = (mtime || new Date()).getTime();
  assert(LZ4.FILE_MODE !== LZ4.DIR_MODE);
  if (mode === LZ4.FILE_MODE) {
   node.size = contents.end - contents.start;
   node.contents = contents;
  } else {
   node.size = 4096;
   node.contents = {};
  }
  if (parent) {
   parent.contents[name] = node;
  }
  return node;
 },
 node_ops: {
  getattr: function(node) {
   return {
    dev: 1,
    ino: node.id,
    mode: node.mode,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: undefined,
    size: node.size,
    atime: new Date(node.timestamp),
    mtime: new Date(node.timestamp),
    ctime: new Date(node.timestamp),
    blksize: 4096,
    blocks: Math.ceil(node.size / 4096)
   };
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
  },
  lookup: function(parent, name) {
   throw new FS.ErrnoError(44);
  },
  mknod: function(parent, name, mode, dev) {
   throw new FS.ErrnoError(63);
  },
  rename: function(oldNode, newDir, newName) {
   throw new FS.ErrnoError(63);
  },
  unlink: function(parent, name) {
   throw new FS.ErrnoError(63);
  },
  rmdir: function(parent, name) {
   throw new FS.ErrnoError(63);
  },
  readdir: function(node) {
   throw new FS.ErrnoError(63);
  },
  symlink: function(parent, newName, oldPath) {
   throw new FS.ErrnoError(63);
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   length = Math.min(length, stream.node.size - position);
   if (length <= 0) return 0;
   var contents = stream.node.contents;
   var compressedData = contents.compressedData;
   var written = 0;
   while (written < length) {
    var start = contents.start + position + written;
    var desired = length - written;
    var chunkIndex = Math.floor(start / LZ4.CHUNK_SIZE);
    var compressedStart = compressedData["offsets"][chunkIndex];
    var compressedSize = compressedData["sizes"][chunkIndex];
    var currChunk;
    if (compressedData["successes"][chunkIndex]) {
     var found = compressedData["cachedIndexes"].indexOf(chunkIndex);
     if (found >= 0) {
      currChunk = compressedData["cachedChunks"][found];
     } else {
      compressedData["cachedIndexes"].pop();
      compressedData["cachedIndexes"].unshift(chunkIndex);
      currChunk = compressedData["cachedChunks"].pop();
      compressedData["cachedChunks"].unshift(currChunk);
      if (compressedData["debug"]) {
       out("decompressing chunk " + chunkIndex);
       Module["decompressedChunks"] = (Module["decompressedChunks"] || 0) + 1;
      }
      var compressed = compressedData["data"].subarray(compressedStart, compressedStart + compressedSize);
      var originalSize = LZ4.codec.uncompress(compressed, currChunk);
      if (chunkIndex < compressedData["successes"].length - 1) assert(originalSize === LZ4.CHUNK_SIZE);
     }
    } else {
     currChunk = compressedData["data"].subarray(compressedStart, compressedStart + LZ4.CHUNK_SIZE);
    }
    var startInChunk = start % LZ4.CHUNK_SIZE;
    var endInChunk = Math.min(startInChunk + desired, LZ4.CHUNK_SIZE);
    buffer.set(currChunk.subarray(startInChunk, endInChunk), offset + written);
    var currWritten = endInChunk - startInChunk;
    written += currWritten;
   }
   return written;
  },
  write: function(stream, buffer, offset, length, position) {
   throw new FS.ErrnoError(29);
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.size;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  }
 }
};

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 lookupPath: (path, opts = {}) => {
  path = PATH_FS.resolve(path);
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  opts = Object.assign(defaults, opts);
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = path.split("/").filter(p => !!p);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = i === parts.length - 1;
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || islast && opts.follow_mount) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count + 1
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath: node => {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
   }
   path = path ? node.name + "/" + path : node.name;
   node = node.parent;
  }
 },
 hashName: (parentid, name) => {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 },
 hashAddNode: node => {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode: node => {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode: (parent, name) => {
  var errCode = FS.mayLookup(parent);
  if (errCode) {
   throw new FS.ErrnoError(errCode, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode: (parent, name, mode, rdev) => {
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode: node => {
  FS.hashRemoveNode(node);
 },
 isRoot: node => {
  return node === node.parent;
 },
 isMountpoint: node => {
  return !!node.mounted;
 },
 isFile: mode => {
  return (mode & 61440) === 32768;
 },
 isDir: mode => {
  return (mode & 61440) === 16384;
 },
 isLink: mode => {
  return (mode & 61440) === 40960;
 },
 isChrdev: mode => {
  return (mode & 61440) === 8192;
 },
 isBlkdev: mode => {
  return (mode & 61440) === 24576;
 },
 isFIFO: mode => {
  return (mode & 61440) === 4096;
 },
 isSocket: mode => {
  return (mode & 49152) === 49152;
 },
 flagModes: {
  "r": 0,
  "r+": 2,
  "w": 577,
  "w+": 578,
  "a": 1089,
  "a+": 1090
 },
 modeStringToFlags: str => {
  var flags = FS.flagModes[str];
  if (typeof flags == "undefined") {
   throw new Error("Unknown file open mode: " + str);
  }
  return flags;
 },
 flagsToPermissionString: flag => {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions: (node, perms) => {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.includes("r") && !(node.mode & 292)) {
   return 2;
  } else if (perms.includes("w") && !(node.mode & 146)) {
   return 2;
  } else if (perms.includes("x") && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup: dir => {
  var errCode = FS.nodePermissions(dir, "x");
  if (errCode) return errCode;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate: (dir, name) => {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete: (dir, name, isdir) => {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var errCode = FS.nodePermissions(dir, "wx");
  if (errCode) {
   return errCode;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen: (node, flags) => {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
  for (var fd = fd_start; fd <= fd_end; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStream: fd => FS.streams[fd],
 createStream: (stream, fd_start, fd_end) => {
  if (!FS.FSStream) {
   FS.FSStream = function() {
    this.shared = {};
   };
   FS.FSStream.prototype = {};
   Object.defineProperties(FS.FSStream.prototype, {
    object: {
     get: function() {
      return this.node;
     },
     set: function(val) {
      this.node = val;
     }
    },
    isRead: {
     get: function() {
      return (this.flags & 2097155) !== 1;
     }
    },
    isWrite: {
     get: function() {
      return (this.flags & 2097155) !== 0;
     }
    },
    isAppend: {
     get: function() {
      return this.flags & 1024;
     }
    },
    flags: {
     get: function() {
      return this.shared.flags;
     },
     set: function(val) {
      this.shared.flags = val;
     }
    },
    position: {
     get: function() {
      return this.shared.position;
     },
     set: function(val) {
      this.shared.position = val;
     }
    }
   });
  }
  stream = Object.assign(new FS.FSStream(), stream);
  var fd = FS.nextfd(fd_start, fd_end);
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream: fd => {
  FS.streams[fd] = null;
 },
 chrdev_stream_ops: {
  open: stream => {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  },
  llseek: () => {
   throw new FS.ErrnoError(70);
  }
 },
 major: dev => dev >> 8,
 minor: dev => dev & 255,
 makedev: (ma, mi) => ma << 8 | mi,
 registerDevice: (dev, ops) => {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: dev => FS.devices[dev],
 getMounts: mount => {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 },
 syncfs: (populate, callback) => {
  if (typeof populate == "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(errCode) {
   FS.syncFSRequests--;
   return callback(errCode);
  }
  function done(errCode) {
   if (errCode) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(errCode);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(mount => {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount: (type, opts, mountpoint) => {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount: mountpoint => {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(hash => {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.includes(current.mount)) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  node.mount.mounts.splice(idx, 1);
 },
 lookup: (parent, name) => {
  return parent.node_ops.lookup(parent, name);
 },
 mknod: (path, mode, dev) => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.mayCreate(parent, name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create: (path, mode) => {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir: (path, mode) => {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree: (path, mode) => {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev: (path, mode, dev) => {
  if (typeof dev == "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink: (oldpath, newpath) => {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var errCode = FS.mayCreate(parent, newname);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename: (old_path, new_path) => {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  lookup = FS.lookupPath(old_path, {
   parent: true
  });
  old_dir = lookup.node;
  lookup = FS.lookupPath(new_path, {
   parent: true
  });
  new_dir = lookup.node;
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var errCode = FS.mayDelete(old_dir, old_name, isdir);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   errCode = FS.nodePermissions(old_dir, "w");
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
 },
 rmdir: path => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, true);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
 },
 readdir: path => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink: path => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, false);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
 },
 readlink: path => {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat: (path, dontFollow) => {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat: path => {
  return FS.stat(path, true);
 },
 chmod: (path, mode, dontFollow) => {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 },
 lchmod: (path, mode) => {
  FS.chmod(path, mode, true);
 },
 fchmod: (fd, mode) => {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chmod(stream.node, mode);
 },
 chown: (path, uid, gid, dontFollow) => {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown: (path, uid, gid) => {
  FS.chown(path, uid, gid, true);
 },
 fchown: (fd, uid, gid) => {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chown(stream.node, uid, gid);
 },
 truncate: (path, len) => {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.nodePermissions(node, "w");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate: (fd, len) => {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime: (path, atime, mtime) => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open: (path, flags, mode) => {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags;
  mode = typeof mode == "undefined" ? 438 : mode;
  if (flags & 64) {
   mode = mode & 4095 | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path == "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if (flags & 64) {
   if (node) {
    if (flags & 128) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var errCode = FS.mayOpen(node, flags);
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  if (flags & 512 && !created) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512 | 131072);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  });
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
   }
  }
  return stream;
 },
 close: stream => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed: stream => {
  return stream.fd === null;
 },
 llseek: (stream, offset, whence) => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read: (stream, buffer, offset, length, position) => {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write: (stream, buffer, offset, length, position, canOwn) => {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.seekable && stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  return bytesWritten;
 },
 allocate: (stream, offset, length) => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap: (stream, length, position, prot, flags) => {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, length, position, prot, flags);
 },
 msync: (stream, buffer, offset, length, mmapFlags) => {
  if (!stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 munmap: stream => 0,
 ioctl: (stream, cmd, arg) => {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile: (path, opts = {}) => {
  opts.flags = opts.flags || 0;
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error('Invalid encoding type "' + opts.encoding + '"');
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile: (path, data, opts = {}) => {
  opts.flags = opts.flags || 577;
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data == "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: () => FS.currentPath,
 chdir: path => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var errCode = FS.nodePermissions(lookup.node, "x");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories: () => {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices: () => {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: () => 0,
   write: (stream, buffer, offset, length, pos) => length
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var randomBuffer = new Uint8Array(1024), randomLeft = 0;
  var randomByte = () => {
   if (randomLeft === 0) {
    randomLeft = randomFill(randomBuffer).byteLength;
   }
   return randomBuffer[--randomLeft];
  };
  FS.createDevice("/dev", "random", randomByte);
  FS.createDevice("/dev", "urandom", randomByte);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories: () => {
  FS.mkdir("/proc");
  var proc_self = FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: () => {
    var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: (parent, name) => {
      var fd = +name;
      var stream = FS.getStream(fd);
      if (!stream) throw new FS.ErrnoError(8);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: () => stream.path
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams: () => {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", 0);
  var stdout = FS.open("/dev/stdout", 1);
  var stderr = FS.open("/dev/stderr", 1);
 },
 ensureErrnoError: () => {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.name = "ErrnoError";
   this.node = node;
   this.setErrno = function(errno) {
    this.errno = errno;
   };
   this.setErrno(errno);
   this.message = "FS error";
  };
  FS.ErrnoError.prototype = new Error();
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 44 ].forEach(code => {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
 },
 staticInit: () => {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS,
   "IDBFS": IDBFS
  };
 },
 init: (input, output, error) => {
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit: () => {
  FS.init.initialized = false;
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 getMode: (canRead, canWrite) => {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
 },
 findObject: (path, dontResolveLastLink) => {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (!ret.exists) {
   return null;
  }
  return ret.object;
 },
 analyzePath: (path, dontResolveLastLink) => {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createPath: (parent, path, canRead, canWrite) => {
  parent = typeof parent == "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile: (parent, name, properties, canRead, canWrite) => {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
  var path = name;
  if (parent) {
   parent = typeof parent == "string" ? parent : FS.getPath(parent);
   path = name ? PATH.join2(parent, name) : parent;
  }
  var mode = FS.getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data == "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, 577);
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 },
 createDevice: (parent, name, input, output) => {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: stream => {
    stream.seekable = false;
   },
   close: stream => {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   },
   read: (stream, buffer, offset, length, pos) => {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write: (stream, buffer, offset, length, pos) => {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 forceLoadFile: obj => {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  if (typeof XMLHttpRequest != "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
 },
 createLazyFile: (parent, name, url, canRead, canWrite) => {
  function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = idx / this.chunkSize | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest();
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = (from, to) => {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(xhr.response || []);
    }
    return intArrayFromString(xhr.responseText || "", true);
   };
   var lazyArray = this;
   lazyArray.setDataGetter(chunkNum => {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] == "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   });
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    out("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest != "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array();
   Object.defineProperties(lazyArray, {
    length: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     }
    },
    chunkSize: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     }
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(key => {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    FS.forceLoadFile(node);
    return fn.apply(null, arguments);
   };
  });
  function writeChunks(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  }
  stream_ops.read = (stream, buffer, offset, length, position) => {
   FS.forceLoadFile(node);
   return writeChunks(stream, buffer, offset, length, position);
  };
  stream_ops.mmap = (stream, length, position, prot, flags) => {
   FS.forceLoadFile(node);
   var ptr = mmapAlloc(length);
   if (!ptr) {
    throw new FS.ErrnoError(48);
   }
   writeChunks(stream, HEAP8, ptr, length, position);
   return {
    ptr: ptr,
    allocated: true
   };
  };
  node.stream_ops = stream_ops;
  return node;
 },
 createPreloadedFile: (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency("cp " + fullname);
  function processData(byteArray) {
   function finish(byteArray) {
    if (preFinish) preFinish();
    if (!dontCreateFile) {
     FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
    if (onload) onload();
    removeRunDependency(dep);
   }
   if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
    if (onerror) onerror();
    removeRunDependency(dep);
   })) {
    return;
   }
   finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
   asyncLoad(url, byteArray => processData(byteArray), onerror);
  } else {
   processData(url);
  }
 }
};

var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 calculateAt: function(dirfd, path, allowEmpty) {
  if (PATH.isAbs(path)) {
   return path;
  }
  var dir;
  if (dirfd === -100) {
   dir = FS.cwd();
  } else {
   var dirstream = SYSCALLS.getStreamFromFD(dirfd);
   dir = dirstream.path;
  }
  if (path.length == 0) {
   if (!allowEmpty) {
    throw new FS.ErrnoError(44);
   }
   return dir;
  }
  return PATH.join2(dir, path);
 },
 doStat: function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -54;
   }
   throw e;
  }
  HEAP32[buf >> 2] = stat.dev;
  HEAP32[buf + 8 >> 2] = stat.ino;
  HEAP32[buf + 12 >> 2] = stat.mode;
  HEAPU32[buf + 16 >> 2] = stat.nlink;
  HEAP32[buf + 20 >> 2] = stat.uid;
  HEAP32[buf + 24 >> 2] = stat.gid;
  HEAP32[buf + 28 >> 2] = stat.rdev;
  tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
  HEAP32[buf + 48 >> 2] = 4096;
  HEAP32[buf + 52 >> 2] = stat.blocks;
  var atime = stat.atime.getTime();
  var mtime = stat.mtime.getTime();
  var ctime = stat.ctime.getTime();
  tempI64 = [ Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1];
  HEAPU32[buf + 64 >> 2] = atime % 1e3 * 1e3;
  tempI64 = [ Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1];
  HEAPU32[buf + 80 >> 2] = mtime % 1e3 * 1e3;
  tempI64 = [ Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1];
  HEAPU32[buf + 96 >> 2] = ctime % 1e3 * 1e3;
  tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 104 >> 2] = tempI64[0], HEAP32[buf + 108 >> 2] = tempI64[1];
  return 0;
 },
 doMsync: function(addr, stream, len, flags, offset) {
  if (!FS.isFile(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (flags & 2) {
   return 0;
  }
  var buffer = HEAPU8.slice(addr, addr + len);
  FS.msync(stream, buffer, offset, len, flags);
 },
 varargs: undefined,
 get: function() {
  SYSCALLS.varargs += 4;
  var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
  return ret;
 },
 getStr: function(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 getStreamFromFD: function(fd) {
  var stream = FS.getStream(fd);
  if (!stream) throw new FS.ErrnoError(8);
  return stream;
 }
};

function ___syscall__newselect(nfds, readfds, writefds, exceptfds, timeout) {
 try {
  var total = 0;
  var srcReadLow = readfds ? HEAP32[readfds >> 2] : 0, srcReadHigh = readfds ? HEAP32[readfds + 4 >> 2] : 0;
  var srcWriteLow = writefds ? HEAP32[writefds >> 2] : 0, srcWriteHigh = writefds ? HEAP32[writefds + 4 >> 2] : 0;
  var srcExceptLow = exceptfds ? HEAP32[exceptfds >> 2] : 0, srcExceptHigh = exceptfds ? HEAP32[exceptfds + 4 >> 2] : 0;
  var dstReadLow = 0, dstReadHigh = 0;
  var dstWriteLow = 0, dstWriteHigh = 0;
  var dstExceptLow = 0, dstExceptHigh = 0;
  var allLow = (readfds ? HEAP32[readfds >> 2] : 0) | (writefds ? HEAP32[writefds >> 2] : 0) | (exceptfds ? HEAP32[exceptfds >> 2] : 0);
  var allHigh = (readfds ? HEAP32[readfds + 4 >> 2] : 0) | (writefds ? HEAP32[writefds + 4 >> 2] : 0) | (exceptfds ? HEAP32[exceptfds + 4 >> 2] : 0);
  var check = function(fd, low, high, val) {
   return fd < 32 ? low & val : high & val;
  };
  for (var fd = 0; fd < nfds; fd++) {
   var mask = 1 << fd % 32;
   if (!check(fd, allLow, allHigh, mask)) {
    continue;
   }
   var stream = SYSCALLS.getStreamFromFD(fd);
   var flags = SYSCALLS.DEFAULT_POLLMASK;
   if (stream.stream_ops.poll) {
    flags = stream.stream_ops.poll(stream);
   }
   if (flags & 1 && check(fd, srcReadLow, srcReadHigh, mask)) {
    fd < 32 ? dstReadLow = dstReadLow | mask : dstReadHigh = dstReadHigh | mask;
    total++;
   }
   if (flags & 4 && check(fd, srcWriteLow, srcWriteHigh, mask)) {
    fd < 32 ? dstWriteLow = dstWriteLow | mask : dstWriteHigh = dstWriteHigh | mask;
    total++;
   }
   if (flags & 2 && check(fd, srcExceptLow, srcExceptHigh, mask)) {
    fd < 32 ? dstExceptLow = dstExceptLow | mask : dstExceptHigh = dstExceptHigh | mask;
    total++;
   }
  }
  if (readfds) {
   HEAP32[readfds >> 2] = dstReadLow;
   HEAP32[readfds + 4 >> 2] = dstReadHigh;
  }
  if (writefds) {
   HEAP32[writefds >> 2] = dstWriteLow;
   HEAP32[writefds + 4 >> 2] = dstWriteHigh;
  }
  if (exceptfds) {
   HEAP32[exceptfds >> 2] = dstExceptLow;
   HEAP32[exceptfds + 4 >> 2] = dstExceptHigh;
  }
  return total;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var SOCKFS = {
 mount: function(mount) {
  Module["websocket"] = Module["websocket"] && "object" === typeof Module["websocket"] ? Module["websocket"] : {};
  Module["websocket"]._callbacks = {};
  Module["websocket"]["on"] = function(event, callback) {
   if ("function" === typeof callback) {
    this._callbacks[event] = callback;
   }
   return this;
  };
  Module["websocket"].emit = function(event, param) {
   if ("function" === typeof this._callbacks[event]) {
    this._callbacks[event].call(this, param);
   }
  };
  return FS.createNode(null, "/", 16384 | 511, 0);
 },
 createSocket: function(family, type, protocol) {
  type &= ~526336;
  var streaming = type == 1;
  if (streaming && protocol && protocol != 6) {
   throw new FS.ErrnoError(66);
  }
  var sock = {
   family: family,
   type: type,
   protocol: protocol,
   server: null,
   error: null,
   peers: {},
   pending: [],
   recv_queue: [],
   sock_ops: SOCKFS.websocket_sock_ops
  };
  var name = SOCKFS.nextname();
  var node = FS.createNode(SOCKFS.root, name, 49152, 0);
  node.sock = sock;
  var stream = FS.createStream({
   path: name,
   node: node,
   flags: 2,
   seekable: false,
   stream_ops: SOCKFS.stream_ops
  });
  sock.stream = stream;
  return sock;
 },
 getSocket: function(fd) {
  var stream = FS.getStream(fd);
  if (!stream || !FS.isSocket(stream.node.mode)) {
   return null;
  }
  return stream.node.sock;
 },
 stream_ops: {
  poll: function(stream) {
   var sock = stream.node.sock;
   return sock.sock_ops.poll(sock);
  },
  ioctl: function(stream, request, varargs) {
   var sock = stream.node.sock;
   return sock.sock_ops.ioctl(sock, request, varargs);
  },
  read: function(stream, buffer, offset, length, position) {
   var sock = stream.node.sock;
   var msg = sock.sock_ops.recvmsg(sock, length);
   if (!msg) {
    return 0;
   }
   buffer.set(msg.buffer, offset);
   return msg.buffer.length;
  },
  write: function(stream, buffer, offset, length, position) {
   var sock = stream.node.sock;
   return sock.sock_ops.sendmsg(sock, buffer, offset, length);
  },
  close: function(stream) {
   var sock = stream.node.sock;
   sock.sock_ops.close(sock);
  }
 },
 nextname: function() {
  if (!SOCKFS.nextname.current) {
   SOCKFS.nextname.current = 0;
  }
  return "socket[" + SOCKFS.nextname.current++ + "]";
 },
 websocket_sock_ops: {
  createPeer: function(sock, addr, port) {
   var ws;
   if (typeof addr == "object") {
    ws = addr;
    addr = null;
    port = null;
   }
   if (ws) {
    if (ws._socket) {
     addr = ws._socket.remoteAddress;
     port = ws._socket.remotePort;
    } else {
     var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
     if (!result) {
      throw new Error("WebSocket URL must be in the format ws(s)://address:port");
     }
     addr = result[1];
     port = parseInt(result[2], 10);
    }
   } else {
    try {
     var runtimeConfig = Module["websocket"] && "object" === typeof Module["websocket"];
     var url = "ws:#".replace("#", "//");
     if (runtimeConfig) {
      if ("string" === typeof Module["websocket"]["url"]) {
       url = Module["websocket"]["url"];
      }
     }
     if (url === "ws://" || url === "wss://") {
      var parts = addr.split("/");
      url = url + parts[0] + ":" + port + "/" + parts.slice(1).join("/");
     }
     var subProtocols = "binary";
     if (runtimeConfig) {
      if ("string" === typeof Module["websocket"]["subprotocol"]) {
       subProtocols = Module["websocket"]["subprotocol"];
      }
     }
     var opts = undefined;
     if (subProtocols !== "null") {
      subProtocols = subProtocols.replace(/^ +| +$/g, "").split(/ *, */);
      opts = subProtocols;
     }
     if (runtimeConfig && null === Module["websocket"]["subprotocol"]) {
      subProtocols = "null";
      opts = undefined;
     }
     var WebSocketConstructor;
     {
      WebSocketConstructor = WebSocket;
     }
     ws = new WebSocketConstructor(url, opts);
     ws.binaryType = "arraybuffer";
    } catch (e) {
     throw new FS.ErrnoError(23);
    }
   }
   var peer = {
    addr: addr,
    port: port,
    socket: ws,
    dgram_send_queue: []
   };
   SOCKFS.websocket_sock_ops.addPeer(sock, peer);
   SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
   if (sock.type === 2 && typeof sock.sport != "undefined") {
    peer.dgram_send_queue.push(new Uint8Array([ 255, 255, 255, 255, "p".charCodeAt(0), "o".charCodeAt(0), "r".charCodeAt(0), "t".charCodeAt(0), (sock.sport & 65280) >> 8, sock.sport & 255 ]));
   }
   return peer;
  },
  getPeer: function(sock, addr, port) {
   return sock.peers[addr + ":" + port];
  },
  addPeer: function(sock, peer) {
   sock.peers[peer.addr + ":" + peer.port] = peer;
  },
  removePeer: function(sock, peer) {
   delete sock.peers[peer.addr + ":" + peer.port];
  },
  handlePeerEvents: function(sock, peer) {
   var first = true;
   var handleOpen = function() {
    Module["websocket"].emit("open", sock.stream.fd);
    try {
     var queued = peer.dgram_send_queue.shift();
     while (queued) {
      peer.socket.send(queued);
      queued = peer.dgram_send_queue.shift();
     }
    } catch (e) {
     peer.socket.close();
    }
   };
   function handleMessage(data) {
    if (typeof data == "string") {
     var encoder = new TextEncoder();
     data = encoder.encode(data);
    } else {
     assert(data.byteLength !== undefined);
     if (data.byteLength == 0) {
      return;
     }
     data = new Uint8Array(data);
    }
    var wasfirst = first;
    first = false;
    if (wasfirst && data.length === 10 && data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 && data[4] === "p".charCodeAt(0) && data[5] === "o".charCodeAt(0) && data[6] === "r".charCodeAt(0) && data[7] === "t".charCodeAt(0)) {
     var newport = data[8] << 8 | data[9];
     SOCKFS.websocket_sock_ops.removePeer(sock, peer);
     peer.port = newport;
     SOCKFS.websocket_sock_ops.addPeer(sock, peer);
     return;
    }
    sock.recv_queue.push({
     addr: peer.addr,
     port: peer.port,
     data: data
    });
    Module["websocket"].emit("message", sock.stream.fd);
   }
   if (ENVIRONMENT_IS_NODE) {
    peer.socket.on("open", handleOpen);
    peer.socket.on("message", function(data, isBinary) {
     if (!isBinary) {
      return;
     }
     handleMessage(new Uint8Array(data).buffer);
    });
    peer.socket.on("close", function() {
     Module["websocket"].emit("close", sock.stream.fd);
    });
    peer.socket.on("error", function(error) {
     sock.error = 14;
     Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
    });
   } else {
    peer.socket.onopen = handleOpen;
    peer.socket.onclose = function() {
     Module["websocket"].emit("close", sock.stream.fd);
    };
    peer.socket.onmessage = function peer_socket_onmessage(event) {
     handleMessage(event.data);
    };
    peer.socket.onerror = function(error) {
     sock.error = 14;
     Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
    };
   }
  },
  poll: function(sock) {
   if (sock.type === 1 && sock.server) {
    return sock.pending.length ? 64 | 1 : 0;
   }
   var mask = 0;
   var dest = sock.type === 1 ? SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) : null;
   if (sock.recv_queue.length || !dest || dest && dest.socket.readyState === dest.socket.CLOSING || dest && dest.socket.readyState === dest.socket.CLOSED) {
    mask |= 64 | 1;
   }
   if (!dest || dest && dest.socket.readyState === dest.socket.OPEN) {
    mask |= 4;
   }
   if (dest && dest.socket.readyState === dest.socket.CLOSING || dest && dest.socket.readyState === dest.socket.CLOSED) {
    mask |= 16;
   }
   return mask;
  },
  ioctl: function(sock, request, arg) {
   switch (request) {
   case 21531:
    var bytes = 0;
    if (sock.recv_queue.length) {
     bytes = sock.recv_queue[0].data.length;
    }
    HEAP32[arg >> 2] = bytes;
    return 0;

   default:
    return 28;
   }
  },
  close: function(sock) {
   if (sock.server) {
    try {
     sock.server.close();
    } catch (e) {}
    sock.server = null;
   }
   var peers = Object.keys(sock.peers);
   for (var i = 0; i < peers.length; i++) {
    var peer = sock.peers[peers[i]];
    try {
     peer.socket.close();
    } catch (e) {}
    SOCKFS.websocket_sock_ops.removePeer(sock, peer);
   }
   return 0;
  },
  bind: function(sock, addr, port) {
   if (typeof sock.saddr != "undefined" || typeof sock.sport != "undefined") {
    throw new FS.ErrnoError(28);
   }
   sock.saddr = addr;
   sock.sport = port;
   if (sock.type === 2) {
    if (sock.server) {
     sock.server.close();
     sock.server = null;
    }
    try {
     sock.sock_ops.listen(sock, 0);
    } catch (e) {
     if (!(e.name === "ErrnoError")) throw e;
     if (e.errno !== 138) throw e;
    }
   }
  },
  connect: function(sock, addr, port) {
   if (sock.server) {
    throw new FS.ErrnoError(138);
   }
   if (typeof sock.daddr != "undefined" && typeof sock.dport != "undefined") {
    var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
    if (dest) {
     if (dest.socket.readyState === dest.socket.CONNECTING) {
      throw new FS.ErrnoError(7);
     } else {
      throw new FS.ErrnoError(30);
     }
    }
   }
   var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
   sock.daddr = peer.addr;
   sock.dport = peer.port;
   throw new FS.ErrnoError(26);
  },
  listen: function(sock, backlog) {
   if (!ENVIRONMENT_IS_NODE) {
    throw new FS.ErrnoError(138);
   }
  },
  accept: function(listensock) {
   if (!listensock.server || !listensock.pending.length) {
    throw new FS.ErrnoError(28);
   }
   var newsock = listensock.pending.shift();
   newsock.stream.flags = listensock.stream.flags;
   return newsock;
  },
  getname: function(sock, peer) {
   var addr, port;
   if (peer) {
    if (sock.daddr === undefined || sock.dport === undefined) {
     throw new FS.ErrnoError(53);
    }
    addr = sock.daddr;
    port = sock.dport;
   } else {
    addr = sock.saddr || 0;
    port = sock.sport || 0;
   }
   return {
    addr: addr,
    port: port
   };
  },
  sendmsg: function(sock, buffer, offset, length, addr, port) {
   if (sock.type === 2) {
    if (addr === undefined || port === undefined) {
     addr = sock.daddr;
     port = sock.dport;
    }
    if (addr === undefined || port === undefined) {
     throw new FS.ErrnoError(17);
    }
   } else {
    addr = sock.daddr;
    port = sock.dport;
   }
   var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
   if (sock.type === 1) {
    if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
     throw new FS.ErrnoError(53);
    } else if (dest.socket.readyState === dest.socket.CONNECTING) {
     throw new FS.ErrnoError(6);
    }
   }
   if (ArrayBuffer.isView(buffer)) {
    offset += buffer.byteOffset;
    buffer = buffer.buffer;
   }
   var data;
   data = buffer.slice(offset, offset + length);
   if (sock.type === 2) {
    if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
     if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
      dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
     }
     dest.dgram_send_queue.push(data);
     return length;
    }
   }
   try {
    dest.socket.send(data);
    return length;
   } catch (e) {
    throw new FS.ErrnoError(28);
   }
  },
  recvmsg: function(sock, length) {
   if (sock.type === 1 && sock.server) {
    throw new FS.ErrnoError(53);
   }
   var queued = sock.recv_queue.shift();
   if (!queued) {
    if (sock.type === 1) {
     var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
     if (!dest) {
      throw new FS.ErrnoError(53);
     }
     if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
      return null;
     }
     throw new FS.ErrnoError(6);
    }
    throw new FS.ErrnoError(6);
   }
   var queuedLength = queued.data.byteLength || queued.data.length;
   var queuedOffset = queued.data.byteOffset || 0;
   var queuedBuffer = queued.data.buffer || queued.data;
   var bytesRead = Math.min(length, queuedLength);
   var res = {
    buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
    addr: queued.addr,
    port: queued.port
   };
   if (sock.type === 1 && bytesRead < queuedLength) {
    var bytesRemaining = queuedLength - bytesRead;
    queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
    sock.recv_queue.unshift(queued);
   }
   return res;
  }
 }
};

function getSocketFromFD(fd) {
 var socket = SOCKFS.getSocket(fd);
 if (!socket) throw new FS.ErrnoError(8);
 return socket;
}

function setErrNo(value) {
 HEAP32[___errno_location() >> 2] = value;
 return value;
}

function inetPton4(str) {
 var b = str.split(".");
 for (var i = 0; i < 4; i++) {
  var tmp = Number(b[i]);
  if (isNaN(tmp)) return null;
  b[i] = tmp;
 }
 return (b[0] | b[1] << 8 | b[2] << 16 | b[3] << 24) >>> 0;
}

function jstoi_q(str) {
 return parseInt(str);
}

function inetPton6(str) {
 var words;
 var w, offset, z;
 var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
 var parts = [];
 if (!valid6regx.test(str)) {
  return null;
 }
 if (str === "::") {
  return [ 0, 0, 0, 0, 0, 0, 0, 0 ];
 }
 if (str.startsWith("::")) {
  str = str.replace("::", "Z:");
 } else {
  str = str.replace("::", ":Z:");
 }
 if (str.indexOf(".") > 0) {
  str = str.replace(new RegExp("[.]", "g"), ":");
  words = str.split(":");
  words[words.length - 4] = jstoi_q(words[words.length - 4]) + jstoi_q(words[words.length - 3]) * 256;
  words[words.length - 3] = jstoi_q(words[words.length - 2]) + jstoi_q(words[words.length - 1]) * 256;
  words = words.slice(0, words.length - 2);
 } else {
  words = str.split(":");
 }
 offset = 0;
 z = 0;
 for (w = 0; w < words.length; w++) {
  if (typeof words[w] == "string") {
   if (words[w] === "Z") {
    for (z = 0; z < 8 - words.length + 1; z++) {
     parts[w + z] = 0;
    }
    offset = z - 1;
   } else {
    parts[w + offset] = _htons(parseInt(words[w], 16));
   }
  } else {
   parts[w + offset] = words[w];
  }
 }
 return [ parts[1] << 16 | parts[0], parts[3] << 16 | parts[2], parts[5] << 16 | parts[4], parts[7] << 16 | parts[6] ];
}

function writeSockaddr(sa, family, addr, port, addrlen) {
 switch (family) {
 case 2:
  addr = inetPton4(addr);
  zeroMemory(sa, 16);
  if (addrlen) {
   HEAP32[addrlen >> 2] = 16;
  }
  HEAP16[sa >> 1] = family;
  HEAP32[sa + 4 >> 2] = addr;
  HEAP16[sa + 2 >> 1] = _htons(port);
  break;

 case 10:
  addr = inetPton6(addr);
  zeroMemory(sa, 28);
  if (addrlen) {
   HEAP32[addrlen >> 2] = 28;
  }
  HEAP32[sa >> 2] = family;
  HEAP32[sa + 8 >> 2] = addr[0];
  HEAP32[sa + 12 >> 2] = addr[1];
  HEAP32[sa + 16 >> 2] = addr[2];
  HEAP32[sa + 20 >> 2] = addr[3];
  HEAP16[sa + 2 >> 1] = _htons(port);
  break;

 default:
  return 5;
 }
 return 0;
}

var DNS = {
 address_map: {
  id: 1,
  addrs: {},
  names: {}
 },
 lookup_name: function(name) {
  var res = inetPton4(name);
  if (res !== null) {
   return name;
  }
  res = inetPton6(name);
  if (res !== null) {
   return name;
  }
  var addr;
  if (DNS.address_map.addrs[name]) {
   addr = DNS.address_map.addrs[name];
  } else {
   var id = DNS.address_map.id++;
   assert(id < 65535, "exceeded max address mappings of 65535");
   addr = "172.29." + (id & 255) + "." + (id & 65280);
   DNS.address_map.names[addr] = name;
   DNS.address_map.addrs[name] = addr;
  }
  return addr;
 },
 lookup_addr: function(addr) {
  if (DNS.address_map.names[addr]) {
   return DNS.address_map.names[addr];
  }
  return null;
 }
};

function ___syscall_accept4(fd, addr, addrlen, flags, d1, d2) {
 try {
  var sock = getSocketFromFD(fd);
  var newsock = sock.sock_ops.accept(sock);
  if (addr) {
   var errno = writeSockaddr(addr, newsock.family, DNS.lookup_name(newsock.daddr), newsock.dport, addrlen);
  }
  return newsock.stream.fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function inetNtop4(addr) {
 return (addr & 255) + "." + (addr >> 8 & 255) + "." + (addr >> 16 & 255) + "." + (addr >> 24 & 255);
}

function inetNtop6(ints) {
 var str = "";
 var word = 0;
 var longest = 0;
 var lastzero = 0;
 var zstart = 0;
 var len = 0;
 var i = 0;
 var parts = [ ints[0] & 65535, ints[0] >> 16, ints[1] & 65535, ints[1] >> 16, ints[2] & 65535, ints[2] >> 16, ints[3] & 65535, ints[3] >> 16 ];
 var hasipv4 = true;
 var v4part = "";
 for (i = 0; i < 5; i++) {
  if (parts[i] !== 0) {
   hasipv4 = false;
   break;
  }
 }
 if (hasipv4) {
  v4part = inetNtop4(parts[6] | parts[7] << 16);
  if (parts[5] === -1) {
   str = "::ffff:";
   str += v4part;
   return str;
  }
  if (parts[5] === 0) {
   str = "::";
   if (v4part === "0.0.0.0") v4part = "";
   if (v4part === "0.0.0.1") v4part = "1";
   str += v4part;
   return str;
  }
 }
 for (word = 0; word < 8; word++) {
  if (parts[word] === 0) {
   if (word - lastzero > 1) {
    len = 0;
   }
   lastzero = word;
   len++;
  }
  if (len > longest) {
   longest = len;
   zstart = word - longest + 1;
  }
 }
 for (word = 0; word < 8; word++) {
  if (longest > 1) {
   if (parts[word] === 0 && word >= zstart && word < zstart + longest) {
    if (word === zstart) {
     str += ":";
     if (zstart === 0) str += ":";
    }
    continue;
   }
  }
  str += Number(_ntohs(parts[word] & 65535)).toString(16);
  str += word < 7 ? ":" : "";
 }
 return str;
}

function readSockaddr(sa, salen) {
 var family = HEAP16[sa >> 1];
 var port = _ntohs(HEAPU16[sa + 2 >> 1]);
 var addr;
 switch (family) {
 case 2:
  if (salen !== 16) {
   return {
    errno: 28
   };
  }
  addr = HEAP32[sa + 4 >> 2];
  addr = inetNtop4(addr);
  break;

 case 10:
  if (salen !== 28) {
   return {
    errno: 28
   };
  }
  addr = [ HEAP32[sa + 8 >> 2], HEAP32[sa + 12 >> 2], HEAP32[sa + 16 >> 2], HEAP32[sa + 20 >> 2] ];
  addr = inetNtop6(addr);
  break;

 default:
  return {
   errno: 5
  };
 }
 return {
  family: family,
  addr: addr,
  port: port
 };
}

function getSocketAddress(addrp, addrlen, allowNull) {
 if (allowNull && addrp === 0) return null;
 var info = readSockaddr(addrp, addrlen);
 if (info.errno) throw new FS.ErrnoError(info.errno);
 info.addr = DNS.lookup_addr(info.addr) || info.addr;
 return info;
}

function ___syscall_bind(fd, addr, addrlen, d1, d2, d3) {
 try {
  var sock = getSocketFromFD(fd);
  var info = getSocketAddress(addr, addrlen);
  sock.sock_ops.bind(sock, info.addr, info.port);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_chdir(path) {
 try {
  path = SYSCALLS.getStr(path);
  FS.chdir(path);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_chmod(path, mode) {
 try {
  path = SYSCALLS.getStr(path);
  FS.chmod(path, mode);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_connect(fd, addr, addrlen, d1, d2, d3) {
 try {
  var sock = getSocketFromFD(fd);
  var info = getSocketAddress(addr, addrlen);
  sock.sock_ops.connect(sock, info.addr, info.port);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_dup(fd) {
 try {
  var old = SYSCALLS.getStreamFromFD(fd);
  return FS.createStream(old, 0).fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_faccessat(dirfd, path, amode, flags) {
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (amode & ~7) {
   return -28;
  }
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node) {
   return -44;
  }
  var perms = "";
  if (amode & 4) perms += "r";
  if (amode & 2) perms += "w";
  if (amode & 1) perms += "x";
  if (perms && FS.nodePermissions(node, perms)) {
   return -2;
  }
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fchownat(dirfd, path, owner, group, flags) {
 try {
  path = SYSCALLS.getStr(path);
  var nofollow = flags & 256;
  flags = flags & ~256;
  path = SYSCALLS.calculateAt(dirfd, path);
  (nofollow ? FS.lchown : FS.chown)(path, owner, group);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fcntl64(fd, cmd, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (cmd) {
  case 0:
   {
    var arg = SYSCALLS.get();
    if (arg < 0) {
     return -28;
    }
    var newStream;
    newStream = FS.createStream(stream, arg);
    return newStream.fd;
   }

  case 1:
  case 2:
   return 0;

  case 3:
   return stream.flags;

  case 4:
   {
    var arg = SYSCALLS.get();
    stream.flags |= arg;
    return 0;
   }

  case 5:
   {
    var arg = SYSCALLS.get();
    var offset = 0;
    HEAP16[arg + offset >> 1] = 2;
    return 0;
   }

  case 6:
  case 7:
   return 0;

  case 16:
  case 8:
   return -28;

  case 9:
   setErrNo(28);
   return -1;

  default:
   {
    return -28;
   }
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fdatasync(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fstat64(fd, buf) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return SYSCALLS.doStat(FS.stat, stream.path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function convertI32PairToI53Checked(lo, hi) {
 return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
}

function ___syscall_ftruncate64(fd, length_low, length_high) {
 try {
  var length = convertI32PairToI53Checked(length_low, length_high);
  if (isNaN(length)) return -61;
  FS.ftruncate(fd, length);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}

function ___syscall_getcwd(buf, size) {
 try {
  if (size === 0) return -28;
  var cwd = FS.cwd();
  var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
  if (size < cwdLengthInBytes) return -68;
  stringToUTF8(cwd, buf, size);
  return cwdLengthInBytes;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getdents64(fd, dirp, count) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (!stream.getdents) {
   stream.getdents = FS.readdir(stream.path);
  }
  var struct_size = 280;
  var pos = 0;
  var off = FS.llseek(stream, 0, 1);
  var idx = Math.floor(off / struct_size);
  while (idx < stream.getdents.length && pos + struct_size <= count) {
   var id;
   var type;
   var name = stream.getdents[idx];
   if (name === ".") {
    id = stream.node.id;
    type = 4;
   } else if (name === "..") {
    var lookup = FS.lookupPath(stream.path, {
     parent: true
    });
    id = lookup.node.id;
    type = 4;
   } else {
    var child = FS.lookupNode(stream.node, name);
    id = child.id;
    type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
   }
   tempI64 = [ id >>> 0, (tempDouble = id, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
   HEAP32[dirp + pos >> 2] = tempI64[0], HEAP32[dirp + pos + 4 >> 2] = tempI64[1];
   tempI64 = [ (idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, 
   +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
   HEAP32[dirp + pos + 8 >> 2] = tempI64[0], HEAP32[dirp + pos + 12 >> 2] = tempI64[1];
   HEAP16[dirp + pos + 16 >> 1] = 280;
   HEAP8[dirp + pos + 18 >> 0] = type;
   stringToUTF8(name, dirp + pos + 19, 256);
   pos += struct_size;
   idx += 1;
  }
  FS.llseek(stream, idx * struct_size, 0);
  return pos;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getpeername(fd, addr, addrlen, d1, d2, d3) {
 try {
  var sock = getSocketFromFD(fd);
  if (!sock.daddr) {
   return -53;
  }
  var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(sock.daddr), sock.dport, addrlen);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getsockname(fd, addr, addrlen, d1, d2, d3) {
 try {
  err("__syscall_getsockname " + fd);
  var sock = getSocketFromFD(fd);
  var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(sock.saddr || "0.0.0.0"), sock.sport, addrlen);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getsockopt(fd, level, optname, optval, optlen, d1) {
 try {
  var sock = getSocketFromFD(fd);
  if (level === 1) {
   if (optname === 4) {
    HEAP32[optval >> 2] = sock.error;
    HEAP32[optlen >> 2] = 4;
    sock.error = null;
    return 0;
   }
  }
  return -50;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_ioctl(fd, op, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (op) {
  case 21509:
  case 21505:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21510:
  case 21511:
  case 21512:
  case 21506:
  case 21507:
  case 21508:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21519:
   {
    if (!stream.tty) return -59;
    var argp = SYSCALLS.get();
    HEAP32[argp >> 2] = 0;
    return 0;
   }

  case 21520:
   {
    if (!stream.tty) return -59;
    return -28;
   }

  case 21531:
   {
    var argp = SYSCALLS.get();
    return FS.ioctl(stream, op, argp);
   }

  case 21523:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21524:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  default:
   return -28;
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_listen(fd, backlog) {
 try {
  var sock = getSocketFromFD(fd);
  sock.sock_ops.listen(sock, backlog);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_lstat64(path, buf) {
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.lstat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_mkdirat(dirfd, path, mode) {
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_newfstatat(dirfd, path, buf, flags) {
 try {
  path = SYSCALLS.getStr(path);
  var nofollow = flags & 256;
  var allowEmpty = flags & 4096;
  flags = flags & ~6400;
  path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
  return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_openat(dirfd, path, flags, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  var mode = varargs ? SYSCALLS.get() : 0;
  return FS.open(path, flags, mode).fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var PIPEFS = {
 BUCKET_BUFFER_SIZE: 8192,
 mount: function(mount) {
  return FS.createNode(null, "/", 16384 | 511, 0);
 },
 createPipe: function() {
  var pipe = {
   buckets: [],
   refcnt: 2
  };
  pipe.buckets.push({
   buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
   offset: 0,
   roffset: 0
  });
  var rName = PIPEFS.nextname();
  var wName = PIPEFS.nextname();
  var rNode = FS.createNode(PIPEFS.root, rName, 4096, 0);
  var wNode = FS.createNode(PIPEFS.root, wName, 4096, 0);
  rNode.pipe = pipe;
  wNode.pipe = pipe;
  var readableStream = FS.createStream({
   path: rName,
   node: rNode,
   flags: 0,
   seekable: false,
   stream_ops: PIPEFS.stream_ops
  });
  rNode.stream = readableStream;
  var writableStream = FS.createStream({
   path: wName,
   node: wNode,
   flags: 1,
   seekable: false,
   stream_ops: PIPEFS.stream_ops
  });
  wNode.stream = writableStream;
  return {
   readable_fd: readableStream.fd,
   writable_fd: writableStream.fd
  };
 },
 stream_ops: {
  poll: function(stream) {
   var pipe = stream.node.pipe;
   if ((stream.flags & 2097155) === 1) {
    return 256 | 4;
   }
   if (pipe.buckets.length > 0) {
    for (var i = 0; i < pipe.buckets.length; i++) {
     var bucket = pipe.buckets[i];
     if (bucket.offset - bucket.roffset > 0) {
      return 64 | 1;
     }
    }
   }
   return 0;
  },
  ioctl: function(stream, request, varargs) {
   return 28;
  },
  fsync: function(stream) {
   return 28;
  },
  read: function(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   var currentLength = 0;
   for (var i = 0; i < pipe.buckets.length; i++) {
    var bucket = pipe.buckets[i];
    currentLength += bucket.offset - bucket.roffset;
   }
   assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer));
   var data = buffer.subarray(offset, offset + length);
   if (length <= 0) {
    return 0;
   }
   if (currentLength == 0) {
    throw new FS.ErrnoError(6);
   }
   var toRead = Math.min(currentLength, length);
   var totalRead = toRead;
   var toRemove = 0;
   for (var i = 0; i < pipe.buckets.length; i++) {
    var currBucket = pipe.buckets[i];
    var bucketSize = currBucket.offset - currBucket.roffset;
    if (toRead <= bucketSize) {
     var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
     if (toRead < bucketSize) {
      tmpSlice = tmpSlice.subarray(0, toRead);
      currBucket.roffset += toRead;
     } else {
      toRemove++;
     }
     data.set(tmpSlice);
     break;
    } else {
     var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
     data.set(tmpSlice);
     data = data.subarray(tmpSlice.byteLength);
     toRead -= tmpSlice.byteLength;
     toRemove++;
    }
   }
   if (toRemove && toRemove == pipe.buckets.length) {
    toRemove--;
    pipe.buckets[toRemove].offset = 0;
    pipe.buckets[toRemove].roffset = 0;
   }
   pipe.buckets.splice(0, toRemove);
   return totalRead;
  },
  write: function(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer));
   var data = buffer.subarray(offset, offset + length);
   var dataLen = data.byteLength;
   if (dataLen <= 0) {
    return 0;
   }
   var currBucket = null;
   if (pipe.buckets.length == 0) {
    currBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: 0,
     roffset: 0
    };
    pipe.buckets.push(currBucket);
   } else {
    currBucket = pipe.buckets[pipe.buckets.length - 1];
   }
   assert(currBucket.offset <= PIPEFS.BUCKET_BUFFER_SIZE);
   var freeBytesInCurrBuffer = PIPEFS.BUCKET_BUFFER_SIZE - currBucket.offset;
   if (freeBytesInCurrBuffer >= dataLen) {
    currBucket.buffer.set(data, currBucket.offset);
    currBucket.offset += dataLen;
    return dataLen;
   } else if (freeBytesInCurrBuffer > 0) {
    currBucket.buffer.set(data.subarray(0, freeBytesInCurrBuffer), currBucket.offset);
    currBucket.offset += freeBytesInCurrBuffer;
    data = data.subarray(freeBytesInCurrBuffer, data.byteLength);
   }
   var numBuckets = data.byteLength / PIPEFS.BUCKET_BUFFER_SIZE | 0;
   var remElements = data.byteLength % PIPEFS.BUCKET_BUFFER_SIZE;
   for (var i = 0; i < numBuckets; i++) {
    var newBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: PIPEFS.BUCKET_BUFFER_SIZE,
     roffset: 0
    };
    pipe.buckets.push(newBucket);
    newBucket.buffer.set(data.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE));
    data = data.subarray(PIPEFS.BUCKET_BUFFER_SIZE, data.byteLength);
   }
   if (remElements > 0) {
    var newBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: data.byteLength,
     roffset: 0
    };
    pipe.buckets.push(newBucket);
    newBucket.buffer.set(data);
   }
   return dataLen;
  },
  close: function(stream) {
   var pipe = stream.node.pipe;
   pipe.refcnt--;
   if (pipe.refcnt === 0) {
    pipe.buckets = null;
   }
  }
 },
 nextname: function() {
  if (!PIPEFS.nextname.current) {
   PIPEFS.nextname.current = 0;
  }
  return "pipe[" + PIPEFS.nextname.current++ + "]";
 }
};

function ___syscall_pipe(fdPtr) {
 try {
  if (fdPtr == 0) {
   throw new FS.ErrnoError(21);
  }
  var res = PIPEFS.createPipe();
  HEAP32[fdPtr >> 2] = res.readable_fd;
  HEAP32[fdPtr + 4 >> 2] = res.writable_fd;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_poll(fds, nfds, timeout) {
 try {
  var nonzero = 0;
  for (var i = 0; i < nfds; i++) {
   var pollfd = fds + 8 * i;
   var fd = HEAP32[pollfd >> 2];
   var events = HEAP16[pollfd + 4 >> 1];
   var mask = 32;
   var stream = FS.getStream(fd);
   if (stream) {
    mask = SYSCALLS.DEFAULT_POLLMASK;
    if (stream.stream_ops.poll) {
     mask = stream.stream_ops.poll(stream);
    }
   }
   mask &= events | 8 | 16;
   if (mask) nonzero++;
   HEAP16[pollfd + 6 >> 1] = mask;
  }
  return nonzero;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (bufsize <= 0) return -28;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = HEAP8[buf + len];
  stringToUTF8(ret, buf, bufsize + 1);
  HEAP8[buf + len] = endChar;
  return len;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_recvfrom(fd, buf, len, flags, addr, addrlen) {
 try {
  var sock = getSocketFromFD(fd);
  var msg = sock.sock_ops.recvmsg(sock, len);
  if (!msg) return 0;
  if (addr) {
   var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(msg.addr), msg.port, addrlen);
  }
  HEAPU8.set(msg.buffer, buf);
  return msg.buffer.byteLength;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
 try {
  oldpath = SYSCALLS.getStr(oldpath);
  newpath = SYSCALLS.getStr(newpath);
  oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
  newpath = SYSCALLS.calculateAt(newdirfd, newpath);
  FS.rename(oldpath, newpath);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_rmdir(path) {
 try {
  path = SYSCALLS.getStr(path);
  FS.rmdir(path);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_sendto(fd, message, length, flags, addr, addr_len) {
 try {
  var sock = getSocketFromFD(fd);
  var dest = getSocketAddress(addr, addr_len, true);
  if (!dest) {
   return FS.write(sock.stream, HEAP8, message, length);
  }
  return sock.sock_ops.sendmsg(sock, HEAP8, message, length, dest.addr, dest.port);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_socket(domain, type, protocol) {
 try {
  var sock = SOCKFS.createSocket(domain, type, protocol);
  return sock.stream.fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_stat64(path, buf) {
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.stat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_statfs64(path, size, buf) {
 try {
  path = SYSCALLS.getStr(path);
  HEAP32[buf + 4 >> 2] = 4096;
  HEAP32[buf + 40 >> 2] = 4096;
  HEAP32[buf + 8 >> 2] = 1e6;
  HEAP32[buf + 12 >> 2] = 5e5;
  HEAP32[buf + 16 >> 2] = 5e5;
  HEAP32[buf + 20 >> 2] = FS.nextInode;
  HEAP32[buf + 24 >> 2] = 1e6;
  HEAP32[buf + 28 >> 2] = 42;
  HEAP32[buf + 44 >> 2] = 2;
  HEAP32[buf + 36 >> 2] = 255;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_symlink(target, linkpath) {
 try {
  target = SYSCALLS.getStr(target);
  linkpath = SYSCALLS.getStr(linkpath);
  FS.symlink(target, linkpath);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_unlinkat(dirfd, path, flags) {
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (flags === 0) {
   FS.unlink(path);
  } else if (flags === 512) {
   FS.rmdir(path);
  } else {
   abort("Invalid flags passed to unlinkat");
  }
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function readI53FromI64(ptr) {
 return HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296;
}

function ___syscall_utimensat(dirfd, path, times, flags) {
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path, true);
  if (!times) {
   var atime = Date.now();
   var mtime = atime;
  } else {
   var seconds = readI53FromI64(times);
   var nanoseconds = HEAP32[times + 8 >> 2];
   atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
   times += 16;
   seconds = readI53FromI64(times);
   nanoseconds = HEAP32[times + 8 >> 2];
   mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
  }
  FS.utime(path, atime, mtime);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var nowIsMonotonic = true;

function __emscripten_get_now_is_monotonic() {
 return nowIsMonotonic;
}

function __emscripten_throw_longjmp() {
 throw Infinity;
}

function __gmtime_js(time, tmPtr) {
 var date = new Date(readI53FromI64(time) * 1e3);
 HEAP32[tmPtr >> 2] = date.getUTCSeconds();
 HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
 HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
 HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
 HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
 HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
 HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
 var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
 var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
 HEAP32[tmPtr + 28 >> 2] = yday;
}

function isLeapYear(year) {
 return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

var MONTH_DAYS_LEAP_CUMULATIVE = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

var MONTH_DAYS_REGULAR_CUMULATIVE = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

function ydayFromDate(date) {
 var leap = isLeapYear(date.getFullYear());
 var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
 var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
 return yday;
}

function __localtime_js(time, tmPtr) {
 var date = new Date(readI53FromI64(time) * 1e3);
 HEAP32[tmPtr >> 2] = date.getSeconds();
 HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
 HEAP32[tmPtr + 8 >> 2] = date.getHours();
 HEAP32[tmPtr + 12 >> 2] = date.getDate();
 HEAP32[tmPtr + 16 >> 2] = date.getMonth();
 HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
 HEAP32[tmPtr + 24 >> 2] = date.getDay();
 var yday = ydayFromDate(date) | 0;
 HEAP32[tmPtr + 28 >> 2] = yday;
 HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
 var start = new Date(date.getFullYear(), 0, 1);
 var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
 HEAP32[tmPtr + 32 >> 2] = dst;
}

function __mktime_js(tmPtr) {
 var date = new Date(HEAP32[tmPtr + 20 >> 2] + 1900, HEAP32[tmPtr + 16 >> 2], HEAP32[tmPtr + 12 >> 2], HEAP32[tmPtr + 8 >> 2], HEAP32[tmPtr + 4 >> 2], HEAP32[tmPtr >> 2], 0);
 var dst = HEAP32[tmPtr + 32 >> 2];
 var guessedOffset = date.getTimezoneOffset();
 var start = new Date(date.getFullYear(), 0, 1);
 var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dstOffset = Math.min(winterOffset, summerOffset);
 if (dst < 0) {
  HEAP32[tmPtr + 32 >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
 } else if (dst > 0 != (dstOffset == guessedOffset)) {
  var nonDstOffset = Math.max(winterOffset, summerOffset);
  var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
  date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
 }
 HEAP32[tmPtr + 24 >> 2] = date.getDay();
 var yday = ydayFromDate(date) | 0;
 HEAP32[tmPtr + 28 >> 2] = yday;
 HEAP32[tmPtr >> 2] = date.getSeconds();
 HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
 HEAP32[tmPtr + 8 >> 2] = date.getHours();
 HEAP32[tmPtr + 12 >> 2] = date.getDate();
 HEAP32[tmPtr + 16 >> 2] = date.getMonth();
 HEAP32[tmPtr + 20 >> 2] = date.getYear();
 return date.getTime() / 1e3 | 0;
}

function __mmap_js(len, prot, flags, fd, off, allocated, addr) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var res = FS.mmap(stream, len, off, prot, flags);
  var ptr = res.ptr;
  HEAP32[allocated >> 2] = res.allocated;
  HEAPU32[addr >> 2] = ptr;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function __munmap_js(addr, len, prot, flags, fd, offset) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (prot & 2) {
   SYSCALLS.doMsync(addr, stream, len, flags, offset);
  }
  FS.munmap(stream);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var timers = {};

function handleException(e) {
 if (e instanceof ExitStatus || e == "unwind") {
  return EXITSTATUS;
 }
 quit_(1, e);
}

function _proc_exit(code) {
 EXITSTATUS = code;
 if (!keepRuntimeAlive()) {
  if (Module["onExit"]) Module["onExit"](code);
  ABORT = true;
 }
 quit_(code, new ExitStatus(code));
}

function exitJS(status, implicit) {
 EXITSTATUS = status;
 _proc_exit(status);
}

var _exit = exitJS;

function maybeExit() {
 if (!keepRuntimeAlive()) {
  try {
   _exit(EXITSTATUS);
  } catch (e) {
   handleException(e);
  }
 }
}

function callUserCallback(func) {
 if (ABORT) {
  return;
 }
 try {
  func();
  maybeExit();
 } catch (e) {
  handleException(e);
 }
}

var _emscripten_get_now;

_emscripten_get_now = () => performance.now();

function __setitimer_js(which, timeout_ms) {
 if (timers[which]) {
  clearTimeout(timers[which].id);
  delete timers[which];
 }
 if (!timeout_ms) return 0;
 var id = setTimeout(() => {
  delete timers[which];
  callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
 }, timeout_ms);
 timers[which] = {
  id: id,
  timeout_ms: timeout_ms
 };
 return 0;
}

function stringToNewUTF8(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8(str, ret, size);
 return ret;
}

function __tzset_js(timezone, daylight, tzname) {
 var currentYear = new Date().getFullYear();
 var winter = new Date(currentYear, 0, 1);
 var summer = new Date(currentYear, 6, 1);
 var winterOffset = winter.getTimezoneOffset();
 var summerOffset = summer.getTimezoneOffset();
 var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
 HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
 HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
 function extractZone(date) {
  var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
  return match ? match[1] : "GMT";
 }
 var winterName = extractZone(winter);
 var summerName = extractZone(summer);
 var winterNamePtr = stringToNewUTF8(winterName);
 var summerNamePtr = stringToNewUTF8(summerName);
 if (summerOffset < winterOffset) {
  HEAPU32[tzname >> 2] = winterNamePtr;
  HEAPU32[tzname + 4 >> 2] = summerNamePtr;
 } else {
  HEAPU32[tzname >> 2] = summerNamePtr;
  HEAPU32[tzname + 4 >> 2] = winterNamePtr;
 }
}

function _abort() {
 abort("");
}

function _dlopen(handle) {
 abort(dlopenMissingError);
}

var readEmAsmArgsArray = [];

function readEmAsmArgs(sigPtr, buf) {
 readEmAsmArgsArray.length = 0;
 var ch;
 buf >>= 2;
 while (ch = HEAPU8[sigPtr++]) {
  buf += ch != 105 & buf;
  readEmAsmArgsArray.push(ch == 105 ? HEAP32[buf] : HEAPF64[buf++ >> 1]);
  ++buf;
 }
 return readEmAsmArgsArray;
}

function runEmAsmFunction(code, sigPtr, argbuf) {
 var args = readEmAsmArgs(sigPtr, argbuf);
 return ASM_CONSTS[code].apply(null, args);
}

function _emscripten_asm_const_int(code, sigPtr, argbuf) {
 return runEmAsmFunction(code, sigPtr, argbuf);
}

function _emscripten_asm_const_ptr(code, sigPtr, argbuf) {
 return runEmAsmFunction(code, sigPtr, argbuf);
}

function _emscripten_date_now() {
 return Date.now();
}

function getHeapMax() {
 return 2147483648;
}

function _emscripten_get_heap_max() {
 return getHeapMax();
}

function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.copyWithin(dest, src, src + num);
}

function emscripten_realloc_buffer(size) {
 var b = wasmMemory.buffer;
 try {
  wasmMemory.grow(size - b.byteLength + 65535 >>> 16);
  updateMemoryViews();
  return 1;
 } catch (e) {}
}

function _emscripten_resize_heap(requestedSize) {
 var oldSize = HEAPU8.length;
 requestedSize = requestedSize >>> 0;
 var maxHeapSize = getHeapMax();
 if (requestedSize > maxHeapSize) {
  return false;
 }
 let alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  var replacement = emscripten_realloc_buffer(newSize);
  if (replacement) {
   return true;
  }
 }
 return false;
}

var ENV = {};

function getExecutableName() {
 return thisProgram || "./this.program";
}

function getEnvStrings() {
 if (!getEnvStrings.strings) {
  var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": lang,
   "_": getExecutableName()
  };
  for (var x in ENV) {
   if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(x + "=" + env[x]);
  }
  getEnvStrings.strings = strings;
 }
 return getEnvStrings.strings;
}

function stringToAscii(str, buffer) {
 for (var i = 0; i < str.length; ++i) {
  HEAP8[buffer++ >> 0] = str.charCodeAt(i);
 }
 HEAP8[buffer >> 0] = 0;
}

function _environ_get(__environ, environ_buf) {
 var bufSize = 0;
 getEnvStrings().forEach(function(string, i) {
  var ptr = environ_buf + bufSize;
  HEAPU32[__environ + i * 4 >> 2] = ptr;
  stringToAscii(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
}

function _environ_sizes_get(penviron_count, penviron_buf_size) {
 var strings = getEnvStrings();
 HEAPU32[penviron_count >> 2] = strings.length;
 var bufSize = 0;
 strings.forEach(function(string) {
  bufSize += string.length + 1;
 });
 HEAPU32[penviron_buf_size >> 2] = bufSize;
 return 0;
}

function _fd_close(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_fdstat_get(fd, pbuf) {
 try {
  var rightsBase = 0;
  var rightsInheriting = 0;
  var flags = 0;
  {
   var stream = SYSCALLS.getStreamFromFD(fd);
   var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
  }
  HEAP8[pbuf >> 0] = type;
  HEAP16[pbuf + 2 >> 1] = flags;
  tempI64 = [ rightsBase >>> 0, (tempDouble = rightsBase, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[pbuf + 8 >> 2] = tempI64[0], HEAP32[pbuf + 12 >> 2] = tempI64[1];
  tempI64 = [ rightsInheriting >>> 0, (tempDouble = rightsInheriting, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[pbuf + 16 >> 2] = tempI64[0], HEAP32[pbuf + 20 >> 2] = tempI64[1];
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function doReadv(stream, iov, iovcnt, offset) {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAPU32[iov >> 2];
  var len = HEAPU32[iov + 4 >> 2];
  iov += 8;
  var curr = FS.read(stream, HEAP8, ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (curr < len) break;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
}

function _fd_read(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doReadv(stream, iov, iovcnt);
  HEAPU32[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
 try {
  var offset = convertI32PairToI53Checked(offset_low, offset_high);
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.llseek(stream, offset, whence);
  tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_sync(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (stream.stream_ops && stream.stream_ops.fsync) {
   return stream.stream_ops.fsync(stream);
  }
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function doWritev(stream, iov, iovcnt, offset) {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAPU32[iov >> 2];
  var len = HEAPU32[iov + 4 >> 2];
  iov += 8;
  var curr = FS.write(stream, HEAP8, ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
}

function _fd_write(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doWritev(stream, iov, iovcnt);
  HEAPU32[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _getaddrinfo(node, service, hint, out) {
 var addr = 0;
 var port = 0;
 var flags = 0;
 var family = 0;
 var type = 0;
 var proto = 0;
 var ai;
 function allocaddrinfo(family, type, proto, canon, addr, port) {
  var sa, salen, ai;
  var errno;
  salen = family === 10 ? 28 : 16;
  addr = family === 10 ? inetNtop6(addr) : inetNtop4(addr);
  sa = _malloc(salen);
  errno = writeSockaddr(sa, family, addr, port);
  assert(!errno);
  ai = _malloc(32);
  HEAP32[ai + 4 >> 2] = family;
  HEAP32[ai + 8 >> 2] = type;
  HEAP32[ai + 12 >> 2] = proto;
  HEAP32[ai + 24 >> 2] = canon;
  HEAPU32[ai + 20 >> 2] = sa;
  if (family === 10) {
   HEAP32[ai + 16 >> 2] = 28;
  } else {
   HEAP32[ai + 16 >> 2] = 16;
  }
  HEAP32[ai + 28 >> 2] = 0;
  return ai;
 }
 if (hint) {
  flags = HEAP32[hint >> 2];
  family = HEAP32[hint + 4 >> 2];
  type = HEAP32[hint + 8 >> 2];
  proto = HEAP32[hint + 12 >> 2];
 }
 if (type && !proto) {
  proto = type === 2 ? 17 : 6;
 }
 if (!type && proto) {
  type = proto === 17 ? 2 : 1;
 }
 if (proto === 0) {
  proto = 6;
 }
 if (type === 0) {
  type = 1;
 }
 if (!node && !service) {
  return -2;
 }
 if (flags & ~(1 | 2 | 4 | 1024 | 8 | 16 | 32)) {
  return -1;
 }
 if (hint !== 0 && HEAP32[hint >> 2] & 2 && !node) {
  return -1;
 }
 if (flags & 32) {
  return -2;
 }
 if (type !== 0 && type !== 1 && type !== 2) {
  return -7;
 }
 if (family !== 0 && family !== 2 && family !== 10) {
  return -6;
 }
 if (service) {
  service = UTF8ToString(service);
  port = parseInt(service, 10);
  if (isNaN(port)) {
   if (flags & 1024) {
    return -2;
   }
   return -8;
  }
 }
 if (!node) {
  if (family === 0) {
   family = 2;
  }
  if ((flags & 1) === 0) {
   if (family === 2) {
    addr = _htonl(2130706433);
   } else {
    addr = [ 0, 0, 0, 1 ];
   }
  }
  ai = allocaddrinfo(family, type, proto, null, addr, port);
  HEAPU32[out >> 2] = ai;
  return 0;
 }
 node = UTF8ToString(node);
 addr = inetPton4(node);
 if (addr !== null) {
  if (family === 0 || family === 2) {
   family = 2;
  } else if (family === 10 && flags & 8) {
   addr = [ 0, 0, _htonl(65535), addr ];
   family = 10;
  } else {
   return -2;
  }
 } else {
  addr = inetPton6(node);
  if (addr !== null) {
   if (family === 0 || family === 10) {
    family = 10;
   } else {
    return -2;
   }
  }
 }
 if (addr != null) {
  ai = allocaddrinfo(family, type, proto, node, addr, port);
  HEAPU32[out >> 2] = ai;
  return 0;
 }
 if (flags & 4) {
  return -2;
 }
 node = DNS.lookup_name(node);
 addr = inetPton4(node);
 if (family === 0) {
  family = 2;
 } else if (family === 10) {
  addr = [ 0, 0, _htonl(65535), addr ];
 }
 ai = allocaddrinfo(family, type, proto, null, addr, port);
 HEAPU32[out >> 2] = ai;
 return 0;
}

function _getcontext() {
 err("missing function: getcontext");
 abort(-1);
}

function _getdtablesize() {
 err("missing function: getdtablesize");
 abort(-1);
}

function getHostByName(name) {
 var ret = _malloc(20);
 var nameBuf = stringToNewUTF8(name);
 HEAPU32[ret >> 2] = nameBuf;
 var aliasesBuf = _malloc(4);
 HEAPU32[aliasesBuf >> 2] = 0;
 HEAPU32[ret + 4 >> 2] = aliasesBuf;
 var afinet = 2;
 HEAP32[ret + 8 >> 2] = afinet;
 HEAP32[ret + 12 >> 2] = 4;
 var addrListBuf = _malloc(12);
 HEAPU32[addrListBuf >> 2] = addrListBuf + 8;
 HEAPU32[addrListBuf + 4 >> 2] = 0;
 HEAP32[addrListBuf + 8 >> 2] = inetPton4(DNS.lookup_name(name));
 HEAPU32[ret + 16 >> 2] = addrListBuf;
 return ret;
}

function _gethostbyname(name) {
 return getHostByName(UTF8ToString(name));
}

function _gethostbyname_r(name, ret, buf, buflen, out, err) {
 var data = _gethostbyname(name);
 _memcpy(ret, data, 20);
 _free(data);
 HEAP32[err >> 2] = 0;
 HEAPU32[out >> 2] = ret;
 return 0;
}

function _getloadavg(loadavg, nelem) {
 var limit = Math.min(nelem, 3);
 var doubleSize = 8;
 for (var i = 0; i < limit; i++) {
  HEAPF64[loadavg + i * doubleSize >> 3] = .1;
 }
 return limit;
}

function _getnameinfo(sa, salen, node, nodelen, serv, servlen, flags) {
 var info = readSockaddr(sa, salen);
 if (info.errno) {
  return -6;
 }
 var port = info.port;
 var addr = info.addr;
 var overflowed = false;
 if (node && nodelen) {
  var lookup;
  if (flags & 1 || !(lookup = DNS.lookup_addr(addr))) {
   if (flags & 8) {
    return -2;
   }
  } else {
   addr = lookup;
  }
  var numBytesWrittenExclNull = stringToUTF8(addr, node, nodelen);
  if (numBytesWrittenExclNull + 1 >= nodelen) {
   overflowed = true;
  }
 }
 if (serv && servlen) {
  port = "" + port;
  var numBytesWrittenExclNull = stringToUTF8(port, serv, servlen);
  if (numBytesWrittenExclNull + 1 >= servlen) {
   overflowed = true;
  }
 }
 if (overflowed) {
  return -12;
 }
 return 0;
}

function _makecontext() {
 err("missing function: makecontext");
 abort(-1);
}

function _posix_spawnp() {
 err("missing function: posix_spawnp");
 abort(-1);
}

function arraySum(array, index) {
 var sum = 0;
 for (var i = 0; i <= index; sum += array[i++]) {}
 return sum;
}

var MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

function addDays(date, days) {
 var newDate = new Date(date.getTime());
 while (days > 0) {
  var leap = isLeapYear(newDate.getFullYear());
  var currentMonth = newDate.getMonth();
  var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
  if (days > daysInCurrentMonth - newDate.getDate()) {
   days -= daysInCurrentMonth - newDate.getDate() + 1;
   newDate.setDate(1);
   if (currentMonth < 11) {
    newDate.setMonth(currentMonth + 1);
   } else {
    newDate.setMonth(0);
    newDate.setFullYear(newDate.getFullYear() + 1);
   }
  } else {
   newDate.setDate(newDate.getDate() + days);
   return newDate;
  }
 }
 return newDate;
}

function writeArrayToMemory(array, buffer) {
 HEAP8.set(array, buffer);
}

function _strftime(s, maxsize, format, tm) {
 var tm_zone = HEAP32[tm + 40 >> 2];
 var date = {
  tm_sec: HEAP32[tm >> 2],
  tm_min: HEAP32[tm + 4 >> 2],
  tm_hour: HEAP32[tm + 8 >> 2],
  tm_mday: HEAP32[tm + 12 >> 2],
  tm_mon: HEAP32[tm + 16 >> 2],
  tm_year: HEAP32[tm + 20 >> 2],
  tm_wday: HEAP32[tm + 24 >> 2],
  tm_yday: HEAP32[tm + 28 >> 2],
  tm_isdst: HEAP32[tm + 32 >> 2],
  tm_gmtoff: HEAP32[tm + 36 >> 2],
  tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
 };
 var pattern = UTF8ToString(format);
 var EXPANSION_RULES_1 = {
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m/%d/%y",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%r": "%I:%M:%S %p",
  "%R": "%H:%M",
  "%T": "%H:%M:%S",
  "%x": "%m/%d/%y",
  "%X": "%H:%M:%S",
  "%Ec": "%c",
  "%EC": "%C",
  "%Ex": "%m/%d/%y",
  "%EX": "%H:%M:%S",
  "%Ey": "%y",
  "%EY": "%Y",
  "%Od": "%d",
  "%Oe": "%e",
  "%OH": "%H",
  "%OI": "%I",
  "%Om": "%m",
  "%OM": "%M",
  "%OS": "%S",
  "%Ou": "%u",
  "%OU": "%U",
  "%OV": "%V",
  "%Ow": "%w",
  "%OW": "%W",
  "%Oy": "%y"
 };
 for (var rule in EXPANSION_RULES_1) {
  pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
 }
 var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
 var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 function leadingSomething(value, digits, character) {
  var str = typeof value == "number" ? value.toString() : value || "";
  while (str.length < digits) {
   str = character[0] + str;
  }
  return str;
 }
 function leadingNulls(value, digits) {
  return leadingSomething(value, digits, "0");
 }
 function compareByDay(date1, date2) {
  function sgn(value) {
   return value < 0 ? -1 : value > 0 ? 1 : 0;
  }
  var compare;
  if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
   if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
    compare = sgn(date1.getDate() - date2.getDate());
   }
  }
  return compare;
 }
 function getFirstWeekStartDate(janFourth) {
  switch (janFourth.getDay()) {
  case 0:
   return new Date(janFourth.getFullYear() - 1, 11, 29);

  case 1:
   return janFourth;

  case 2:
   return new Date(janFourth.getFullYear(), 0, 3);

  case 3:
   return new Date(janFourth.getFullYear(), 0, 2);

  case 4:
   return new Date(janFourth.getFullYear(), 0, 1);

  case 5:
   return new Date(janFourth.getFullYear() - 1, 11, 31);

  case 6:
   return new Date(janFourth.getFullYear() - 1, 11, 30);
  }
 }
 function getWeekBasedYear(date) {
  var thisDate = addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
  var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
  var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
  var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
  var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
   if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
    return thisDate.getFullYear() + 1;
   }
   return thisDate.getFullYear();
  }
  return thisDate.getFullYear() - 1;
 }
 var EXPANSION_RULES_2 = {
  "%a": function(date) {
   return WEEKDAYS[date.tm_wday].substring(0, 3);
  },
  "%A": function(date) {
   return WEEKDAYS[date.tm_wday];
  },
  "%b": function(date) {
   return MONTHS[date.tm_mon].substring(0, 3);
  },
  "%B": function(date) {
   return MONTHS[date.tm_mon];
  },
  "%C": function(date) {
   var year = date.tm_year + 1900;
   return leadingNulls(year / 100 | 0, 2);
  },
  "%d": function(date) {
   return leadingNulls(date.tm_mday, 2);
  },
  "%e": function(date) {
   return leadingSomething(date.tm_mday, 2, " ");
  },
  "%g": function(date) {
   return getWeekBasedYear(date).toString().substring(2);
  },
  "%G": function(date) {
   return getWeekBasedYear(date);
  },
  "%H": function(date) {
   return leadingNulls(date.tm_hour, 2);
  },
  "%I": function(date) {
   var twelveHour = date.tm_hour;
   if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
   return leadingNulls(twelveHour, 2);
  },
  "%j": function(date) {
   return leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
  },
  "%m": function(date) {
   return leadingNulls(date.tm_mon + 1, 2);
  },
  "%M": function(date) {
   return leadingNulls(date.tm_min, 2);
  },
  "%n": function() {
   return "\n";
  },
  "%p": function(date) {
   if (date.tm_hour >= 0 && date.tm_hour < 12) {
    return "AM";
   }
   return "PM";
  },
  "%S": function(date) {
   return leadingNulls(date.tm_sec, 2);
  },
  "%t": function() {
   return "\t";
  },
  "%u": function(date) {
   return date.tm_wday || 7;
  },
  "%U": function(date) {
   var days = date.tm_yday + 7 - date.tm_wday;
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%V": function(date) {
   var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
   if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
    val++;
   }
   if (!val) {
    val = 52;
    var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
    if (dec31 == 4 || dec31 == 5 && isLeapYear(date.tm_year % 400 - 1)) {
     val++;
    }
   } else if (val == 53) {
    var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
    if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year))) val = 1;
   }
   return leadingNulls(val, 2);
  },
  "%w": function(date) {
   return date.tm_wday;
  },
  "%W": function(date) {
   var days = date.tm_yday + 7 - (date.tm_wday + 6) % 7;
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%y": function(date) {
   return (date.tm_year + 1900).toString().substring(2);
  },
  "%Y": function(date) {
   return date.tm_year + 1900;
  },
  "%z": function(date) {
   var off = date.tm_gmtoff;
   var ahead = off >= 0;
   off = Math.abs(off) / 60;
   off = off / 60 * 100 + off % 60;
   return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
  },
  "%Z": function(date) {
   return date.tm_zone;
  },
  "%%": function() {
   return "%";
  }
 };
 pattern = pattern.replace(/%%/g, "\0\0");
 for (var rule in EXPANSION_RULES_2) {
  if (pattern.includes(rule)) {
   pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
  }
 }
 pattern = pattern.replace(/\0\0/g, "%");
 var bytes = intArrayFromString(pattern, false);
 if (bytes.length > maxsize) {
  return 0;
 }
 writeArrayToMemory(bytes, s);
 return bytes.length - 1;
}

function _strptime(buf, format, tm) {
 var pattern = UTF8ToString(format);
 var SPECIAL_CHARS = "\\!@#$^&*()+=-[]/{}|:<>?,.";
 for (var i = 0, ii = SPECIAL_CHARS.length; i < ii; ++i) {
  pattern = pattern.replace(new RegExp("\\" + SPECIAL_CHARS[i], "g"), "\\" + SPECIAL_CHARS[i]);
 }
 var EQUIVALENT_MATCHERS = {
  "%A": "%a",
  "%B": "%b",
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m\\/%d\\/%y",
  "%e": "%d",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%R": "%H\\:%M",
  "%r": "%I\\:%M\\:%S\\s%p",
  "%T": "%H\\:%M\\:%S",
  "%x": "%m\\/%d\\/(?:%y|%Y)",
  "%X": "%H\\:%M\\:%S"
 };
 for (var matcher in EQUIVALENT_MATCHERS) {
  pattern = pattern.replace(matcher, EQUIVALENT_MATCHERS[matcher]);
 }
 var DATE_PATTERNS = {
  "%a": "(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)",
  "%b": "(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)",
  "%C": "\\d\\d",
  "%d": "0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31",
  "%H": "\\d(?!\\d)|[0,1]\\d|20|21|22|23",
  "%I": "\\d(?!\\d)|0\\d|10|11|12",
  "%j": "00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d",
  "%m": "0[1-9]|[1-9](?!\\d)|10|11|12",
  "%M": "0\\d|\\d(?!\\d)|[1-5]\\d",
  "%n": "\\s",
  "%p": "AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.",
  "%S": "0\\d|\\d(?!\\d)|[1-5]\\d|60",
  "%U": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
  "%W": "0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",
  "%w": "[0-6]",
  "%y": "\\d\\d",
  "%Y": "\\d\\d\\d\\d",
  "%%": "%",
  "%t": "\\s"
 };
 var MONTH_NUMBERS = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11
 };
 var DAY_NUMBERS_SUN_FIRST = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6
 };
 var DAY_NUMBERS_MON_FIRST = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6
 };
 for (var datePattern in DATE_PATTERNS) {
  pattern = pattern.replace(datePattern, "(" + datePattern + DATE_PATTERNS[datePattern] + ")");
 }
 var capture = [];
 for (var i = pattern.indexOf("%"); i >= 0; i = pattern.indexOf("%")) {
  capture.push(pattern[i + 1]);
  pattern = pattern.replace(new RegExp("\\%" + pattern[i + 1], "g"), "");
 }
 var matches = new RegExp("^" + pattern, "i").exec(UTF8ToString(buf));
 function initDate() {
  function fixup(value, min, max) {
   return typeof value != "number" || isNaN(value) ? min : value >= min ? value <= max ? value : max : min;
  }
  return {
   year: fixup(HEAP32[tm + 20 >> 2] + 1900, 1970, 9999),
   month: fixup(HEAP32[tm + 16 >> 2], 0, 11),
   day: fixup(HEAP32[tm + 12 >> 2], 1, 31),
   hour: fixup(HEAP32[tm + 8 >> 2], 0, 23),
   min: fixup(HEAP32[tm + 4 >> 2], 0, 59),
   sec: fixup(HEAP32[tm >> 2], 0, 59)
  };
 }
 if (matches) {
  var date = initDate();
  var value;
  var getMatch = symbol => {
   var pos = capture.indexOf(symbol);
   if (pos >= 0) {
    return matches[pos + 1];
   }
   return;
  };
  if (value = getMatch("S")) {
   date.sec = jstoi_q(value);
  }
  if (value = getMatch("M")) {
   date.min = jstoi_q(value);
  }
  if (value = getMatch("H")) {
   date.hour = jstoi_q(value);
  } else if (value = getMatch("I")) {
   var hour = jstoi_q(value);
   if (value = getMatch("p")) {
    hour += value.toUpperCase()[0] === "P" ? 12 : 0;
   }
   date.hour = hour;
  }
  if (value = getMatch("Y")) {
   date.year = jstoi_q(value);
  } else if (value = getMatch("y")) {
   var year = jstoi_q(value);
   if (value = getMatch("C")) {
    year += jstoi_q(value) * 100;
   } else {
    year += year < 69 ? 2e3 : 1900;
   }
   date.year = year;
  }
  if (value = getMatch("m")) {
   date.month = jstoi_q(value) - 1;
  } else if (value = getMatch("b")) {
   date.month = MONTH_NUMBERS[value.substring(0, 3).toUpperCase()] || 0;
  }
  if (value = getMatch("d")) {
   date.day = jstoi_q(value);
  } else if (value = getMatch("j")) {
   var day = jstoi_q(value);
   var leapYear = isLeapYear(date.year);
   for (var month = 0; month < 12; ++month) {
    var daysUntilMonth = arraySum(leapYear ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, month - 1);
    if (day <= daysUntilMonth + (leapYear ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[month]) {
     date.day = day - daysUntilMonth;
    }
   }
  } else if (value = getMatch("a")) {
   var weekDay = value.substring(0, 3).toUpperCase();
   if (value = getMatch("U")) {
    var weekDayNumber = DAY_NUMBERS_SUN_FIRST[weekDay];
    var weekNumber = jstoi_q(value);
    var janFirst = new Date(date.year, 0, 1);
    var endDate;
    if (janFirst.getDay() === 0) {
     endDate = addDays(janFirst, weekDayNumber + 7 * (weekNumber - 1));
    } else {
     endDate = addDays(janFirst, 7 - janFirst.getDay() + weekDayNumber + 7 * (weekNumber - 1));
    }
    date.day = endDate.getDate();
    date.month = endDate.getMonth();
   } else if (value = getMatch("W")) {
    var weekDayNumber = DAY_NUMBERS_MON_FIRST[weekDay];
    var weekNumber = jstoi_q(value);
    var janFirst = new Date(date.year, 0, 1);
    var endDate;
    if (janFirst.getDay() === 1) {
     endDate = addDays(janFirst, weekDayNumber + 7 * (weekNumber - 1));
    } else {
     endDate = addDays(janFirst, 7 - janFirst.getDay() + 1 + weekDayNumber + 7 * (weekNumber - 1));
    }
    date.day = endDate.getDate();
    date.month = endDate.getMonth();
   }
  }
  var fullDate = new Date(date.year, date.month, date.day, date.hour, date.min, date.sec, 0);
  HEAP32[tm >> 2] = fullDate.getSeconds();
  HEAP32[tm + 4 >> 2] = fullDate.getMinutes();
  HEAP32[tm + 8 >> 2] = fullDate.getHours();
  HEAP32[tm + 12 >> 2] = fullDate.getDate();
  HEAP32[tm + 16 >> 2] = fullDate.getMonth();
  HEAP32[tm + 20 >> 2] = fullDate.getFullYear() - 1900;
  HEAP32[tm + 24 >> 2] = fullDate.getDay();
  HEAP32[tm + 28 >> 2] = arraySum(isLeapYear(fullDate.getFullYear()) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, fullDate.getMonth() - 1) + fullDate.getDate() - 1;
  HEAP32[tm + 32 >> 2] = 0;
  return buf + intArrayFromString(matches[0]).length - 1;
 }
 return 0;
}

function _swapcontext() {
 err("missing function: swapcontext");
 abort(-1);
}

function getCFunc(ident) {
 var func = Module["_" + ident];
 return func;
}

function stringToUTF8OnStack(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8(str, ret, size);
 return ret;
}

function ccall(ident, returnType, argTypes, args, opts) {
 var toC = {
  "string": str => {
   var ret = 0;
   if (str !== null && str !== undefined && str !== 0) {
    ret = stringToUTF8OnStack(str);
   }
   return ret;
  },
  "array": arr => {
   var ret = stackAlloc(arr.length);
   writeArrayToMemory(arr, ret);
   return ret;
  }
 };
 function convertReturnValue(ret) {
  if (returnType === "string") {
   return UTF8ToString(ret);
  }
  if (returnType === "boolean") return Boolean(ret);
  return ret;
 }
 var func = getCFunc(ident);
 var cArgs = [];
 var stack = 0;
 if (args) {
  for (var i = 0; i < args.length; i++) {
   var converter = toC[argTypes[i]];
   if (converter) {
    if (stack === 0) stack = stackSave();
    cArgs[i] = converter(args[i]);
   } else {
    cArgs[i] = args[i];
   }
  }
 }
 var ret = func.apply(null, cArgs);
 function onDone(ret) {
  if (stack !== 0) stackRestore(stack);
  return convertReturnValue(ret);
 }
 ret = onDone(ret);
 return ret;
}

var FSNode = function(parent, name, mode, rdev) {
 if (!parent) {
  parent = this;
 }
 this.parent = parent;
 this.mount = parent.mount;
 this.mounted = null;
 this.id = FS.nextInode++;
 this.name = name;
 this.mode = mode;
 this.node_ops = {};
 this.stream_ops = {};
 this.rdev = rdev;
};

var readMode = 292 | 73;

var writeMode = 146;

Object.defineProperties(FSNode.prototype, {
 read: {
  get: function() {
   return (this.mode & readMode) === readMode;
  },
  set: function(val) {
   val ? this.mode |= readMode : this.mode &= ~readMode;
  }
 },
 write: {
  get: function() {
   return (this.mode & writeMode) === writeMode;
  },
  set: function(val) {
   val ? this.mode |= writeMode : this.mode &= ~writeMode;
  }
 },
 isFolder: {
  get: function() {
   return FS.isDir(this.mode);
  }
 },
 isDevice: {
  get: function() {
   return FS.isChrdev(this.mode);
  }
 }
});

FS.FSNode = FSNode;

FS.staticInit();

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_unlink"] = FS.unlink;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

var decodeBase64 = typeof atob == "function" ? atob : function(input) {
 var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 var output = "";
 var chr1, chr2, chr3;
 var enc1, enc2, enc3, enc4;
 var i = 0;
 input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 do {
  enc1 = keyStr.indexOf(input.charAt(i++));
  enc2 = keyStr.indexOf(input.charAt(i++));
  enc3 = keyStr.indexOf(input.charAt(i++));
  enc4 = keyStr.indexOf(input.charAt(i++));
  chr1 = enc1 << 2 | enc2 >> 4;
  chr2 = (enc2 & 15) << 4 | enc3 >> 2;
  chr3 = (enc3 & 3) << 6 | enc4;
  output = output + String.fromCharCode(chr1);
  if (enc3 !== 64) {
   output = output + String.fromCharCode(chr2);
  }
  if (enc4 !== 64) {
   output = output + String.fromCharCode(chr3);
  }
 } while (i < input.length);
 return output;
};

function intArrayFromBase64(s) {
 try {
  var decoded = decodeBase64(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0; i < decoded.length; ++i) {
   bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
 } catch (_) {
  throw new Error("Converting base64 string to bytes failed.");
 }
}

var wasmImports = {
 "__assert_fail": ___assert_fail,
 "__asyncjs__php_stream_fetch_real_open": __asyncjs__php_stream_fetch_real_open,
 "__asyncjs__vrzno_await_internal": __asyncjs__vrzno_await_internal,
 "__call_sighandler": ___call_sighandler,
 "__dlsym": ___dlsym,
 "__syscall__newselect": ___syscall__newselect,
 "__syscall_accept4": ___syscall_accept4,
 "__syscall_bind": ___syscall_bind,
 "__syscall_chdir": ___syscall_chdir,
 "__syscall_chmod": ___syscall_chmod,
 "__syscall_connect": ___syscall_connect,
 "__syscall_dup": ___syscall_dup,
 "__syscall_faccessat": ___syscall_faccessat,
 "__syscall_fchownat": ___syscall_fchownat,
 "__syscall_fcntl64": ___syscall_fcntl64,
 "__syscall_fdatasync": ___syscall_fdatasync,
 "__syscall_fstat64": ___syscall_fstat64,
 "__syscall_ftruncate64": ___syscall_ftruncate64,
 "__syscall_getcwd": ___syscall_getcwd,
 "__syscall_getdents64": ___syscall_getdents64,
 "__syscall_getpeername": ___syscall_getpeername,
 "__syscall_getsockname": ___syscall_getsockname,
 "__syscall_getsockopt": ___syscall_getsockopt,
 "__syscall_ioctl": ___syscall_ioctl,
 "__syscall_listen": ___syscall_listen,
 "__syscall_lstat64": ___syscall_lstat64,
 "__syscall_mkdirat": ___syscall_mkdirat,
 "__syscall_newfstatat": ___syscall_newfstatat,
 "__syscall_openat": ___syscall_openat,
 "__syscall_pipe": ___syscall_pipe,
 "__syscall_poll": ___syscall_poll,
 "__syscall_readlinkat": ___syscall_readlinkat,
 "__syscall_recvfrom": ___syscall_recvfrom,
 "__syscall_renameat": ___syscall_renameat,
 "__syscall_rmdir": ___syscall_rmdir,
 "__syscall_sendto": ___syscall_sendto,
 "__syscall_socket": ___syscall_socket,
 "__syscall_stat64": ___syscall_stat64,
 "__syscall_statfs64": ___syscall_statfs64,
 "__syscall_symlink": ___syscall_symlink,
 "__syscall_unlinkat": ___syscall_unlinkat,
 "__syscall_utimensat": ___syscall_utimensat,
 "_emscripten_get_now_is_monotonic": __emscripten_get_now_is_monotonic,
 "_emscripten_throw_longjmp": __emscripten_throw_longjmp,
 "_gmtime_js": __gmtime_js,
 "_localtime_js": __localtime_js,
 "_mktime_js": __mktime_js,
 "_mmap_js": __mmap_js,
 "_munmap_js": __munmap_js,
 "_setitimer_js": __setitimer_js,
 "_tzset_js": __tzset_js,
 "abort": _abort,
 "dlopen": _dlopen,
 "emscripten_asm_const_int": _emscripten_asm_const_int,
 "emscripten_asm_const_ptr": _emscripten_asm_const_ptr,
 "emscripten_date_now": _emscripten_date_now,
 "emscripten_get_heap_max": _emscripten_get_heap_max,
 "emscripten_get_now": _emscripten_get_now,
 "emscripten_memcpy_big": _emscripten_memcpy_big,
 "emscripten_resize_heap": _emscripten_resize_heap,
 "environ_get": _environ_get,
 "environ_sizes_get": _environ_sizes_get,
 "exit": _exit,
 "fd_close": _fd_close,
 "fd_fdstat_get": _fd_fdstat_get,
 "fd_read": _fd_read,
 "fd_seek": _fd_seek,
 "fd_sync": _fd_sync,
 "fd_write": _fd_write,
 "getaddrinfo": _getaddrinfo,
 "getcontext": _getcontext,
 "getdtablesize": _getdtablesize,
 "gethostbyname_r": _gethostbyname_r,
 "getloadavg": _getloadavg,
 "getnameinfo": _getnameinfo,
 "invoke_i": invoke_i,
 "invoke_ii": invoke_ii,
 "invoke_iii": invoke_iii,
 "invoke_iiii": invoke_iiii,
 "invoke_iiiii": invoke_iiiii,
 "invoke_iiiiii": invoke_iiiiii,
 "invoke_iiiiiii": invoke_iiiiiii,
 "invoke_iiiiiiii": invoke_iiiiiiii,
 "invoke_iiiiiiiiii": invoke_iiiiiiiiii,
 "invoke_v": invoke_v,
 "invoke_vi": invoke_vi,
 "invoke_vii": invoke_vii,
 "invoke_viii": invoke_viii,
 "invoke_viiii": invoke_viiii,
 "invoke_viiiiii": invoke_viiiiii,
 "makecontext": _makecontext,
 "posix_spawnp": _posix_spawnp,
 "proc_exit": _proc_exit,
 "strftime": _strftime,
 "strptime": _strptime,
 "swapcontext": _swapcontext
};

var asm = createWasm();

var ___wasm_call_ctors = function() {
 return (___wasm_call_ctors = Module["asm"]["__wasm_call_ctors"]).apply(null, arguments);
};

var _phpw_with_args = Module["_phpw_with_args"] = function() {
 return (_phpw_with_args = Module["_phpw_with_args"] = Module["asm"]["phpw_with_args"]).apply(null, arguments);
};

var _malloc = function() {
 return (_malloc = Module["asm"]["malloc"]).apply(null, arguments);
};

var _saveSetjmp = function() {
 return (_saveSetjmp = Module["asm"]["saveSetjmp"]).apply(null, arguments);
};

var _free = function() {
 return (_free = Module["asm"]["free"]).apply(null, arguments);
};

var _phpw_with_args_keepalive = Module["_phpw_with_args_keepalive"] = function() {
 return (_phpw_with_args_keepalive = Module["_phpw_with_args_keepalive"] = Module["asm"]["phpw_with_args_keepalive"]).apply(null, arguments);
};

var _vrzno_expose_gc_ptr = Module["_vrzno_expose_gc_ptr"] = function() {
 return (_vrzno_expose_gc_ptr = Module["_vrzno_expose_gc_ptr"] = Module["asm"]["vrzno_expose_gc_ptr"]).apply(null, arguments);
};

var _vrzno_expose_inc_refcount = Module["_vrzno_expose_inc_refcount"] = function() {
 return (_vrzno_expose_inc_refcount = Module["_vrzno_expose_inc_refcount"] = Module["asm"]["vrzno_expose_inc_refcount"]).apply(null, arguments);
};

var _vrzno_expose_dec_refcount = Module["_vrzno_expose_dec_refcount"] = function() {
 return (_vrzno_expose_dec_refcount = Module["_vrzno_expose_dec_refcount"] = Module["asm"]["vrzno_expose_dec_refcount"]).apply(null, arguments);
};

var _vrzno_expose_refcount = Module["_vrzno_expose_refcount"] = function() {
 return (_vrzno_expose_refcount = Module["_vrzno_expose_refcount"] = Module["asm"]["vrzno_expose_refcount"]).apply(null, arguments);
};

var _vrzno_expose_efree = Module["_vrzno_expose_efree"] = function() {
 return (_vrzno_expose_efree = Module["_vrzno_expose_efree"] = Module["asm"]["vrzno_expose_efree"]).apply(null, arguments);
};

var _vrzno_expose_create_bool = Module["_vrzno_expose_create_bool"] = function() {
 return (_vrzno_expose_create_bool = Module["_vrzno_expose_create_bool"] = Module["asm"]["vrzno_expose_create_bool"]).apply(null, arguments);
};

var _vrzno_expose_create_null = Module["_vrzno_expose_create_null"] = function() {
 return (_vrzno_expose_create_null = Module["_vrzno_expose_create_null"] = Module["asm"]["vrzno_expose_create_null"]).apply(null, arguments);
};

var _vrzno_expose_create_undef = Module["_vrzno_expose_create_undef"] = function() {
 return (_vrzno_expose_create_undef = Module["_vrzno_expose_create_undef"] = Module["asm"]["vrzno_expose_create_undef"]).apply(null, arguments);
};

var _vrzno_expose_create_long = Module["_vrzno_expose_create_long"] = function() {
 return (_vrzno_expose_create_long = Module["_vrzno_expose_create_long"] = Module["asm"]["vrzno_expose_create_long"]).apply(null, arguments);
};

var _vrzno_expose_create_double = Module["_vrzno_expose_create_double"] = function() {
 return (_vrzno_expose_create_double = Module["_vrzno_expose_create_double"] = Module["asm"]["vrzno_expose_create_double"]).apply(null, arguments);
};

var _vrzno_expose_create_string = Module["_vrzno_expose_create_string"] = function() {
 return (_vrzno_expose_create_string = Module["_vrzno_expose_create_string"] = Module["asm"]["vrzno_expose_create_string"]).apply(null, arguments);
};

var _vrzno_expose_create_object_for_target = Module["_vrzno_expose_create_object_for_target"] = function() {
 return (_vrzno_expose_create_object_for_target = Module["_vrzno_expose_create_object_for_target"] = Module["asm"]["vrzno_expose_create_object_for_target"]).apply(null, arguments);
};

var _vrzno_expose_create_params = Module["_vrzno_expose_create_params"] = function() {
 return (_vrzno_expose_create_params = Module["_vrzno_expose_create_params"] = Module["asm"]["vrzno_expose_create_params"]).apply(null, arguments);
};

var _vrzno_expose_object_keys = Module["_vrzno_expose_object_keys"] = function() {
 return (_vrzno_expose_object_keys = Module["_vrzno_expose_object_keys"] = Module["asm"]["vrzno_expose_object_keys"]).apply(null, arguments);
};

var _vrzno_expose_array_keys = Module["_vrzno_expose_array_keys"] = function() {
 return (_vrzno_expose_array_keys = Module["_vrzno_expose_array_keys"] = Module["asm"]["vrzno_expose_array_keys"]).apply(null, arguments);
};

var _vrzno_expose_zval_deref = Module["_vrzno_expose_zval_deref"] = function() {
 return (_vrzno_expose_zval_deref = Module["_vrzno_expose_zval_deref"] = Module["asm"]["vrzno_expose_zval_deref"]).apply(null, arguments);
};

var _vrzno_expose_zval_dump = Module["_vrzno_expose_zval_dump"] = function() {
 return (_vrzno_expose_zval_dump = Module["_vrzno_expose_zval_dump"] = Module["asm"]["vrzno_expose_zval_dump"]).apply(null, arguments);
};

var _vrzno_expose_type = Module["_vrzno_expose_type"] = function() {
 return (_vrzno_expose_type = Module["_vrzno_expose_type"] = Module["asm"]["vrzno_expose_type"]).apply(null, arguments);
};

var _vrzno_expose_array_length = Module["_vrzno_expose_array_length"] = function() {
 return (_vrzno_expose_array_length = Module["_vrzno_expose_array_length"] = Module["asm"]["vrzno_expose_array_length"]).apply(null, arguments);
};

var _vrzno_expose_zval_target = Module["_vrzno_expose_zval_target"] = function() {
 return (_vrzno_expose_zval_target = Module["_vrzno_expose_zval_target"] = Module["asm"]["vrzno_expose_zval_target"]).apply(null, arguments);
};

var _vrzno_expose_target = Module["_vrzno_expose_target"] = function() {
 return (_vrzno_expose_target = Module["_vrzno_expose_target"] = Module["asm"]["vrzno_expose_target"]).apply(null, arguments);
};

var _vrzno_expose_callable = Module["_vrzno_expose_callable"] = function() {
 return (_vrzno_expose_callable = Module["_vrzno_expose_callable"] = Module["asm"]["vrzno_expose_callable"]).apply(null, arguments);
};

var _vrzno_expose_long = Module["_vrzno_expose_long"] = function() {
 return (_vrzno_expose_long = Module["_vrzno_expose_long"] = Module["asm"]["vrzno_expose_long"]).apply(null, arguments);
};

var _vrzno_expose_double = Module["_vrzno_expose_double"] = function() {
 return (_vrzno_expose_double = Module["_vrzno_expose_double"] = Module["asm"]["vrzno_expose_double"]).apply(null, arguments);
};

var _vrzno_expose_string = Module["_vrzno_expose_string"] = function() {
 return (_vrzno_expose_string = Module["_vrzno_expose_string"] = Module["asm"]["vrzno_expose_string"]).apply(null, arguments);
};

var _vrzno_expose_object = Module["_vrzno_expose_object"] = function() {
 return (_vrzno_expose_object = Module["_vrzno_expose_object"] = Module["asm"]["vrzno_expose_object"]).apply(null, arguments);
};

var _vrzno_expose_array = Module["_vrzno_expose_array"] = function() {
 return (_vrzno_expose_array = Module["_vrzno_expose_array"] = Module["asm"]["vrzno_expose_array"]).apply(null, arguments);
};

var _vrzno_expose_closure = Module["_vrzno_expose_closure"] = function() {
 return (_vrzno_expose_closure = Module["_vrzno_expose_closure"] = Module["asm"]["vrzno_expose_closure"]).apply(null, arguments);
};

var _vrzno_expose_key_pointer = Module["_vrzno_expose_key_pointer"] = function() {
 return (_vrzno_expose_key_pointer = Module["_vrzno_expose_key_pointer"] = Module["asm"]["vrzno_expose_key_pointer"]).apply(null, arguments);
};

var _vrzno_expose_property_pointer = Module["_vrzno_expose_property_pointer"] = function() {
 return (_vrzno_expose_property_pointer = Module["_vrzno_expose_property_pointer"] = Module["asm"]["vrzno_expose_property_pointer"]).apply(null, arguments);
};

var _vrzno_expose_dimension_pointer = Module["_vrzno_expose_dimension_pointer"] = function() {
 return (_vrzno_expose_dimension_pointer = Module["_vrzno_expose_dimension_pointer"] = Module["asm"]["vrzno_expose_dimension_pointer"]).apply(null, arguments);
};

var _vrzno_expose_method_pointer = Module["_vrzno_expose_method_pointer"] = function() {
 return (_vrzno_expose_method_pointer = Module["_vrzno_expose_method_pointer"] = Module["asm"]["vrzno_expose_method_pointer"]).apply(null, arguments);
};

var _vrzno_expose_is_iterable = Module["_vrzno_expose_is_iterable"] = function() {
 return (_vrzno_expose_is_iterable = Module["_vrzno_expose_is_iterable"] = Module["asm"]["vrzno_expose_is_iterable"]).apply(null, arguments);
};

var _vrzno_exec_callback = Module["_vrzno_exec_callback"] = function() {
 return (_vrzno_exec_callback = Module["_vrzno_exec_callback"] = Module["asm"]["vrzno_exec_callback"]).apply(null, arguments);
};

var _vrzno_del_callback = Module["_vrzno_del_callback"] = function() {
 return (_vrzno_del_callback = Module["_vrzno_del_callback"] = Module["asm"]["vrzno_del_callback"]).apply(null, arguments);
};

var _memcpy = function() {
 return (_memcpy = Module["asm"]["memcpy"]).apply(null, arguments);
};

var ___errno_location = function() {
 return (___errno_location = Module["asm"]["__errno_location"]).apply(null, arguments);
};

var _htonl = function() {
 return (_htonl = Module["asm"]["htonl"]).apply(null, arguments);
};

var _ntohs = function() {
 return (_ntohs = Module["asm"]["ntohs"]).apply(null, arguments);
};

var _htons = function() {
 return (_htons = Module["asm"]["htons"]).apply(null, arguments);
};

var ___dl_seterr = function() {
 return (___dl_seterr = Module["asm"]["__dl_seterr"]).apply(null, arguments);
};

var _emscripten_builtin_memalign = function() {
 return (_emscripten_builtin_memalign = Module["asm"]["emscripten_builtin_memalign"]).apply(null, arguments);
};

var __emscripten_timeout = function() {
 return (__emscripten_timeout = Module["asm"]["_emscripten_timeout"]).apply(null, arguments);
};

var _setThrew = function() {
 return (_setThrew = Module["asm"]["setThrew"]).apply(null, arguments);
};

var stackSave = function() {
 return (stackSave = Module["asm"]["stackSave"]).apply(null, arguments);
};

var stackRestore = function() {
 return (stackRestore = Module["asm"]["stackRestore"]).apply(null, arguments);
};

var stackAlloc = function() {
 return (stackAlloc = Module["asm"]["stackAlloc"]).apply(null, arguments);
};

var dynCall_vij = Module["dynCall_vij"] = function() {
 return (dynCall_vij = Module["dynCall_vij"] = Module["asm"]["dynCall_vij"]).apply(null, arguments);
};

var dynCall_ji = Module["dynCall_ji"] = function() {
 return (dynCall_ji = Module["dynCall_ji"] = Module["asm"]["dynCall_ji"]).apply(null, arguments);
};

var dynCall_iij = Module["dynCall_iij"] = function() {
 return (dynCall_iij = Module["dynCall_iij"] = Module["asm"]["dynCall_iij"]).apply(null, arguments);
};

var dynCall_jiijii = Module["dynCall_jiijii"] = function() {
 return (dynCall_jiijii = Module["dynCall_jiijii"] = Module["asm"]["dynCall_jiijii"]).apply(null, arguments);
};

var dynCall_viiijii = Module["dynCall_viiijii"] = function() {
 return (dynCall_viiijii = Module["dynCall_viiijii"] = Module["asm"]["dynCall_viiijii"]).apply(null, arguments);
};

var dynCall_jiji = Module["dynCall_jiji"] = function() {
 return (dynCall_jiji = Module["dynCall_jiji"] = Module["asm"]["dynCall_jiji"]).apply(null, arguments);
};

var ___start_em_js = Module["___start_em_js"] = 1948631;

var ___stop_em_js = Module["___stop_em_js"] = 1950043;

function invoke_iiii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_v(index) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)();
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iii(index, a1, a2) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_i(index) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)();
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vii(index, a1, a2) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_ii(index, a1) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vi(index, a1) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_unlink"] = FS.unlink;

Module["ccall"] = ccall;

Module["getValue"] = getValue;

Module["UTF8ToString"] = UTF8ToString;

Module["lengthBytesUTF8"] = lengthBytesUTF8;

Module["FS"] = FS;

Module["LZ4"] = LZ4;

var calledRun;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function run() {
 if (runDependencies > 0) {
  return;
 }
 preRun();
 if (runDependencies > 0) {
  return;
 }
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  readyPromiseResolve(Module);
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

run();


  return createPhpModule.ready
}

);
})();
export default createPhpModule;