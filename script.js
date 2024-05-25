document.addEventListener('DOMContentLoaded', function() {
    fetchBooks();

    document.getElementById('add-book-form').addEventListener('submit', addBook);

    document.getElementById('image').addEventListener('change', function(event) {
        const imagePreview = document.getElementById('image-preview');
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });
});

function fetchBooks() {
    fetch('get-books.php')
        .then(response => response.json())
        .then(data => {
            let output = '';
            data.forEach(book => {
                output += `
                    <div class="book">
                        <img src="images/${book.image}" alt="${book.title}">
                        <h3>${book.title}</h3>
                        <p><strong>Author:</strong> ${book.author}</p>
                        <p>${book.description}</p>
                        <button onclick="deleteBook(${book.id})">Delete</button>
                    </div>
                `;
            });
            document.getElementById('book-list').innerHTML = output;
        })
        .catch(error => console.error('Error fetching books:', error));
}

function addBook(e) {
    e.preventDefault();

    let formData = new FormData(document.getElementById('add-book-form'));

    fetch('add-book.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchBooks();
        document.getElementById('add-book-form').reset();
        document.getElementById('image-preview').style.display = 'none';
    })
    .catch(error => console.error('Error adding book:', error));
}

function deleteBook(id) {
    fetch(`delete-book.php?id=${id}`)
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchBooks();
        })
        .catch(error => console.error('Error deleting book:', error));
}
