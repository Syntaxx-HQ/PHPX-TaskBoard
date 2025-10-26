<?php

declare(strict_types=1);

// WASM bootstrap file for TaskBoard Pro

// Initialize PHPX Framework
require_once __DIR__ . '/vendor/autoload.php';

// Set error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Set default timezone
date_default_timezone_set('UTC');

// Bootstrap message for debugging
echo "<!-- TaskBoard Pro Bootstrap Initialized -->\n";

// Load main application entry point (use compiled PHP, not PHPX)
require_once __DIR__ . '/src/main.php';