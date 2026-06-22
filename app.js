let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "David Thomas", genre: "Tech", available: true },
  { id: 2, title: "Educated", author: "Tara Westover", genre: "Memoir", available: true },
  { id: 3, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", available: false },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", available: true },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", available: true },
];

let nextId = 6; // use this for generating new ids

const express = require("express")

const app = express();

app.use(express.json());
app.get("/", (req,res)=> res.send("Books API is running" ));
app.listen(8080, () => console.log("Server running on port 8080"));
app.get("/api/books", (req, res) => res.json(books));
app.get("/api/books/:id", (req, res) => { 
    const bookId = Number(req.params.id);
    const foundBook = books.find((book) => book.id === bookId);
    if (!foundBook) {
        return res.status(404).json({error: "Book not found"})
    }
    res.json(foundBook);
 })
app.post("/api/books", (req, res) => {
    const {title, author, genre } = req.body;
    const newBook = {
        id: nextId,
        title: title,
        author: author,
        genre: genre,
        available: true
    };
    nextId++;
    books.push(newBook);
    res.status(201).json(newBook);
 })
app.patch("/api/books/:id", (req, res) => {
    const bookId = Number(req.params.id);
    const foundBook = books.find((book) => book.id === bookId);
    if (!foundBook) {
        return res.status(404).json({error: "Book not found"})
    }
    Object.assign(foundBook, req.body);

    res.status(200).json(foundBook);
 })
app.delete("/api/books/:id", (req, res) => { 
    const bookId = Number(req.params.id);
    const bookIndex =   books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({error: "Book not found"})
    } 
    books.splice(bookIndex, 1);

    res.sendStatus(204);
 })