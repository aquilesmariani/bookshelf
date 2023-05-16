import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import styles from '@/styles/BookList.module.css'
import { Book } from '@/pages'

interface BookListProps {
    list: Book[]
  }
  
  const BookList: React.FC<BookListProps> = ({ list }) => {
    return (
      <div>
        {(list.length < 1) ?
          <div>No books found</div> :
          (<ul className={styles.bookList}>
            {list.map((book: Book) => (
              <li key={book.key} className={styles.bookItem}>
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
          )}
      </div>
    )
  }

  export default BookList