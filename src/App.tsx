import { Routes, Route } from "react-router-dom";
import SigninForm from "./Auth/Forms/SigninForm";
import SignupForm from "./Auth/Forms/SignupForm";
import Home from "./Root/Pages/Home";
import "./global.css";
import AuthLayout from "./Auth/AuthLayout";
import RootLayout from "./Root/RootLayout";

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
        </Route>
      </Routes>
    </main>
  );
};

export default App;
