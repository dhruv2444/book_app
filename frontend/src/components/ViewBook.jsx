import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Styles object
  const styles = {
    container: {
      background: 'linear-gradient(135deg, #f9f7ff 0%, #e8d6ff 100%)',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      maxWidth: '1200px',
      margin: '2rem auto',
      position: 'relative',
      overflow: 'hidden'
    },
    title: {
      color: '#5f27cd',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      textAlign: 'center',
      marginBottom: '2rem',
      position: 'relative',
      fontSize: '2.5rem',
      textShadow: '3px 3px 0 rgba(255, 107, 107, 0.3)'
    },
    booksGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '2rem',
      padding: '1rem'
    },
    bookCard: {
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    bookImage: {
      width: '100%',
      height: '300px',
      objectFit: 'cover',
      borderBottom: '5px solid #feca57',
      transition: 'all 0.3s ease'
    },
    bookInfo: {
      padding: '1.5rem',
      position: 'relative'
    },
    bookTitle: {
      color: '#5f27cd',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      marginBottom: '0.5rem',
      fontSize: '1.3rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    bookAuthor: {
      color: '#ff6b6b',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      marginBottom: '0.5rem',
      fontSize: '1.1rem'
    },
    bookDate: {
      color: '#666',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontSize: '1rem',
      fontWeight: 'normal'
    },
    loadingMessage: {
      textAlign: 'center',
      color: '#5f27cd',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontSize: '1.5rem',
      padding: '2rem'
    },
    deco1: {
      position: 'absolute',
      bottom: '20px',
      left: '40px',
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
      right: '20px',
      width: '20px',
      height: '40px',
      backgroundColor: '#1dd1a1',
      borderRadius: '10px',
      opacity: '0.6',
      zIndex: '0'
    },
    gradientBar: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '5px',
      background: 'linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #5f27cd)'
    },
    bookIcon: {
      position: 'absolute',
      right: '25%',
      top: '-10px',
      fontSize: '1.8rem'
    }
  };

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    try {
      const res = await axios.get('https://book-app-wn8v.onrender.com/books');
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.deco1}></div>
      <div style={styles.deco2}></div>
      
      <h1 style={styles.title}>
        Explore Our Book Collection
        <span style={{...styles.bookIcon, animation: 'float 3s ease infinite'}}>📚</span>
      </h1>
      
      {loading ? (
        <p style={{...styles.loadingMessage, animation: 'pulse 2s infinite'}}>
          Loading magical books... ✨
        </p>
      ) : books.length === 0 ? (
        <p style={styles.loadingMessage}>
          No books found in our collection 📚
        </p>
      ) : (
        <div style={styles.booksGrid}>
          {books.map((book, index) => (
            <div 
              key={book._id} 
              style={{
                ...styles.bookCard,
                opacity: 0,
                animation: `fadeIn 0.5s ease forwards ${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <img 
                src={book.image} 
                alt={book.title} 
                style={styles.bookImage}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/250x300/5f27cd/ffffff?text=No+Image';
                }}
              />
              <div style={styles.bookInfo}>
                <div style={styles.gradientBar}></div>
                <h3 style={styles.bookTitle}>{book.title}</h3>
                <h2 style={styles.bookAuthor}>by {book.author}</h2>
                <h2 style={styles.bookDate}>Published: {book.date}</h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add CSS for animations in a style tag */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ViewBook;