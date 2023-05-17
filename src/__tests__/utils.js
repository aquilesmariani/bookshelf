import { findCover, formatData } from '@/utils/formatData'

describe('findCover', () => {
  it('returns the cover URL when covers array is provided', () => {
    const covers = [123456]
    const selectedBook = 'book1'
    const bookList = []

    const result = findCover(covers, selectedBook, bookList)

    expect(result).toBe('https://covers.openlibrary.org/b/id/123456-L.jpg')
  })

  it('returns the cover URL from the bookList when covers array is not provided', () => {
    const covers = null
    const selectedBook = 'book1'
    const bookList = [{ key: 'book1', covers: [789012] }]

    const result = findCover(covers, selectedBook, bookList)

    expect(result).toBe('https://covers.openlibrary.org/b/id/789012-L.jpg')
  })

  it('returns null when neither covers array nor bookList match the selected book', () => {
    const covers = null
    const selectedBook = 'book1'
    const bookList = [{ key: 'book2', covers: [345678] }]

    const result = findCover(covers, selectedBook, bookList)

    expect(result).toBe(null)
  })
})

describe('formatData', () => {
  const bookData = {
    title: 'Book Title',
    first_publish_year: 2000,
    description: 'Book description',
  }

  const author = {
    name: 'Author Name',
    bio: 'Author bio',
  }

  it('formats the data with all fields available', () => {
    const cover = 'https://covers.openlibrary.org/b/id/123456-L.jpg'

    const result = formatData({ bookData, author, cover })

    expect(result).toEqual({
      title: 'Book Title',
      firstPublishYear: 2000,
      cover: 'https://covers.openlibrary.org/b/id/123456-L.jpg',
      description: 'Book description',
      authorName: 'Author Name',
      authorBio: 'Author bio',
    })
  })

  it('formats the data with missing fields', () => {
    const cover = null
    const author = {}

    const result = formatData({ bookData, author, cover })

    expect(result).toEqual({
      title: 'Book Title',
      firstPublishYear: 2000,
      cover: null,
      description: 'Book description',
      authorName: 'Unknown Author',
      authorBio: 'No bio available for this author',
    })
  })
})
