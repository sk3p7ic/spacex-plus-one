import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/Home";

export default function App() {
  return (
    <div>
      <Navbar height={60} />
      <HomePage />
    </div>
  );
}
