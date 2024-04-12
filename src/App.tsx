import React from "react";
import "./App.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { FlavanoidsStats } from "./component/FlavanoidsStats";
import { wineData } from "./WineData";
import GammaStats from "./component/GammaStats";
import Header from "./component/Header";
import Footer from "./component/Footer";

const theme = createTheme({});

function App() {
 
  return (
    <MantineProvider theme={theme}>
      <Header />
      <div className="two-column-grid">
        <div className="left">
          <FlavanoidsStats />
        </div>
        <div className="right">
          <GammaStats data={wineData} />
        </div>
      </div>
      <Footer />
    </MantineProvider>
  );
}

export default App;
