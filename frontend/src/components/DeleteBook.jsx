import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);

  // Styles object
  const styles = {
    deleteContainer: {
      background: 'linear-gradient(135deg, #fff5f5 0%, #ffd6d6 100%)',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      margin: '2rem auto',
      position: 'relative',
      overflow: 'hidden'
    },
    deleteTitle: {
      color: '#ff6b6b',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '2.2rem',
      textShadow: '2px 2px 0 rgba(95, 39, 205, 0.2)',
      position: 'relative'
    },
    bookList: {
      listStyle: 'none',
      padding: '0',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    bookItem: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    },
    bookTitle: {
      color: '#5f27cd',
      fontSize: '1.2rem',
      marginBottom: '0.5rem',
      fontFamily: "'Comic Sans MS', cursive, sans-serif"
    },
    bookAuthor: {
      color: '#666',
      fontStyle: 'italic',
      marginBottom: '1rem'
    },
    deleteButton: {
      background: '#ff6b6b',
      color: 'white',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    emptyMessage: {
      textAlign: 'center',
      color: '#666',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontSize: '1.2rem',
      padding: '2rem',
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
    },
    deco1: {
      position: 'absolute',
      top: '30px',
      right: '40px',
      width: '30px',
      height: '30px',
      backgroundColor: '#1dd1a1',
      borderRadius: '50%',
      opacity: '0.6',
      zIndex: '0'
    },
    deco2: {
      position: 'absolute',
      bottom: '20px',
      left: '30px',
      width: '50px',
      height: '20px',
      backgroundColor: '#5f27cd',
      borderRadius: '10px',
      opacity: '0.6',
      zIndex: '0'
    },
    scissorsIcon: {
      position: 'absolute',
      right: '20%',
      top: '-10px',
      fontSize: '1.5rem'
    },
    trashIcon: {
      marginRight: '5px'
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('https://book-app-wn8v.onrender.com/books');
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching books');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://book-app-wn8v.onrender.com/books/${id}`);
      alert('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error(error);
      alert('Error deleting book');
    }
  };

  return (
    <div style={styles.deleteContainer}>
      <div style={styles.deco1}></div>
      <div style={styles.deco2}></div>
      
      <h2 style={styles.deleteTitle}>
        Manage Your Books
        <span style={styles.scissorsIcon}>✂️</span>
      </h2>
      
      {books.length === 0 ? (
        <p style={styles.emptyMessage}>No books available in your collection 📚</p>
      ) : (
        <ul style={styles.bookList}>
          {books.map((book, index) => (
            <li 
              key={book._id} 
              style={{
                ...styles.bookItem,
                opacity: 0,
                animation: `fadeIn 0.5s ease forwards ${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '8px',
                height: '100%',
                background: 'linear-gradient(to bottom, #ff6b6b, #feca57)'
              }}></div>
              <strong style={styles.bookTitle}>{book.title}</strong>
              <span style={styles.bookAuthor}>by {book.author}</span>
              <button 
                style={styles.deleteButton}
                onClick={() => handleDelete(book._id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ff4757';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 10px rgba(255, 107, 107, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ff6b6b';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
              >
                <span style={styles.trashIcon}>🗑️</span>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add CSS for animations in a style tag */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default DeleteBook;