# Bookshelf

Bookshelf is a web application that allows users to search for books and view their details. It uses the Open Library API to fetch book data and provides a user-friendly interface for browsing and exploring books.

## Try it
You can access the working build through the following link: https://bookshelf-tpsx.vercel.app/

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/aquilesmariani/bookshelf.git
   ```
2. Navigate to the project directory:

    ```shell
    cd bookshelf
    ```
3. Install dependencies:

    ```shell
    npm install
    ```
4. Start the development server:

    ```shell
    npm run dev
    ```
The website will be accessible at http://localhost:3000.

## Tests
   ```shell
   npm run test
   ```

## Usage
Upon opening the website, you will see a list of books related to the "Science" subject.
Use the search bar at the top to search for books by title, author, or any keyword.
The search results will be displayed dynamically when you click on "Search" button or hitting the "Enter" keyword.
Click on a book to view its details in a modal window.
Pagination controls at the bottom allow you to navigate through the search results.
Enjoy exploring and discovering new books!

## Technologies Used
- React: v18.2.6
- Next.js: v13.4.2
- TypeScript: v5.0.4
- Jest: v29.5.0
- React Testing Library: v14.0.0
- CSS Modules: v8.4.14

## Features that could be implemented in a future:
- Internationalization (i18n)
- Global state management (Redux)
- Formatter (prettier)

## TODOs:
- Add filters by genre
- Add more functional testing
- Find a better way to structure typing
- Replace absolute units to start using relative units in CSS
- Show error messages in a proper way

## Folder Structure
The project follows the following folder structure:

```shell
├── public/              # Static assets and images
├── src
    ├── __tests__/       # Contains functionality, snapshot and components testing
    ├── components/          # Contains reusable components
    ├── pages/               # Contains Next.js page components
    ├── styles/              # CSS modules and global styles
    ├── utils/               # Utility functions
├── .gitignore           # Git ignore file
├── jest.config.mjs      # Jest configuration file
├── next.config.js       # Next.js configuration file
├── package.json         # NPM dependencies and scripts
├── README.md            # Project README
├── tsconfig.json        # TypeScript configuration file
└── ...                  # Other project files
```

## Contact Information
For any inquiries or support, please contact me through any of the following apps:
- Gmail: aquilesmariani@gmail.com
- Linkedin: https://www.linkedin.com/in/aquilesmariani/?locale=en_US
- GitHub: https://github.com/aquilesmariani