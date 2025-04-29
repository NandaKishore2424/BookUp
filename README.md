# BookUp

## Your Personal Digital Bookshelf

BookUp is a modern web application that connects authors and readers in a vibrant literary community. Authors can publish their works, while readers can discover new books and share their thoughts through reviews.

### Features

Dual User Roles: Sign up as either an author or reader

Book Management: Authors can add, edit, and remove their books

Book Discovery: We can browse the complete collection of available books

Review System: Readers can leave ratings and written reviews

Dark Mode: Toggle between light and dark modes for comfortable reading

Responsive Design: Works seamlessly on both mobile and desktop

### Tech Stack

Frontend: React, React Router, Context API

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

Styling: Custom CSS with responsive design

## Installation

1. Clone the repository

```
git clone https://github.com/NandaKishore2424/BookUp.git
cd BookUp
```

2. Setup backend

```
cd server
npm install
```

3. Setup frontend
```
cd ../client
npm install
```

4. Configure environment variables - create .env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookup
```

And then in server run "npm run dev" and for client - "npm start"



