import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import EditBookForm from './components/EditBookForm';
import AddBookForm from './components/AddBookForm';
import Books from './components/Books'


function App() {
  return (
    <>
      <Router>
        <div className="container-app">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books/:bookId/edit" element={<EditBookForm />} />
            <Route path="/books/add" element={<AddBookForm />} />
          </Routes>
        </div>
      </Router>
      <div className="container-app">
        <Books />
      </div>
    </>
  )
}

export default App
