import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Styled Components
const ViewContainer = styled.div`
  background: linear-gradient(135deg, #f9f7ff 0%, #e8d6ff 100%);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="8" fill="%23ff9ff3"/><rect x="50" y="30" width="20" height="20" fill="%23feca57" rx="5"/><polygon points="80,10 95,25 80,40 65,25" fill="%235f27cd"/></svg>');
    opacity: 0.2;
    z-index: 0;
  }
`;

const ViewTitle = styled.h1`
  color: #5f27cd;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  font-size: 2.5rem;
  text-shadow: 3px 3px 0 rgba(255, 107, 107, 0.3);
  
  &::after {
    content: "📚";
    position: absolute;
    right: 25%;
    top: -10px;
    font-size: 1.8rem;
    animation: ${float} 3s ease infinite;
  }
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const BookCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 0;
  animation-delay: ${props => props.delay || '0ms'};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    
    img {
      transform: scale(1.05);
    }
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 5px solid #feca57;
  transition: all 0.3s ease;
`;

const BookInfo = styled.div`
  padding: 1.5rem;
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #5f27cd);
  }
`;

const BookTitle = styled.h3`
  color: #5f27cd;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookAuthor = styled.h2`
  color: #ff6b6b;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const BookDate = styled.h2`
  color: #666;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 1rem;
  font-weight: normal;
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
    left: 40px;
    width: 30px;
    height: 30px;
    background-color: #ff6b6b;
  }
  
  &:nth-child(2) {
    top: 50%;
    right: 20px;
    width: 20px;
    height: 40px;
    background-color: #1dd1a1;
    border-radius: 10px;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #5f27cd;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 1.5rem;
  padding: 2rem;
  animation: ${pulse} 2s infinite;
`;

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    try {
      const res = await axios.get('http://localhost:9000/books');
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  
  return (
    <ViewContainer>
      <MonsterDeco circle color="#5f27cd" />
      <MonsterDeco color="#feca57" />
      
      <ViewTitle>Explore Our Book Collection</ViewTitle>
      
      {loading ? (
        <LoadingMessage>Loading magical books... ✨</LoadingMessage>
      ) : books.length === 0 ? (
        <LoadingMessage>No books found in our collection 📚</LoadingMessage>
      ) : (
        <BooksGrid>
          {books.map((book, index) => (
            <BookCard key={book._id} delay={`${index * 100}ms`}>
              <BookImage 
                src={book.image} 
                alt={book.title} 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/250x300/5f27cd/ffffff?text=No+Image';
                }}
              />
              <BookInfo>
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>by {book.author}</BookAuthor>
                <BookDate>Published: {book.date}</BookDate>
              </BookInfo>
            </BookCard>
          ))}
        </BooksGrid>
      )}
    </ViewContainer>
  );
};

export default ViewBook;