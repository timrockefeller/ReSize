<?php
//error_reporting(0);
include "DBSetting/DB_Sorces.php";

//$result = mysql_query("SELECT * FROM ListIo WHERE ListId='$_GET[ListId]'");
//$row = mysql_fetch_array($result, $DB_conn);  

mysql_query("DELETE FROM ListIo WHERE ListId='$_GET[ListId]'");

?>