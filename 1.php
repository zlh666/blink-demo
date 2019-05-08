<?php

// $balls = [0,1,2,3,4,5,6,7,8,9,10];
//打乱后取前五个
// shuffle($balls);
// $out = array_slice($balls,0,5);
// print_r($out);

//随机取5个
// $out_ = array_rand($balls,5);
// print_r($out_);

$url = "http://passport.wenduedu.com/User/GetUserByInstanceId?instanceid=24zelekcmau14gzn3pnqttiikbc1d36258d82c45c884ae5f589ce294f4";
$res = file_get_contents($url);
print_r($res);