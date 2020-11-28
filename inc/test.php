<?php
require_once "Mail.php";

$from = "Sandra Sender <contact@saurabhkumar.xyz>";
$to = "Ramona Recipient <jsaurabh2794@gmail.com>";
$subject = "Hi!";
$body = "Hi,\n\nHow are you?";

$host = "cpanel.freehosting.com";
$username = "contact@saurabhkumar.xyz";
$password = "30316322";

$headers = array ('From' => $from,
  'To' => $to,
  'Subject' => $subject);

$smtp = Mail::factory('smtp',
  array ('host' => $host,
    'auth' => true,
    'username' => $username,
    'password' => $password));

$mail = $smtp->send($to, $headers, $body);

if (!$mail) {
  echo("<p>" . $mail->getMessage() . "</p>");
 } else {
  echo("<p>Message successfully sent!</p>");
 }
?>