import React, { useState, ChangeEvent, FormEvent } from 'react'
import styles from '@/styles/SearchBar.module.css'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.length >= 3) onSearch(query)
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

export default SearchBar