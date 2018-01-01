<?php

error_reporting(0);
include "DBSetting/DB_Sorces.php";
$returns = array();
$result = $DB_conn->query("SELECT * FROM ListIo");
while($row = $result->fetch_assoc()){
    $obj = new stdClass();
    $obj->ListId        = $row["ListId"];
    $obj->title         = $row["title"];
    $obj->Tasks         = $row["Tasks"];
    Array_push($returns,$obj);    
};
echo (json_encode($returns));
?>