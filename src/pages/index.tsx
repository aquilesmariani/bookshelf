import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import styles from '@/styles/Home.module.css'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for a book..."
        value={query}
        onChange={handleInputChange}
      />
      <button className={styles.searchButton} type="submit">
        Search
      </button>
    </form>
  )
}

interface Book {
  key: string
  cover_id?: number
  cover_i?: number
  title: string
  authors?: { name: string }[]
  first_publish_year?: number
}

const BookList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://openlibrary.org/subjects/science.json')
      const data = await response.json()
      setFilteredBooks(data.works)
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${searchQuery}`
        )
        const data = await response.json()
        setFilteredBooks(data.docs)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    if (searchQuery !== '') {
      fetchBooks()
    } else {
      setFilteredBooks([])
    }
  }, [searchQuery])

  const handleSearch = (name: string) => {
    setSearchQuery(name)
  }

  return (
    <div>
      <h2>Book List</h2>
      <SearchBar onSearch={handleSearch} />
      <ul className={styles.bookList}>
        {filteredBooks.map((book: Book) => (
          <li key={book.key} className={styles.bookItem}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_id || book.cover_i}-M.jpg`}
              alt="Book Cover"
              className={styles.bookCover}
            />
            <div>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              {book.authors && (
                <p className={styles.bookDetails}>Author: {book.authors[0].name}</p>
              )}
              {book.first_publish_year && (
                <p className={styles.bookDetails}>Publication Year: {book.first_publish_year}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookList
