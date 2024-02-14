import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Books() {
  const [books, setBooks] = useState([]);

  const handleDeleteClick = (bookId) => {
    // Fonction pour supprimer le livre de la base de données IndexedDB
    async function deleteBook() {
      try {
        const db = await indexedDB.open('myBooksDB');
        const transaction = db.transaction(['books'], 'readwrite');
        const booksObjectStore = transaction.objectStore('books');
        await booksObjectStore.delete(bookId);
        console.log('Livre supprimé avec succès de IndexedDB');

        // Mettre à jour l'état local pour supprimer le livre de la liste
        setBooks(books.filter(book => book.id !== bookId));
      } catch (error) {
        console.error('Erreur lors de la suppression du livre:', error);
      }
    }

    // Confirmation avant de supprimer
    if (window.confirm('Voulez-vous vraiment supprimer ce livre ?')) {
      deleteBook();
    }
  };

  useEffect(() => {
    async function fetchBooksFromIndexedDB() {
      try {
        // Ouvrir la base de données IndexedDB
        const db = await new Promise((resolve, reject) => {
          const request = indexedDB.open('myBooksDB');
          request.onerror = reject;
          request.onsuccess = () => resolve(request.result);
        });

        // Ouvrir une transaction en lecture seule sur l'objet store 'books'
        const transaction = db.transaction(['books'], 'readonly');
        const booksObjectStore = transaction.objectStore('books');

        // Obtenir tous les livres de l'objet store 'books'
        const booksData = await new Promise((resolve, reject) => {
          const request = booksObjectStore.getAll();
          request.onerror = reject;
          request.onsuccess = () => resolve(request.result);
        });

        // Mettre à jour l'état avec les données récupérées
        setBooks(booksData);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres depuis IndexedDB:', error);
      }
    }

    fetchBooksFromIndexedDB();
  }, []); // Effectue cette opération une seule fois après le montage initial du composant

  return (
    <div>
      <h1>Liste des Livres</h1>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <Link to="/books/add" className="btn btn-primary">Ajouter un livre</Link>
          </div>
        </div>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="row align-items-center mb-4">
              <div className="col-md-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5QHus14lmHHNbHLvb_7YByYMblWo9FQcQh7UpczrLbg&s" alt={book.title} className="img-fluid" />
              </div>
              <div className="col-md-6">
                <h3 className="mb-2">{book.title}</h3>
                <p className="mb-2">{book.description}</p>
                <p className="mb-0">{book.category}</p>
              </div>
              <div className="col-md-3">
                <Link to={`/books/${book.id}/edit`} className="btn btn-primary mr-2">
                  Éditer
                </Link>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(book.id)}>Supprimer</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>Aucun livre trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;
