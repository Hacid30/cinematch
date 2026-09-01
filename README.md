# CineMatch 

A modern and responsive movie discovery application built with **Next.js (App Router)**, **Tailwind CSS**, and **The Movie Database (TMDB) API**. Explore trending movies, filter by genres, watch official trailers, and check out the main cast details.

![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TMDB API](https://img.shields.io/badge/TMDB_API-v3-01b4e4?style=for-the-badge&logo=themoviedb)

---

## Features

- **Trending Movies Feed:** Fetches daily top trending movies using Server-Side Rendering (SSR).
- **Genre Filters:** Dynamic category filtering with a responsive `flex-wrap` layout for desktop and mobile accessibility.
- **URL-Based Pagination:** Persistent pagination synchronized with URL query parameters (`searchParams`), making every page and filter state fully shareable.
- **Detailed Movie View (`/movie/[id]`):**
  - Hero backdrop banner with gradient overlays.
  - Key metadata: rating scores, release date, runtime, and full overview.
  - **Main Cast Section:** Responsive grid displaying actor profile pictures, real names, and character roles.
  - **Official Trailer Player:** Embedded YouTube player (`iframe`) with automatic fallback logic to English if local trailer data is unavailable.
- **Responsive & Dark Mode UI:** Clean, dark-themed user interface optimized across all screen sizes.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Source:** [TMDB API](https://developer.themoviedb.org/)
- **Version Control:** Git & GitHub

---

## Getting Started

Follow these steps to run the project locally on your machine:

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/cinematch.git](https://github.com/your-username/cinematch.git)
cd cinematch
```

### 2. Install dependencies
```npm install``` 

### 3. Environment Variables
Create a .env.local file in the root directory and add your TMDB API Key:
```TMDB_API_KEY=your_tmdb_api_key_here```

### 4. Run the development server
````npm run dev```
Open http://localhost:3000 in your browser to view the application.

## Project Structure

cinematch/
├── public/              
├── src/
│   ├── app/
│   │   ├── globals.css  
│   │   ├── layout.js   
│   │   ├── page.js     
│   │   └── movie/
│   │       └── [id]/
│   │           └── page.js 
│   └── components/
│       ├── BackButton.js  
│       ├── GenreFilter.js 
│       ├── MovieCard.js   
│       └── Pagination.js  
├── .env.local          
└── package.json

## License
This project was built for educational and portfolio purposes.

## Author
Héctor Hacid Julio Meza
Junior Frontend Web Developer