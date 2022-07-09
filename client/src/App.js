import "./App.css";
import Header from "./Components/Header";
import Wallpaper from "./Components/Home/Wallpaper";
import QuickSearch from "./Components/Home/QuickSearch";
import Filter from "./Components/Filter/Filter";
import Details from "./Components/Details";
import HeaderCheck from "./Components/HeaderCheck";
function App() {
  return (
    <div className="App">
      <HeaderCheck />
      <Wallpaper />
      <QuickSearch />
    </div>
  );
}

export default App;
