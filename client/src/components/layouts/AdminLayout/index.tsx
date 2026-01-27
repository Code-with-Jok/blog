import Login from "@/components/Auth/Login";
import SignUp from "@/components/Auth/SignUp";
import { useState } from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <>
      <div className="bg-white py-5 bordre-b border-gray-500">
        <div className="container mx-auto">
          <img src="/logo.png" className="h-[26px]" alt="logo" />
        </div>
      </div>

      <div className="min-h-[calc(100vh-67px)] flex items-center justify-center">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/60">
          {currentPage === "login" ? (
            <Login setCurrentPage={setCurrentPage} />
          ) : (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </div>

      {children}
    </>
  );
};

export default AdminLayout;
