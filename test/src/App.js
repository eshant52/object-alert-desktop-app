import "./App.css";
import TestComponent from "./TestComponent";
import WebCamVideo from "./WebCamVideo";
import NavBarComponent from "./navbar";

function App() {
  return (
    <div className="App mx-auto">
      <div>
        <NavBarComponent />
        <div className="container mx-auto my-5">
          <div className="grid grid-cols-3 gap-4">
            <WebCamVideo id="23434"/>
            <WebCamVideo id="12324"/>
          </div>
        </div>
        <TestComponent />
      </div>
    </div>
  );
}

export default App;
