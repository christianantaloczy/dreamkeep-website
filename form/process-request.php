<?php

// this line loads the library 
require('../lib/twilio/Services/Twilio.php'); 

if ($_POST) {
    $account_sid = 'AC59c9c57a2c44fb33bbb2e113bea59ab4'; 
    $auth_token = 'c15741858aca81cea8a70c13f85ff226'; 
    $client = new Services_Twilio($account_sid, $auth_token); 

    $sms = $client->account->messages->sendMessage(
        "415-301-6065", 
        "+1".$_POST["phoneNumber"],
        "Download DreamKeep from the app store! http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=300136119&mt=8"
    );

    echo "success";
} else {
    echo "failure";
}