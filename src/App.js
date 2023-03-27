import SearchBar from "./SearchBar";
import { useState } from "react";
import searchAPIs from "./api";

function App() {
  const [characters, setCharacters] = useState([]);
  const handleSubmit = async (term) => {
    const result = await searchAPIs.searchCharacters(term);
    setCharacters(result);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
