import { Routes, Route } from "react-router-dom";
import {
  HomePagee,
  SignInPage,
  SignUpPage,
  HomePage,
  ProfilePage,
} from "./pages";
import { useAuthPersist } from "./hooks";
import { PrivateRoute } from "./routes/privateRoutes"
import { LoadingAnimation, ToastWrapper } from "./components";

function App() {
  useAuthPersist();
  return (
    <div>
      <LoadingAnimation/>
      <ToastWrapper/>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            < HomePage />
          </PrivateRoute>} />
        <Route path="/explore" element={
          <PrivateRoute>
            < HomePage />
          </PrivateRoute>} />
        <Route path="/bookmark" element={
          <PrivateRoute>
            < HomePage />
          </PrivateRoute>} />
        <Route path="/e" element={<HomePagee />} />
        <Route path="/signup" element={
          <SignUpPage />
        } />
        <Route path="/signin" element={
          <SignInPage />
        } />
        <Route path="/profile/:userId" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
