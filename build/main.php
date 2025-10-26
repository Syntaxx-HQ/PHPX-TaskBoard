<?php
require_once "App.php";
use Syntaxx\PHPX\Framework\Component;
use Syntaxx\PHPX\Framework\Runtime;
use Vrzno;
function createRoot($root)
{
    return Runtime::createRoot($root);
}
// Load all component files first
require_once "Components/Board.php";
require_once "Components/Column.php";
require_once "Components/Card.php";
// Using VRZNO to access JavaScript DOM
$window = new Vrzno();
$document = $window->document;
$root = $document->getElementById("app");
// PHPX equivalent of: createRoot(document.getElementById("app")!).render(<App />);
createRoot($root)->render(Component::create("App", [], []));