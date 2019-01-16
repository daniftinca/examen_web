<?php
/**
 * Created by PhpStorm.
 * User: Dan
 * Date: 16-Jan-19
 * Time: 8:46 AM
 */

include "database.php";
include "functions.php";

global  $db;

if(isset($_POST['ajax_action']) && !empty($_POST['ajax_action'])) {
    $action = $_POST['ajax_action'];
    switch ($action){
        case 'get_products':
            $res = get_all_products();

            while($row = $res->fetch_row()) {
                $rows[]=$row;
            }
            try {
                echo json_encode(array(
                    'success' => true,
                    'products'  => json_encode($rows),
                ));
            } catch (Exception $ex){
                echo json_encode(array(
                    'success' => false,
                    'reason'  => $ex->getMessage(),
                ));
            }
            break;
        case 'delete_products':
            try {
                $ids = $_POST['params'];
                $broken=false;
                foreach ($ids as $id){
                    if (!delete_product_by_id( $id)) {
                        echo json_encode(array(
                            'success' => false,
                            'reason'  => "Unknown error.",
                        ));
                        $broken = true;
                        break;
                    }
                }
                if(!$broken){
                    $res = get_all_products();

                    while($row = $res->fetch_row()) {
                        $rows[]=$row;
                    }

                    echo json_encode(array(
                        'success' => true,
                        'products'  => json_encode($rows),
                    ));
                }


            } catch (Exception $ex){
                echo json_encode(array(
                    'success' => false,
                    'reason'  => $ex->getMessage(),
                ));
            }
            break;

    }
}