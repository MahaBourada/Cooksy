<?php
    class DbConnect {
        private $server = 'localhost';
        private $dbname = 'cooksy_recettes';
        private $user = 'root';
        private $pass = '';

        public function connect() {
            try {
                $conn = new PDO(
                    "mysql:host={$this->server};dbname={$this->dbname}",
                    $this->user,
                    $this->pass,
                    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
                );
                return $conn;
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
                exit;
            }
        }
    }
?>