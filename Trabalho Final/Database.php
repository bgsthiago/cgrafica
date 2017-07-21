<?php
/*
* Mysql database class - only one connection alowed
*/
class Database {
	private $_connection;
	private static $_instance = null; //The single instance
	private $_host = "ec2-54-225-134-223.compute-1.amazonaws.com";
	private $_username = "pjxwrvdatidohh";
	private $_password = "MSCLcNHA42wu3VTUgvqg_dRyqH";
	private $_database = "dgkkqbc32nlvm";

	/*
	Get an instance of the Database
	@return Instance
	*/
	public static function getInstance() {
        if ($instance === null) {
            $instance = new Database();
        }
        return $instance;
	}

	// Constructor
	private function __construct() {
		$this->_connection = pg_connect("host=$this->_host dbname=$this->_database port=5432 user=$this->_username password=$this->_password sslmode=require")
				or die("Could not connect to server\n");
	
	}

	// Magic method clone is empty to prevent duplication of connection
	private function __clone() { }

	// Get mysqli connection
	public function getConnection() {
		return $this->_connection;
	}
}
?>