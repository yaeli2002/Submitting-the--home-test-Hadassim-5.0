import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth.context";

export default function Toolbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="bg-blue-600 text-white py-4 px-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Supplier Platform</h1>
        <nav className="flex space-x-4">
          {/* Common Links */}
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>

          {/* Admin Links */}
          {user?.role === "admin" && (
            <>
              <Link to="/suppliers" className="hover:underline">
                Suppliers
              </Link>
            </>
          )}

          {/* Supplier Links */}
          {user?.role === "supplier" && (
            <>
              <Link to="/add-product" className="hover:underline">
                Add Product
              </Link>
            </>
          )}

          <div
            className="hover:underline cursor-pointer"
            onClick={() => {
              const confirmed = window.confirm("Are you sure you want to sign out?");
              if (confirmed) {
                logout();
                nav("/login");
                alert("Successfully signed out");
              }
            }}
          >
            Sign out
          </div>
        </nav>
      </div>
    </div>
  );
}
