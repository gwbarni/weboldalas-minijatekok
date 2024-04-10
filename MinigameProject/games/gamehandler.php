<?php

    session_start();

    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);

    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);
    
    if ($data !== null) {
        $score = $data["score"];
        $id = $data["id"];
    } else {
        $score = $_POST["score"];
        $id = $_POST["id"];
    }

    if($id==1){
        if ($_SESSION["jrk"]<$score) {
            $_SESSION["jrk"]=$score;
        }
    }
    if($id==2){
        if ($_SESSION["hsze"]<$score) {
            $_SESSION["hsze"]=$score;
        }
    }
    if($id==3){
        if ($_SESSION["cld"]<$score) {
            $_SESSION["cld"]=$score;
        }
    }

    $conn = new mysqli("localhost", "root", "", "web_minigame");
    if ($conn->connect_error) {
        $errorCode = 1;
        $errorMessage = "Sikertelen adatbázis-kapcsolódás!";
        $dataLine = [];
        exit;
    }

    $stmt = $conn->prepare("UPDATE users SET jrk = ?, hsze = ?, cld=? WHERE username = ?");
    $stmt->bind_param("ssss", $_SESSION["jrk"], $_SESSION["hsze"], $_SESSION["cld"], $_SESSION["username"]);

    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($_SESSION["username"])
?>