<?php

// Gather form data
$nameField = $_POST['name'];
$emailField = $_POST['email'];
$contactField = $_POST['contact'];
$subjectField = $_POST['subject'];
$messageField = $_POST['message'];

// Email details
$emailSubject = 'Haris Jamsuri Website | Contact Us Form';
$webMaster = 'haris.jamsuri@gmail.com';

// Email body
$body = "
    <html>
    <head>
        <title>Contact Form Submission</title>
    </head>
    <body>
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> $nameField</p>
        <p><strong>Email:</strong> $emailField</p>
        <p><strong>Contact No.:</strong> $contactField</p>
        <p><strong>Subject:</strong> $subjectField</p>
        <p><strong>Message:</strong><br>$messageField</p>
    </body>
    </html>
";

// Email headers
$headers = "From: $emailField\r\n";
$headers .= "Reply-To: $emailField\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Send the email
$success = mail($webMaster, $emailSubject, $body, $headers);

// Result message
if ($success) {
    $message = "Thank you for your message! I will get back to you as soon as possible.";
} else {
    $message = "Oops! An error occurred while sending the message. Please try again later.";
}

// Redirect back to the website
header("refresh:2; url=http://harisjamsuri.info/index.html");
echo "<script>alert('$message');</script>";

?>
