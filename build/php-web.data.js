
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
Module["FS_createPath"]("/app/vendor", "composer", true, true);
Module["FS_createPath"]("/app/vendor", "syntaxx", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx", "phpx-framework", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework", "demo", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework", "src", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Commit", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Events", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Fiber", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Hooks", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "Reconciler", true, true);
Module["FS_createPath"]("/app/vendor/syntaxx/phpx-framework/src", "VirtualDOM", true, true);
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
    loadPackage({"files":[{"filename":"/app/bootstrap.php","start":0,"end":523},{"filename":"/app/src/App.php","start":523,"end":1333},{"filename":"/app/src/App.phpx","start":1333,"end":2229},{"filename":"/app/src/Components/BenchmarkApp.php","start":2229,"end":14466},{"filename":"/app/src/Components/BenchmarkApp.phpx","start":14466,"end":28969},{"filename":"/app/src/Components/Board.php","start":28969,"end":33457},{"filename":"/app/src/Components/Board.phpx","start":33457,"end":38895},{"filename":"/app/src/Components/Card.php","start":38895,"end":44425},{"filename":"/app/src/Components/Card.phpx","start":44425,"end":52278},{"filename":"/app/src/Components/Column.php","start":52278,"end":57384},{"filename":"/app/src/Components/Column.phpx","start":57384,"end":63954},{"filename":"/app/src/debug/Components-Board.php.ai.map","start":63954,"end":66156},{"filename":"/app/src/debug/Components-Card.php.ai.map","start":66156,"end":67443},{"filename":"/app/src/debug/Components-Column.php.ai.map","start":67443,"end":69021},{"filename":"/app/src/debug/index.json","start":69021,"end":70364},{"filename":"/app/src/debug/main.php.ai.map","start":70364,"end":71664},{"filename":"/app/src/main.php","start":71664,"end":72264},{"filename":"/app/src/main.phpx","start":72264,"end":72863},{"filename":"/app/src/php-vrzno-web.mjs","start":72863,"end":291142},{"filename":"/app/src/php-vrzno-web.wasm","start":291142,"end":7848034},{"filename":"/app/src/php-web.data","start":7848034,"end":7965123},{"filename":"/app/src/php-web.data.js","start":7965123,"end":7982952},{"filename":"/app/vendor/autoload.php","start":7982952,"end":7983723},{"filename":"/app/vendor/composer/ClassLoader.php","start":7983723,"end":8000101},{"filename":"/app/vendor/composer/InstalledVersions.php","start":8000101,"end":8016323},{"filename":"/app/vendor/composer/autoload_classmap.php","start":8016323,"end":8016572},{"filename":"/app/vendor/composer/autoload_files.php","start":8016572,"end":8016832},{"filename":"/app/vendor/composer/autoload_namespaces.php","start":8016832,"end":8016998},{"filename":"/app/vendor/composer/autoload_psr4.php","start":8016998,"end":8017373},{"filename":"/app/vendor/composer/autoload_real.php","start":8017373,"end":8018995},{"filename":"/app/vendor/composer/autoload_static.php","start":8018995,"end":8020614},{"filename":"/app/vendor/composer/installed.json","start":8020614,"end":8023949},{"filename":"/app/vendor/composer/installed.php","start":8023949,"end":8025564},{"filename":"/app/vendor/syntaxx/phpx-framework/CLAUDE.md","start":8025564,"end":8025564},{"filename":"/app/vendor/syntaxx/phpx-framework/demo/app.php","start":8025564,"end":8026433},{"filename":"/app/vendor/syntaxx/phpx-framework/phpunit.xml","start":8026433,"end":8027078},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Commit/DomProps.php","start":8027078,"end":8029229},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Commit/SelectionManager.php","start":8029229,"end":8032582},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Component.php","start":8032582,"end":8034001},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Document.php","start":8034001,"end":8035188},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Element.php","start":8035188,"end":8037574},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Environment.php","start":8037574,"end":8039924},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Events/EventDelegator.php","start":8039924,"end":8043056},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Fiber/FiberNode.php","start":8043056,"end":8046142},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Framework.php","start":8046142,"end":8049047},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/DataRegistry.php","start":8049047,"end":8049922},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/HookManager.php","start":8049922,"end":8061368},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/HydrationState.php","start":8061368,"end":8062532},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/Ref.php","start":8062532,"end":8062981},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/SuspenseCache.php","start":8062981,"end":8063955},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Hooks/Suspension.php","start":8063955,"end":8064619},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/ComponentResolver.php","start":8064619,"end":8067665},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/FakeDomBackend.php","start":8067665,"end":8073045},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/HostConfig.php","start":8073045,"end":8075930},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/Reconciler.php","start":8075930,"end":8097555},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/SsrBackend.php","start":8097555,"end":8102316},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/SsrNode.php","start":8102316,"end":8104645},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Reconciler/VrznoBackend.php","start":8104645,"end":8110149},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Router.php","start":8110149,"end":8114595},{"filename":"/app/vendor/syntaxx/phpx-framework/src/Runtime.php","start":8114595,"end":8119403},{"filename":"/app/vendor/syntaxx/phpx-framework/src/ServerRenderer.php","start":8119403,"end":8122516},{"filename":"/app/vendor/syntaxx/phpx-framework/src/StreamContext.php","start":8122516,"end":8124127},{"filename":"/app/vendor/syntaxx/phpx-framework/src/StreamRenderer.php","start":8124127,"end":8127628},{"filename":"/app/vendor/syntaxx/phpx-framework/src/TextNode.php","start":8127628,"end":8127881},{"filename":"/app/vendor/syntaxx/phpx-framework/src/VirtualDOM/VNode.php","start":8127881,"end":8131834},{"filename":"/app/vendor/syntaxx/phpx-framework/src/bootstrap.php","start":8131834,"end":8131834},{"filename":"/app/vendor/syntaxx/phpx-framework/src/useState.php","start":8131834,"end":8134333},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Installer.php","start":8134333,"end":8140178},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Installer.php:Zone.Identifier","start":8140178,"end":8140178},{"filename":"/app/vendor/syntaxx/wasm-php-runtime-vrzno/src/Plugin.php","start":8140178,"end":8141136}],"remote_package_size":8141136,"package_uuid":"sha256-0a8d7d1254c140791eb46281446a02e232f40a2cbffca377fc3d8a4acc6309a4"});

  })();
