export const fetchBookData = async (bookKey: string) => {
  const url = `https://openlibrary.org/works/${bookKey}.json`
  const response = await fetch(url)
  const bookData = await response.json()
  return bookData
}

export const fetchAuthorData = async (authorKey: string) => {
  const url = `https://openlibrary.org/authors/${authorKey}.json`
  const response = await fetch(url)
  const bookData = await response.json()
  return bookData
}
