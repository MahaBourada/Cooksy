<?php    
    require 'DbConnect.php';
    require_once 'ApiHelper.php';

    $objDb = new DbConnect();
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "GET":
            handleGetEtiquettes($conn);
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
                // Check if the session ID exists and is valid
                if (session_id() === $_COOKIE['PHPSESSID']) {
                    $_SESSION['logged_in'] = true;  // Ensure the session is still valid
                    echo json_encode(['session' => $_SESSION]);
                    handlePostEtiquette($conn);  // Proceed to handle the recipe submission
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
                    
                    handleUpdateEtiquette($conn);  
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
                    
                    handleDeleteEtiquette($conn);  
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

    function handleGetEtiquettes($conn) {
        $uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
        $id = $uri[2] ?? null; // Check if a specific etiquette ID is requested

        $sql = "SELECT * FROM etiquettes";
        if ($id && is_numeric($id)) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare($sql);
        }

        $stmt->execute();
        $data = $id ? $stmt->fetch(PDO::FETCH_ASSOC) : $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$data) {
            sendResponse(404, ['error' => 'Etiquette not found']);
        } else {
            sendResponse(200, $data);
        }
    }

    function handlePostEtiquette($conn) {
        $data = json_decode(file_get_contents('php://input'), true);

        if ($data) {
            $sql = "INSERT INTO etiquettes (nom) VALUES (:nom)";

            $nom_etiquette = $data['nomEtiquette'];

            $stmt = $conn->prepare($sql);
            $result = $stmt->execute([':nom' => $nom_etiquette]);
    
            if ($result) {
                sendResponse(201, ['message' => 'etiquette created successfully']);
            } else {
                sendResponse(500, ['error' => 'Failed to create etiquette']);
            }
        } else {
            sendResponse(400, ['error' => 'Invalid input data']);
        }
    }

    function handleUpdateEtiquette($conn) {
        $data = json_decode(file_get_contents('php://input'), true);
    
        if ($data) {
            $id_etiquette = $data['id_etiquette'];
            $nom_etiquette = $data['nom'];
    
            // Prepare the SQL query for updating the category
            $sql = "UPDATE etiquettes SET nom = :nom_etiquette WHERE id_etiquette = :id_etiquette";
            $stmt = $conn->prepare($sql);
    
            $result = $stmt->execute([
                ':id_etiquette' => $id_etiquette,
                ':nom_etiquette' => $nom_etiquette
            ]);
    
            if ($result) {
                sendResponse(200, ['message' => 'etiquette updated successfully']);
            } else {
                sendResponse(500, ['error' => 'Failed to update etiquette']);
            }
        } else {
            sendResponse(400, ['error' => 'Invalid input data']);
        }
    }

    function handleDeleteEtiquette($conn) {
        $data = json_decode(file_get_contents('php://input'), true);
    
        if ($data && isset($data['id_etiquette'])) {
            $id_etiquette = $data['id_etiquette'];
    
            // Prepare the SQL statement to delete the category
            $sql = "DELETE FROM etiquettes WHERE id_etiquette = :id_etiquette";
    
            $stmt = $conn->prepare($sql);
            $result = $stmt->execute([':id_etiquette' => $id_etiquette]);
    
            if ($result) {
                sendResponse(200, ['message' => 'Etiquette deleted successfully']);
            } else {
                sendResponse(500, ['error' => 'Failed to delete etiquette']);
            }
        } else {
            sendResponse(400, ['error' => 'Invalid input data']);
        }
    }    
?>
