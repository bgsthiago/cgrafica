<?php $con = pg_connect("host=$this->_host dbname=$this->_database port=5432 user=$this->_username password=$this->_password sslmode=require")
				or die("Could not connect to server\n");
				if($con){
					echo "Deu bom";
				}else{
					echo "Deu Ruim";
				}
?>