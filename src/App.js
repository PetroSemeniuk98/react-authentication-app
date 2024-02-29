import { Route, Routes } from "react-router";
import { Register } from "./components/register/Register";

import SignIn from "./components/signIn/SignIn";
import AuthDetailsUser from "./components/authDetailsUser/AuthDetailsUser";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signedIn" element={<AuthDetailsUser />} />
      </Routes>
    </main>
  );
}

export default App;
