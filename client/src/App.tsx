import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogLandingPage from "./pages/Blog/BlogLandingPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default Routes */}
          <Route path="/" element={<BlogLandingPage />} />
          <Route path="/:slug" element={<>blog post view</>} />
          <Route path="/tag/:tagName" element={<>posts by tag</>} />
          <Route path="/search" element={<>search</>} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles="admin" />}>
            <Route path="/admin/dashboard" element={<h1>Admin</h1>} />
            <Route path="/admin/posts" element={<h1>Posts</h1>} />
            <Route path="/admin/create-post" element={<h1>Create Post</h1>} />
            <Route
              path="/admin/edit-post/:postSlug"
              element={<h1>Edit Post</h1>}
            />
            <Route path="/admin/comments" element={<h1>Comments</h1>} />
          </Route>

          <Route path="/admin-login" element={<h1>Admin Login</h1>} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
}

export default App;
