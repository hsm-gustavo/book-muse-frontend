# BookMuse - Your Reading Journey Companion

BookMuse is a modern, full-stack book review and social reading platform designed to help book lovers discover, track, and share their reading journeys. Built with Next.js 15 and React 19, it offers a seamless and engaging user experience, consuming data from a powerful NestJS REST API.

## ✨ Features

BookMuse provides a rich set of functionalities to enhance your reading experience:

- **User Authentication**: Secure sign-up and login processes to manage your personal reading space.
- **Personalized Profiles**: Create and manage your user profile, including a customizable profile picture.
- **Book Search & Discovery**: Search for millions of books by title or author from the vast Open Library collection.
- **Detailed Book Pages**: View comprehensive information about each book, including descriptions, publication details, and cover art.
- **Reading Status Tracking**: Mark books as "Currently Reading," "Read," "Want to Read," or "Abandoned" to keep your reading list organized.
- **Book Reviews**: Write and submit your own reviews, rate books, and see what others think.
- **Review Liking**: Express your appreciation for reviews by liking them.
- **Social Features**:
  - **User Search**: Find other BookMuse users by name or email.
  - **Follow/Unfollow**: Connect with friends and other readers to see their activity.
  - **Follower/Following Counts**: See how many people you follow and who follows you.
- **Responsive Design**: Enjoy a consistent and beautiful experience across all devices.
- **Animated UI**: Smooth transitions and subtle animations powered by Framer Motion for a delightful user interface.
- **Robust Error Handling**: Dedicated Not Found pages and clear error messages for a better user experience.

## 🎨 Design System

BookMuse leverages a modern and aesthetically pleasing design system:

- **Shadcn/ui**: Utilizes the highly customizable and accessible UI components from `shadcn/ui` for a consistent and polished look.
- **Custom Theming**: Features a unique pastel color palette with vibrant gradients (purple, pink, blue, green, yellow, orange) to create a soft yet dynamic visual appeal.
- **Motion**: Integrates `motion` for fluid page transitions, card animations, and interactive button effects, enhancing the overall user experience.
- **Lucide React Icons**: Uses a comprehensive set of clear and modern icons from `lucide-react`.

## 🚀 Technologies Used

**Frontend:**

- **Next.js 15**: The React framework for production, leveraging the App Router for efficient routing, data fetching, and server components.
- **React 19**: The latest stable version of React, providing powerful UI capabilities.
- **TypeScript**: For type-safe code, improving maintainability and reducing bugs.
- **Tailwind CSS**: A utility-first CSS framework for rapid and flexible styling.
- **Shadcn/ui**: Reusable UI components built on Tailwind CSS and Radix UI.
- **Tanstack Query**: A React Hooks library for data fetching, caching, and revalidation, used for efficient data management (e.g., pagination, profile data).
- **Motion**: A production-ready motion library for React, used for animations and transitions.
- **zod**: A TypeScript-first schema declaration and validation library, used with RHF for form validation, ensuring type-safe and robust user input handling.
- **React Hook Form (RHF)**: A performant, flexible library for building forms in React, offering minimal re-renders and seamless integration with UI libraries and validation tools.

**Backend (API - separate project):**

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Database**: PostgreSQL
- **Cloud Storage**: Cloudflare's R2

## ⚙️ Getting Started

To run BookMuse locally, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/hsm-gustavo/book-muse-frontend
    cd bookmuse-frontend
    ```

2.  **Install dependencies**:

    ```bash
    npm install

    # or

    yarn install

    # or

    pnpm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root of the project and add your API URL:

    ```
    API_URL=http://localhost:3001/api/v1 # Or your deployed backend URL
    ```

4.  **Run the development server**:

    ```bash
    npm run dev

    # or

    yarn dev

    # or

    pnpm dev
    ```

5.  **Open in your browser**:
    Navigate to `http://localhost:3000` (or the port displayed in your terminal) to see the application.

## 💡 Future Enhancements

- **Book Details Enrichment**: Integrate more data sources for richer book information (e.g., Goodreads, LibraryThing).
- **Reading Progress**: Allow users to track specific reading progress (e.g., page number, percentage).
- **Book Shelves/Collections**: Enable users to create custom book collections.
- **Notifications**: Implement notifications for new followers, likes on reviews, etc.
- **Search Filters**: Add advanced filters for book search (genre, publication year, etc.).
- **Admin Dashboard**: A dedicated section for administrators to manage users and content.
- **Internationalization (i18n)**: Support for multiple languages.
