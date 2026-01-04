<?php

namespace Syntaxx\PHPX\Framework\Reconciler;

/**
 * Decides whether a VNode type is a custom component (resolvable to a callable)
 * or a plain host element, and resolves the callable.
 *
 * Resolution order is preserved from the original Runtime so existing apps keep
 * working unchanged:
 *   1. explicit registry (Runtime::registerComponent)
 *   2. the \Syntaxx\PHPX\Demo\{Name} namespace (the demo/app convention)
 *   3. a global function of that name
 * A type that matches a known HTML tag is always treated as a host element,
 * even if a same-named function exists.
 */
final class ComponentResolver
{
    /** @var array<string,callable> */
    private static array $registry = [];

    private const HTML_ELEMENTS = [
        'html', 'head', 'body', 'header', 'footer', 'main', 'nav', 'section',
        'article', 'aside', 'time', 'button', 'input', 'textarea', 'select',
        'option', 'label', 'form', 'fieldset', 'legend', 'div', 'span', 'a',
        'p', 'pre', 'code', 'blockquote', 'hr', 'br', 'strong', 'em', 'b', 'i',
        'u', 's', 'mark', 'small', 'sub', 'sup', 'h1', 'h2', 'h3', 'h4', 'h5',
        'h6', 'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'table', 'thead', 'tbody',
        'tfoot', 'tr', 'td', 'th', 'caption', 'col', 'colgroup', 'img', 'figure',
        'figcaption', 'picture', 'source', 'video', 'audio', 'track', 'canvas',
        'svg', 'path', 'g', 'circle', 'rect', 'line', 'polyline', 'polygon',
        'ellipse', 'text', 'iframe', 'details', 'summary', 'dialog', 'menu',
        'template', 'slot', 'style', 'script', 'link', 'meta', 'title',
    ];

    public static function register(string $name, callable $component): void
    {
        self::$registry[$name] = $component;
    }

    public static function reset(): void
    {
        self::$registry = [];
    }

    public static function isHtmlElement(string $type): bool
    {
        return in_array(strtolower($type), self::HTML_ELEMENTS, true);
    }

    /**
     * @return callable|null the component callable, or null if $type is a host element
     */
    public static function resolve(string $type): ?callable
    {
        if (isset(self::$registry[$type])) {
            return self::$registry[$type];
        }

        if (self::isHtmlElement($type)) {
            return null;
        }

        $demo = "\\Syntaxx\\PHPX\\Demo\\{$type}";
        if (function_exists($demo)) {
            return $demo;
        }

        if (function_exists($type)) {
            return $type;
        }

        return null;
    }
}
