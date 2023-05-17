import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  BookList,
  BookItem,
  Modal,
  SearchBar,
} from '@/components'

global.fetch = jest.fn()

describe('BookList', () => {
  test('renders list of books', async () => {
    const books = [
      {
        key: '/works/OL1100007W',
        title: 'Book 1',
        authors: [{ key: '/authors/OL113611A' }],
        description: 'Description 1',
      },
      {
        key: '/works/OL52266W',
        title: 'Book 2',
        authors: [{ key: '/authors/OL13066A' }],
        description: 'Description 2',
      },
    ]
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(books),
    })

    render(<BookList list={books} />)

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument()
      expect(screen.getByText('Book 2')).toBeInTheDocument()
    })
  })
})

describe('Modal', () => {
  test('renders modal content', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })
})

describe('SearchBar', () => {
  test('triggers onSearch callback on search button click', () => {
    const onSearch = jest.fn()

    render(<SearchBar onSearch={onSearch} />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'search query' } })
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(onSearch).toHaveBeenCalledWith('search query')
  })
})


test('renders BookItem correctly', () => {
  const book = {
    key: '1',
    title: 'Test Book',
    authors: [{ name: 'Test Author' }],
    description: 'Test Description',
  }

  const { container } = render(<BookItem selectedBook={book.key} />)
  expect(container.firstChild).toMatchSnapshot()
})
