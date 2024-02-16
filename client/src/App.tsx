import "./App.scss";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import ComparePage from "./pages/ComparePage";
import KothPage from "./pages/KothPage";
import PicksPage from "./pages/PicksPage";
import ProposalsPage from "./pages/ProposalsPage";
import RecordsPage from "./pages/RecordsPage";
import AdminPage from "./pages/AdminPage";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import RequestStatusModal from "./components/RequestStatusModal/RequestStatusModal";

function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const { result, message, showStatus } = useSelector(
    (state: RootState) => state.requestSlice,
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    checkSize();

    window.addEventListener("resize", checkSize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  if (isMobile) {
    return (
      <main className={`${user?.preferredTheme || "eagles"}`}>
        <BrowserRouter>
          <RequestStatusModal
            showStatus={showStatus}
            result={result}
            message={message}
          />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route path="/compare" element={<ComparePage />}></Route>
            <Route path="/kingofthehill" element={<KothPage />}></Route>
            <Route path="/picks" element={<PicksPage />}></Route>
            <Route path="/suggestions" element={<ProposalsPage />}></Route>
            <Route path="/records" element={<RecordsPage />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    );
  } else {
    return (
      <div className="devStatus">Tablet and Desktop View in Development</div>
    );
  }
}

export default App;
