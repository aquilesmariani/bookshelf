import React, { useState } from 'react'
import Image from 'next/image'
import Modal from './Modal'
import BookItem from './BookItem'
import styles from '@/styles/BookList.module.css'
import { Book } from '@/pages'

interface BookListProps {
  list: Book[]
}

const BookList: React.FC<BookListProps> = ({ list }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedBook, setSelectedBook] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(12)

  const openModal = (selectedBook: string) => {
    setSelectedBook(selectedBook)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const booksToShow = list.slice(firstIndex, lastIndex)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className={styles.bookListContainer}>
      <Modal isOpen={showModal} onClose={closeModal}>
        <BookItem selectedBook={selectedBook} />
      </Modal>
      {(booksToShow.length < 1) ?
        <div>No books found</div> :
        (
          <>
            <ul className={styles.bookList}>
              {booksToShow.map((book: Book) => (
                <li key={book.key} className={styles.bookItem} onClick={() => openModal(book.key)}>
                  {
                    (book.cover_id || book.cover_i) ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_id || book.cover_i}-M.jpg`}
                        alt="Book Cover"
                        className={styles.bookCover}
                      />
                    ) : <Image src="/bookCoverPlaceholder.png" alt="Cover Image" width={150} height={200} className={styles.bookCover} />
                  }
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
            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p className={styles.pageNumber}>Page {currentPage}</p>
              <button
                className={styles.paginationButton}
                onClick={() => paginate(currentPage + 1)}
                disabled={lastIndex >= list.length}
              >
                Next
              </button>
            </div>
          </>
        )}
    </div>
  )
}

export default BookList