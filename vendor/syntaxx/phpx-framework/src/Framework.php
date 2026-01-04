<?php

namespace Syntaxx\PHPX\Framework;

class Framework
{
    private static array $states = [];
    private static int $stateIndex = 0;
    private static array $components = [];

    public static function useState($initialValue): array
    {
        $currentIndex = self::$stateIndex;
        
        if (!isset(self::$states[$currentIndex])) {
            self::$states[$currentIndex] = $initialValue;
        }

        $state = self::$states[$currentIndex];
        $setState = function($newValue) use ($currentIndex) {
            self::$states[$currentIndex] = $newValue;
            self::render();
        };

        self::$stateIndex++;
        return [$state, $setState];
    }

    public static function registerComponent(string $name, callable $component): void
    {
        if (isset(self::$components[$name])) {
            throw new \RuntimeException("Component {$name} is already registered");
        }
        self::$components[$name] = $component;
    }

    public static function renderComponent(string $name, array $props = []): string
    {
        if (!isset(self::$components[$name])) {
            throw new \RuntimeException("Component {$name} not found. Did you forget to register it?");
        }

        try {
            $component = self::$components[$name];
            return $component($props);
        } catch (\Exception $e) {
            error_log("Error rendering component {$name}: " . $e->getMessage());
            return "<div class='error'>Error rendering component {$name}</div>";
        }
    }

    public static function render(): void
    {
        if (!isset(self::$components['App'])) {
            throw new \RuntimeException("App component not found. Please register an App component.");
        }

        self::$stateIndex = 0;
        try {
            $output = self::renderComponent('App');
            echo $output;
        } catch (\Exception $e) {
            error_log("Error during render: " . $e->getMessage());
            echo "<div class='error'>Error during render</div>";
        }
    }

    public static function init(): void
    {
        try {
            // Register VRZNO event handlers
            echo '<script src="https://vrzno.js"></script>';
            echo '<script>
                window.vrzno = new VRZNO();
                window.vrzno.on("event", function(event) {
                    try {
                        // Handle events from PHP components
                        console.log("Event received:", event);
                    } catch (e) {
                        console.error("Error handling event:", e);
                    }
                });
            </script>';
        } catch (\Exception $e) {
            error_log("Error during framework initialization: " . $e->getMessage());
        }
    }
} 