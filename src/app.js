import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/layout/header";
import Overview from "./components/layout/overview";
import Create from "./components/blog/createBlog";
import Edit from "./components/blog/editBlog";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Overview />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
