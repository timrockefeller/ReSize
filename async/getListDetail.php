<?php
error_reporting(0);
include "DBSetting/DB_Sorces.php";
//$obj = new stdClass();
$result = $DB_conn->query("SELECT * FROM ListIo WHERE ListId='$_GET[ListId]'");
//while($row = mysql_fetch_array($result)){
//    $obj->ListId        = $row["ListId"];
//    $obj->title         = $row["title"];
//    $obj->Tasks         = $row["Tasks"];
//};
//echo (json_encode($obj));
if($result) echo ("1"); else echo ("0");
?>