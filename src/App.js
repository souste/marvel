import Characters from "./components/Characters";
import SingleCharacter from "./components/SingleCharacter";
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
