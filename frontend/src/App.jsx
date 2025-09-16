import './index.css'

// src/App.jsx
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
      <Home />
    
    </div>
  );
}

export default App;

