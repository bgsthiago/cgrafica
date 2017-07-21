<?php
require_once 'Database.php';
session_start();
error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post){
	$nome = $_POST["nome"];
	$score = $_POST["score"];
	$_host = "ec2-54-225-134-223.compute-1.amazonaws.com";
	$_username = "pjxwrvdatidohh";
	$_password = "MSCLcNHA42wu3VTUgvqg_dRyqH";
	$_database = "dgkkqbc32nlvm";

	//conecta com o BD
    $con = pg_connect("host=$_host dbname=$_database port=5432 user=$_username password=$_password sslmode=require")
				or die("Could not connect to server\n");


    if($con){
    	$consulta = "INSERT INTO score VALUES('$nome',$score)";
    	pg_query($con, $consulta) or die("Cannot execute query: $consulta\n"); 
    }else{
    	echo $con;
    }

    echo $nome;
} 
?>