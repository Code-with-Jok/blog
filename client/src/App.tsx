import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogLandingPage from "./pages/Blog/BlogLandingPage";
import PrivateRoute from "./routes/PrivateRoute";
import UserProvider from "@/context/userContext";
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import BlogPosts from "./pages/Admin/BlogPosts";
import BlogPostEditor from "./pages/Admin/BlogPostEditor";
import Comments from "./pages/Admin/Comments";
import BlogPostView from "./pages/Blog/BlogPostView";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Default Routes */}
          <Route path="/" element={<BlogLandingPage />} />
          <Route path="/post/:slug" element={<BlogPostView />} />
          <Route path="/tag/:tagName" element={<>posts by tag</>} />
          <Route path="/search" element={<>search</>} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/posts" element={<BlogPosts />} />
            <Route
              path="/admin/create-post"
              element={<BlogPostEditor isEdit={false} />}
            />
            <Route
              path="/admin/edit/:postSlug"
              element={<BlogPostEditor isEdit={true} />}
            />
            <Route path="/admin/comments" element={<Comments />} />
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
