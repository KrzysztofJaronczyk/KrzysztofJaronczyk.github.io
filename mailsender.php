<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get form data and validate
  $name = test_input($_POST["name"]);
  $email = test_input($_POST["email"]);
  $subject = test_input($_POST["subject"]);
  $message = test_input($_POST["message"]);
  if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo "Please fill in all fields.";
    exit;
  }
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Invalid email format.";
    exit;
  }

  // Compose email message
  $to = "youremail@example.com";
  $headers = "From: $name <$email>\r\n";
  $headers .= "Reply-To: $email\r\n";
  $body = "Name: $name\n\nEmail: $email\n\nSubject: $subject\n\nMessage:\n$message";

  // Send email
  if (mail($to, $subject, $body, $headers)) {
    echo "Thank you for your message!";
  } else {
    http_response_code(500);
    echo "Oops! Something went wrong and we couldn't send your message.";
  }
} else {
  http_response_code(405);
  echo "Method Not Allowed";
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
