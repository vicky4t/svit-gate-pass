import { Routes, Route } from "react-router-dom";
import Signup from "./components/Login/Signup";
import Signin from "./components/Login/Signin";


function App() {
  return (
    <>
     
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      
    </>
  );
}

export default App;
