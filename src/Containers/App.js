import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import Spinner from "../Common/Spinner";
import MainLayout from "../Layouts/MainLayout";
import "./App.css";

// Pages
const HomePage = lazy(() => import("../Pages"));
const SignInPage = lazy(() => import("../Pages/Signin"));
const SignUpPage = lazy(() => import("../Pages/Signup"));
const AddTodoPage = lazy(() => import("../Pages/AddTodo"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route element={<MainLayout asRoute={true} />}>
          <Route index element={<HomePage />} />
          <Route path="add-todo" element={<AddTodoPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
