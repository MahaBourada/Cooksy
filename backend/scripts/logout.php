<?php
    ini_set('session.gc_maxlifetime', 3600);
    session_start();

    header('Content-Type: application/json');

    require 'DbConnect.php';
    require_once 'ApiHelper.php';

    $objDb = new DbConnect();
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "POST":
            handleLogout();
            break;

        default:
            sendResponse(405, ['message' => 'Method Not Allowed']);
    }

    function handleLogout() {
        // Destroy the session and clear session data
        session_unset(); // Clear session data
        session_destroy(); // Destroy the session

        /* if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        } */
        // Clear the PHPSESSID cookie
        setcookie(session_name(), '', time() - 3600, '/'); 
    
        // Respond with a success message
        sendResponse(200, ['message' => 'Logout successful']);
    }
?>