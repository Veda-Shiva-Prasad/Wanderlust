# Wanderlust - Airbnb Clone

Wanderlust is a web application inspired by Airbnb that allows users to explore, list, and manage rental properties.
This project is built using the MERN stack with EJS for templating.

## Features

- Create, edit, and delete property listings
- Upload images for each listing
- Search and filter properties
- User authentication (Login & Signup)
- Cloud storage integration for images
- Responsive UI with EJS templates

## Tech Stack

- Frontend: EJS, Bootstrap, CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Passport.js
- Cloud Storage: Cloudinary

## Installation & Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add the following:

   ```
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SESSION_SECRET=your_secret_key
   ```

3. Start the development server

   ```bash
   npm start
   ```

## Future Improvements

- Add maps for location-based search
- Payment gateway integration
- Mobile-first responsive UI
- User reviews and ratings

## Author

Veda Shiva Prasad
Email: [vedashivaprasad97@gmail.com]

