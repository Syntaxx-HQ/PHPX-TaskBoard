
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
    loadPackage({"files":[{"filename":"/app/bootstrap.php","start":0,"end":523},{"filename":"/app/src/App.php","start":523,"end":1333},{"filename":"/app/src/App.phpx","start":1333,"end":2229},{"filename":"/app/src/Components/BenchmarkApp.php","start":2229,"end":14466},{"filename":"/app/src/Components/BenchmarkApp.phpx","start":14466,"end":28969},{"filename":"/app/src/Components/Board.php","start":28969,"end":33457},{"filename":"/app/src/Components/Board.phpx","start":33457,"end":38895},{"filename":"/app/src/Components/Card.php","start":38895,"end":46067},{"filename":"/app/src/Components/Card.phpx","start":46067,"end":53813},{"filename":"/app/src/Components/Column.php","start":53813,"end":58919},{"filename":"/app/src/Components/Column.phpx","start":58919,"end":65489},{"filename":"/app/src/debug/Components-Board.php.ai.map","start":65489,"end":67691},{"filename":"/app/src/debug/Components-Card.php.ai.map","start":67691,"end":68978},{"filename":"/app/src/debug/Components-Column.php.ai.map","start":68978,"end":70556},{"filename":"/app/src/debug/index.json","start":70556,"end":71899},{"filename":"/app/src/debug/main.php.ai.map","start":71899,"end":73199},{"filename":"/app/src/main.php","start":73199,"end":73799},{"filename":"/app/src/main.phpx","start":73799,"end":74398},{"filename":"/app/src/php-vrzno-web.mjs","start":74398,"end":292677},{"filename":"/app/src/php-vrzno-web.wasm","start":292677,"end":7849569},{"filename":"/app/src/php-web.data","start":7849569,"end":7966658},{"filename":"/app/src/php-web.data.js","start":7966658,"end":7984487},{"filename":"/app/vendor/autoload.php","start":7984487,"end":7985258},{"filename":"/app/vendor/bin/file-packager","start":7985258,"end":7988648},{"filename":"/app/vendor/bin/php-parse","start":7988648,"end":7992005},{"filename":"/app/vendor/bin/phpx-build","start":7992005,"end":7995380},{"filename":"/app/vendor/composer/ClassLoader.php","start":7995380,"end":8011758},{"filename":"/app/vendor/composer/InstalledVersions.php","start":8011758,"end":8027980},{"filename":"/app/vendor/composer/autoload_classmap.php","start":8027980,"end":8028202},{"filename":"/app/vendor/composer/autoload_files.php","start":8028202,"end":8028435},{"filename":"/app/vendor/composer/autoload_namespaces.php","start":8028435,"end":8028574},{"filename":"/app/vendor/composer/autoload_psr4.php","start":8028574,"end":8029397},{"filename":"/app/vendor/composer/autoload_real.php","start":8029397,"end":8031019},{"filename":"/app/vendor/composer/autoload_static.php","start":8031019,"end":8033686},{"filename":"/app/vendor/composer/installed.json","start":8033686,"end":8046383},{"filename":"/app/vendor/composer/installed.php","start":8046383,"end":8049820},{"filename":"/app/vendor/syntaxx/lz4/phpcs.xml","start":8049820,"end":8055779},{"filename":"/app/vendor/syntaxx/lz4/phpunit.coverage.xml","start":8055779,"end":8056603},{"filename":"/app/vendor/syntaxx/lz4/phpunit.xml","start":8056603,"end":8057013},{"filename":"/app/vendor/syntaxx/lz4/src/LZ4.php","start":8057013,"end":8074582},{"filename":"/app/vendor/syntaxx/phpx-build-tools/CLAUDE.md","start":8074582,"end":8083853},{"filename":"/app/vendor/syntaxx/phpx-build-tools/ROADMAP.md","start":8083853,"end":8099357},{"filename":"/app/vendor/syntaxx/phpx-build-tools/bin/phpx-build","start":8099357,"end":8104769},{"filename":"/app/vendor/syntaxx/phpx-build-tools/scripts/wasm-export.php","start":8104769,"end":8105981},{"filename":"/app/vendor/syntaxx/phpx-build-tools/scripts/wasm-pack.php","start":8105981,"end":8116870},{"filename":"/app/vendor/syntaxx/phpx-build-tools/scripts/wasm-watch.sh","start":8116870,"end":8121022},{"filename":"/app/vendor/syntaxx/phpx-compiler/CLAUDE.md","start":8121022,"end":8132972},{"filename":"/app/vendor/syntaxx/phpx-compiler/FRONTEND-SOURCE-MAPS.md","start":8132972,"end":8141334},{"filename":"/app/vendor/syntaxx/phpx-compiler/KNOWN-ISSUES.md","start":8141334,"end":8148482},{"filename":"/app/vendor/syntaxx/phpx-compiler/ROADMAP.md","start":8148482,"end":8159768},{"filename":"/app/vendor/syntaxx/phpx-compiler/bin/compile","start":8159768,"end":8168187},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/ai-source-maps.md","start":8168187,"end":8181860},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/events.md","start":8181860,"end":8198214},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/examples.md","start":8198214,"end":8222095},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/phpx-guide.md","start":8222095,"end":8239100},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/syntax-reference.md","start":8239100,"end":8251633},{"filename":"/app/vendor/syntaxx/phpx-compiler/docs/verbose-mode.md","start":8251633,"end":8263088},{"filename":"/app/vendor/syntaxx/phpx-compiler/phpunit.xml","start":8263088,"end":8263635},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/AiSourceMapGenerator.php","start":8263635,"end":8278517},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Compiler.php","start":8278517,"end":8299699},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Component.php","start":8299699,"end":8301623},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Events/EventManager.php","start":8301623,"end":8304483},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Events/EventNames.php","start":8304483,"end":8307411},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Events/VerboseListener.php","start":8307411,"end":8322702},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Files.php","start":8322702,"end":8327177},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/LineTrackingPrinter.php","start":8327177,"end":8345434},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/PrettyErrorFormatter.php","start":8345434,"end":8355239},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Printer.php","start":8355239,"end":8356291},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/SourceMapGenerator.php","start":8356291,"end":8366112},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/StructuredErrorFormatter.php","start":8366112,"end":8374026},{"filename":"/app/vendor/syntaxx/phpx-compiler/src/Transformer.php","start":8374026,"end":8384899},{"filename":"/app/vendor/syntaxx/phpx-framework/.phpunit.result.cache","start":8384899,"end":8388402},{"filename":"/app/vendor/syntaxx/phpx-framework/CLAUDE.md","start":8388402,"end":8388402},{"filename":"/app/vendor/syntaxx/phpx-framework/composer.lock","start":8388402,"end":8449794},{"filename":"/app/vendor/syntaxx/phpx-framework/demo/app.php","start":8449794,"end":8450663},{"filename":"/app/vendor/syntaxx/phpx-framework/phpunit.xml","start":8450663,"end":8451308},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Commit/DomProps.php","start":8451308,"end":8453459},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Commit/SelectionManager.php","start":8453459,"end":8456812},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Component.php","start":8456812,"end":8458231},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Document.php","start":8458231,"end":8459418},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Element.php","start":8459418,"end":8461804},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Environment.php","start":8461804,"end":8464154},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Events/EventDelegator.php","start":8464154,"end":8467286},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Fiber/FiberNode.php","start":8467286,"end":8470372},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Framework.php","start":8470372,"end":8473277},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/DataRegistry.php","start":8473277,"end":8474152},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/HookManager.php","start":8474152,"end":8485598},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/HydrationState.php","start":8485598,"end":8486762},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/Ref.php","start":8486762,"end":8487211},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/SuspenseCache.php","start":8487211,"end":8488185},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/Suspension.php","start":8488185,"end":8488849},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/ComponentResolver.php","start":8488849,"end":8491895},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/FakeDomBackend.php","start":8491895,"end":8497275},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/HostConfig.php","start":8497275,"end":8500160},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/Reconciler.php","start":8500160,"end":8521785},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/SsrBackend.php","start":8521785,"end":8526546},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/SsrNode.php","start":8526546,"end":8528875},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/VrznoBackend.php","start":8528875,"end":8534096},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Router.php","start":8534096,"end":8538542},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Runtime.php","start":8538542,"end":8543350},{"filename":"/app/vendor/syntaxx/phpx-framework/src/ServerRenderer.php","start":8543350,"end":8546463},{"filename":"/app/vendor/syntaxx/phpx-framework/src/StreamContext.php","start":8546463,"end":8548074},{"filename":"/app/vendor/syntaxx/phpx-framework/src/StreamRenderer.php","start":8548074,"end":8551575},{"filename":"/app/vendor/syntaxx/phpx-framework/src/TextNode.php","start":8551575,"end":8551828},{"filename":"/app/vendor/syntaxx/phpx-framework/src/VirtualDOM/VNode.php","start":8551828,"end":8555781},{"filename":"/app/vendor/syntaxx/phpx-framework/src/bootstrap.php","start":8555781,"end":8555781},{"filename":"/app/vendor/syntaxx/phpx-framework/src/useState.php","start":8555781,"end":8558280},{"filename":"/app/vendor/syntaxx/phpx-parser/CLAUDE.md","start":8558280,"end":8566887},{"filename":"/app/vendor/syntaxx/phpx-parser/WHY-CUSTOM-LEXER.md","start":8566887,"end":8582452},{"filename":"/app/vendor/syntaxx/phpx-parser/bin/php-parse","start":8582452,"end":8589001},{"filename":"/app/vendor/syntaxx/phpx-parser/examples.php","start":8589001,"end":8590623},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder.php","start":8590623,"end":8590825},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/ClassConst.php","start":8590825,"end":8594700},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Class_.php","start":8594700,"end":8598871},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Declaration.php","start":8598871,"end":8600132},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/EnumCase.php","start":8600132,"end":8602136},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Enum_.php","start":8602136,"end":8605394},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/FunctionLike.php","start":8605394,"end":8607200},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Function_.php","start":8607200,"end":8608891},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Interface_.php","start":8608891,"end":8611519},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Method.php","start":8611519,"end":8615275},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Namespace_.php","start":8615275,"end":8616348},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Param.php","start":8616348,"end":8620814},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Property.php","start":8620814,"end":8626561},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/TraitUse.php","start":8626561,"end":8628215},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/TraitUseAdaptation.php","start":8628215,"end":8632481},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Trait_.php","start":8632481,"end":8634837},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Builder/Use_.php","start":8634837,"end":8636114},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/BuilderFactory.php","start":8636114,"end":8646663},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/BuilderHelpers.php","start":8646663,"end":8656625},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Comment.php","start":8656625,"end":8663532},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Comment/Doc.php","start":8663532,"end":8663635},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ConstExprEvaluationException.php","start":8663635,"end":8663747},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ConstExprEvaluator.php","start":8663747,"end":8673179},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Error.php","start":8673179,"end":8678131},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ErrorHandler.php","start":8678131,"end":8678431},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ErrorHandler/Collecting.php","start":8678431,"end":8679300},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ErrorHandler/Throwing.php","start":8679300,"end":8679668},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/DiffElem.php","start":8679668,"end":8680431},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/Differ.php","start":8680431,"end":8685524},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/PrintableNewAnonClassNode.php","start":8685524,"end":8688193},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/TokenPolyfill.php","start":8688193,"end":8697825},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Internal/TokenStream.php","start":8697825,"end":8707064},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/JsonDecoder.php","start":8707064,"end":8710584},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer.php","start":8710584,"end":8714950},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/Emulative.php","start":8714950,"end":8723292},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/JSX.php","start":8723292,"end":8749631},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/AsymmetricVisibilityTokenEmulator.php","start":8749631,"end":8752975},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/AttributeEmulator.php","start":8752975,"end":8754448},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/EnumTokenEmulator.php","start":8754448,"end":8755149},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/ExplicitOctalEmulator.php","start":8755149,"end":8756718},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/KeywordEmulator.php","start":8756718,"end":8758553},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/MatchTokenEmulator.php","start":8758553,"end":8758975},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/NullsafeTokenEmulator.php","start":8758975,"end":8761257},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/PropertyTokenEmulator.php","start":8761257,"end":8761694},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/ReadonlyFunctionTokenEmulator.php","start":8761694,"end":8762670},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/ReadonlyTokenEmulator.php","start":8762670,"end":8763575},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/ReverseEmulator.php","start":8763575,"end":8764588},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Lexer/TokenEmulator/TokenEmulator.php","start":8764588,"end":8765407},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Modifiers.php","start":8765407,"end":8768186},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NameContext.php","start":8768186,"end":8778239},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node.php","start":8778239,"end":8782361},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Arg.php","start":8782361,"end":8783660},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/ArrayItem.php","start":8783660,"end":8784872},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Attribute.php","start":8784872,"end":8785692},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/AttributeGroup.php","start":8785692,"end":8786339},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/ClosureUse.php","start":8786339,"end":8787312},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/ComplexType.php","start":8787312,"end":8787635},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Const_.php","start":8787635,"end":8788606},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/DeclareItem.php","start":8788606,"end":8789598},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr.php","start":8789598,"end":8789731},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ArrayDimFetch.php","start":8789731,"end":8790553},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ArrayItem.php","start":8790553,"end":8790777},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Array_.php","start":8790777,"end":8791608},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ArrowFunction.php","start":8791608,"end":8794160},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Assign.php","start":8794160,"end":8794934},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp.php","start":8794934,"end":8795660},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/BitwiseAnd.php","start":8795660,"end":8795895},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/BitwiseOr.php","start":8795895,"end":8796128},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/BitwiseXor.php","start":8796128,"end":8796363},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Coalesce.php","start":8796363,"end":8796594},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Concat.php","start":8796594,"end":8796821},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Div.php","start":8796821,"end":8797042},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Minus.php","start":8797042,"end":8797267},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Mod.php","start":8797267,"end":8797488},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Mul.php","start":8797488,"end":8797709},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Plus.php","start":8797709,"end":8797932},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/Pow.php","start":8797932,"end":8798153},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/ShiftLeft.php","start":8798153,"end":8798386},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignOp/ShiftRight.php","start":8798386,"end":8798621},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/AssignRef.php","start":8798621,"end":8799444},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp.php","start":8799444,"end":8800539},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BitwiseAnd.php","start":8800539,"end":8800850},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BitwiseOr.php","start":8800850,"end":8801159},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BitwiseXor.php","start":8801159,"end":8801470},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BooleanAnd.php","start":8801470,"end":8801782},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/BooleanOr.php","start":8801782,"end":8802092},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Coalesce.php","start":8802092,"end":8802400},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Concat.php","start":8802400,"end":8802703},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Div.php","start":8802703,"end":8803000},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Equal.php","start":8803000,"end":8803302},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Greater.php","start":8803302,"end":8803607},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/GreaterOrEqual.php","start":8803607,"end":8803927},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Identical.php","start":8803927,"end":8804238},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/LogicalAnd.php","start":8804238,"end":8804551},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/LogicalOr.php","start":8804551,"end":8804861},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/LogicalXor.php","start":8804861,"end":8805174},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Minus.php","start":8805174,"end":8805475},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Mod.php","start":8805475,"end":8805772},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Mul.php","start":8805772,"end":8806069},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/NotEqual.php","start":8806069,"end":8806377},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/NotIdentical.php","start":8806377,"end":8806694},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Plus.php","start":8806694,"end":8806993},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Pow.php","start":8806993,"end":8807291},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/ShiftLeft.php","start":8807291,"end":8807601},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/ShiftRight.php","start":8807601,"end":8807913},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Smaller.php","start":8807913,"end":8808218},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/SmallerOrEqual.php","start":8808218,"end":8808538},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BinaryOp/Spaceship.php","start":8808538,"end":8808849},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BitwiseNot.php","start":8808849,"end":8809501},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/BooleanNot.php","start":8809501,"end":8810153},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/CallLike.php","start":8810153,"end":8811123},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast.php","start":8811123,"end":8811690},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Array_.php","start":8811690,"end":8811900},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Bool_.php","start":8811900,"end":8812108},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Double.php","start":8812108,"end":8812509},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Int_.php","start":8812509,"end":8812715},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Object_.php","start":8812715,"end":8812927},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/String_.php","start":8812927,"end":8813139},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Cast/Unset_.php","start":8813139,"end":8813349},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ClassConstFetch.php","start":8813349,"end":8814335},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Clone_.php","start":8814335,"end":8814972},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Closure.php","start":8814972,"end":8817808},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ClosureUse.php","start":8817808,"end":8818035},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ConstFetch.php","start":8818035,"end":8818718},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Empty_.php","start":8818718,"end":8819358},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Error.php","start":8819358,"end":8820115},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ErrorSuppress.php","start":8820115,"end":8820777},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Eval_.php","start":8820777,"end":8821414},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Exit_.php","start":8821414,"end":8822172},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/FuncCall.php","start":8822172,"end":8823166},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Include_.php","start":8823166,"end":8824117},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Instanceof_.php","start":8824117,"end":8824977},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Isset_.php","start":8824977,"end":8825619},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/List_.php","start":8825619,"end":8826498},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Match_.php","start":8826498,"end":8827280},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/MethodCall.php","start":8827280,"end":8828557},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/New_.php","start":8828557,"end":8829658},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/NullsafeMethodCall.php","start":8829658,"end":8830958},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/NullsafePropertyFetch.php","start":8830958,"end":8831929},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PostDec.php","start":8831929,"end":8832568},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PostInc.php","start":8832568,"end":8833207},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PreDec.php","start":8833207,"end":8833843},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PreInc.php","start":8833843,"end":8834479},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Print_.php","start":8834479,"end":8835119},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/PropertyFetch.php","start":8835119,"end":8836064},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/ShellExec.php","start":8836064,"end":8836859},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/StaticCall.php","start":8836859,"end":8838147},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/StaticPropertyFetch.php","start":8838147,"end":8839161},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Ternary.php","start":8839161,"end":8840128},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Throw_.php","start":8840128,"end":8840796},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/UnaryMinus.php","start":8840796,"end":8841448},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/UnaryPlus.php","start":8841448,"end":8842097},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Variable.php","start":8842097,"end":8842734},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/YieldFrom.php","start":8842734,"end":8843400},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Expr/Yield_.php","start":8843400,"end":8844246},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/FunctionLike.php","start":8844246,"end":8844977},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Identifier.php","start":8844977,"end":8847094},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/InterpolatedStringPart.php","start":8847094,"end":8847944},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/IntersectionType.php","start":8847944,"end":8848609},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Attribute.php","start":8848609,"end":8849242},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Comment.php","start":8849242,"end":8849871},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Element.php","start":8849871,"end":8851401},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/ExpressionContainer.php","start":8851401,"end":8851974},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Fragment.php","start":8851974,"end":8852632},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/SpreadAttribute.php","start":8852632,"end":8853339},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/JSX/Text.php","start":8853339,"end":8853816},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/MatchArm.php","start":8853816,"end":8854468},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Name.php","start":8854468,"end":8863139},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Name/FullyQualified.php","start":8863139,"end":8864309},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Name/Relative.php","start":8864309,"end":8865476},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/NullableType.php","start":8865476,"end":8866155},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Param.php","start":8866155,"end":8869839},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/PropertyHook.php","start":8869839,"end":8873270},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/PropertyItem.php","start":8873270,"end":8874342},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar.php","start":8874342,"end":8874440},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/DNumber.php","start":8874440,"end":8874639},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/Encapsed.php","start":8874639,"end":8874863},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/EncapsedStringPart.php","start":8874863,"end":8875152},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/Float_.php","start":8875152,"end":8877253},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/Int_.php","start":8877253,"end":8879765},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/InterpolatedString.php","start":8879765,"end":8880698},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/LNumber.php","start":8880698,"end":8880893},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst.php","start":8880893,"end":8881495},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Class_.php","start":8881495,"end":8881810},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Dir.php","start":8881810,"end":8882118},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/File.php","start":8882118,"end":8882429},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Function_.php","start":8882429,"end":8882753},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Line.php","start":8882753,"end":8883064},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Method.php","start":8883064,"end":8883381},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Namespace_.php","start":8883381,"end":8883708},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Property.php","start":8883708,"end":8884031},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/MagicConst/Trait_.php","start":8884031,"end":8884346},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Scalar/String_.php","start":8884346,"end":8889417},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/StaticVar.php","start":8889417,"end":8890416},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt.php","start":8890416,"end":8890549},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Block.php","start":8890549,"end":8891195},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Break_.php","start":8891195,"end":8891893},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Case_.php","start":8891893,"end":8892762},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Catch_.php","start":8892762,"end":8893876},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/ClassConst.php","start":8893876,"end":8896008},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/ClassLike.php","start":8896008,"end":8899052},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/ClassMethod.php","start":8899052,"end":8903768},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Class_.php","start":8903768,"end":8906983},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Const_.php","start":8906983,"end":8907679},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Continue_.php","start":8907679,"end":8908392},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/DeclareDeclare.php","start":8908392,"end":8908642},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Declare_.php","start":8908642,"end":8909554},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Do_.php","start":8909554,"end":8910373},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Echo_.php","start":8910373,"end":8911032},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/ElseIf_.php","start":8911032,"end":8911858},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Else_.php","start":8911858,"end":8912520},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/EnumCase.php","start":8912520,"end":8913686},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Enum_.php","start":8913686,"end":8915264},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Expression.php","start":8915264,"end":8915990},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Finally_.php","start":8915990,"end":8916660},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/For_.php","start":8916660,"end":8918095},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Foreach_.php","start":8918095,"end":8919805},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Function_.php","start":8919805,"end":8922477},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Global_.php","start":8922477,"end":8923155},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Goto_.php","start":8923155,"end":8923912},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/GroupUse.php","start":8923912,"end":8924973},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/HaltCompiler.php","start":8924973,"end":8925741},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/If_.php","start":8925741,"end":8927133},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/InlineHTML.php","start":8927133,"end":8927792},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Interface_.php","start":8927792,"end":8929117},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Label.php","start":8929117,"end":8929836},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Namespace_.php","start":8929836,"end":8930793},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Nop.php","start":8930793,"end":8931088},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Property.php","start":8931088,"end":8934514},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/PropertyProperty.php","start":8934514,"end":8934769},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Return_.php","start":8934769,"end":8935448},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/StaticVar.php","start":8935448,"end":8935672},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Static_.php","start":8935672,"end":8936393},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Switch_.php","start":8936393,"end":8937201},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TraitUse.php","start":8937201,"end":8938090},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TraitUseAdaptation.php","start":8938090,"end":8938383},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TraitUseAdaptation/Alias.php","start":8938383,"end":8939679},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TraitUseAdaptation/Precedence.php","start":8939679,"end":8940732},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Trait_.php","start":8940732,"end":8941803},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/TryCatch.php","start":8941803,"end":8942848},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Unset_.php","start":8942848,"end":8943518},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/UseUse.php","start":8943518,"end":8943748},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/Use_.php","start":8943748,"end":8945196},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/Stmt/While_.php","start":8945196,"end":8946018},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/UnionType.php","start":8946018,"end":8946695},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/UseItem.php","start":8946695,"end":8948372},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/VarLikeIdentifier.php","start":8948372,"end":8948874},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Node/VariadicPlaceholder.php","start":8948874,"end":8949527},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeAbstract.php","start":8949527,"end":8954897},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeDumper.php","start":8954897,"end":8965382},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeFinder.php","start":8965382,"end":8967989},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeTraverser.php","start":8967989,"end":8978318},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeTraverserInterface.php","start":8978318,"end":8978916},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor.php","start":8978916,"end":8983095},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/CloningVisitor.php","start":8983095,"end":8983597},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/CommentAnnotatingVisitor.php","start":8983597,"end":8986374},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/FindingVisitor.php","start":8986374,"end":8987517},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/FirstFindingVisitor.php","start":8987517,"end":8988768},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/JSXTransformer.php","start":8988768,"end":8991382},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/NameResolver.php","start":8991382,"end":9001707},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/NodeConnectingVisitor.php","start":9001707,"end":9004036},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitor/ParentConnectingVisitor.php","start":9004036,"end":9005377},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/NodeVisitorAbstract.php","start":9005377,"end":9005824},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Parser.php","start":9005824,"end":9006589},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Parser/Php7.php","start":9006589,"end":9202857},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Parser/Php8.php","start":9202857,"end":9401226},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ParserAbstract.php","start":9401226,"end":9452319},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/ParserFactory.php","start":9452319,"end":9453767},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/PhpVersion.php","start":9453767,"end":9458340},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/PrettyPrinter.php","start":9458340,"end":9460039},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/PrettyPrinter/Standard.php","start":9460039,"end":9512964},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/PrettyPrinterAbstract.php","start":9512964,"end":9584969},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/Token.php","start":9584969,"end":9585456},{"filename":"/app/vendor/syntaxx/phpx-parser/lib/PhpParser/compatibility_tokens.php","start":9585456,"end":9587899},{"filename":"/app/vendor/syntaxx/phpx-parser/test_jsx_debug.php","start":9587899,"end":9588665},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Installer.php","start":9588665,"end":9594510},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Installer.php:Zone.Identifier","start":9594510,"end":9594510},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Plugin.php","start":9594510,"end":9595468},{"filename":"/app/vendor/syntaxx/webassembly-packer/.github/workflows/unit-tests.yml","start":9595468,"end":9596067},{"filename":"/app/vendor/syntaxx/webassembly-packer/CLAUDE.md","start":9596067,"end":9605991},{"filename":"/app/vendor/syntaxx/webassembly-packer/bin/file-packager","start":9605991,"end":9606361},{"filename":"/app/vendor/syntaxx/webassembly-packer/filepackager.php","start":9606361,"end":9607943},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/file_packager.php","start":9607943,"end":9641186},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/file_packager.py","start":9641186,"end":9685189},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/lz4-js-compress-cli.mjs","start":9685189,"end":9688157},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/lz4.js","start":9688157,"end":9698896},{"filename":"/app/vendor/syntaxx/webassembly-packer/original/mini-lz4.js","start":9698896,"end":9709165},{"filename":"/app/vendor/syntaxx/webassembly-packer/phpunit.xml","start":9709165,"end":9709805},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/DataFile.php","start":9709805,"end":9710347},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/DataPacker.php","start":9710347,"end":9714111},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/FilesExtractor.php","start":9714111,"end":9722208},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/Event.php","start":9722208,"end":9722780},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/EventManager.php","start":9722780,"end":9727758},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/Events/CompressionEvent.php","start":9727758,"end":9730115},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/Events/FileProcessingEvent.php","start":9730115,"end":9731536},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Infra/Events/LogEvent.php","start":9731536,"end":9732541},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/JS/JSTemplates.php","start":9732541,"end":9735514},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/JS/template/compress.data.js","start":9735514,"end":9748332},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/JS/template/no-compress.data.js","start":9748332,"end":9762157},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/LZ4Compressor.php","start":9762157,"end":9764743},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/Options.php","start":9764743,"end":9768912},{"filename":"/app/vendor/syntaxx/webassembly-packer/src/WebAssemblyPacker.php","start":9768912,"end":9771780}],"remote_package_size":9771780,"package_uuid":"sha256-1e7556aa2a6293275873dafdcb57bce3ac88a78222464f5cc6dd0ba5764117ad"});

  })();
