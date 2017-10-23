<?php
/*
This page is a storage for any arguements used for getting sorces from mysql
The program will run automaticlly, if you want change configrations, please
edit them in "re_config.php"
*/
include "DB_Config.php";//!important
// MySql Connection
$DB_conn = mysql_connect($CONFIG_HOST,$CONFIG_USERNAME,$CONFIG_PASSWORD);
//insert List
mysql_select_db($CONFIG_DATABASE, $DB_conn);
?>