export const findCover = (covers, selectedBook, bookList) => {
  if (covers) return `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
  const bookFromList = bookList.find(book => book.key === selectedBook)
  return bookFromList ? `https://covers.openlibrary.org/b/id/${bookFromList?.covers[0]}-L.jpg` : null
}

export const formatData = ({bookData, author, cover }) => ({
    title: bookData.title || 'Unknown Title',
    firstPublishYear: bookData.first_publish_year || 'No publish date available for this book',
    cover,
    description: typeof bookData.description === 'object' ? bookData.description.value || 'No description available for this book' : bookData.description || 'No description available for this book',
    authorName: author.name || 'Unknown Author',
    authorBio: typeof author.bio === 'object' ? author.bio.value || 'No bio available for this author' : author.bio || 'No bio available for this author',
  })
