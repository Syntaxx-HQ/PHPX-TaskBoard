<?php
use Syntaxx\PHPX\Framework\Component;
require_once "Components/Board.php";
function App()
{
    return Component::create("Board", [], []);
}