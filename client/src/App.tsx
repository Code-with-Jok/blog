import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogLandingPage from "./pages/Blog/BlogLandingPage";
import PrivateRoute from "./routes/PrivateRoute";
import UserProvider from "@/context/userContext";
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import BlogPosts from "./pages/Admin/BlogPosts";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Default Routes */}
          <Route path="/" element={<BlogLandingPage />} />
          <Route path="/:slug" element={<>blog post view</>} />
          <Route path="/tag/:tagName" element={<>posts by tag</>} />
          <Route path="/search" element={<>search</>} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/posts" element={<BlogPosts />} />
            <Route path="/admin/create-post" element={<h1>Create Post</h1>} />
            <Route
              path="/admin/edit-post/:postSlug"
              element={<h1>Edit Post</h1>}
            />
            <Route path="/admin/comments" element={<h1>Comments</h1>} />
          </Route>

          <Route path="/admin-login" element={<AdminLogin />} />
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
    </UserProvider>
  );
}

export default App;
