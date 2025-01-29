<?php
    ini_set('session.gc_maxlifetime', 3600);
    session_set_cookie_params([
        'lifetime' => 3600,  // Set the cookie expiration time
        'path' => '/',  // Path where the cookie is available
        'domain' => 'localhost',  // Your domain
        'secure' => isset($_SERVER['HTTPS']),  // Use secure cookies if HTTPS is enabled
        'httponly' => false,  // Prevent JavaScript access to the cookie
    ]);
    
    session_start();

    header('Content-Type: application/json');

    require 'DbConnect.php';
    require_once 'ApiHelper.php';

    $objDb = new DbConnect();
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "POST":
            handleLogin($conn);
            break;

        default:
            sendResponse(405, ['message' => 'Method Not Allowed']);
    }

    function handleLogin($conn) {
        $input = json_decode(file_get_contents('php://input'));

        // Validate input
        validateInput($input, ['username', 'password']);

        $username = $input->username;
        $password = $input->password;

        // Replace with your actual user validation logic
        $validUsername = "admin";
        $validPassword = "password123";

        if ($username === $validUsername && $password === $validPassword) {
            $_SESSION['logged_in'] = true;

            sendResponse(200, ['message' => 'Login successful']);
        } else {
            sendResponse(401, ["error" => "Nom d'utilisateur ou mot de passe erroné"]);
        }
    }

?>