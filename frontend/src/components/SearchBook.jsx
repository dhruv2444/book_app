import React, { useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const SearchContainer = styled.div`
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2ff 100%);
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
    right: -30px;
    width: 150px;
    height: 150px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="8" fill="%231dd1a1"/><rect x="50" y="30" width="20" height="20" fill="%23feca57" rx="5"/><polygon points="80,10 95,25 80,40 65,25" fill="%235f27cd"/></svg>');
    opacity: 0.2;
    z-index: 0;
  }
`;

const SearchTitle = styled.h2`
  color: #5f27cd;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  text-shadow: 2px 2px 0 rgba(255, 107, 107, 0.2);
  position: relative;
  
  &::after {
    content: "🔍";
    position: absolute;
    right: 25%;
    top: -5px;
    font-size: 1.5rem;
    animation: ${float} 3s ease infinite;
  }
`;

const SearchBox = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const SearchInput = styled.input`
  padding: 12px 20px;
  border: 3px solid #a4d8ff;
  border-radius: 50px;
  font-size: 1rem;
  width: 70%;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #5f27cd;
    box-shadow: 0 0 0 3px rgba(95, 39, 205, 0.2);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(45deg, #1dd1a1, #5f27cd);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-weight: bold;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(29, 209, 161, 0.4);
    animation: none;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ResultsContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const BookList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const BookItem = styled.li`
  background: #fff;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 0;
  animation-delay: ${props => props.delay || '0ms'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #1dd1a1, #5f27cd);
    border-radius: 15px 0 0 15px;
  }
`;

const BookTitle = styled.strong`
  color: #5f27cd;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

const BookAuthor = styled.span`
  color: #666;
  display: block;
  margin-bottom: 1rem;
  font-style: italic;
`;

const BookImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const NoResultsMessage = styled.p`
  text-align: center;
  color: #666;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 1.2rem;
  padding: 2rem;
`;

const MonsterDeco = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: ${props => props.color || '#feca57'};
  border-radius: ${props => props.circle ? '50%' : '5px'};
  opacity: 0.6;
  z-index: 0;
  
  &:nth-child(1) {
    bottom: 20px;
    right: 40px;
    width: 30px;
    height: 30px;
    background-color: #ff6b6b;
  }
  
  &:nth-child(2) {
    top: 50%;
    left: 20px;
    width: 20px;
    height: 40px;
    background-color: #feca57;
    border-radius: 10px;
  }
`;

const SearchBook = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

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
    <SearchContainer>
      <MonsterDeco circle color="#1dd1a1" />
      <MonsterDeco color="#5f27cd" />
      
      <SearchTitle>Search Your Books</SearchTitle>
      
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchBox>
      
      <ResultsContainer>
        {books.length > 0 ? (
          <BookList>
            {books.map((book, index) => (
              <BookItem key={book._id} delay={`${index * 100}ms`}>
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>by {book.author}</BookAuthor>
                <BookImage src={book.image} alt={book.title} />
              </BookItem>
            ))}
          </BookList>
        ) : (
          <NoResultsMessage>No books found. Try another search! 📚</NoResultsMessage>
        )}
      </ResultsContainer>
    </SearchContainer>
  );
};

export default SearchBook;