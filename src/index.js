document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const booksContainer = document.getElementById('books-container');
    const bookListSection = document.getElementById('book-list-section');
    const bookDetailsSection = document.getElementById('book-details');
    const addBookFormSection = document.getElementById('add-book-form');
    const backBtn = document.getElementById('back-btn');
    const showFormBtn = document.getElementById('show-form-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const bookForm = document.getElementById('book-form');
    
    // Book detail elements
    const detailCover = document.getElementById('detail-cover');
    const detailTitle = document.getElementById('detail-title');
    const detailAuthor = document.getElementById('detail-author');
    const detailGenre = document.getElementById('detail-genre');
    const detailSummary = document.getElementById('detail-summary');
    const likeBtn = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');
    const deleteBtn = document.getElementById('delete-btn');
    
    // Form elements
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const genreInput = document.getElementById('genre');
    const summaryInput = document.getElementById('summary');
    const coverUrlInput = document.getElementById('cover-url');
    
    // Sample data (in a real app, this would come from an API)
    let books = [
        {
            id: 1,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Classic Fiction",
            summary: "The story of racial injustice and moral growth in the American South through the eyes of a young girl.",
            likes: 42,
            coverUrl: "https://covers.openlibrary.org/b/id/265696-M.jpg"
        },
        {
            id: 2,
            title: "1984",
            author: "George Orwell",
            genre: "Dystopian Fiction",
            summary: "A dystopian novel set in a totalitarian society ruled by the Party and its leader Big Brother.",
            likes: 38,
            coverUrl: "https://covers.openlibrary.org/b/id/7222246-M.jpg"
        },
        {
            id: 3,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classic Literature",
            summary: "A story of wealth, love, and the American Dream in the 1920s.",
            likes: 35,
            coverUrl: "https://covers.openlibrary.org/b/id/240726-M.jpg"
        }
    ];
    
    let currentBookId = null;
    
    // Initialize the app
    renderBooks();
    
    // Event listeners
    showFormBtn.addEventListener('click', showAddBookForm);
    cancelBtn.addEventListener('click', hideAddBookForm);
    bookForm.addEventListener('submit', handleFormSubmit);
    backBtn.addEventListener('click', showBookList);
    likeBtn.addEventListener('click', handleLike);
    deleteBtn.addEventListener('click', handleDelete);
    
    // Render all books
    function renderBooks() {
        booksContainer.innerHTML = '';
        
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.dataset.id = book.id;
            
            bookCard.innerHTML = `
                <div class="book-cover">
                    <img src="${book.coverUrl || 'https://via.placeholder.com/150x200?text=No+Cover'}" alt="${book.title} cover">
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <div class="book-likes">
                        <i class="fas fa-thumbs-up"></i> ${book.likes}
                    </div>
                </div>
            `;
            
            bookCard.addEventListener('click', () => showBookDetails(book.id));
            booksContainer.appendChild(bookCard);
        });
    }
    
    // Show book details
    function showBookDetails(bookId) {
        const book = books.find(b => b.id === bookId);
        if (!book) return;
        
        currentBookId = bookId;
        
        detailCover.src = book.coverUrl || 'https://via.placeholder.com/300x450?text=No+Cover';
        detailTitle.textContent = book.title;
        detailAuthor.textContent = `by ${book.author}`;
        detailGenre.textContent = book.genre;
        detailSummary.textContent = book.summary;
        likeCount.textContent = book.likes;
        
        bookListSection.classList.add('hidden');
        addBookFormSection.classList.add('hidden');
        bookDetailsSection.classList.remove('hidden');
    }
    
    // Show book list
    function showBookList() {
        bookListSection.classList.remove('hidden');
        addBookFormSection.classList.add('hidden');
        bookDetailsSection.classList.add('hidden');
        currentBookId = null;
    }
    
    // Show add book form
    function showAddBookForm() {
        bookListSection.classList.add('hidden');
        bookDetailsSection.classList.add('hidden');
        addBookFormSection.classList.remove('hidden');
        
        // Reset form
        bookForm.reset();
    }
    
    // Hide add book form
    function hideAddBookForm() {
        addBookFormSection.classList.add('hidden');
        bookListSection.classList.remove('hidden');
    }
    
    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            title: titleInput.value.trim(),
            author: authorInput.value.trim(),
            genre: genreInput.value.trim(),
            summary: summaryInput.value.trim(),
            likes: 0,
            coverUrl: coverUrlInput.value.trim() || undefined
        };
        
        books.push(newBook);
        renderBooks();
        hideAddBookForm();
    }
    
    // Handle like button
    function handleLike() {
        if (!currentBookId) return;
        
        const book = books.find(b => b.id === currentBookId);
        if (book) {
            book.likes++;
            likeCount.textContent = book.likes;
            
            // Update the book card in the list
            const bookCard = document.querySelector(`.book-card[data-id="${currentBookId}"] .book-likes`);
            if (bookCard) {
                bookCard.innerHTML = `<i class="fas fa-thumbs-up"></i> ${book.likes}`;
            }
        }
    }
    
    // Handle delete button
    function handleDelete() {
        if (!currentBookId) return;
        
        if (confirm('Are you sure you want to delete this book?')) {
            books = books.filter(b => b.id !== currentBookId);
            showBookList();
            renderBooks();
        }
    }
});