<?php
error_reporting(0);
include "DBSetting/DB_Sorces.php";
include "function/uniqid.php";


$result = $DB_conn->query("SELECT * FROM ListIo WHERE ListId='$_POST[ListId]'");
$row = mysqli_fetch_assoc($result);

if (mysqli_num_rows($result)) {
    $DB_conn->query("UPDATE ListIo SET title = '$_POST[title]'  WHERE ListId='$_POST[ListId]'");
    $DB_conn->query("UPDATE ListIo SET Tasks = '$_POST[Tasks]'  WHERE ListId='$_POST[ListId]'");
} else {
    $uniqListId = create_guid();
    $DB_conn->query("INSERT INTO ListIo 
    (ListId, title, Tasks) VALUES
    ('$uniqListId', '$_POST[title]', '$_POST[Tasks]')");
}
?>