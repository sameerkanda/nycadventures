<?php
session_start();
require_once 'parse/parse.php';

parse_str(file_get_contents("https://graph.facebook.com/oauth/access_token?client_id=412393118862360&redirect_uri=".urlencode("http://localhost/facebook_callback.php")."&client_secret=49886a2063feb3683787dc2277b45ef9&code=".$_GET['code']), $str_parsed);
$access_token = $str_parsed['access_token'];
$user_info = json_decode(file_get_contents("https://graph.facebook.com/me?access_token=$access_token"), true);

$_SESSION['name'] = $user_info['name'];
$_SESSION['picture'] = "https://graph.facebook.com/{$user_info['id']}/picture";
$_SESSION['access_token'] = $str_parsed['access_token'];
$_SESSION['id'] = $user_info['id'];

$parse = new parseObject('user');
$parse->name = $_SESSION['name'];
$parse->access_token = $_SESSION['access_token'];
$parse->fb_id = $user_info['id'];
$parse->save();

header('Location: /ios/www#?name='.urlencode($_SESSION['name']).'&picture='.urlencode($_SESSION['picture']).'&access_token='.urlencode($_SESSION['access_token']));
