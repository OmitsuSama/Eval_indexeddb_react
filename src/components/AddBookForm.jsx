import React, { useState } from 'react';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Ouvrir la base de données
      const db = await indexedDB.open('myBooksDB');

      // Ouvrir une transaction en écriture sur l'objet store 'books'
      const transaction = db.transaction(['books'], 'readwrite');
      const booksObjectStore = transaction.objectStore('books');

      // Ajouter le nouveau livre à l'objet store 'books'
      const newBook = { title, category, description };
      const request = booksObjectStore.add(newBook);

      // Gérer la réussite de l'ajout
      request.onsuccess = function(event) {
        console.log('Nouveau livre ajouté à IndexedDB avec l\'ID:', event.target.result);
        // Réinitialiser les champs du formulaire après l'ajout
        setTitle('');
        setCategory('');
        setDescription('');
      };

      // Gérer l'erreur lors de l'ajout
      request.onerror = function(event) {
        console.error('Erreur lors de l\'ajout du livre à IndexedDB:', event.target.error);
      };
    } catch (error) {
      console.error('Erreur lors de l\'accès à IndexedDB:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AddBookForm;
