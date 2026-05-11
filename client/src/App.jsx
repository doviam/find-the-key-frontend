import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { Layout } from "./components/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Feed } from "./pages/Feed.jsx";
import { Discover } from "./pages/Discover.jsx";
import { Upload } from "./pages/Upload.jsx";
import { ProfileEdit } from "./pages/ProfileEdit.jsx";
import { PublicProfile } from "./pages/PublicProfile.jsx";
import { Studio } from "./pages/Studio.jsx";
import { Tools } from "./pages/Tools.jsx";
import { Shows } from "./pages/Shows.jsx";
import { Keys } from "./pages/Keys.jsx";
import { KeySession } from "./pages/KeySession.jsx";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-ink-muted">
        Cargando sesión…
      </div>
    );
  }
  if (!user) {
    const next = encodeURIComponent(`${location.pathname}${location.search || ""}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return children;
}

function ArtistRoute({ children }) {
  const { user, loading, isArtist } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-ink-muted">
        Cargando sesión…
      </div>
    );
  }
  if (!user) {
    const next = encodeURIComponent(`${location.pathname}${location.search || ""}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  if (!isArtist) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/keys/:slug" element={<KeySession />} />
        <Route path="/keys" element={<Keys />} />
        <Route path="/herramientas" element={<Tools />} />
        <Route path="/u/:id" element={<PublicProfile />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ArtistRoute>
              <Upload />
            </ArtistRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
