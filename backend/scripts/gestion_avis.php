<?php
    ini_set('session.gc_maxlifetime', 3600);
    session_start();
    
    require 'DbConnect.php';
    require_once 'ApiHelper.php';

    $objDb = new DbConnect();
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    $requestUri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
    $recipeId = isset($requestUri[2]) ? intval($requestUri[2]) : null;

    switch ($method) {
        case "GET":
            handleGetAvis($conn, $recipeId);
            break;

        case "POST":
            handlePostAvis($conn);
            break;

        default:
            sendResponse(405, ['error' => 'Method Not Allowed']);
    }

    function handleGetAvis($conn, $recipeId) {
        try {
            if (!$recipeId) {
                sendResponse(400, ['error' => 'Missing recipe ID']);
                return;
            }
    
            // SQL query to fetch all Avis for a specific recipe
            $sql = "SELECT nom_personne, date, note, commentaire, id_recette 
                    FROM avis 
                    WHERE id_recette = :id_recette";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id_recette', $recipeId, PDO::PARAM_INT);
            $stmt->execute();
    
            // Fetch results
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            // Send data as a JSON response
            sendResponse(200, $data);
            
        } catch (Exception $e) {
            // Handle errors
            sendResponse(500, ['error' => $e->getMessage()]);
        }
    }    

    function handlePostAvis($conn) {
        $data = json_decode(file_get_contents('php://input'), true);

        if ($data) {
            $sql = "INSERT INTO avis (date, nom_personne, note, commentaire, id_recette) VALUES (:date, :nom_personne, :note, :commentaire, :id_recette)";

            $nom_personne = $data['nomPersonne'];
            $currentDate = date('Y-m-d H:i:s');
            $note = $data['note'];
            $commentaire = $data['commentaire'];
            $id_recette = $data['rectteId'];

            $stmt = $conn->prepare($sql);
            $result = $stmt->execute([
                ':nom_personne' => $nom_personne,
                ':date' => $currentDate,
                ':note' => $note,
                ':commentaire' => $commentaire,
                ':id_recette' => $id_recette
            ]);
    
            if ($result) {
                sendResponse(201, ['message' => 'Avis created successfully']);
            } else {
                sendResponse(500, ['error' => 'Failed to create avis']);
            }
        } else {
            sendResponse(400, ['error' => 'Invalid input data']);
        }
    }
?>
