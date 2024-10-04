import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";

const Layout = () => {
  return (
    <>
      <Header/>
      <div className="flex gap-2">
        <Navbar />
        <main className="w-full bg-background">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
