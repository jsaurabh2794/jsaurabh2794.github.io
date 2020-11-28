<?php
require_once "Mail.php";
$siteOwnersEmail = 'jsaurabh2794@gmail.com';
$website_mail='contact@saurabhkumar.xyz';

if($_POST) {
   
   $name = trim(stripslashes($_POST['contactName']));
   $email = trim(stripslashes($_POST['contactEmail']));
   $subject = trim(stripslashes($_POST['contactSubject']));
   $contact_message = trim(stripslashes($_POST['contactMessage']));

   $host = "cpanel.freehosting.com";
   $username = "contact@saurabhkumar.xyz";
   $password = "30316322";

   $error="";

   // Check Email
  if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
    $error['email'] = "Please enter a valid email address.";
  }

  /*
   // Check Name
	if (strlen($name) < 2) {
		$error['name'] = "Please enter your name.";
	}
	
	
  // Check Message
	if (strlen($contact_message) < 15) {
		$error['mess'] = "Please enter your message. It should have at least 15 characters.";
	}*/

	
   if ($subject == '') { $subject = "Contact Form Submission"; }

   $message  = "Email from: " . $name . "\n\n";
   $message .= "Email address: " . $email . "\n\n";
   $message .= "Message: \n";
   $message .= $contact_message;
   $message .= "\n ----- \n This email was sent from your site's contact form. \n";

  /*// Set From: header
   $from =  $name. " <" . $website_mail . ">";

   // Email Headers
	$headers = "From: " . $from . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
 	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
*/
  
  $headers = array 
  (
  'From' => $website_mail,
  'To' => $siteOwnersEmail,
  'Subject' => $subject,
  'Content-Type:text/html;charset=UTF-8'
  
  );

  $smtp = Mail::factory('smtp',
    array ('host' => $host,
    'auth' => true,
    'username' => $username,
    'password' => $password));

    if (!$error='') {
       //$m = mail($siteOwnersEmail, $subject, $message, $headers);
        $mail = $smtp->send($siteOwnersEmail, $headers, $message);
         if ($mail)
          { 
          	echo "OK";
          }
         else 
         	{ 
         		echo "Something went wrong. Please try again."; 
         	}
		
	} # end if - no validation error

	else {

		$response="Something error occured...Please try again later.";
		echo $response;

	} # end if - there was a validation error

}

?>