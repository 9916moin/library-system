<?php
include 'db.php';

$id = $_GET['id'];

$sql = "DELETE FROM books WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Book deleted successfully.";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
