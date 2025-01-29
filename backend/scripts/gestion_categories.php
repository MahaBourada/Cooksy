<?php
    require 'DbConnect.php';
    require_once 'ApiHelper.php';

    $objDb = new DbConnect();
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "GET":
            handleGetCategories($conn);
            break;

        case "POST":
            ini_set('session.gc_maxlifetime', 3600);
            session_start();

            if (!isset($_COOKIE['PHPSESSID'])) {
                http_response_code(401);
                echo json_encode(['message' => 'Unauthorized: No session found']);
                echo json_encode(['session' => $_SESSION]);
                exit;
            } else {
                if (session_id() === $_COOKIE['PHPSESSID']) {
                    $_SESSION['logged_in'] = true;  
                    
                    handlePostCategorie($conn); 
                } else {
                    http_response_code(401);
                    echo json_encode(['message' => 'Session ID mismatch']);
                    exit;
                }
            }
        break;

        case "PUT": 
            ini_set('session.gc_maxlifetime', 3600);
            session_start();

            if (!isset($_COOKIE['PHPSESSID'])) {
                http_response_code(401);
                echo json_encode(['message' => 'Unauthorized: No session found']);
                echo json_encode(['session' => $_SESSION]);
                exit;
            } else {
                if (session_id() === $_COOKIE['PHPSESSID']) {
                    $_SESSION['logged_in'] = true; 
                    
                    handleUpdateCategorie($conn);  
                } else {
                    http_response_code(401);
                    echo json_encode(['message' => 'Session ID mismatch']);
                    exit;
                }
            }
        break;

        case "DELETE": 
            ini_set('session.gc_maxlifetime', 3600);
            session_start();

            if (!isset($_COOKIE['PHPSESSID'])) {
                http_response_code(401);
                echo json_encode(['message' => 'Unauthorized: No session found']);
                echo json_encode(['session' => $_SESSION]);
                exit;
            } else {
                if (session_id() === $_COOKIE['PHPSESSID']) {
                    $_SESSION['logged_in'] = true; 
                    
                    handleDeleteCategorie($conn);  
                } else {
                    http_response_code(401);
                    echo json_encode(['message' => 'Session ID mismatch']);
                    exit;
                }
            }
        break;

        default:
            sendResponse(405, ['error' => 'Method Not Allowed']);
    }

    function handleGetCategories($conn) {
        try {
            // SQL query to fetch all categories and subcategories
            $sql = "SELECT id_categorie, nom_categorie, sous_categorie FROM categories ORDER BY nom_categorie, sous_categorie";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
    
            // Fetch results
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            // Group data by `nom_categorie`
            $grouped = [];
            foreach ($data as $row) {
                $grouped[$row['nom_categorie']][] = [
                    'id_categorie' => $row['id_categorie'],
                    'sous_categorie' => $row['sous_categorie']
                ];
            }
    
            // Send grouped data as a JSON response
            sendResponse(200, $grouped);
        } catch (Exception $e) {
            // Handle errors
            sendResponse(500, ['error' => $e->getMessage()]);
        }
    }

    function handlePostCategorie($conn) {
        $data = json_decode(file_get_contents('php://input'), true);

        if ($data) {
            $sql = "INSERT INTO categories (nom_categorie, sous_categorie) VALUES (:nom_categorie, :sous_categorie)";

            $nom_categorie = $data['nomCategorie'];
            $sous_categorie = $data['sousCategorie'];

            $stmt = $conn->prepare($sql);
            $result = $stmt->execute([
                ':nom_categorie' => $nom_categorie,
                ':sous_categorie' => $sous_categorie
            ]);
    
            if ($result) {
                sendResponse(201, ['message' => 'Catégorie crée']);
            } else {
                sendResponse(500, ['error' => 'Échec de la création']);
            }
        } else {
            sendResponse(400, ['error' => 'Données invalides']);
        }
    }

    function handleUpdateCategorie($conn) {
        $data = json_decode(file_get_contents('php://input'), true);
    
        if ($data) {
            $id_categorie = $data['id_categorie'];
            $sous_categorie = $data['sous_categorie'];
    
            // Prepare the SQL query for updating the category
            $sql = "UPDATE categories SET sous_categorie = :sous_categorie WHERE id_categorie = :id_categorie";
            $stmt = $conn->prepare($sql);
    
            $result = $stmt->execute([
                ':id_categorie' => $id_categorie,
                ':sous_categorie' => $sous_categorie
            ]);
    
            if ($result) {
                sendResponse(200, ['message' => 'Catégorie modifiée']);
            } else {
                sendResponse(500, ['error' => 'Échec de la mise à jour']);
            }
        } else {
            sendResponse(400, ['error' => 'Données invalides']);
        }
    }
    

    function handleDeleteCategorie($conn) {
        $data = json_decode(file_get_contents('php://input'), true);
    
        if ($data && isset($data['id_categorie'])) {
            $id_categorie = $data['id_categorie'];
    
            // Prepare the SQL statement to delete the category
            $sql = "DELETE FROM categories WHERE id_categorie = :id_categorie";
    
            $stmt = $conn->prepare($sql);
            $result = $stmt->execute([':id_categorie' => $id_categorie]);
    
            if ($result) {
                sendResponse(200, ['message' => 'Catégorie supprimée']);
            } else {
                sendResponse(500, ['error' => 'Échec de la suppression']);
            }
        } else {
            sendResponse(400, ['error' => 'Données invalides']);
        }
    }    
?>
