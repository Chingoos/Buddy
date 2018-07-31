<?php
  require_once("mysql_config.php");
  $conn = new mysqli($mysql['host'], $mysql['user'], $mysql['pass'], $mysql['db']);
	$json = file_get_contents('php://input');

	 // decoding the received JSON and store into $obj variable.
	 $obj = json_decode($json,true);

	 // name store into $name.
	$name = $obj['name'];

	// same with $email.
	$email = $obj['email'];

	// same with $password.
	$password = $obj['password'];

	if($obj['email']!="")
	{

	$result= $conn->query("SELECT * FROM user_info where EMAIL='$email'");


		if($result->num_rows>0){
			echo json_encode('email already exist');  // alert msg in react native
		}
		else
		{
		   $add = $conn->query("insert into user_info (USERNAME,EMAIL,PWD_HASH) values('$name','$email','$password')");

			if($add){
				echo  json_encode('User Registered Successfully'); // alert msg in react native
			}
			else{
			   echo json_encode('check internet connection'); // our query fail
			}

		}
	}

	else{
	  echo json_encode('try again');
	}

?>
