
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
      var REMOTE_PACKAGE_BASE = 'php-web.data';
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
Module["FS_createPath"]("/app/vendor", "bin", true, true);
Module["FS_createPath"]("/app/vendor", "composer", true, true);
Module["FS_createPath"]("/app/vendor", "syntaxx", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "lz4", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/lz4", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "phpx-build-tools", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-build-tools", "bin", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-build-tools", "scripts", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "phpx-compiler", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-compiler", "bin", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-compiler", "docs", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-compiler", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-compiler/src", "Events", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "phpx-framework", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework", "demo", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Commit", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Events", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Fiber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Hooks", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Reconciler", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "VirtualDOM", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "phpx-parser", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser", "bin", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser", "lib", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib", "PhpParser", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser", "Builder", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser", "Comment", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser", "ErrorHandler", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser", "Internal", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser", "Lexer", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer", "TokenEmulator", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser", "Node", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node", "Expr", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr", "AssignOp", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr", "BinaryOp", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr", "Cast", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node", "JSX", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node", "Name", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node", "Scalar", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar", "MagicConst", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node", "Stmt", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt", "TraitUseAdaptation", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser", "NodeVisitor", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser", "Parser", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-parser/lib/PhpParser", "PrettyPrinter", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "wasm-php-runtime-vrzno", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/wasm-php-runtime-vrzno", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "webassembly-packer", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/webassembly-packer", ".github", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/webassembly-packer/.github", "workflows", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/webassembly-packer", "bin", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/webassembly-packer", "original", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/webassembly-packer", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/webassembly-packer/src", "Infra", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/webassembly-packer/src/Infra", "Events", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/webassembly-packer/src", "JS", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/webassembly-packer/src/JS", "template", true, true);
      

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
    loadPackage({"files":[{"filename":"/app/bootstrap.php","start":0,"end":523},{"filename":"/app/src/App.php","start":523,"end":1333},{"filename":"/app/src/App.phpx","start":1333,"end":2229},{"filename":"/app/src/Components/BenchmarkApp.php","start":2229,"end":14466},{"filename":"/app/src/Components/BenchmarkApp.phpx","start":14466,"end":28969},{"filename":"/app/src/Components/Board.php","start":28969,"end":33457},{"filename":"/app/src/Components/Board.phpx","start":33457,"end":38895},{"filename":"/app/src/Components/Card.php","start":38895,"end":46067},{"filename":"/app/src/Components/Card.phpx","start":46067,"end":53813},{"filename":"/app/src/Components/Column.php","start":53813,"end":58919},{"filename":"/app/src/Components/Column.phpx","start":58919,"end":65489},{"filename":"/app/src/debug/Components-Board.php.ai.map","start":65489,"end":67691},{"filename":"/app/src/debug/Components-Card.php.ai.map","start":67691,"end":68978},{"filename":"/app/src/debug/Components-Column.php.ai.map","start":68978,"end":70556},{"filename":"/app/src/debug/index.json","start":70556,"end":71899},{"filename":"/app/src/debug/main.php.ai.map","start":71899,"end":73199},{"filename":"/app/src/main.php","start":73199,"end":73799},{"filename":"/app/src/main.phpx","start":73799,"end":74398},{"filename":"/app/src/php-vrzno-web.mjs","start":74398,"end":292677},{"filename":"/app/src/php-vrzno-web.wasm","start":292677,"end":7849569},{"filename":"/app/src/php-web.data","start":7849569,"end":7966658},{"filename":"/app/src/php-web.data.js","start":7966658,"end":7984487},{"filename":"/app/vendor/autoload.php","start":7984487,"end":7985258},{"filename":"/app/vendor/bin/file-packager","start":7985258,"end":7988648},{"filename":"/app/vendor/bin/php-parse","start":7988648,"end":7992005},{"filename":"/app/vendor/bin/phpx-build","start":7992005,"end":7995380},{"filename":"/app/vendor/composer/ClassLoader.php","start":7995380,"end":8011758},{"filename":"/app/vendor/composer/InstalledVersions.php","start":8011758,"end":8027980},{"filename":"/app/vendor/composer/autoload_classmap.php","start":8027980,"end":8028202},{"filename":"/app/vendor/composer/autoload_files.php","start":8028202,"end":8028435},{"filename":"/app/vendor/composer/autoload_namespaces.php","start":8028435,"end":8028574},{"filename":"/app/vendor/composer/autoload_psr4.php","start":8028574,"end":8029397},{"filename":"/app/vendor/composer/autoload_real.php","start":8029397,"end":8031019},{"filename":"/app/vendor/composer/autoload_static.php","start":8031019,"end":8033686},{"filename":"/app/vendor/composer/installed.json","start":8033686,"end":8046383},{"filename":"/app/vendor/composer/installed.php","start":8046383,"end":8049820},{"filename":"/app/vendor/syntaxx/lz4/phpcs.xml","start":8049820,"end":8055779},{"filename":"/app/vendor/syntaxx/lz4/phpunit.coverage.xml","start":8055779,"end":8056603},{"filename":"/app/vendor/syntaxx/lz4/phpunit.xml","start":8056603,"end":8057013},{"filename":"/app/vendor/syntaxx/lz4/src/LZ4.php","start":8057013,"end":8074582},{"filename":"/app/vendor/syntaxx/phpx-build-tools/CLAUDE.md","start":8074582,"end":8083853},{"filename":"/app/vendor/syntaxx/phpx-build-tools/ROADMAP.md","start":8083853,"end":8099357},{"filename":"/app/vendor/syntaxx/phpx-build-tools/bin/phpx-build","start":8099357,"end":8104769},{"filename":"/app/vendor/syntaxx/phpx-build-tools/scripts/wasm-export.php","start":8104769,"end":8105981},{"filename":"/app/vendor/syntaxx/phpx-build-tools/scripts/wasm-pack.php","start":8105981,"end":8116870},{"filename":"/app/vendor/syntaxx/phpx-build-tools/scripts/wasm-watch.sh","start":8116870,"end":8121022},{"filename":"/app/vendor/syntaxx/phpx-compiler/CLAUDE.md","start":8121022,"end":8132972},{"filename":"/app/vendor/syntaxx/phpx-compiler/FRONTEND-SOURCE-MAPS.md","start":8132972,"end":8141334},{"filename":"/app/vendor/syntaxx/phpx-compiler/KNOWN-ISSUES.md","start":8141334,"end":8148482},{"filename":"/app/vendor/syntaxx/phpx-compiler/ROADMAP.md","start":8148482,"end":8159768},{"filename":"/app/vendor/syntaxx/phpx-compiler/bin/compile","start":8159768,"end":8168187},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/ai-source-maps.md","start":8168187,"end":8181860},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/events.md","start":8181860,"end":8198214},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/examples.md","start":8198214,"end":8222095},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/phpx-guide.md","start":8222095,"end":8239100},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/syntax-reference.md","start":8239100,"end":8251633},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/verbose-mode.md","start":8251633,"end":8263088},{"filename":"/app/vendor/syntaxx/phpx-compiler/phpunit.xml","start":8263088,"end":8263635},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/AiSourceMapGenerator.php","start":8263635,"end":8278517},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Compiler.php","start":8278517,"end":8299699},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Component.php","start":8299699,"end":8301623},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Events/EventManager.php","start":8301623,"end":8304483},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Events/EventNames.php","start":8304483,"end":8307411},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Events/VerboseListener.php","start":8307411,"end":8322702},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Files.php","start":8322702,"end":8327177},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/LineTrackingPrinter.php","start":8327177,"end":8345434},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/PrettyErrorFormatter.php","start":8345434,"end":8355239},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Printer.php","start":8355239,"end":8356291},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/SourceMapGenerator.php","start":8356291,"end":8366112},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/StructuredErrorFormatter.php","start":8366112,"end":8374026},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Transformer.php","start":8374026,"end":8384899},{"filename":"/app/vendor/syntaxx/phpx-framework/CLAUDE.md","start":8384899,"end":8384899},{"filename":"/app/vendor/syntaxx/phpx-framework/demo/app.php","start":8384899,"end":8385768},{"filename":"/app/vendor/syntaxx/phpx-framework/phpunit.xml","start":8385768,"end":8386413},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Commit/DomProps.php","start":8386413,"end":8388564},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Commit/SelectionManager.php","start":8388564,"end":8391917},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Component.php","start":8391917,"end":8393336},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Document.php","start":8393336,"end":8394523},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Element.php","start":8394523,"end":8396909},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Events/EventDelegator.php","start":8396909,"end":8400041},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Fiber/FiberNode.php","start":8400041,"end":8402887},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Framework.php","start":8402887,"end":8405792},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/HookManager.php","start":8405792,"end":8412271},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/Ref.php","start":8412271,"end":8412720},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/ComponentResolver.php","start":8412720,"end":8415262},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/FakeDomBackend.php","start":8415262,"end":8420074},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/HostConfig.php","start":8420074,"end":8421973},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/Reconciler.php","start":8421973,"end":8433358},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/VrznoBackend.php","start":8433358,"end":8437714},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Runtime.php","start":8437714,"end":8440771},{"filename":"/app/vendor/syntaxx/phpx-framework/src/TextNode.php","start":8440771,"end":8441024},{"filename":"/app/vendor/syntaxx/phpx-framework/src/VirtualDOM/VNode.php","start":8441024,"end":8444977},{"filename":"/app/vendor/syntaxx/phpx-framework/src/bootstrap.php","start":8444977,"end":8444977},{"filename":"/app/vendor/syntaxx/phpx-framework/src/useState.php","start":8444977,"end":8446633},{"filename":"/app/vendor/syntaxx/phpx-parser/CLAUDE.md","start":8446633,"end":8455240},{"filename":"/app/vendor/syntaxx/phpx-parser/WHY-CUSTOM-LEXER.md","start":8455240,"end":8470805},{"filename":"/app/vendor/syntaxx/phpx-parser/bin/php-parse","start":8470805,"end":8477354},{"filename":"/app/vendor/syntaxx/phpx-parser/examples.php","start":8477354,"end":8478976},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder.php","start":8478976,"end":8479178},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/ClassConst.php","start":8479178,"end":8483053},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Class_.php","start":8483053,"end":8487224},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Declaration.php","start":8487224,"end":8488485},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/EnumCase.php","start":8488485,"end":8490489},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Enum_.php","start":8490489,"end":8493747},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/FunctionLike.php","start":8493747,"end":8495553},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Function_.php","start":8495553,"end":8497244},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Interface_.php","start":8497244,"end":8499872},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Method.php","start":8499872,"end":8503628},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Namespace_.php","start":8503628,"end":8504701},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Param.php","start":8504701,"end":8509167},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Property.php","start":8509167,"end":8514914},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/TraitUse.php","start":8514914,"end":8516568},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/TraitUseAdaptation.php","start":8516568,"end":8520834},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Trait_.php","start":8520834,"end":8523190},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Use_.php","start":8523190,"end":8524467},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/BuilderFactory.php","start":8524467,"end":8535016},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/BuilderHelpers.php","start":8535016,"end":8544978},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Comment.php","start":8544978,"end":8551885},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Comment/Doc.php","start":8551885,"end":8551988},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ConstExprEvaluationException.php","start":8551988,"end":8552100},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ConstExprEvaluator.php","start":8552100,"end":8561532},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Error.php","start":8561532,"end":8566484},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ErrorHandler.php","start":8566484,"end":8566784},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ErrorHandler/Collecting.php","start":8566784,"end":8567653},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ErrorHandler/Throwing.php","start":8567653,"end":8568021},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/DiffElem.php","start":8568021,"end":8568784},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/Differ.php","start":8568784,"end":8573877},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/PrintableNewAnonClassNode.php","start":8573877,"end":8576546},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/TokenPolyfill.php","start":8576546,"end":8586178},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/TokenStream.php","start":8586178,"end":8595417},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/JsonDecoder.php","start":8595417,"end":8598937},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer.php","start":8598937,"end":8603303},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/Emulative.php","start":8603303,"end":8611645},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/JSX.php","start":8611645,"end":8637984},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/AsymmetricVisibilityTokenEmulator.php","start":8637984,"end":8641328},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/AttributeEmulator.php","start":8641328,"end":8642801},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/EnumTokenEmulator.php","start":8642801,"end":8643502},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/ExplicitOctalEmulator.php","start":8643502,"end":8645071},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/KeywordEmulator.php","start":8645071,"end":8646906},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/MatchTokenEmulator.php","start":8646906,"end":8647328},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/NullsafeTokenEmulator.php","start":8647328,"end":8649610},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/PropertyTokenEmulator.php","start":8649610,"end":8650047},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/ReadonlyFunctionTokenEmulator.php","start":8650047,"end":8651023},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/ReadonlyTokenEmulator.php","start":8651023,"end":8651928},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/ReverseEmulator.php","start":8651928,"end":8652941},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/TokenEmulator.php","start":8652941,"end":8653760},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Modifiers.php","start":8653760,"end":8656539},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NameContext.php","start":8656539,"end":8666592},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node.php","start":8666592,"end":8670714},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Arg.php","start":8670714,"end":8672013},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/ArrayItem.php","start":8672013,"end":8673225},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Attribute.php","start":8673225,"end":8674045},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/AttributeGroup.php","start":8674045,"end":8674692},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/ClosureUse.php","start":8674692,"end":8675665},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/ComplexType.php","start":8675665,"end":8675988},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Const_.php","start":8675988,"end":8676959},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/DeclareItem.php","start":8676959,"end":8677951},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr.php","start":8677951,"end":8678084},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ArrayDimFetch.php","start":8678084,"end":8678906},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ArrayItem.php","start":8678906,"end":8679130},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Array_.php","start":8679130,"end":8679961},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ArrowFunction.php","start":8679961,"end":8682513},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Assign.php","start":8682513,"end":8683287},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp.php","start":8683287,"end":8684013},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/BitwiseAnd.php","start":8684013,"end":8684248},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/BitwiseOr.php","start":8684248,"end":8684481},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/BitwiseXor.php","start":8684481,"end":8684716},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Coalesce.php","start":8684716,"end":8684947},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Concat.php","start":8684947,"end":8685174},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Div.php","start":8685174,"end":8685395},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Minus.php","start":8685395,"end":8685620},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Mod.php","start":8685620,"end":8685841},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Mul.php","start":8685841,"end":8686062},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Plus.php","start":8686062,"end":8686285},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Pow.php","start":8686285,"end":8686506},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/ShiftLeft.php","start":8686506,"end":8686739},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/ShiftRight.php","start":8686739,"end":8686974},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignRef.php","start":8686974,"end":8687797},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp.php","start":8687797,"end":8688892},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BitwiseAnd.php","start":8688892,"end":8689203},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BitwiseOr.php","start":8689203,"end":8689512},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BitwiseXor.php","start":8689512,"end":8689823},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BooleanAnd.php","start":8689823,"end":8690135},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BooleanOr.php","start":8690135,"end":8690445},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Coalesce.php","start":8690445,"end":8690753},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Concat.php","start":8690753,"end":8691056},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Div.php","start":8691056,"end":8691353},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Equal.php","start":8691353,"end":8691655},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Greater.php","start":8691655,"end":8691960},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/GreaterOrEqual.php","start":8691960,"end":8692280},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Identical.php","start":8692280,"end":8692591},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/LogicalAnd.php","start":8692591,"end":8692904},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/LogicalOr.php","start":8692904,"end":8693214},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/LogicalXor.php","start":8693214,"end":8693527},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Minus.php","start":8693527,"end":8693828},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Mod.php","start":8693828,"end":8694125},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Mul.php","start":8694125,"end":8694422},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/NotEqual.php","start":8694422,"end":8694730},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/NotIdentical.php","start":8694730,"end":8695047},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Plus.php","start":8695047,"end":8695346},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Pow.php","start":8695346,"end":8695644},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/ShiftLeft.php","start":8695644,"end":8695954},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/ShiftRight.php","start":8695954,"end":8696266},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Smaller.php","start":8696266,"end":8696571},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/SmallerOrEqual.php","start":8696571,"end":8696891},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Spaceship.php","start":8696891,"end":8697202},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BitwiseNot.php","start":8697202,"end":8697854},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BooleanNot.php","start":8697854,"end":8698506},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/CallLike.php","start":8698506,"end":8699476},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast.php","start":8699476,"end":8700043},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Array_.php","start":8700043,"end":8700253},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Bool_.php","start":8700253,"end":8700461},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Double.php","start":8700461,"end":8700862},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Int_.php","start":8700862,"end":8701068},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Object_.php","start":8701068,"end":8701280},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/String_.php","start":8701280,"end":8701492},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Unset_.php","start":8701492,"end":8701702},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ClassConstFetch.php","start":8701702,"end":8702688},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Clone_.php","start":8702688,"end":8703325},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Closure.php","start":8703325,"end":8706161},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ClosureUse.php","start":8706161,"end":8706388},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ConstFetch.php","start":8706388,"end":8707071},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Empty_.php","start":8707071,"end":8707711},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Error.php","start":8707711,"end":8708468},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ErrorSuppress.php","start":8708468,"end":8709130},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Eval_.php","start":8709130,"end":8709767},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Exit_.php","start":8709767,"end":8710525},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/FuncCall.php","start":8710525,"end":8711519},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Include_.php","start":8711519,"end":8712470},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Instanceof_.php","start":8712470,"end":8713330},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Isset_.php","start":8713330,"end":8713972},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/List_.php","start":8713972,"end":8714851},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Match_.php","start":8714851,"end":8715633},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/MethodCall.php","start":8715633,"end":8716910},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/New_.php","start":8716910,"end":8718011},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/NullsafeMethodCall.php","start":8718011,"end":8719311},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/NullsafePropertyFetch.php","start":8719311,"end":8720282},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PostDec.php","start":8720282,"end":8720921},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PostInc.php","start":8720921,"end":8721560},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PreDec.php","start":8721560,"end":8722196},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PreInc.php","start":8722196,"end":8722832},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Print_.php","start":8722832,"end":8723472},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PropertyFetch.php","start":8723472,"end":8724417},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ShellExec.php","start":8724417,"end":8725212},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/StaticCall.php","start":8725212,"end":8726500},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/StaticPropertyFetch.php","start":8726500,"end":8727514},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Ternary.php","start":8727514,"end":8728481},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Throw_.php","start":8728481,"end":8729149},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/UnaryMinus.php","start":8729149,"end":8729801},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/UnaryPlus.php","start":8729801,"end":8730450},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Variable.php","start":8730450,"end":8731087},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/YieldFrom.php","start":8731087,"end":8731753},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Yield_.php","start":8731753,"end":8732599},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/FunctionLike.php","start":8732599,"end":8733330},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Identifier.php","start":8733330,"end":8735447},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/InterpolatedStringPart.php","start":8735447,"end":8736297},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/IntersectionType.php","start":8736297,"end":8736962},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Attribute.php","start":8736962,"end":8737595},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Comment.php","start":8737595,"end":8738224},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Element.php","start":8738224,"end":8739754},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/ExpressionContainer.php","start":8739754,"end":8740327},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Fragment.php","start":8740327,"end":8740985},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/SpreadAttribute.php","start":8740985,"end":8741692},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Text.php","start":8741692,"end":8742169},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/MatchArm.php","start":8742169,"end":8742821},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Name.php","start":8742821,"end":8751492},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Name/FullyQualified.php","start":8751492,"end":8752662},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Name/Relative.php","start":8752662,"end":8753829},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/NullableType.php","start":8753829,"end":8754508},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Param.php","start":8754508,"end":8758192},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/PropertyHook.php","start":8758192,"end":8761623},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/PropertyItem.php","start":8761623,"end":8762695},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar.php","start":8762695,"end":8762793},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/DNumber.php","start":8762793,"end":8762992},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/Encapsed.php","start":8762992,"end":8763216},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/EncapsedStringPart.php","start":8763216,"end":8763505},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/Float_.php","start":8763505,"end":8765606},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/Int_.php","start":8765606,"end":8768118},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/InterpolatedString.php","start":8768118,"end":8769051},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/LNumber.php","start":8769051,"end":8769246},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst.php","start":8769246,"end":8769848},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Class_.php","start":8769848,"end":8770163},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Dir.php","start":8770163,"end":8770471},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/File.php","start":8770471,"end":8770782},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Function_.php","start":8770782,"end":8771106},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Line.php","start":8771106,"end":8771417},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Method.php","start":8771417,"end":8771734},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Namespace_.php","start":8771734,"end":8772061},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Property.php","start":8772061,"end":8772384},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Trait_.php","start":8772384,"end":8772699},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/String_.php","start":8772699,"end":8777770},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/StaticVar.php","start":8777770,"end":8778769},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt.php","start":8778769,"end":8778902},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Block.php","start":8778902,"end":8779548},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Break_.php","start":8779548,"end":8780246},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Case_.php","start":8780246,"end":8781115},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Catch_.php","start":8781115,"end":8782229},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/ClassConst.php","start":8782229,"end":8784361},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/ClassLike.php","start":8784361,"end":8787405},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/ClassMethod.php","start":8787405,"end":8792121},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Class_.php","start":8792121,"end":8795336},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Const_.php","start":8795336,"end":8796032},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Continue_.php","start":8796032,"end":8796745},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/DeclareDeclare.php","start":8796745,"end":8796995},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Declare_.php","start":8796995,"end":8797907},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Do_.php","start":8797907,"end":8798726},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Echo_.php","start":8798726,"end":8799385},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/ElseIf_.php","start":8799385,"end":8800211},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Else_.php","start":8800211,"end":8800873},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/EnumCase.php","start":8800873,"end":8802039},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Enum_.php","start":8802039,"end":8803617},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Expression.php","start":8803617,"end":8804343},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Finally_.php","start":8804343,"end":8805013},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/For_.php","start":8805013,"end":8806448},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Foreach_.php","start":8806448,"end":8808158},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Function_.php","start":8808158,"end":8810830},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Global_.php","start":8810830,"end":8811508},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Goto_.php","start":8811508,"end":8812265},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/GroupUse.php","start":8812265,"end":8813326},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/HaltCompiler.php","start":8813326,"end":8814094},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/If_.php","start":8814094,"end":8815486},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/InlineHTML.php","start":8815486,"end":8816145},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Interface_.php","start":8816145,"end":8817470},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Label.php","start":8817470,"end":8818189},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Namespace_.php","start":8818189,"end":8819146},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Nop.php","start":8819146,"end":8819441},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Property.php","start":8819441,"end":8822867},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/PropertyProperty.php","start":8822867,"end":8823122},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Return_.php","start":8823122,"end":8823801},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/StaticVar.php","start":8823801,"end":8824025},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Static_.php","start":8824025,"end":8824746},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Switch_.php","start":8824746,"end":8825554},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TraitUse.php","start":8825554,"end":8826443},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TraitUseAdaptation.php","start":8826443,"end":8826736},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TraitUseAdaptation/Alias.php","start":8826736,"end":8828032},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TraitUseAdaptation/Precedence.php","start":8828032,"end":8829085},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Trait_.php","start":8829085,"end":8830156},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TryCatch.php","start":8830156,"end":8831201},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Unset_.php","start":8831201,"end":8831871},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/UseUse.php","start":8831871,"end":8832101},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Use_.php","start":8832101,"end":8833549},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/While_.php","start":8833549,"end":8834371},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/UnionType.php","start":8834371,"end":8835048},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/UseItem.php","start":8835048,"end":8836725},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/VarLikeIdentifier.php","start":8836725,"end":8837227},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/VariadicPlaceholder.php","start":8837227,"end":8837880},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeAbstract.php","start":8837880,"end":8843250},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeDumper.php","start":8843250,"end":8853735},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeFinder.php","start":8853735,"end":8856342},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeTraverser.php","start":8856342,"end":8866671},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeTraverserInterface.php","start":8866671,"end":8867269},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor.php","start":8867269,"end":8871448},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/CloningVisitor.php","start":8871448,"end":8871950},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/CommentAnnotatingVisitor.php","start":8871950,"end":8874727},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/FindingVisitor.php","start":8874727,"end":8875870},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/FirstFindingVisitor.php","start":8875870,"end":8877121},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/JSXTransformer.php","start":8877121,"end":8879735},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/NameResolver.php","start":8879735,"end":8890060},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/NodeConnectingVisitor.php","start":8890060,"end":8892389},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/ParentConnectingVisitor.php","start":8892389,"end":8893730},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitorAbstract.php","start":8893730,"end":8894177},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Parser.php","start":8894177,"end":8894942},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Parser/Php7.php","start":8894942,"end":9091210},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Parser/Php8.php","start":9091210,"end":9289579},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ParserAbstract.php","start":9289579,"end":9340672},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ParserFactory.php","start":9340672,"end":9342120},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/PhpVersion.php","start":9342120,"end":9346693},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/PrettyPrinter.php","start":9346693,"end":9348392},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/PrettyPrinter/Standard.php","start":9348392,"end":9401317},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/PrettyPrinterAbstract.php","start":9401317,"end":9473322},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Token.php","start":9473322,"end":9473809},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/compatibility_tokens.php","start":9473809,"end":9476252},{"filename":"/app/vendor/syntaxx/phpx-parser/test_jsx_debug.php","start":9476252,"end":9477018},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Installer.php","start":9477018,"end":9482863},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Installer.php:Zone.Identifier","start":9482863,"end":9482863},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Plugin.php","start":9482863,"end":9483821},{"filename":"/app/vendor/syntaxx/webassembly-packer/.github/workflows/unit-tests.yml","start":9483821,"end":9484420},{"filename":"/app/vendor/syntaxx/webassembly-packer/CLAUDE.md","start":9484420,"end":9494344},{"filename":"/app/vendor/syntaxx/webassembly-packer/bin/file-packager","start":9494344,"end":9494714},{"filename":"/app/vendor/syntaxx/webassembly-packer/filepackager.php","start":9494714,"end":9496296},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/file_packager.php","start":9496296,"end":9529539},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/file_packager.py","start":9529539,"end":9573542},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/lz4-js-compress-cli.mjs","start":9573542,"end":9576510},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/lz4.js","start":9576510,"end":9587249},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/mini-lz4.js","start":9587249,"end":9597518},{"filename":"/app/vendor/syntaxx/webassembly-packer/phpunit.xml","start":9597518,"end":9598158},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/DataFile.php","start":9598158,"end":9598700},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/DataPacker.php","start":9598700,"end":9602464},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/FilesExtractor.php","start":9602464,"end":9610561},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/Event.php","start":9610561,"end":9611133},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/EventManager.php","start":9611133,"end":9616111},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/Events/CompressionEvent.php","start":9616111,"end":9618468},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/Events/FileProcessingEvent.php","start":9618468,"end":9619889},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/Events/LogEvent.php","start":9619889,"end":9620894},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/JS/JSTemplates.php","start":9620894,"end":9623867},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/JS/template/compress.data.js","start":9623867,"end":9636685},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/JS/template/no-compress.data.js","start":9636685,"end":9650510},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/LZ4Compressor.php","start":9650510,"end":9653096},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Options.php","start":9653096,"end":9657265},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/WebAssemblyPacker.php","start":9657265,"end":9660133}],"remote_package_size":9660133,"package_uuid":"sha256-fe5d46af10d87e007793aa6a6cc5fcf8201a3c7a98a0d59ce22793cc7526078c"});

  })();
