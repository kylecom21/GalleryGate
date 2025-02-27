#  GalleryGate

A web-based platform that allows users to explore, discover, and create their own art exhibitions using artworks from the **Metropolitan Museum of Art** and the **Rijksmuseum**.

---

## 📽️ Video Walkthrough

_A video walkthrough highlighting key features of the platform is available here:_
[Video Link](https://youtu.be/QdHtOxT0ack)

---

##  Features

- Browse artworks from the **Metropolitan Museum of Art** and the **Rijksmuseum**.
- Filter and sort artworks by title, date, and artist.
- Spotlight feature showcasing a random artwork.
- Create, manage, and delete custom exhibitions.
- View details of each artwork in a modal popup.

---

## 🛠️ Running the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kylecom21/Exhibition-Curation-Platform.git
cd Exhibition-Curation-Platform
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Go to this URL https://www.rijksmuseum.nl/en/rijksstudio/my/profile create an account to get your api key.
Create a `.env` file in the root directory and add:
```env
VITE_RIJKS_API_KEY=YOUR_API_KEY
```

### 4️⃣ Start the Development Server
```sh
npm run dev
```
The app should now be running at `http://localhost:5173/`

---

## 🌍 Deployment

### Live Demo: [gallerygate.netlify.app](https://gallerygate.netlify.app)


