import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Animations
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const DeleteContainer = styled.div`
  background: linear-gradient(135deg, #fff5f5 0%, #ffd6d6 100%);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    bottom: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="10" width="15" height="15" fill="%23ff6b6b" rx="3"/><rect x="40" y="30" width="20" height="20" fill="%23feca57" rx="5"/><circle cx="80" cy="20" r="8" fill="%235f27cd"/><polygon points="30,80 45,80 50,65 35,65" fill="%231dd1a1"/></svg>');
    opacity: 0.2;
    z-index: 0;
  }
`;

const DeleteTitle = styled.h2`
  color: #ff6b6b;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  text-shadow: 2px 2px 0 rgba(95, 39, 205, 0.2);
  position: relative;
  
  &::after {
    content: "✂️";
    position: absolute;
    right: 20%;
    top: -10px;
    font-size: 1.5rem;
  }
`;

const BookList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const BookItem = styled.li`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 0;
  animation-delay: ${props => props.delay || '0ms'};
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 100%;
    background: linear-gradient(to bottom, #ff6b6b, #feca57);
  }
`;

const BookTitle = styled.strong`
  color: #5f27cd;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

const BookAuthor = styled.span`
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
`;

const DeleteButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-weight: bold;
  align-self: flex-start;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: #ff4757;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(255, 107, 107, 0.3);
    animation: ${shake} 0.5s ease;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: "🗑️";
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 1.2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const MonsterDeco = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: ${props => props.color || '#feca57'};
  border-radius: ${props => props.circle ? '50%' : '8px'};
  opacity: 0.6;
  z-index: 0;
  
  &:nth-child(1) {
    top: 30px;
    right: 40px;
    width: 30px;
    height: 30px;
    background-color: #1dd1a1;
  }
  
  &:nth-child(2) {
    bottom: 20px;
    left: 30px;
    width: 50px;
    height: 20px;
    background-color: #5f27cd;
    border-radius: 10px;
  }
`;

const DeleteBook = () => {
  const [books, setBooks] = useState([]);

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
    <DeleteContainer>
      <MonsterDeco circle color="#ff9ff3" />
      <MonsterDeco color="#feca57" />
      
      <DeleteTitle>Manage Your Books</DeleteTitle>
      
      {books.length === 0 ? (
        <EmptyMessage>No books available in your collection 📚</EmptyMessage>
      ) : (
        <BookList>
          {books.map((book, index) => (
            <BookItem key={book._id} delay={`${index * 100}ms`}>
              <BookTitle>{book.title}</BookTitle>
              <BookAuthor>by {book.author}</BookAuthor>
              <DeleteButton onClick={() => handleDelete(book._id)}>
                Delete
              </DeleteButton>
            </BookItem>
          ))}
        </BookList>
      )}
    </DeleteContainer>
  );
};

export default DeleteBook;