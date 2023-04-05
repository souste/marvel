import Characters from "./components/Characters";
import SingleCharacter from "./components/SingleCharacter";
import SingleComic from "./components/SingleComic";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route
            path="/characters/:character_id"
            element={<SingleCharacter />}
          />
          <Route
            path="/characters/:character_id/comics/:comic_id"
            element={<SingleComic />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
