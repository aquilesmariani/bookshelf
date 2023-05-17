import React, { useEffect, useState, FC } from 'react'
import Image from 'next/image'
import { findCover, formatData } from '@/utils/formatData'
import { fetchBookData, fetchAuthorData } from '@/utils/api'
import { Book } from '@/pages'
import styles from '@/styles/BookList.module.css'

interface BookItemProps {
  selectedBook: string
}

export type SelectedBook = Book & {
  firstPublishYear: string
  description: string
  authorName: string
  authorBio: string
  cover: string | null
}

const BookItem: FC<BookItemProps> = ({ selectedBook }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedBookData, setSelectedBookData] = useState<Partial<SelectedBook>>({})

  useEffect(() => {
      const getBookData = async () => {
        setIsLoading(true)
        setSelectedBookData({})
        const bookData = await fetchBookData(selectedBook.replace('/works/', ''))
        const authorData = await fetchAuthorData(bookData.authors[0].author.key.replace('/authors/', ''))
        const bookCover = findCover(bookData.covers, selectedBook, [])
        const formattedData = formatData(bookData, authorData, bookCover)
        setSelectedBookData(formattedData)
        setIsLoading(false)
      }
      selectedBook && getBookData().catch(error => {
        console.error('Error fetching books:', error)
        setIsLoading(false)
      })
  }, [selectedBook])

  return (
    <>
      {isLoading ? (<div className={styles.loadingIndicator}></div>) :
        (<div className={styles.selectedBook}>
          <h3>{selectedBookData.title}</h3>
          <div className={styles.selectedBookData}>
            {
              selectedBookData.cover ?
                <img className={styles.selectedBookCover} src={selectedBookData.cover} alt="Book Cover" /> :
                <Image className={styles.selectedBookCover} src='/bookCoverPlaceholder.png' alt="No cover image" height={150} width={120} />
            }
            <div className={styles.selectedBookDetails}>
              <p>First Publish Year: {selectedBookData.firstPublishYear}</p>
              <p>Description: {selectedBookData.description}</p>
              <p>Author: {selectedBookData.authorName}</p>
              <p>Bio: {selectedBookData.authorBio}</p>
            </div>
          </div>
        </div>)}
    </>
  )
}

export default BookItem
