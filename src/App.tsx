import React from "react";
import CanvasWrapper from "./components/canvas";

const App: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      {<CanvasWrapper />}
    </div>
  );
};

export default App;
