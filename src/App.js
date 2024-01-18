import "./App.css";
import Navbar from "./components/Nav_bar/nav_bar";
import Homepage from "./pages/Home_page";
import Footer from "./components/Footer/footer";

function App() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
