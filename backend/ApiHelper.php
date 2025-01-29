<?php
    function sendResponse($statusCode, $data) {
        http_response_code($statusCode);
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode($data);
        exit;
    }

    function validateInput($input, $requiredFields) {
        foreach ($requiredFields as $field) {
            if (!isset($input->$field)) {
                sendResponse(400, ['error' => "Missing required field: $field"]);
            }
        }
    }
?>