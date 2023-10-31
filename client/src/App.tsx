import "./App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import HomePage from "./pages/HomePage"
import ComparePage from "./pages/ComparePage"
import KothPage from "./pages/KothPage"
import PicksPage from "./pages/PicksPage"
import PostsPage from "./pages/PostsPage"
import RecordsPage from "./pages/RecordsPage"
// import AuthModal from "./components/AuthModal"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/compare" element={<ComparePage />}></Route>
        <Route path="/kingofthehill" element={<KothPage />}></Route>
        <Route path="/picks" element={<PicksPage />}></Route>
        <Route path="/suggestions" element={<PostsPage />}></Route>
        <Route path="/records" element={<RecordsPage />}></Route>
      </Routes>
      {/* AuthModal to be moved to suggestions page (conditional render */}
      {/* <AuthModal /> */}
    </BrowserRouter>
  )
}

export default App
