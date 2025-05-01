import React, { useState } from 'react';
import axios from 'axios';

const SearchBook = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  // Styles object
  const styles = {
    searchContainer: {
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2ff 100%)',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      margin: '2rem auto',
      position: 'relative',
      overflow: 'hidden'
    },
    searchTitle: {
      color: '#5f27cd',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontSize: '2.2rem',
      textShadow: '2px 2px 0 rgba(255, 107, 107, 0.2)',
      position: 'relative'
    },
    searchBox: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      justifyContent: 'center',
      position: 'relative',
      zIndex: '1'
    },
    searchInput: {
      padding: '12px 20px',
      border: '3px solid #a4d8ff',
      borderRadius: '50px',
      fontSize: '1rem',
      width: '70%',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      background: 'rgba(255, 255, 255, 0.9)',
      transition: 'all 0.3s ease'
    },
    searchButton: {
      background: 'linear-gradient(45deg, #1dd1a1, #5f27cd)',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '50px',
      cursor: 'pointer',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    },
    resultsContainer: {
      background: 'white',
      borderRadius: '15px',
      padding: '1.5rem',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
    },
    bookList: {
      listStyle: 'none',
      padding: '0',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1.5rem'
    },
    bookItem: {
      background: '#fff',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    bookTitle: {
      color: '#5f27cd',
      fontSize: '1.1rem',
      display: 'block',
      marginBottom: '0.5rem',
      fontFamily: "'Comic Sans MS', cursive, sans-serif"
    },
    bookAuthor: {
      color: '#666',
      display: 'block',
      marginBottom: '1rem',
      fontStyle: 'italic'
    },
    bookImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '10px',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    noResultsMessage: {
      textAlign: 'center',
      color: '#666',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontSize: '1.2rem',
      padding: '2rem'
    },
    deco1: {
      position: 'absolute',
      bottom: '20px',
      right: '40px',
      width: '30px',
      height: '30px',
      backgroundColor: '#ff6b6b',
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
      backgroundColor: '#feca57',
      borderRadius: '10px',
      opacity: '0.6',
      zIndex: '0'
    },
    magnifierIcon: {
      position: 'absolute',
      right: '25%',
      top: '-5px',
      fontSize: '1.5rem',
      animation: 'float 3s ease infinite'
    },
    bookAccent: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '5px',
      height: '100%',
      background: 'linear-gradient(to bottom, #1dd1a1, #5f27cd)',
      borderRadius: '15px 0 0 15px'
    }
  };

  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a title to search');
      return;
    }

    try {
      const res = await axios.get(`https://book-app-wn8v.onrender.com/search?title=${query}`);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error while fetching books');
    }
  };

  return (
    <div style={styles.searchContainer}>
      <div style={styles.deco1}></div>
      <div style={styles.deco2}></div>
      
      <h2 style={styles.searchTitle}>
        Search Your Books
        <span style={styles.magnifierIcon}>🔍</span>
      </h2>
      
      <div style={styles.searchBox}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={(e) => {
            e.target.style.borderColor = '#5f27cd';
            e.target.style.boxShadow = '0 0 0 3px rgba(95, 39, 205, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#a4d8ff';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button 
          style={styles.searchButton}
          onClick={handleSearch}
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
          Search
        </button>
      </div>
      
      <div style={styles.resultsContainer}>
        {books.length > 0 ? (
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={styles.bookAccent}></div>
                <strong style={styles.bookTitle}>{book.title}</strong>
                <span style={styles.bookAuthor}>by {book.author}</span>
                <img 
                  src={book.image} 
                  alt={book.title} 
                  style={{
                    ...styles.bookImage,
                    ':hover': {
                      transform: 'scale(1.03)'
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noResultsMessage}>No books found. Try another search! 📚</p>
        )}
      </div>

      {/* Add CSS for animations in a style tag */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
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

export default SearchBook;