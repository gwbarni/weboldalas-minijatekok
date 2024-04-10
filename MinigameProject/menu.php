<?php
    session_start();
    $user_name = $_SESSION['userName'];

    $conn = new mysqli("localhost", "root", "", "web_minigame");
    if ($conn->connect_error) {
        $errorCode = 1;
        $errorMessage = "Sikertelen adatbázis-kapcsolódás!";
        $dataLine = [];
        exit;
    }

    $stmt = $conn->prepare("SELECT jrk, hsze, cld from users WHERE username = ?;");
    $stmt->bind_param("s", $user_name);
    $stmt->execute();
    $result = $stmt->get_result();

    $dataLine = $result->fetch_assoc();
    $jrk = $dataLine['jrk'];
    $hsze = $dataLine['hsze'];
    $cld = $dataLine['cld'];

    echo json_encode(["jrk" => $jrk, "hsze" => $hsze, "cld" => $cld, "username"=>$user_name]);
    $stmt->close();
    $conn->close();
?>
