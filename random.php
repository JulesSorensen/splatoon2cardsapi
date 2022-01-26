<?php

header("Content-type: application/json");
$tab = array();
for($i = 1; $i <= 10; $i++) {
    array_push($tab, rand(10,50));
}

print_r(json_encode($tab, JSON_PRETTY_PRINT));