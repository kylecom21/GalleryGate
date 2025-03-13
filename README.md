#  GalleryGate

A web-based platform that allows users to explore, discover, and create their own art exhibitions using artworks from the **Metropolitan Museum of Art** and the **Rijksmuseum**.

---

## 🌍 Deployment

### Live Demo: [gallerygate.netlify.app](https://gallerygate.netlify.app)

---

## 📽️ Video Walkthrough

_A video walkthrough highlighting key features of the platform is available here:_
[Video Link](https://youtu.be/QdHtOxT0ack)

## 🔍 What is GalleryGate?

GalleryGate is a **virtual exhibition curator**, allowing users to browse famous artworks, save their favorites, and organise them into **custom exhibitions**.  
The goal is to provide an engaging way to explore art collections and curate personalised galleries.  

---

## 🛠️ How It Works

1. **Search & Discover** – Users can browse artworks from **two major museums**, filtering by artist, title, and date.  
2. **Create Exhibitions** – Users can add artworks to their own virtual gallery spaces.  
3. **Save & Manage** – Exhibitions are **saved in the browser's local storage**, allowing users to revisit their curated collections.  
4. **Artwork Details** – Clicking on an artwork opens a modal which shows some information.  


---

## 🏗️ How It Was Built

### **Tech Stack**
- **Frontend:** React + JavaScript + Axios + Swiper
- **Styling:** CSS  
- **Extras:** dotenv + Vite + 


### **APIs Used**
- **Metropolitan Museum of Art API** – Provides access to thousands of artworks.  
- **Rijksmuseum API** – Delivers data on Dutch masterpieces.  

### **Key Challenges & Solutions**
- **Handling API inconsistencies** – The two museum APIs structure their data differently. So I had to make sure my code catered to both APIs.
- **Managing state persistence** – Used **local storage** to save exhibitions, ensuring users don’t lose progress when refreshing.  

##  Features

- Browse artworks from the **Metropolitan Museum of Art** and the **Rijksmuseum**.
- Filter and sort artworks by title, date, and artist.
- Spotlight feature showcasing a random artwork.
- Create, manage, and delete custom exhibitions.
- View details of each artwork in a modal popup.

---

## 💾 Data Persistence  

- Your exhibitions are **automatically saved** in your browser’s **local storage**.  
- This means your exhibitions **will still be there** even if you close and reopen the site.  
- However, clearing your browser’s cache **will remove** all saved exhibitions.  
- Your exhibitions **won’t sync across different devices or browsers**.

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

