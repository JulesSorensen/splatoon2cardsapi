<?php

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input');
$specie = json_decode($inputJSON, TRUE);
if (!array_key_exists("id",$specie)) {
    http_response_code(409);
    exit;
}
$file_name = "data.json";
$data = [];
if (file_exists($file_name)) {
    $data = json_decode(file_get_contents($file_name), true);
}

$index = 0;
foreach($data as $key => $value){
    if($specie["id"] == $value["id"]){
        foreach ($specie as $key2 => $value2){
            if($value !== $value["id"]){
                $data[$key][$key2] = $specie[$key2];
            }
        }
    }
    $index++;
}

file_put_contents($file_name, json_encode($data));
echo json_encode($data, JSON_PRETTY_PRINT);