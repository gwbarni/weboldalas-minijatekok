<?php
    session_start();
    mysqli_report(MYSQLI_REPORT_OFF);

    $errorCode = 0;
    $errorMessage = "";
    $dataLine = [];

    $raw_data = file_get_contents("php://input");
    $data = json_decode($raw_data, true);
    if ($data !== null) {
        $user_name = $data["username"];
        $email = $data["email"];
        $password = $data["password"];
    } else {
        $user_name = $_POST["username"];
        $email = $_POST["email"];
        $password = $_POST["password"];
    }
    $conn = new mysqli("localhost", "root", "", "web_minigame");
    if ($conn->connect_error) {
        $errorCode = 1;
        $errorMessage = "Adatbázis-kapcsolati hiba";
        exit;
    }

    $stmt = $conn->prepare("SELECT username from users WHERE username = ?;");
    $stmt->bind_param("s", $user_name);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $errorMessage = "Ez a felhasználónév már foglalt!";
        $errorCode = 2;
        exit;
    }

    $stmt = $conn->prepare("INSERT into users (username, email, password) VALUE (?,?,?)");
    $stmt->bind_param("sss", $user_name, $email,  $password);
    $stmt->execute();

    if ($stmt->affected_rows < 1) {
        $errorCode = 3;
        $errorMessage = "Sikertelen adminisztráció!";
        exit;
    }
    echo json_encode(["errorCode" => $errorCode, "errorMessage" => $errorMessage, "dataLine" => $dataLine]);
    $stmt->close();
    $conn->close();
?>
