<?php
    session_start();
    
    $errorCode = 1;
    $errorMessage = "Sikertelen bejelentkezés";
    $dataLine = [];
    
    // Kliens felől jövő adatok:
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);
    
    if ($data !== null) {
        $user_name = $data["username"];
        $user_password = $data["password"];
    } else {
        $user_name = $_POST["username"];
        $user_password = $_POST["password"];
    }
    $_SESSION["username"] =$user_name;

    $conn = new mysqli("localhost", "root", "", "web_minigame");
    if ($conn->connect_error) {
        $errorCode = 1;
        $errorMessage = "Sikertelen adatbázis-kapcsolódás!";
        $dataLine = [];
        exit;
    }

    $stmt = $conn->prepare("SELECT * from users WHERE username = ?;");
    $stmt->bind_param("s", $user_name);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if ($user_password == $row["password"]) {

            $_SESSION["userName"] = $row["username"];
            $_SESSION["jrk"]=$row["jrk"];
            $_SESSION["hsze"]=$row["hsze"];
            $_SESSION["cld"]=$row["cld"];
            $errorCode = 0;
            $errorMessage = "Sikeres bejelentkezés";
            $dataLine = [];

        } else {
            $errorCode = 1;
            $errorMessage = "Hibás felhasználónév vagy jelszó!";
        }
    } else {
        $errorCode = 1;
        $errorMessage = "Hibás felhasználónév vagy jelszó!";
    }
    echo json_encode(["errorCode" => $errorCode, "errorMessage" => $errorMessage, "dataLine" => $dataLine]);
    $conn->close();
    $stmt->close();
?>
