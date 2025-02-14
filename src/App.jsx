import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Footer from "./Components/Footer";
import Artworks from "./Components/Artworks";
import Exhibtitons from "./Components/Exhibitions";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/artworks" element={<Artworks />}></Route>
        <Route path="/exhibitions" element={<Exhibtitons/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
