<?php
error_reporting(0);
include "DBSetting/DB_Sorces.php";
include "function/uniqid.php";


$result = mysql_query("SELECT * FROM ListIo WHERE ListId='$_POST[ListId]'");
$row = mysql_fetch_array($result, $DB_conn);  

if (mysql_num_rows($result)) {
    mysql_query("UPDATE ListIo SET title = '$_POST[title]'  WHERE ListId='$_POST[ListId]'");
    mysql_query("UPDATE ListIo SET Tasks = '$_POST[Tasks]'  WHERE ListId='$_POST[ListId]'");
} else {
    $uniqListId = create_guid();
    mysql_query("INSERT INTO ListIo 
    (ListId, title, Tasks) VALUES
    ('$uniqListId', '$_POST[title]', '$_POST[Tasks]')");
}
?>