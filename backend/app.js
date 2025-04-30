const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
//Connect to Mongodb
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("connected to Mongo db"))
    .catch((error) => console.log("Error in Connection", error));

//Design Book Schema
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: String,
    image: String
})
// Design Book Model
const Book = mongoose.model('MyBook', BookSchema)

app.post('/books', async (req, res) => {
    try {
        const newbook = new Book(req.body);
        await newbook.save();
        res.status(200).send('Book Added')
    } catch (error) {
        res.status(500).send('Sever Error')
    }
})

app.get('/books', async (req, res) => {
    try {
        const Books = await Book.find();
        res.json(Books);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
})

app.get('/search', async (req, res) => {
    const { title } = req.query;
    try {
        const books = await Book.find({ title: { $regex: title, $options: 'i' } }); // case-insensitive search
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) return res.status(404).send('Book not found');
      res.send('Book deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, date, image } = req.body;
  
    try {
      const updatedBook = await Book.findByIdAndUpdate(id, { title, author, date, image }, { new: true });
      if (!updatedBook) {
        return res.status(404).send({ message: 'Book not found' });
      }
      res.status(200).send({ message: 'Book updated successfully', data: updatedBook });
    } catch (error) {
      res.status(500).send({ message: 'Error updating book', error });
    }
  });

app.listen(9000, () => {
    console.log('Server is Running on port 9000')
})
