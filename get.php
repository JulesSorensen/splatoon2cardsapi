<?php

header("Content-type: application/json");

$file_name = "data.json";
$champions = [];
if (file_exists($file_name)) {
    $champions = json_decode(file_get_contents($file_name), true);
}

echo json_encode($champions, JSON_PRETTY_PRINT);