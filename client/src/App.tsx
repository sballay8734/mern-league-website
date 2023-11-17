import "./App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import HomePage from "./pages/HomePage"
import ComparePage from "./pages/ComparePage"
import KothPage from "./pages/KothPage"
import PicksPage from "./pages/PicksPage"
import PostsPage from "./pages/PostsPage"
import RecordsPage from "./pages/RecordsPage"
import ThemeTestPage from "./pages/ThemeTestPage"
import AdminPage from "./pages/AdminPage"
import Signin from "./pages/Signin/Signin"
import Signup from "./pages/Signup/Signup"
import PrivateRoute from "./components/PrivateRoute"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/compare" element={<ComparePage />}></Route>
        <Route path="/kingofthehill" element={<KothPage />}></Route>
        <Route path="/picks" element={<PicksPage />}></Route>
        <Route path="/suggestions" element={<PostsPage />}></Route>
        <Route path="/records" element={<RecordsPage />}></Route>
        <Route path="/theme" element={<ThemeTestPage />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
