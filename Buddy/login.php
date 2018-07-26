<?php
  require_once("mysql_config.php");
  $conn = new mysqli($mysql['host'], $mysql['user'], $mysql['pass'], $mysql['db']);

	if ($conn === null) {

		echo json_encode('FAIELD');

		return false;

	}


  $json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	$email = $obj['email'];

	$password = $obj['password'];


	if($obj['email']!=""){

	$result= $conn->query("SELECT * FROM user_info where EMAIL='$email' and PWD_HASH='$password'");

		if($result->num_rows==0){
			echo json_encode('Wrong Details');
		}
		else{
		echo json_encode('ok');
		}
	}
	else{
	  echo json_encode('try again');
	}
?>
