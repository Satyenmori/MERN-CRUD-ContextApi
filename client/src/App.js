import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Contect from "./components/Contect";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import { AdminLayout } from "./components/Layout/Admin-Layout";
import { AdminUser } from "./components/Admin-user";
import { AdminContect } from "./components/Admin-Contact";
import { PageNotFound } from "./components/404";
import AdminUpdate from "./components/Admin-Userupdate";
import FormAdd from "./components/Form-Add";
import FormData from "./components/FormData";
import EditForm from "./components/FormEdit";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contect" element={<Contect />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="user" element={<AdminUser />} />
            <Route path="contect" element={<AdminContect />} />
            <Route
              path="/admin/users/update/:id/edit"
              element={<AdminUpdate />}
            />
          </Route>
          <Route path="/formdata" element={<FormData />} />
          <Route path="/addform" element={<FormAdd />} />          
          <Route path="/edit/:id" element={<EditForm />} />          

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
