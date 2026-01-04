<?php

namespace Syntaxx\PHPX\Framework;

class Document {
    private static $instance = null;
    private $document;

    private function __construct() {
        $window = new \Vrzno;
        $this->document = $window->document;
    }

    public static function document(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getElementById(string $id) {
        return $this->document->getElementById($id);
    }

    public function createElement(string $tagName) {
        return $this->document->createElement($tagName);
    }

    public function createTextNode(string $text) {
        return $this->document->createTextNode($text);
    }

    public function querySelector(string $selector) {
        return $this->document->querySelector($selector);
    }

    public function addEventListener(string $event, callable $listener) {
        $this->document->addEventListener($event, $listener);
    }

    public function querySelectorAll(string $selector) {
        return $this->document->querySelectorAll($selector);
    }
}
