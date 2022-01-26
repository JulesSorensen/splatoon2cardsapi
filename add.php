<?php
// ! = =
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
$specie = json_decode($inputJSON, TRUE);
if (!array_key_exists("name",$specie) || !array_key_exists("specie",$specie) || !array_key_exists("location",$specie) || !array_key_exists("age",$specie) || !array_key_exists("picture",$specie)) {
    http_response_code(409);
    exit;
}
$file_name = "data.json";
$data = [];
if (file_exists($file_name)) {
    $data = json_decode(file_get_contents($file_name), true);
}
if(empty($data)){
    $id = 1;
}else{
    $id = 1;
    foreach ($data as $key => $value) {
        if($value['id']>=$id){
            $id = $value['id']+1;
        }
    }
}
$specie['id'] = $id;
array_push($data, $specie);
file_put_contents($file_name, json_encode($data));
echo json_encode($data, JSON_PRETTY_PRINT);