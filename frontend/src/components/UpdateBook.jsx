import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedData, setUpdatedData] = useState({ 
    title: '', 
    author: '', 
    date: '', 
    image: '' 
  });

  // Styles object
  const styles = {
    container: {
      background: 'linear-gradient(135deg, #fff9f0 0%, #ffe8d6 100%)',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      margin: '2rem auto',
      position: 'relative',
      overflow: 'hidden'
    },
    title: {
      color: '#ff6b6b',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontSize: '2.2rem',
      textShadow: '2px 2px 0 rgba(95, 39, 205, 0.2)',
      position: 'relative'
    },
    bookList: {
      listStyle: 'none',
      padding: '0',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    bookItem: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    bookInfo: {
      flex: '1'
    },
    bookTitle: {
      color: '#5f27cd',
      fontSize: '1.1rem',
      display: 'block',
      marginBottom: '0.3rem',
      fontFamily: "'Comic Sans MS', cursive, sans-serif"
    },
    bookAuthor: {
      color: '#666',
      fontStyle: 'italic'
    },
    editButton: {
      background: '#5f27cd',
      color: 'white',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    updateForm: {
      background: 'white',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
      marginTop: '2rem'
    },
    formTitle: {
      color: '#1dd1a1',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      marginBottom: '1.5rem',
      textAlign: 'center',
      fontSize: '1.5rem'
    },
    inputGroup: {
      marginBottom: '1.5rem'
    },
    inputLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#5f27cd',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontWeight: 'bold'
    },
    updateInput: {
      width: '100%',
      padding: '12px 15px',
      border: '3px solid #d6a2ff',
      borderRadius: '10px',
      fontSize: '1rem',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      transition: 'all 0.3s ease'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyItems: 'center',
      marginTop: '1.5rem'
    },
    actionButton: {
      padding: '12px 25px',
      borderRadius: '50px',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none'
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
      bottom: '20px',
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
      top: '50%',
      left: '20px',
      width: '20px',
      height: '40px',
      backgroundColor: '#ff6b6b',
      borderRadius: '10px',
      opacity: '0.6',
      zIndex: '0'
    },
    pencilIcon: {
      marginRight: '5px'
    },
    accentBar: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '8px',
      height: '100%',
      background: 'linear-gradient(to bottom, #feca57, #ff6b6b)',
      borderRadius: '15px 0 0 15px'
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

  const handleEdit = (book) => {
    setSelectedBook(book);
    setUpdatedData({ 
      title: book.title, 
      author: book.author, 
      date: book.date, 
      image: book.image 
    });
  };

  const handleUpdate = async () => {
    if (!selectedBook) return;

    try {
      await axios.put(`https://book-app-wn8v.onrender.com/books/${selectedBook._id}`, updatedData);
      alert('Book updated successfully');
      setSelectedBook(null);
      setUpdatedData({ title: '', author: '', date: '', image: '' });
      await fetchBooks();
    } catch (error) {
      console.error(error);
      alert('Error updating book');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.deco1}></div>
      <div style={styles.deco2}></div>
      
      <h2 style={styles.title}>
        Update Your Books
        <span style={{...styles.pencilIcon, position: 'absolute', right: '25%', top: '-5px', fontSize: '1.5rem'}}>✏️</span>
      </h2>
      
      {books.length === 0 ? (
        <p style={styles.emptyMessage}>No books available to edit 📚</p>
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
              <div style={styles.accentBar}></div>
              <div style={styles.bookInfo}>
                <strong style={styles.bookTitle}>{book.title}</strong>
                <span style={styles.bookAuthor}>by {book.author}</span>
              </div>
              <button 
                style={styles.editButton}
                onClick={() => handleEdit(book)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#341f97';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 10px rgba(95, 39, 205, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#5f27cd';
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
                <span style={styles.pencilIcon}>✏️</span>
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedBook && (
        <div style={styles.updateForm}>
          <h3 style={styles.formTitle}>Update Book Details ✨</h3>
          
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Title:</label>
            <input
              style={{
                ...styles.updateInput,
                ':focus': {
                  outline: 'none',
                  borderColor: '#5f27cd',
                  boxShadow: '0 0 0 3px rgba(95, 39, 205, 0.2)'
                }
              }}
              type="text"
              value={updatedData.title}
              onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
              onFocus={(e) => {
                e.target.style.borderColor = '#5f27cd';
                e.target.style.boxShadow = '0 0 0 3px rgba(95, 39, 205, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d6a2ff';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Author:</label>
            <input
              style={styles.updateInput}
              type="text"
              value={updatedData.author}
              onChange={(e) => setUpdatedData({ ...updatedData, author: e.target.value })}
              onFocus={(e) => {
                e.target.style.borderColor = '#5f27cd';
                e.target.style.boxShadow = '0 0 0 3px rgba(95, 39, 205, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d6a2ff';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Date:</label>
            <input
              style={styles.updateInput}
              type="text"
              value={updatedData.date}
              onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
              onFocus={(e) => {
                e.target.style.borderColor = '#5f27cd';
                e.target.style.boxShadow = '0 0 0 3px rgba(95, 39, 205, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d6a2ff';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Image URL:</label>
            <input
              style={styles.updateInput}
              type="text"
              value={updatedData.image}
              onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.value })}
              onFocus={(e) => {
                e.target.style.borderColor = '#5f27cd';
                e.target.style.boxShadow = '0 0 0 3px rgba(95, 39, 205, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d6a2ff';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.actionButton,
                background: 'linear-gradient(45deg, #1dd1a1, #5f27cd)',
                color: 'white'
              }}
              onClick={handleUpdate}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(29, 209, 161, 0.4)';
              }}
              onMouseLeave={(e) => {
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
              Update Book
            </button>
            <button
              style={{
                ...styles.actionButton,
                background: '#ff6b6b',
                color: 'white'
              }}
              onClick={() => setSelectedBook(null)}
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
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add CSS for animations in a style tag */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default UpdateBook;