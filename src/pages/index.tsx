import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import SearchBar from '@/components/SearchBar'
import BookList from '@/components/BookList'

export interface Book {
  key: string
  cover_id?: number
  cover_i?: number
  title: string
  authors?: { name: string }[]
  first_publish_year?: number
}

const BookShelf: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])

  const fetchData = async (url: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      setFilteredBooks(data.docs || data.works || [])
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData('https://openlibrary.org/subjects/science.json')
  }, [])

  useEffect(() => {
    if (searchQuery !== '') fetchData(`https://openlibrary.org/search.json?q=${searchQuery}`)
  }, [searchQuery])

  const handleSearch = (name: string) => {
    setSearchQuery(name)
  }

  return (
    <div>
      <h2 className={styles.title}>Bookshelf</h2>
      <SearchBar onSearch={handleSearch} />
      {
        isLoading ? (
          <div className={styles.gifContainer}>
            <Image
              src='/bookLoading.gif'
              width={200}
              height={200}
              alt='Loading...'
            />
          </div>
        )
          : <BookList list={filteredBooks} />
      }
    </div>
  )
}

export default BookShelf
