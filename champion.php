<?php

header("Content-type: application/json");
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
    ],
    "img" => "https://static.wikia.nocookie.net/leagueoflegends/images/d/d6/Teemo_Render.png"
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
    ],
    "img" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQzBa-8dKXAZSs86i--f1Kc5h928BZWDV0xg&usqp=CAU"
];
$lulu = [
    "name" => "lulu",
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
    ],
    "img" => "https://i.pinimg.com/originals/94/53/ac/9453ac0d7f0390566c865854ffb32b0b.png"
];
$warwick = [
    "name" => "warwick",
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
    ],
    "img" => "https://static.wikia.nocookie.net/leagueoflegends/images/3/3a/Warwick_Render.png"
];
$garen = [
    "name" => "garen",
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
    ],
    "img" => "https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt804eabffbf15dc51/5f4defe95acde4265bb2da77/Champion_garen_HP.png"
];

echo json_encode([$teemo,$jinx,$lulu,$warwick,$garen], JSON_PRETTY_PRINT);