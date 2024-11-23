import { Outlet } from "react-router-dom";
import { Footer } from "../Layout/Footer";
import { Header } from "../Layout/Header";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
