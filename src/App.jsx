import Header from "@components/Header";
import { useEffect, useState } from "react";
import SideMenue from "@components/SideMenue";
import WorkSpace from "@components/WorkSpace";
import { DataContext } from "@/DataContext";

function App() {
  const [dataState, setDataState] = useState(() => {
    const saveData = localStorage.getItem("data");
    if (saveData) {
      return JSON.parse(saveData);
    }
    return [];
  });

  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  useEffect(() => {
    const asciiArt = `
██╗  ██╗ █████╗ ███╗   ██╗██████╗  █████╗ ███╗   ██╗
██║ ██╔╝██╔══██╗████╗  ██║██╔══██╗██╔══██╗████╗  ██║
█████╔╝ ███████║██╔██╗ ██║██████╔╝███████║██╔██╗ ██║
██╔-██╗ ██╔══██║██║╚██╗██║██╔══██╗██╔══██║██║╚██╗██║
██║  ██╗██║  ██║██║ ╚████║██████╔╝██║  ██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
  `;

    console.log(
      `%c${asciiArt} \n\n  %c System developed successfully!\n\n Let's connect: https://github.com/AmelDev2 \n`,
      "color: #635FC7; font-family: monospace; font-weight: bold; font-size: 11px; line-height: 1.1;",
      "color: #38bdf8; font-family: sans-serif; font-size: 15px; font-style: italic; font-weight: bold;",
    );

    if (!dataState || dataState.length === 0) return;
    localStorage.setItem("data", JSON.stringify(dataState));
  }, [dataState]);

  return (
    <DataContext.Provider
      value={{
        data: dataState || [],
        setData: setDataState,
        selectedBoardIndex,
        setSelectedBoardIndex,
      }}
    >
      <div className="font-jakarta flex h-screen flex-col">
        <Header />

        <div className="flex flex-1">
          <SideMenue />
          <WorkSpace />
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
