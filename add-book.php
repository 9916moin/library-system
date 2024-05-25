<?php
include 'db.php';

$title = $_POST['title'];
$author = $_POST['author'];
$description = $_POST['description'];
$image = $_FILES['image']['name'];
$target = "images/" . basename($image);

if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
    $sql = "INSERT INTO books (title, author, description, image) VALUES ('$title', '$author', '$description', '$image')";
    if ($conn->query($sql) === TRUE) {
        echo "New book added successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Failed to upload image.";
}

$conn->close();
?>
