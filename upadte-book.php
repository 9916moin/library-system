<?php
include 'db.php';

$id = $_POST['id'];
$title = $_POST['title'];
$author = $_POST['author'];
$description = $_POST['description'];
$image = $_FILES['image']['name'];

if ($image) {
    $target = "images/" . basename($image);
    move_uploaded_file($_FILES['image']['tmp_name'], $target);
    $sql = "UPDATE books SET title='$title', author='$author', description='$description', image='$image' WHERE id=$id";
} else {
    $sql = "UPDATE books SET title='$title', author='$author', description='$description' WHERE id=$id";
}

if ($conn->query($sql) === TRUE) {
    echo "Book updated successfully.";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
