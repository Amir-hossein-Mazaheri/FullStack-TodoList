import { Outlet } from "react-router";
import Header from "../Common/Header";

function MainLayout({ children, asRoute = false }) {
  return (
    <main>
      <Header />
      {asRoute ? <Outlet /> : children}
    </main>
  );
}

export default MainLayout;
