import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setlsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setLoading] = useState(false);
  const [isAuthenticated, setlsAuthenticated] = useState(false);

  const navigate = useNavigate();

// Function to check if the user is authenticated
const checkAuthUser = async () => {
  try {
    // Attempt to get the current user's account information
    const currentAccount = await getCurrentUser();

    // Check if the current user's account information is available
    if (currentAccount) {
      // If available, update the user state with relevant information
      setUser({
        id: currentAccount.$id,
        name: currentAccount.name,
        username: currentAccount.username,
        email: currentAccount.email,
        imageUrl: currentAccount.imageURl,
        bio: currentAccount.bio,
      });

      // Set the authentication state to true
      setlsAuthenticated(true);

      // Return true to indicate successful authentication
      return true;
    }

    // If the current user's account information is not available, return false
    return false;

  } catch (error) {
    // Log any errors that occur during the authentication process
    console.log(error);

    // Return false in case of an error
    return false;

  } finally {
    // Set loading state to false after the authentication attempt
    setLoading(false);
  }
};

// useEffect hook to run when the component mounts
useEffect(() => {
  // Check if the user has accepted cookies or if the cookieFallback is not set
  if (
    localStorage.getItem("cookieFallback") === "[]" ||
    localStorage.getItem("cookieFallback") === null
  )
    // Redirect to the sign-in page if cookies are not accepted
    navigate("/sign-in");

  // Check the user's authentication status
  checkAuthUser();

}, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

// Context value containing user information, loading state, authentication state, and the checkAuthUser function
const value = {
  user,
  setUser,
  isLoading,
  isAuthenticated,
  setlsAuthenticated,
  checkAuthUser,
};

// Return the AuthContext.Provider with the provided context value
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// Export a custom hook to access the user context
export const useUserContext = () => useContext(AuthContext);

