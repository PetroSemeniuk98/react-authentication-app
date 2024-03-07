import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import LoginPages from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <main className="App">
      {}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </main>
  );
}

export default App;
