import type { SelectedBook } from '@/components/BookItem'
export const findCover = (covers: Array<string>, selectedBook: string, bookList: any[]) => {
  if (covers) return `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
  const bookFromList = bookList.find((book: { key: string }) => book.key === selectedBook)
  //TODO: get data from book search list to use that cover id in case no covers on work API call
  return bookFromList ? `https://covers.openlibrary.org/b/id/${bookFromList?.covers[0]}-L.jpg` : null
}

export const formatData = (
  bookData: {
    key: string,
    title: string
    first_publish_year: string
    description?: string | { value: string }
  },
  author: {
    name: string,
    bio: string | { value: string }
  },
  cover: string | null
): SelectedBook => ({
  key: bookData.key,
  title: bookData.title || 'Unknown Title',
  firstPublishYear: bookData.first_publish_year || 'No publish date available for this book',
  cover,
  description: typeof bookData.description === 'object' ? bookData.description.value || 'No description available for this book' : bookData.description || 'No description available for this book',
  authorName: author.name || 'Unknown Author',
  authorBio: typeof author.bio === 'object' ? author.bio.value || 'No bio available for this author' : author.bio || 'No bio available for this author',
})
