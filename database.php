<?php
/**
 * Created by PhpStorm.
 * User: Dan
 * Date: 13-Jan-19
 * Time: 2:33 PM
 */


// connect to the database
global $db;
$db= mysqli_connect('localhost', 'root', '', 'exam');
// check connection
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
//print_r($db);

?>