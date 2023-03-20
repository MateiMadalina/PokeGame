import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  let readAPI = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/location");
    const data = await response.json();
    setData(data);
    console.log(data)
  };

  useEffect(() => {
    readAPI();
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
