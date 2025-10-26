# PHPX-LZ4

A quick and dirty AI port of [MiniLZ4](https://github.com/emscripten-core/emscripten/blob/main/third_party/mini-lz4.js) to PHP. MiniLZ4 is a minimal implementation of LZ4 block encoding and decoding, originally based on [node-lz4](https://github.com/pierrec/node-lz4).

## Overview

This library provides a pure PHP implementation of the LZ4 compression algorithm, specifically ported from the JavaScript MiniLZ4 implementation. It maintains compatibility with the original implementation while providing a PHP-native interface.

## Features

- Pure PHP implementation
- A quick and dirty AI port of MiniLZ4's
- Block compression and decompression
- Package compression with chunking support
- Verification capabilities
- No external dependencies

## Installation

You can install the package via composer:

```bash
composer require syntaxx/lz4
```

## Requirements

- PHP >= 8.1


## Usage

### Basic Compression/Decompression

```php
use Syntaxx\LZ4\LZ4;

// Create an instance
$lz4 = new LZ4();

// Compress data
$compressed = $lz4->compress($data);

// Decompress data
$decompressed = $lz4->decompress($compressed, $originalSize);
```

### Package Compression

```php
use Syntaxx\LZ4\LZ4;

// Create an instance
$lz4 = new LZ4();

// Compress data in chunks
$result = $lz4->compressPackage($data, $verify = false);

// Result structure
[
    'data' => string,          // Compressed data
    'cachedOffset' => int,     // Offset for cached chunks
    'cachedIndexes' => array,  // Cache indexes
    'cachedChunks' => array,   // Cached decompressed chunks
    'offsets' => array,        // Chunk offsets
    'sizes' => array,          // Chunk sizes
    'successes' => array       // Compression success flags (1 for success, 0 for failure)
]
```

## Development

### Running Tests

```bash
# Run tests
composer test

# Run tests with coverage
composer test:coverage
```

### Code Style

```bash
# Check code style
composer cs

# Fix code style issues
composer cs:fix
```

## License

This project is licensed under the MIT License, following the same license as the original MiniLZ4 implementation.

## Credits

- Original MiniLZ4 implementation by the Emscripten team
- Based on node-lz4 by Pierre Curto

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 
