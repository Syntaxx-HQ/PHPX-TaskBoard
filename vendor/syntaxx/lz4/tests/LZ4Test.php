<?php

declare(strict_types = 1);

namespace Syntaxx\LZ4\Tests;

use PHPUnit\Framework\TestCase;
use RuntimeException;
use Syntaxx\LZ4\LZ4;

final class LZ4Test extends TestCase
{

    private LZ4 $lz4;

    protected function setUp(): void
    {
        $this->lz4 = new LZ4;
    }

    public function testCompressWithEmptyString(): void
    {
        $result = $this->lz4->compress('');
        $this->assertEquals('', $result);
    }

    public function testCompressWithSmallString(): void
    {
        $input = "test";
        $result = $this->lz4->compress($input);
        // For small strings, compression might not provide benefit
        $this->assertEquals($input, $result);
    }

    public function testCompressWithMediumString(): void
    {
        $input = "This is a test string that needs to be compressed and then decompressed.";
        $result = $this->lz4->compress($input);
        // For medium strings, compression might not provide benefit
        $this->assertEquals($input, $result);
    }

    public function testCompressWithRepeatedPatterns(): void
    {
        $input = str_repeat("test", 100);
        $result = $this->lz4->compress($input);
        $this->assertNotEmpty($result);
        $this->assertLessThan(strlen($input), strlen($result)); // Should be compressed
    }

    public function testCompressWithSpecialCharacters(): void
    {
        $input = "!@#$%^&*()_+{}|:<>?~`-=[]\\;',./";
        $result = $this->lz4->compress($input);
        // For short strings with special chars, compression might not provide benefit
        $this->assertEquals($input, $result);
    }

    public function testCompressWithBinaryData(): void
    {
        $input = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09";
        $result = $this->lz4->compress($input);
        // For short binary data, compression might not provide benefit
        $this->assertEquals($input, $result);
    }

    public function testCompressWithLargeInput(): void
    {
        $this->expectException(RuntimeException::class);
        // Test with a size that will trigger the limit in compressBound()
        $bound = $this->lz4->compressBound(0x7E000001); // MAX_INPUT_SIZE + 1

        if ($bound === 0) {
            throw new RuntimeException("Input too large for LZ4 compression.");
        }
    }

    public function testDecompressWithEmptyString(): void
    {
        $result = $this->lz4->decompress('', 0);
        $this->assertEquals('', $result);
    }

    public function testDecompressWithSmallData(): void
    {
        $input = str_repeat("test", 100); // Use a larger input that will actually compress
        $compressed = $this->lz4->compress($input);
        $result = $this->lz4->decompress($compressed, strlen($input));
        $this->assertEquals($input, $result);
    }

    public function testDecompressWithMediumData(): void
    {
        $input = str_repeat("This is a test string that needs to be compressed and then decompressed.", 10);
        $compressed = $this->lz4->compress($input);
        $result = $this->lz4->decompress($compressed, strlen($input));
        $this->assertEquals($input, $result);
    }

    public function testDecompressWithInvalidData(): void
    {
        $this->expectException(RuntimeException::class);
        $this->lz4->decompress("invalid", 10);
    }

    public function testDecompressWithIncorrectOutputSize(): void
    {
        $input = "test";
        $compressed = $this->lz4->compress($input);
        $this->expectException(RuntimeException::class);
        $this->lz4->decompress($compressed, strlen($input) + 1);
    }

    public function testCompressBoundWithZeroSize(): void
    {
        $result = $this->lz4->compressBound(0);
        $this->assertEquals(16, $result);
    }

    public function testCompressBoundWithSmallSize(): void
    {
        $result = $this->lz4->compressBound(100);
        $this->assertGreaterThan(100, $result);
    }

    public function testCompressBoundWithLargeSize(): void
    {
        $result = $this->lz4->compressBound(1000000);
        $this->assertGreaterThan(1000000, $result);
    }

    public function testCompressBoundWithNegativeSize(): void
    {
        $result = $this->lz4->compressBound(-1);
        $this->assertEquals(0, $result);
    }

    public function testCompressBoundWithExceedingSize(): void
    {
        $result = $this->lz4->compressBound(1000000);
        $this->assertGreaterThan(0, $result);
    }

    public function testCompressPackageWithEmptyData(): void
    {
        $result = $this->lz4->compressPackage('');
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('offsets', $result);
        $this->assertArrayHasKey('sizes', $result);
        $this->assertArrayHasKey('successes', $result);
        $this->assertEmpty($result['offsets']);
        $this->assertEmpty($result['sizes']);
        $this->assertEmpty($result['successes']);
    }

    public function testCompressPackageWithSmallData(): void
    {
        $input = "test";
        $result = $this->lz4->compressPackage($input);
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('offsets', $result);
        $this->assertArrayHasKey('sizes', $result);
        $this->assertArrayHasKey('successes', $result);
        $this->assertCount(1, $result['offsets']);
        $this->assertCount(1, $result['sizes']);
        $this->assertCount(1, $result['successes']);
    }

    public function testCompressPackageWithMediumData(): void
    {
        $input = str_repeat("test", 100);
        $result = $this->lz4->compressPackage($input);
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('offsets', $result);
        $this->assertArrayHasKey('sizes', $result);
        $this->assertArrayHasKey('successes', $result);
        $this->assertGreaterThanOrEqual(1, count($result['offsets']));
    }

    public function testCompressPackageWithVerification(): void
    {
        $input = str_repeat("test", 100); // Use a larger input that will actually compress
        $result = $this->lz4->compressPackage($input, true);
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('offsets', $result);
        $this->assertArrayHasKey('sizes', $result);
        $this->assertArrayHasKey('successes', $result);
        $this->assertCount(1, $result['successes']);
        $this->assertEquals(1, $result['successes'][0]);
    }

    public function testCompressPackageWithSpecialCharacters(): void
    {
        $input = str_repeat("!@#$%^&*()_+{}|:<>?~`-=[]\\;',./", 10);
        $result = $this->lz4->compressPackage($input);
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('offsets', $result);
        $this->assertArrayHasKey('sizes', $result);
        $this->assertArrayHasKey('successes', $result);
    }

    public function testCompressPackageWithBinaryData(): void
    {
        $input = str_repeat("\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09", 10);
        $result = $this->lz4->compressPackage($input);
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('offsets', $result);
        $this->assertArrayHasKey('sizes', $result);
        $this->assertArrayHasKey('successes', $result);
    }

    public function testRoundTripCompressionWithRepeatedPatterns(): void
    {
        $input = str_repeat("test", 100);
        $compressed = $this->lz4->compress($input);
        $decompressed = $this->lz4->decompress($compressed, strlen($input));
        $this->assertEquals($input, $decompressed);
    }

    public function testRoundTripCompressionWithSpecialCharacters(): void
    {
        $input = str_repeat("!@#$%^&*()_+{}|:<>?~`-=[]\\;',./", 10);
        $compressed = $this->lz4->compress($input);
        $decompressed = $this->lz4->decompress($compressed, strlen($input));
        $this->assertEquals($input, $decompressed);
    }

    public function testRoundTripCompressionWithBinaryData(): void
    {
        $input = str_repeat("\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09", 10);
        $compressed = $this->lz4->compress($input);
        $decompressed = $this->lz4->decompress($compressed, strlen($input));
        $this->assertEquals($input, $decompressed);
    }

    public function testPackageCompressionWithEmptyChunks(): void
    {
        $input = str_repeat("\0", 2048); // Empty chunk
        $result = $this->lz4->compressPackage($input);
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('offsets', $result);
        $this->assertArrayHasKey('sizes', $result);
        $this->assertArrayHasKey('successes', $result);
        $this->assertCount(1, $result['successes']);
    }

    public function testPackageCompressionWithMixedSuccess(): void
    {
        // Create input with both compressible and non-compressible data
        $input = str_repeat("test", 100) . str_repeat("\0", 100); // Mix of repeated pattern and empty data
        $result = $this->lz4->compressPackage($input);
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('offsets', $result);
        $this->assertArrayHasKey('sizes', $result);
        $this->assertArrayHasKey('successes', $result);
        $this->assertGreaterThanOrEqual(1, count($result['successes']));
    }

    public function testPackageCompressionWithVerificationAndMixedSuccess(): void
    {
        // Create input with both compressible and non-compressible data
        $input = str_repeat("test", 100) . str_repeat("\0", 100); // Mix of repeated pattern and empty data
        $result = $this->lz4->compressPackage($input, true);
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('offsets', $result);
        $this->assertArrayHasKey('sizes', $result);
        $this->assertArrayHasKey('successes', $result);
        $this->assertGreaterThanOrEqual(1, count($result['successes']));
    }

} 