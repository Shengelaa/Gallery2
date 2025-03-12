import data from "./data.json";
import "./App.css";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const handleFilterClick = (category) => {
    setFilter(category);
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleImageClick = (image_url) => {
    setLightboxImage(image_url);
    setIsLightboxVisible(true);
  };


  const closeLightbox = () => {
    setIsLightboxVisible(false);
  };


  const filteredData = data.filter((item) => {
    const categoryMatches =
      filter === "All" || item.category.toLowerCase() === filter.toLowerCase();
    const searchMatches = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatches && searchMatches;
  });

  return (
    <>
      <div className='inputDiv'>
        <input
          type='text'
          className='input'
          placeholder='Search Bar'
          id='searchBar'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className='buttonsDiv'>
        <button className='buttons' onClick={() => handleFilterClick("Cat")}>
          Cats
        </button>
        <button className='buttons' onClick={() => handleFilterClick("Dog")}>
          Dogs
        </button>
        <button
          className='buttons'
          onClick={() => handleFilterClick("Hamster")}>
          Hamsters
        </button>
        <button className='buttons' onClick={() => handleFilterClick("All")}>
          All
        </button>
      </div>

      <div className='mainDiv'>
        {filteredData.map((item) => (
          <div className='card' key={`${item.title}-${item.category}`}>
            <img
              src={item.image_url}
              alt={item.title}
              onClick={() => handleImageClick(item.image_url)}
            />
            <h3>{item.title}</h3>
            <p>{item.category}</p>
            <a href={item.desc} target='_blank' rel='noopener noreferrer'>
              More Info
            </a>
          </div>
        ))}
      </div>


      {isLightboxVisible && (
        <div className='overlay' onClick={closeLightbox}>
          <img
            src={lightboxImage}
            alt='Full view'
            className='full-image'
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
}

export default App;
