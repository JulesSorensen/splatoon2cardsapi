<?php

$teemo = [
    "name" => "teemo",
    "alive" => true,
    "skills" => array("blidingArrow","sprint"),
    "passive-skills" => array("stealth"),
    "base-stats" => [
        "hp" => 560,
        "mp" => 100,
        "atq" => 20
    ],
    "current-stats" => [
        "hp" => 1000,
        "mp" => 3000
    ]
];
$jinx = [
    "name" => "jinx",
    "alive" => true,
    "skills" => array("blidingArrow","sprint"),
    "passive-skills" => array("stealth"),
    "base-stats" => [
        "hp" => 560,
        "mp" => 100,
        "atq" => 20
    ],
    "current-stats" => [
        "hp" => 1000,
        "mp" => 3000
    ]
];

$obj = (json_encode([ $teemo, $jinx ], JSON_PRETTY_PRINT));
print_r($obj);

?>