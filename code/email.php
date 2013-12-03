<!DOCTYPE html>

<?php
if(isset($_POST['email'])) {
     
    $email_to = "sven@umber.me";
    $email_subject = "Contact Form TDT";
     
     
    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        die();
    }
     
    // validation expected data exists
    if(!isset($_POST['name']) ||
        !isset($_POST['text']) ||
        !isset($_POST['email'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
    }
     
    $first_name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
    $comments = $_POST['text']; // required
     
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The email address you entered does not appear to be valid.<br />';
  }
    $string_exp = "/^[A-Za-z .'-]+$/";
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'The name you entered does not appear to be valid.<br />';
  }
  if(strlen($comments) < 0) {
    $error_message .= 'The text you entered do not appear to be valid.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = "Form details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    } 
     
    $email_message .= "Name: ".clean_string($first_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Text: ".clean_string($comments)."\n";
     
     
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);      
}

?>
 
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>The DataTank - New Version - Professional Support</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/stylesheet.css">

	<link rel="shortcut icon" href="images/favicon.ico">
	<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
	<link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
    
    <link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.pack.js"></script>
    
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
</head>
<body>
    <div class="container">
        <div id="header">
            <div class="overlay">
                <div class="row navoverlay">
                    <div class="col-md-7 height">
                        <img src="images/logo.png" alt="logo the datank" class="logo"/>
                        <p class="logo">The DataTank</p>
                    </div>
                    <div class="col-md-2"><p class="nav special"><a href="https://github.com/tdt/" target="_blank">Github</a></p></div>
                    <div class="col-md-2"><p class="nav"><a href="http://docs.thedatatank.com" class="border" target="_blank">Documentation</a></p></div>
                </div>
                <div class="row">
                    <div class="col-xs">
                        <p class="txt headline margin-1">We Received Your Email!</p>
                        <p class="txt tagline">Thanks, we'll be in touch as soon as possible.</p>
                        <a class="txt button transition" href="index.html">Return</a>
                        <p class="txt quote">
                            <span class="italic">“If you’re looking for an open source solution..<br/>
                            Congratulations, you’ve found it.”</span><br/>
                            - Wunderkraut
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>