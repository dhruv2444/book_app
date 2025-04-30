import React from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Fun animations
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const MonsterFormContainer = styled.div`
  background: linear-gradient(135deg, #f9f7ff 0%, #e8d6ff 100%);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
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
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="5" fill="%23ff9ff3"/><circle cx="50" cy="30" r="7" fill="%23feca57"/><circle cx="80" cy="20" r="4" fill="%231dd1a1"/><circle cx="30" cy="60" r="6" fill="%23ff6b6b"/><circle cx="70" cy="70" r="5" fill="%235f27cd"/></svg>');
    opacity: 0.3;
    z-index: 0;
  }
`;

const MonsterTitle = styled.h1`
  color: #5f27cd;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  font-size: 2.5rem;
  text-shadow: 3px 3px 0 rgba(255, 107, 107, 0.3);
  
  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 10px;
    background: linear-gradient(90deg, #ff9ff3, #feca57, #ff6b6b, #1dd1a1, #5f27cd);
    margin: 10px auto;
    border-radius: 5px;
  }
`;

const MonsterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: #5f27cd;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
`;

const MonsterInput = styled.input`
  padding: 12px 15px;
  border: 3px solid #d6a2ff;
  border-radius: 10px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  
  &:focus {
    outline: none;
    border-color: #5f27cd;
    box-shadow: 0 0 0 3px rgba(95, 39, 205, 0.3);
    background-color: white;
  }
`;

const MonsterButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.6);
    animation: none;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

// Decorative elements
const MonsterDeco = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${props => props.color || '#ff9ff3'};
  border-radius: ${props => props.circle ? '50%' : '10px'};
  opacity: 0.6;
  z-index: 0;
  
  &:nth-child(1) {
    top: 20px;
    left: 20px;
    width: 30px;
    height: 30px;
    background-color: #feca57;
  }
  
  &:nth-child(2) {
    bottom: 40px;
    right: 30px;
    width: 40px;
    height: 40px;
    background-color: #1dd1a1;
  }
`;

const AddBook = () => {
    const handleBook = async(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const author = e.target.author.value;
        const date = e.target.date.value;
        const image = e.target.image.value;
        const books = {title, author, date, image};
        await axios.post('https://book-app-wn8v.onrender.com/books', books);
        alert('Book Added Successfully');
    }
    
    return (
        <MonsterFormContainer>
            <MonsterDeco circle color="#ff9ff3" />
            <MonsterDeco color="#5f27cd" />
            <MonsterDeco circle color="#1dd1a1" />
            
            <MonsterTitle>Add Book Details</MonsterTitle>
            
            <MonsterForm onSubmit={handleBook}>
                <InputGroup>
                    <InputLabel>Title:</InputLabel>
                    <MonsterInput type='text' name='title' required />
                </InputGroup>
                
                <InputGroup>
                    <InputLabel>Author:</InputLabel>
                    <MonsterInput type='text' name='author' required />
                </InputGroup>
                
                <InputGroup>
                    <InputLabel>Date:</InputLabel>
                    <MonsterInput type='date' name='date' required />
                </InputGroup>
                
                <InputGroup>
                    <InputLabel>Image URL:</InputLabel>
                    <MonsterInput type='text' name='image' required />
                </InputGroup>
                
                <MonsterButton type='submit'>Add Book</MonsterButton>
            </MonsterForm>
        </MonsterFormContainer>
    )
}

export default AddBook;