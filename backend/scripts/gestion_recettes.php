<?php
    require 'DbConnect.php';
    require_once 'ApiHelper.php';

    $objDb = new DbConnect();
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "GET":
            handleGetRequests($conn);
            break;

        case "POST":
            handlePostRecette($conn);  // Proceed to handle the recipe submission
        break;

        case "PUT":
            handleUpdateRecette($conn);  
        break;
        case "DELETE":
            handleDeleteRecette($conn);  
        break;

        default:
            sendResponse(405, ['error' => 'Method Not Allowed']);
    }

    function handleGetRequests($conn) {
        $uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
        
        // Check if the request is for ingredients
        if (isset($uri[2]) && is_numeric($uri[2]) && isset($uri[3]) && $uri[3] === 'ingredients') {
            $recipeId = $uri[2];
            handleGetIngredients($conn, $recipeId);
        } else if (isset($uri[2]) && is_numeric($uri[2]) && isset($uri[3]) && $uri[3] === 'etapes') {
            $recipeId = $uri[2];
            handleGetEtapes($conn, $recipeId);
        } else if (isset($uri[2]) && is_numeric($uri[2]) && isset($uri[3]) && $uri[3] === 'etiquettes') {
            $recipeId = $uri[2];
            handleGetEtiquettes($conn, $recipeId);
        } else {
            // Default to fetching all recipes or a single recipe
            handleGetAllRecettes($conn, $uri);
        }
    }

    function handleGetAllRecettes($conn, $uri) {
        $id = $uri[2] ?? null; // Check if a specific recette ID is requested

        $sql = "SELECT 
                recettes.id_recette, 
                recettes.nom, 
                recettes.description, 
                recettes.temps_preparation, 
                recettes.temps_cuisson, 
                recettes.personnes, 
                recettes.chemin_photo, 
                recettes.niveau AS niveau_recette, 
                categories.nom_categorie, 
                categories.sous_categorie, 
                intensites.type AS intensite_type, 
                intensites.niveau AS intensite_niveau, 
                couts.texte_cout, 
                AVG(avis.note) AS moyenne
                FROM recettes
                INNER JOIN categories ON recettes.id_categorie = categories.id_categorie
                LEFT JOIN intensites ON recettes.id_intensite = intensites.id_intensite
                INNER JOIN couts ON recettes.id_cout = couts.id_cout
                LEFT JOIN avis ON recettes.id_recette = avis.id_recette
                GROUP BY recettes.id_recette, categories.nom_categorie, categories.sous_categorie, intensites.type, intensites.niveau, couts.texte_cout;";
        if ($id && is_numeric($id)) {
            $sql .= " WHERE recettes.id_recette = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        } else {
            $stmt = $conn->prepare($sql);
        }

        $stmt->execute();
        $data = $id ? $stmt->fetch(PDO::FETCH_ASSOC) : $stmt->fetchAll(PDO::FETCH_ASSOC);

        sendResponse(200, $data);
    }

    function handleGetIngredients($conn, $recipeId) {
        $sql = "SELECT recettes.id_recette, 
                       ingredients.nom_ingredient, 
                       ingredients.mesure, 
                       est_compose.quantite
                FROM recettes
                INNER JOIN est_compose ON est_compose.id_recette = recettes.id_recette
                INNER JOIN ingredients ON est_compose.id_ingredient = ingredients.id_ingredient
                WHERE recettes.id_recette = :recette_id";
    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':recette_id', $recipeId, PDO::PARAM_INT);
        $stmt->execute();
    
        $ingredients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        if (!$ingredients) {
            sendResponse(404, ['error' => 'No ingredients found for the specified recipe']);
        } else {
            sendResponse(200, $ingredients);
        }
    }

    function handleGetEtapes($conn, $recipeId) {
        $sql = "SELECT recettes.id_recette, 
                       etapes.num_etape,
                       etapes.texte_etape
                FROM recettes
                INNER JOIN etapes ON etapes.id_recette = recettes.id_recette
                WHERE recettes.id_recette = :recette_id";
    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':recette_id', $recipeId, PDO::PARAM_INT);
        $stmt->execute();
    
        $etapes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        if (!$etapes) {
            sendResponse(404, ['error' => 'No etapes found for the specified recipe']);
        } else {
            sendResponse(200, $etapes);
        }
    }

    function handleGetEtiquettes($conn, $recipeId) {
        $sql = "SELECT recettes.nom AS nom_recette, 
                       etiquettes.nom AS nom_etiquette
                FROM recettes
                INNER JOIN possede ON possede.id_recette = recettes.id_recette
                INNER JOIN etiquettes ON possede.id_etiquette = etiquettes.id_etiquette
                WHERE recettes.id_recette = :recette_id";
    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':recette_id', $recipeId, PDO::PARAM_INT);
        $stmt->execute();
    
        $etiquettes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        sendResponse(200, $etiquettes);
    }

    function handlePostRecette($conn) {
        // Start session only for POST requests
        ini_set('session.gc_maxlifetime', 3600);
        session_start();

        // Check for PHPSESSID cookie to verify session
        if (!isset($_COOKIE['PHPSESSID'])) {
            http_response_code(401);
            echo json_encode(['message' => 'Unauthorized: No session found']);
            exit;
        } else {
            // Check if the session ID exists and is valid
            if (session_id() === $_COOKIE['PHPSESSID']) {
                $_SESSION['logged_in'] = true;  // Ensure the session is still valid
                echo json_encode(['session' => $_SESSION]);
            } else {
                http_response_code(401);
                echo json_encode(['message' => 'Session ID mismatch']);
                exit;
            }
        }

        $data = json_decode(file_get_contents('php://input'), true); // Use true for an associative array.
        if ($data) {            
            $etiquettes = isset($data['etiquettes']) && is_array($data['etiquettes']) ? $data['etiquettes'] : [];
            
            // Start a transaction
            $conn->beginTransaction();

            // Get the Base64 string for the image
            $base64Image = $data['cheminPhoto'];
                
            $filePath  = null;
            // Remove the prefix (data:image/png;base64, or data:image/jpeg;base64,)
            if ($base64Image !== null) {
                // Remove the prefix (data:image/png;base64,)
                $imageData = base64_decode(preg_replace('/^data:image\/(png|jpeg|jpg);base64,/', '', $base64Image));

                // Specify the upload directory
                $uploadDir = 'uploads/';
                $recipeName = str_replace(' ', '', $data['nomRecette']); // Replace spaces with underscores
                $fileName = uniqid() . '-' . $recipeName . '.png'; // Set the extension as needed
                $filePath = $uploadDir . $fileName;

                // Ensure the directory exists
                if (!is_dir($uploadDir) || !is_writable($uploadDir)) {
                    sendResponse(500, ["success" => false, "message" => "Le répertoire de téléchargement n'est pas accessible."]);
                    return;
                }
        
                // Save the image to the upload directory
                if (file_put_contents($filePath, $imageData) === false) {
                    sendResponse(500, ["success" => false, "message" => "Échec du téléchargement de l'image."]);
                    return;
                }
            }

            $nom = $data['nomRecette'];
            $description = $data['description'];
            $preparation = $data['preparation'];
            $cuisson = $data['cuisson'];
            $personnes = $data['personnes'];
            $niveau = $data['niveau'];
            $nom_categorie = $data['categorie'];
            $sous_categorie = $data['sousCategorie'];
            $nom_cout = $data['cout'];
            $type_intensite = $data['typeIntensite'];
            $niveau_intensite = $data['niveauIntensite'];
            $etiquettes = $data['etiquettes'] ?? []; 

            // Look up id_categorie based on nom_categorie and sous_categorie
            $stmt = $conn->prepare("SELECT id_categorie FROM categories WHERE nom_categorie = :nom_categorie AND sous_categorie = :sous_categorie");
            $stmt->execute([
                ':nom_categorie' => $nom_categorie,
                ':sous_categorie' => $sous_categorie
            ]);
            $categorie = $stmt->fetch(PDO::FETCH_ASSOC);

            // Look up id_cout based on texte_cout
            $stmt = $conn->prepare("SELECT id_cout FROM couts WHERE texte_cout = :texte_cout");
            $stmt->execute([':texte_cout' => $nom_cout]);
            $cout = $stmt->fetch(PDO::FETCH_ASSOC);

            // Look up id_intensite based on type
            $stmt = $conn->prepare("SELECT id_intensite FROM intensites WHERE type = :type AND niveau = :niveau");
            $stmt->execute([':type' => $type_intensite, ':niveau' => $niveau_intensite]);
            $intensite = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($categorie && $cout) {
                $id_categorie = $categorie['id_categorie'];
                $id_cout = $cout['id_cout'];
                $id_intensite = $intensite['id_intensite'];

                $query = "INSERT INTO recettes 
                          (nom, description, temps_preparation, temps_cuisson, personnes, chemin_photo, niveau, id_categorie, id_cout, id_intensite) 
                          VALUES (:nom, :description, :preparation, :cuisson, :personnes, :chemin_photo, :niveau, :id_categorie, :id_cout, :id_intensite)";

                $stmt = $conn->prepare($query);
                $stmt->execute([
                    ':nom' => $nom,
                    ':description' => $description,
                    ':preparation' => $preparation,
                    ':cuisson' => $cuisson,
                    ':personnes' => $personnes,
                    ':chemin_photo' => $filePath,
                    ':niveau' => $niveau,
                    ':id_categorie' => $id_categorie,
                    ':id_cout' => $id_cout,
                    ':id_intensite' => $id_intensite,
                ]);

                // Get the last inserted recipe ID
                $recipeId = $conn->lastInsertId();

                // Insert ingredients and link them to the recipe
                foreach ($data['ingredients'] as $ingredient) {
                    // Check if ingredient already exists
                    $ingredientQuery = "SELECT id_ingredient FROM ingredients WHERE nom_ingredient = :nom_ingredient";
                    $ingredientStmt = $conn->prepare($ingredientQuery);
                    $ingredientStmt->execute([':nom_ingredient' => $ingredient['nom_ingredient']]);
                    $ingredientId = $ingredientStmt->fetchColumn();

                    if (!$ingredientId) {
                        // Insert new ingredient
                        $insertIngredientQuery = "INSERT INTO ingredients (nom_ingredient, mesure) VALUES (:nom_ingredient, :mesure)";
                        $insertIngredientStmt = $conn->prepare($insertIngredientQuery);
                        $insertIngredientStmt->execute([
                            ':nom_ingredient' => $ingredient['nom_ingredient'],
                            ':mesure' => $ingredient['mesure'],
                        ]);
                        $ingredientId = $conn->lastInsertId();
                    }

                    // Link the recipe and ingredient in est_compose
                    $estComposeQuery = "INSERT INTO est_compose 
                                        (id_recette, id_ingredient, quantite) 
                                        VALUES (:recipeId, :ingredientId, :quantite)";
                    $estComposeStmt = $conn->prepare($estComposeQuery);
                    $estComposeStmt->execute([
                        ':recipeId' => $recipeId,
                        ':ingredientId' => $ingredientId,
                        ':quantite' => $ingredient['quantite'],
                    ]);
                }

                // Insert etapes and link them to the recipe
                foreach ($data['etapes'] as $etape) {
                    // Check if etape already exists
                    $etapeQuery = "SELECT id_etape FROM etapes WHERE texte_etape = :texte_etape";
                    $etapeStmt = $conn->prepare($etapeQuery);
                    $etapeStmt->execute([':texte_etape' => $etape['texte_etape']]);
                    $etapeId = $etapeStmt->fetchColumn(); 

                    if (!$etapeId) { 
                        // Insert new etape
                        $insertEtapeQuery = "INSERT INTO etapes (num_etape, texte_etape, id_recette) VALUES (:num_etape, :texte_etape, :id_recette) ORDER BY num_etape";
                        $insertEtapeStmt = $conn->prepare($insertEtapeQuery);
                        $insertEtapeStmt->execute([
                            ':num_etape' => $etape['num_etape'],
                            ':texte_etape' => $etape['texte_etape'],
                            ':id_recette' => $recipeId
                        ]);
                        $etapeId = $conn->lastInsertId();
                    }
                }

                // Insert etiquettes
                foreach ($data['etiquettes'] as $nomEtiquette) {
                    // Vérifier si l'étiquette existe dans la table `etiquettes`
                    $stmtEtiquette = $conn->prepare("SELECT id_etiquette FROM etiquettes WHERE nom = :nom");
                    $stmtEtiquette->execute([':nom' => $nomEtiquette]);
                    $idEtiquette = $stmtEtiquette->fetchColumn();
            
                    if ($idEtiquette) {
                        // Ajouter la relation dans la table `possede`
                        $stmtPossede = $conn->prepare("INSERT INTO possede (id_recette, id_etiquette) VALUES (:id_recette, :id_etiquette)");
                        $stmtPossede->execute([
                            ':id_recette' => $recipeId, // Utiliser le bon ID recette
                            ':id_etiquette' => $idEtiquette,
                        ]);
                    } else {
                        // Vous pouvez ajouter un message ou ignorer les étiquettes inexistantes
                        error_log("Étiquette '$nomEtiquette' non trouvée, ignorée.");
                    }
                }

                // Commit the transaction
                $conn->commit();

                sendResponse(201, ["success" => true, "message" => "Recette ajoutée avec succès."]);
            } else {
                $missing = [];
                if (!$categorie) $missing[] = "Catégorie";
                if (!$cout) $missing[] = "Coût";
                if (!$intensite) $missing[] = "Intensité";
                sendResponse(400, ["success" => false, "message" => implode(", ", $missing) . " non trouvée(s)."]);
            }
        } else {
            sendResponse(400, ["success" => false, "message" => "Aucune donnée reçue."]);
        }
    }

    function handleUpdateRecette($conn) {
        // Start session only for POST requests
        ini_set('session.gc_maxlifetime', 3600);
        session_start();
    
        // Check for PHPSESSID cookie to verify session
        if (!isset($_COOKIE['PHPSESSID'])) {
            http_response_code(401);
            echo json_encode(['message' => 'Unauthorized: No session found']);
            exit;
        } else {
            // Check if the session ID exists and is valid
            if (session_id() === $_COOKIE['PHPSESSID']) {
                $_SESSION['logged_in'] = true;  // Ensure the session is still valid
                echo json_encode(['session' => $_SESSION]);
            } else {
                http_response_code(401);
                echo json_encode(['message' => 'Session ID mismatch']);
                exit;
            }
        }
    
        $data = json_decode(file_get_contents('php://input'), true); // Use true for an associative array.
        if ($data) {    
            // Start a transaction
            $conn->beginTransaction();

            $nom = $data['nomRecette'];
            $description = $data['description'];
            $preparation = $data['preparation'];
            $cuisson = $data['cuisson'];
            $personnes = $data['personnes'];
            $niveau = $data['niveau'];
            $nom_categorie = $data['categorie'];
            $sous_categorie = $data['sousCategorie'];
            $nom_cout = $data['cout'];
            $type_intensite = $data['typeIntensite'];
            $niveau_intensite = $data['niveauIntensite'];
            $etiquettes = $data['etiquettes'] ?? []; 
    
            // Look up id_categorie based on nom_categorie and sous_categorie
            $stmt = $conn->prepare("SELECT id_categorie FROM categories WHERE nom_categorie = :nom_categorie AND sous_categorie = :sous_categorie");
            $stmt->execute([
                ':nom_categorie' => $nom_categorie,
                ':sous_categorie' => $sous_categorie
            ]);
            $categorie = $stmt->fetch(PDO::FETCH_ASSOC);
    
            // Look up id_cout based on texte_cout
            $stmt = $conn->prepare("SELECT id_cout FROM couts WHERE texte_cout = :texte_cout");
            $stmt->execute([':texte_cout' => $nom_cout]);
            $cout = $stmt->fetch(PDO::FETCH_ASSOC);
    
            $id_intensite = null; // Default to NULL
            if (!empty($type_intensite) && !empty($niveau_intensite)) {
                // Look up id_intensite based on type and niveau
                $stmt = $conn->prepare("SELECT id_intensite 
                                        FROM intensites 
                                        WHERE type = :type 
                                        AND niveau = :niveau");
                $stmt->execute([
                    ':type' => $type_intensite, 
                    ':niveau' => $niveau_intensite
                ]);
                $intensite = $stmt->fetch(PDO::FETCH_ASSOC);
                $id_intensite = $intensite ? $intensite['id_intensite'] : null;
            }
    
            if ($categorie && $cout) {
                $id_categorie = $categorie['id_categorie'];
                $id_cout = $cout['id_cout'];
    
                // Process cheminPhoto if provided
                $filePath = null;
                if (!empty($data['cheminPhoto'])) {
                    // Process the Base64 image
                    $base64Image = $data['cheminPhoto'];
                    $imageData = base64_decode(preg_replace('/^data:image\/(png|jpeg|jpg);base64,/', '', $base64Image));

                    $uploadDir = 'uploads/';
                    $recipeName = str_replace(' ', '', $data['nomRecette']);
                    $fileName = uniqid() . '-' . $recipeName . '.png';
                    $filePath = $uploadDir . $fileName;

                    // Ensure upload directory exists and is writable
                    if (!is_dir($uploadDir) || !is_writable($uploadDir)) {
                        sendResponse(500, ["success" => false, "message" => "Le répertoire de téléchargement n'est pas accessible."]);
                        return;
                    }

                    // Save the file
                    if (file_put_contents($filePath, $imageData) === false) {
                        sendResponse(500, ["success" => false, "message" => "Échec du téléchargement de l'image."]);
                        return;
                    }
                }

                // Update query for recettes
                $query = "UPDATE recettes 
                        SET 
                            nom = :nom, 
                            description = :description, 
                            temps_preparation = :preparation, 
                            temps_cuisson = :cuisson, 
                            personnes = :personnes, 
                            niveau = :niveau, 
                            id_categorie = :id_categorie, 
                            id_cout = :id_cout, 
                            id_intensite = :id_intensite" .
                        ($filePath ? ", chemin_photo = :chemin_photo" : "") . 
                        " WHERE id_recette = :id_recette";

                $params = [
                    ':nom' => $nom,
                    ':description' => $description,
                    ':preparation' => $preparation,
                    ':cuisson' => $cuisson,
                    ':personnes' => $personnes,
                    ':niveau' => $niveau,
                    ':id_categorie' => $id_categorie,
                    ':id_cout' => $id_cout,
                    ':id_intensite' => $id_intensite,
                    ':id_recette' => $data['idRecette']
                ];

                if ($filePath) {
                    $params[':chemin_photo'] = $filePath;
                }

                // Prepare and execute the statement
                $stmt = $conn->prepare($query);
                $stmt->execute($params);
    
                // Fetch current etiquettes associated with the recipe
                $stmtCurrentEtiquettes = $conn->prepare("SELECT id_etiquette FROM possede WHERE id_recette = :id_recette");
                $stmtCurrentEtiquettes->execute([':id_recette' => $data['idRecette']]);
                $currentEtiquettes = $stmtCurrentEtiquettes->fetchAll(PDO::FETCH_COLUMN);

                // Get the IDs of the new etiquettes from the names provided
                $newEtiquetteIds = [];
                foreach ($etiquettes as $nomEtiquette) {
                    $stmtEtiquette = $conn->prepare("SELECT id_etiquette FROM etiquettes WHERE nom = :nom");
                    $stmtEtiquette->execute([':nom' => $nomEtiquette]);
                    $idEtiquette = $stmtEtiquette->fetchColumn();
                    
                    if ($idEtiquette) {
                        $newEtiquetteIds[] = $idEtiquette;
                    } else {
                        // Log or handle missing etiquette if needed
                        error_log("Étiquette '$nomEtiquette' non trouvée, ignorée.");
                    }
                }

                // Calculate the differences
                $etiquettesToRemove = array_diff($currentEtiquettes, $newEtiquetteIds);
                $etiquettesToAdd = array_diff($newEtiquetteIds, $currentEtiquettes);

                // Remove old etiquettes
                foreach ($etiquettesToRemove as $idEtiquetteToRemove) {
                    $stmtRemove = $conn->prepare("DELETE FROM possede WHERE id_recette = :id_recette AND id_etiquette = :id_etiquette");
                    $stmtRemove->execute([
                        ':id_recette' => $data['idRecette'],
                        ':id_etiquette' => $idEtiquetteToRemove
                    ]);
                }

                // Add new etiquettes
                foreach ($etiquettesToAdd as $idEtiquetteToAdd) {
                    $stmtAdd = $conn->prepare("INSERT INTO possede (id_recette, id_etiquette) VALUES (:id_recette, :id_etiquette)");
                    $stmtAdd->execute([
                        ':id_recette' => $data['idRecette'],
                        ':id_etiquette' => $idEtiquetteToAdd
                    ]);
                }
    
                // Commit the transaction
                $conn->commit();
    
                sendResponse(200, ["message" => "Recette modifiée"]);
            } else {
                $missing = [];
                if (!$categorie) $missing[] = "Catégorie";
                if (!$cout) $missing[] = "Coût";
                if (!$intensite) $missing[] = "Intensité";
                sendResponse(400, ["success" => false, "message" => implode(", ", $missing) . " non trouvée(s)."]);
            }
        } else {
            sendResponse(400, ["success" => false, "message" => "Aucune donnée reçue."]);
        }
    }

    function handleDeleteRecette($conn) {
        // Start session only for POST requests
        ini_set('session.gc_maxlifetime', 3600);
        session_start();

        // Check for PHPSESSID cookie to verify session
        if (!isset($_COOKIE['PHPSESSID'])) {
            http_response_code(401);
            echo json_encode(['message' => 'Unauthorized: No session found']);
            exit;
        } else {
            // Check if the session ID exists and is valid
            if (session_id() === $_COOKIE['PHPSESSID']) {
                $_SESSION['logged_in'] = true;  // Ensure the session is still valid
            } else {
                http_response_code(401);
                echo json_encode(['message' => 'Session ID mismatch']);
                exit;
            }
        }

        $data = json_decode(file_get_contents('php://input'), true);
    
        if ($data && isset($data['id_recette'])) {
            $id_recette = $data['id_recette'];
    
            // Prepare the SQL statement to delete the category
            $sql = "DELETE FROM recettes WHERE id_recette = :id_recette";
    
            $stmt = $conn->prepare($sql);
            $result = $stmt->execute([':id_recette' => $id_recette]);
    
            if ($result) {
                sendResponse(200, ['message' => 'Recette deleted successfully']);
            } else {
                sendResponse(500, ['error' => 'Failed to delete Recette']);
            }
        } else {
            sendResponse(400, ['error' => 'Invalid input data']);
        }
    }
?>