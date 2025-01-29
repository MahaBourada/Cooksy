<?php
    require_once 'ApiHelper.php';
    header("Access-Control-Allow-Origin: http://localhost:5173"); 
    header("Access-Control-Allow-Credentials: true");  
    header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS"); 
    header('Access-Control-Allow-Headers: Content-Type, X-XSRF-TOKEN, Authorization');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    $uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
    $resource = $uri[1] ?? ''; // The resource being requested (e.g., recettes, categories, etiquettes)

    // Log the request URI and resource
    error_log("Request URI: " . $_SERVER['REQUEST_URI']);
    error_log("Resource: " . $resource);

    switch ($resource) {
        case 'recettes':
            require 'scripts/gestion_recettes.php';
            break;
        case 'categories':
            require 'scripts/gestion_categories.php';
            break;
        case 'etiquettes':
            require 'scripts/gestion_etiquettes.php';
            break;
        case 'avis':
            require 'scripts/gestion_avis.php';
            break;
        case 'login':
            require 'scripts/login.php';
            break;
        case 'logout':
            require 'scripts/logout.php';
            break;
        default:
            sendResponse(404, ['error' => 'Resource not found']);
    }
?>