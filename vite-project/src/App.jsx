import data from "./data.json";
import "./App.css";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState("All");

  const handleFilterClick = (category) => {
    setFilter(category);
    console.log(category);
  };


  const filteredData = data.filter((item) => {

    if (filter === "All") {
      return true;
    }
 
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <>
      <div className='inputDiv'>
        <input
          type='text'
          className='input'
          placeholder='Search Bar'
          id='searchBar'
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
            <img src={item.image_url} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.category}</p>
            <a href={item.desc} target='_blank' rel='noopener noreferrer'>
              More Info
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
