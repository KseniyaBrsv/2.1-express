const express = require('express')
const { v4: uuid } = require('uuid')

class Book {
  constructor (
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    id = uuid()
  ) {
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
    this.id = id
  }
};

const stor = {
  book: [
    new Book(),
    new Book()
  ]
}

const app = express()
app.use(express.json())

// авторизация пользователя
app.post('/api/user/login', (req, res) => {
  const login = { id: 1, mail: 'test@mail.ru' }

  res.status(201)
  res.json(login)
})

// получить все книги
app.get('/api/books', (req, res) => {
  const { book } = stor
  res.json(book)
})

// получить книгу по ID
app.get('/api/books/:id', (req, res) => {
  const { book } = stor
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    res.json(book[idx])
  } else {
    res.status(404)
    res.json('Code: 404')
  }
})

app.post('/api/books', (req, res) => {
  const { book } = stor
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  } = req.body

  const newBook = new Book(title, description,
    authors,
    favorite,
    fileCover,
    fileName)
  book.push(newBook)

  res.status(201)
  res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
  const { book } = stor
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  } = req.body
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    book[idx] = {
      ...book[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
    }

    res.json(book[idx])
  } else {
    res.status(404)
    res.json('Code: 404')
  }
})

app.delete('/api/books/:id', (req, res) => {
  const { book } = stor
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    book.splice(idx, 1)
    res.json('ok')
  } else {
    res.status(404)
    res.json('Code: 404')
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
