import React from 'react';
import axios from 'axios';

// Inline styles object as a fallback
const styles = {
  monsterFormContainer: {
    background: 'linear-gradient(135deg, #f9f7ff 0%, #e8d6ff 100%)',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '2rem auto',
    position: 'relative',
    overflow: 'hidden'
  },
  monsterTitle: {
    color: '#5f27cd',
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    textAlign: 'center',
    marginBottom: '2rem',
    position: 'relative',
    fontSize: '2.5rem',
    textShadow: '3px 3px 0 rgba(255, 107, 107, 0.3)'
  },
  titleUnderline: {
    display: 'block',
    width: '100px',
    height: '10px',
    background: 'linear-gradient(90deg, #ff9ff3, #feca57, #ff6b6b, #1dd1a1, #5f27cd)',
    margin: '10px auto',
    borderRadius: '5px'
  },
  monsterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    position: 'relative',
    zIndex: '1'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputLabel: {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    color: '#5f27cd',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  monsterInput: {
    padding: '12px 15px',
    border: '3px solid #d6a2ff',
    borderRadius: '10px',
    fontSize: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    fontFamily: "'Comic Sans MS', cursive, sans-serif"
  },
  monsterButton: {
    background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.2rem',
    borderRadius: '50px',
    cursor: 'pointer',
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 5px 15px rgba(255, 107, 107, 0.4)',
    transition: 'all 0.3s ease'
  },
  deco1: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '30px',
    height: '30px',
    backgroundColor: '#feca57',
    borderRadius: '50%',
    opacity: '0.6',
    zIndex: '0'
  },
  deco2: {
    position: 'absolute',
    bottom: '40px',
    right: '30px',
    width: '40px',
    height: '40px',
    backgroundColor: '#1dd1a1',
    borderRadius: '50%',
    opacity: '0.6',
    zIndex: '0'
  }
};

const AddBook = () => {
    const handleBook = async(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const author = e.target.author.value;
        const date = e.target.date.value;
        const image = e.target.image.value;
        const books = {title, author, date, image};
        
        try {
            await axios.post('https://book-app-1-a9ot.onrender.com/books', books);
            alert('Book Added Successfully');
            e.target.reset(); // Clear the form
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to add book. Please try again.');
        }
    }
    
    return (
        <div style={styles.monsterFormContainer}>
            <div style={styles.deco1}></div>
            <div style={styles.deco2}></div>
            
            <h1 style={styles.monsterTitle}>
                Add Book Details
                <span style={styles.titleUnderline}></span>
            </h1>
            
            <form onSubmit={handleBook} style={styles.monsterForm}>
                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Title:</label>
                    <input 
                        style={styles.monsterInput} 
                        type='text' 
                        name='title' 
                        required 
                        onFocus={(e) => {
                            e.target.style.borderColor = '#5f27cd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(95, 39, 205, 0.3)';
                            e.target.style.backgroundColor = 'white';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#d6a2ff';
                            e.target.style.boxShadow = 'none';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                        }}
                    />
                </div>
                
                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Author:</label>
                    <input 
                        style={styles.monsterInput} 
                        type='text' 
                        name='author' 
                        required 
                        onFocus={(e) => {
                            e.target.style.borderColor = '#5f27cd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(95, 39, 205, 0.3)';
                            e.target.style.backgroundColor = 'white';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#d6a2ff';
                            e.target.style.boxShadow = 'none';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                        }}
                    />
                </div>
                
                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Date:</label>
                    <input 
                        style={styles.monsterInput} 
                        type='date' 
                        name='date' 
                        required 
                        onFocus={(e) => {
                            e.target.style.borderColor = '#5f27cd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(95, 39, 205, 0.3)';
                            e.target.style.backgroundColor = 'white';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#d6a2ff';
                            e.target.style.boxShadow = 'none';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                        }}
                    />
                </div>
                
                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Image URL:</label>
                    <input 
                        style={styles.monsterInput} 
                        type='text' 
                        name='image' 
                        required 
                        onFocus={(e) => {
                            e.target.style.borderColor = '#5f27cd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(95, 39, 205, 0.3)';
                            e.target.style.backgroundColor = 'white';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#d6a2ff';
                            e.target.style.boxShadow = 'none';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                        }}
                    />
                </div>
                
                <button 
                    type='submit' 
                    style={styles.monsterButton}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.4)';
                    }}
                    onMouseDown={(e) => {
                        e.target.style.transform = 'translateY(1px)';
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                    }}
                >
                    Add Book
                </button>
            </form>
        </div>
    )
}

export default AddBook;