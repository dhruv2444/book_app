import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Animations
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const UpdateContainer = styled.div`
  background: linear-gradient(135deg, #fff9f0 0%, #ffe8d6 100%);
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
    top: -30px;
    left: -30px;
    width: 150px;
    height: 150px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="30" cy="30" r="10" fill="%23feca57"/><rect x="60" y="20" width="15" height="15" fill="%23ff6b6b" rx="3"/><polygon points="20,70 35,70 40,55 25,55" fill="%235f27cd"/></svg>');
    opacity: 0.2;
    z-index: 0;
  }
`;

const UpdateTitle = styled.h2`
  color: #ff6b6b;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  text-shadow: 2px 2px 0 rgba(95, 39, 205, 0.2);
  position: relative;
  
  &::after {
    content: "✏️";
    position: absolute;
    right: 25%;
    top: -5px;
    font-size: 1.5rem;
    animation: ${bounce} 2s ease infinite;
  }
`;

const BookList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const BookItem = styled.li`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    background: linear-gradient(to bottom, #feca57, #ff6b6b);
    border-radius: 15px 0 0 15px;
  }
`;

const BookInfo = styled.div`
  flex: 1;
`;

const BookTitle = styled.strong`
  color: #5f27cd;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.3rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

const BookAuthor = styled.span`
  color: #666;
  font-style: italic;
`;

const EditButton = styled.button`
  background: #5f27cd;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: #341f97;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(95, 39, 205, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: "✏️";
  }
`;

const UpdateForm = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease;
  margin-top: 2rem;
`;

const FormTitle = styled.h3`
  color: #1dd1a1;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #5f27cd;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-weight: bold;
`;

const UpdateInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 3px solid #d6a2ff;
  border-radius: 10px;
  font-size: 1rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #5f27cd;
    box-shadow: 0 0 0 3px rgba(95, 39, 205, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  padding: 12px 25px;
  border-radius: 50px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &:first-child {
    background: linear-gradient(45deg, #1dd1a1, #5f27cd);
    color: white;
    animation: ${pulse} 2s infinite;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(29, 209, 161, 0.4);
      animation: none;
    }
  }
  
  &:last-child {
    background: #ff6b6b;
    color: white;
    
    &:hover {
      background: #ff4757;
      transform: translateY(-2px);
      box-shadow: 0 5px 10px rgba(255, 107, 107, 0.3);
    }
  }
  
  &:active {
    transform: translateY(0);
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
    bottom: 20px;
    right: 40px;
    width: 30px;
    height: 30px;
    background-color: #1dd1a1;
  }
  
  &:nth-child(2) {
    top: 50%;
    left: 20px;
    width: 20px;
    height: 40px;
    background-color: #ff6b6b;
    border-radius: 10px;
  }
`;

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedData, setUpdatedData] = useState({ 
    title: '', 
    author: '', 
    date: '', 
    image: '' 
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:9000/books');
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
    <UpdateContainer>
      <MonsterDeco circle color="#5f27cd" />
      <MonsterDeco color="#feca57" />
      
      <UpdateTitle>Update Your Books</UpdateTitle>
      
      {books.length === 0 ? (
        <EmptyMessage>No books available to edit 📚</EmptyMessage>
      ) : (
        <BookList>
          {books.map((book, index) => (
            <BookItem key={book._id} delay={`${index * 100}ms`}>
              <BookInfo>
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>by {book.author}</BookAuthor>
              </BookInfo>
              <EditButton onClick={() => handleEdit(book)}>
                Edit
              </EditButton>
            </BookItem>
          ))}
        </BookList>
      )}

      {selectedBook && (
        <UpdateForm>
          <FormTitle>Update Book Details ✨</FormTitle>
          
          <InputGroup>
            <InputLabel>Title:</InputLabel>
            <UpdateInput
              type="text"
              value={updatedData.title}
              onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Author:</InputLabel>
            <UpdateInput
              type="text"
              value={updatedData.author}
              onChange={(e) => setUpdatedData({ ...updatedData, author: e.target.value })}
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Date:</InputLabel>
            <UpdateInput
              type="text"
              value={updatedData.date}
              onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Image URL:</InputLabel>
            <UpdateInput
              type="text"
              value={updatedData.image}
              onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.value })}
            />
          </InputGroup>
          
          <ButtonGroup>
            <ActionButton onClick={handleUpdate}>Update Book</ActionButton>
            <ActionButton onClick={() => setSelectedBook(null)}>Cancel</ActionButton>
          </ButtonGroup>
        </UpdateForm>
      )}
    </UpdateContainer>
  );
};

export default UpdateBook;