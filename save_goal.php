<?php
	$date = date("Y-m-d H:i:s");
	
  $version = $_POST["version"];
	$first = $_POST["first"];
	$last = $_POST["last"];
	$main = $_POST["main"];
	$side = $_POST["side"];
	$swipe = $_POST["swipe"];

	$ip = $_SERVER["REMOTE_ADDR"];
  $browser = $_SERVER["HTTP_USER_AGENT"];

	$s = "$date,$version,$first,$last,$main,$side,$swipe,$ip,$browser\r\n";
	file_put_contents("stats.csv", $s, FILE_APPEND);
?>
