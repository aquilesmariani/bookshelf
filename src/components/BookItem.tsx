import React, { useEffect, useState, FC } from 'react'
import { Book } from '@/pages'
import styles from '@/styles/BookList.module.css'

interface BookItemProps {
  selectedBook: string
}

const BookItem: FC<BookItemProps> = ({ selectedBook }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedBookData, setSelectedBookData] = useState<Partial<Book>>({})

  useEffect(() => {
    try {
      const getBookData = async () => {
        setSelectedBookData({})
        setIsLoading(true)
        const responseBook = await fetch(`https://openlibrary.org${selectedBook}.json`)
        const bookData = await responseBook.json()
        const responseAuthor = await fetch(`https://openlibrary.org${bookData.authors[0].author.key}.json`)
        const authorData = await responseAuthor.json()
        setSelectedBookData({
          ...bookData,
          cover: `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg`,
          description: bookData.description?.value || bookData.description,
          authorName: authorData.name,
          authorBio: authorData.bio?.value || authorData.bio
        })
      }
      selectedBook && getBookData()
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedBook])

  return (
    <>
      {isLoading ? (<div className={styles.loadingIndicator}></div>) :
        (<div className={styles.selectedBook}>
          <h3>{selectedBookData?.title}</h3>
          <div className={styles.selectedBookData}>
            <img src={selectedBookData?.cover} alt="Book Cover" />
            <div className={styles.selectedBookDetails}>
              <p>First Publish Year: {selectedBookData?.first_publish_date || 'No publish date available for this book'}</p>
              <p>Description: {selectedBookData?.description || 'No description available for this book'}</p>
              <p>Author: {selectedBookData?.authorName}</p>
              <p>Bio: {selectedBookData?.authorBio || 'No bio available for this author'}</p>
            </div>
          </div>
        </div>)}
    </>
  );
};

export default BookItem;



