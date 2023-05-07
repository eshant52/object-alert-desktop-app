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
          <div className="grid grid-cols-2 gap-4">
            <WebCamVideo
              id="video-stream-12343"
              isIpCam={false}
              name="web cam"
            />
            <WebCamVideo
              id="video-stream-22343"
              isIpCam={true}
              address="http://192.168.51.9:4747/video"
              name="ip camera"
            />
          </div>
        </div>
        <TestComponent />
      </div>
    </div>
  );
}

export default App;
