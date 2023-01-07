import { ReactNode } from "react";
import { Navbar } from "../components/Navbar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar height={60} />
      {children}
    </div>
  );
};
