import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateBooksAPI } from '../api/BooksAPI';
import { v4 as uuidv4 } from 'uuid'

function EditBookForm() {
  const { pathname } = useLocation();
  const bookId = parseInt(pathname.split('/').pop());

  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchBookData() {
      try {
        const db = await indexedDB.open('myBooksDB');
        const transaction = db.transaction(['books'], 'readonly');
        const booksObjectStore = transaction.objectStore('books');
        const fetchedBook = await booksObjectStore.get(bookId);
        setBook(fetchedBook);
      } catch (error) {
        console.error('Erreur lors de la récupération du livre:', error);
      }
    }

    fetchBookData();
  }, [bookId]);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setCategory(book.category);
      setDescription(book.description);
    }
  }, [book]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = [];
    if (!title) validationErrors.push('Le titre est obligatoire');
    if (!category) validationErrors.push('La catégorie est obligatoire');
    if (!description) validationErrors.push('La description est obligatoire');

    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    // try {
    //   const db = await indexedDB.open('myBooksDB');
    //   const transaction = db.transaction(['books'], 'readwrite');
    //   const booksObjectStore = transaction.objectStore('books');
    //   const updatedBook = { ...book, title, category, description };
    //   await booksObjectStore.put(updatedBook);
    //   console.log('Livre mis à jour avec succès dans IndexedDB');
    //   // Rediriger vers la page de liste des livres
    // } catch (error) {
    //   console.error('Erreur lors de la mise à jour du livre:', error);
    // }
    updateBooksAPI(title, category, description)
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <label>
        Titre:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <br />
      <label>
        Catégorie:
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Sélectionner une catégorie</option>
          <option value="Roman">Roman</option>
          <option value="Roman historique">Roman historique</option>
          <option value="Conte philosophique">Conte philosophique</option>
        </select>
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Modifier</button>
    </form>
  );
}

export default EditBookForm;
