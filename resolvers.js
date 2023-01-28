import bookModel from "./models/book.js";

export default {
  createBook: async function ({bookInput}, req) {
    const book = new bookModel({
      name: bookInput.name,
      genre: bookInput.genre
    })
    return await book.save()
  },
  books: async function (_args, req) {
    const books = await bookModel.find()
    return books
  },
  book: async function ({id}, req) {
    const book = await bookModel.findOne({_id: id})
    if (!book) {
      return new Error("Book not found")
    }
    return book
  }
}
