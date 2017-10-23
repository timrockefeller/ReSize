<?php

error_reporting(0);
include "DBSetting/DB_Sorces.php";
$returns = array();
$result = mysql_query("SELECT * FROM ListIo");
while($row = mysql_fetch_array($result)){
    $obj = new stdClass();
    $obj->ListId        = $row["ListId"];
    $obj->title         = $row["title"];
    $obj->Tasks         = $row["Tasks"];
    Array_push($returns,$obj);    
};
echo (json_encode($returns));
?>