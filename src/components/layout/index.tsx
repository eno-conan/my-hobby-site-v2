import React, { ComponentPropsWithoutRef } from "react";
import Footer from "../navigation/footer";
import Header from "../navigation/header";

interface IMainLayout extends ComponentPropsWithoutRef<"div"> {}

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>

  );
};

export default MainLayout;
