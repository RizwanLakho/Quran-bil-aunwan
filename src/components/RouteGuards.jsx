import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";

/**
 * AdminRoute - Only allows admin users
 * Redirects to home if not admin
 */
export function AdminRoute({ children }) {
  const { isAdmin } = useContext(AuthContext);

  if (!isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

/**
 * GuestRestrictedRoute - Shows page with blurred overlay and modal for guest users
 * This creates better UX by showing what they're missing
 */
export function GuestRestrictedRoute({ children, message }) {
  const { isGuest } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (isGuest()) {
      // Show overlay after page renders (brief delay for smooth transition)
      const timer = setTimeout(() => setShowOverlay(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isGuest]);

  if (!isGuest()) {
    return children;
  }

  // Handle modal close - redirect to Quran reading page
  const handleClose = () => {
    navigate('/home/read-quran');
  };

  // Render page normally, then add overlay on top
  return (
    <>
      {/* Normal page content */}
      {children}

      {/* Auth Modal with blurred backdrop - appears on top of page */}
      {showOverlay && (
        <AuthModal
          isOpen={true}
          onClose={handleClose} // Redirect to Quran reading page when closed
          message={message || "Please sign in to access this feature"}
          blurBackground={true} // Enable backdrop blur effect
        />
      )}
    </>
  );
}

/**
 * AuthenticatedRoute - Only allows authenticated users (not guests)
 * Redirects to login if not authenticated
 */
export function AuthenticatedRoute({ children }) {
  const { user, isGuest } = useContext(AuthContext);

  if (!user || isGuest()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
