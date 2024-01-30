import { Routes, Route } from "react-router-dom";
import SigninForm from "./Auth/Forms/SigninForm";
import SignupForm from "./Auth/Forms/SignupForm";
import Home from "./Root/Pages/Home";
import "./global.css";
import AuthLayout from "./Auth/AuthLayout";
import RootLayout from "./Root/RootLayout";
import { Toaster } from "@/components/ui/toaster"
import Saved from "./Root/Pages/Saved";
import AllUsers from "./Root/Pages/AllUsers";
import CreatePost from "./Root/Pages/CreatePost";
import EditPost from "./Root/Pages/EditPost";
import PostDetails from "./Root/Pages/PostDetails";
import Profile from "./Root/Pages/Profile";
import UpdateProfile from "./Root/Pages/UpdateProfile";
import Explore from "./Root/Pages/Explore";


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/*public routes*/}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/*private routes*/}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
