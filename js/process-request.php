<?php

if ($_POST) {

    $to = $_POST("phoneNumber") . "@txt.att.net";
    $message = "Download Dreamkeep here!";
    $from = "DreamKeep Inc";

    if (mail($to, "", $message, $from) {
        echo "success";
    } else {
        echo "failure";
    }


} else {
    echo "failure";
}