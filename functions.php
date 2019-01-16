<?php
/**
 * Created by PhpStorm.
 * User: Dan
 * Date: 16-Jan-19
 * Time: 8:17 AM
 */


function get_all_products(){
    global $db;
    $stmt = $db->prepare("Select * from produse");
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result;
}

function delete_product_by_id($id) {
    global $db;
    $stmt = $db->prepare("DELETE FROM produse WHERE id=?;");
    if ($stmt) {
        $stmt->bind_param("i", $id);
    } else {
        var_dump($db->error);
        return false;
    }


    $stmt->execute();
    $stmt->close();
    return true;
}