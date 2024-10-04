import React from "react";
import {Routes, Route} from "react-router-dom";
import Todo from "./pages/todo/Todo";
import Layout from "./layout/Layout";
import Calender from "./pages/calender/Calender";
import Statistics from "./pages/statistics/Statistics";

const App: React.FC = () => {
  return (
    <Routes>
      {/* <Route path='/login' element={<Login/>}/> */}
      <Route path="/" element={<Layout />}>
        <Route path="/todos" element={<Todo />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/stats" element={<Statistics />} />
      </Route>
    </Routes>
  );
};

export default App;
