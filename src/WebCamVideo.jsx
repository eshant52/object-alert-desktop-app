import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { detect_cls, cls } from "./data";
import NotificationComponent from "./Notification";

const WebCamVideo = (props) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [filteredList, setFilteredList] = useState([]);
  const [image_data, setImage] = useState(null);
  const [show_notification, setShowNotification] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     if (!videoRef.current && !canvasRef.current) return;

  //     canvasRef.current.width = videoRef.current.videoWidth;
  //     canvasRef.current.height = videoRef.current.videoHeight;
  //     canvasRef.current
  //       .getContext("2d")
  //       .drawImage(
  //         videoRef.current,
  //         0,
  //         0,
  //         canvasRef.current.width,
  //         canvasRef.current.height
  //       );

  //     const frame = canvasRef.current.toDataURL("image/jpeg");

  //     try {
  //       const jsonData = JSON.stringify({
  //         detect_cls: detect_cls,
  //         frame: frame,
  //       });

  //       const res = await axios.post(
  //         "http://127.0.0.1:8000/api/send-frame",
  //         jsonData,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (res.data.is_found) {
  //         new window.Notification("debris detected", {
  //           body: "Object detected",
  //         });
  //         console.log("found");
  //         setShowNotification(true);
  //       } else {
  //         console.log("not found");
  //         setShowNotification(false);
  //       }

  //       const found_cls_list = res.data.found_cls;
  //       // converting list value to string value
  //       const list_str = found_cls_list.map((value) => value.toString());
  //       console.log(list_str);

  //       // converting to list
  //       const filteredList = Object.entries(cls).filter(([key, value], index) =>
  //         list_str.includes(key)
  //       );

  //       console.log(filteredList);
  //       setFilteredList(filteredList);
  //       setImage(res.data.anno_img);
  //     } catch (error) {
  //       console.error(error);
  //     }

  //     setTimeout(sendRequest, 1000);
  //   };

  //   sendRequest();
  // }, [videoRef]);

  const startCamera = async () => {
    setIsSending(true);
    try {
      if (props.isIpCam) {
        videoRef.current.srcObject = URL.createObjectURL(props.address);
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      }

      videoRef.current.play();
    } catch (err) {
      console.log(err);
      return;
    }
    

    try {
      setInterval(async () => {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        canvasRef.current
          .getContext("2d")
          .drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );

        const frame = canvasRef.current.toDataURL("image/jpeg");

        const jsonData = JSON.stringify({
          detect_cls: detect_cls,
          frame: frame,
        });

        axios
          .post("http://127.0.0.1:8000/api/send-frame", jsonData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.data.is_found) {
              new window.Notification("debris detected", {
                body: "Object detected",
              });
              console.log("found");
              setShowNotification(true);
            } else {
              console.log("not found");
              setShowNotification(false);
            }

            const found_cls_list = res.data.found_cls;
            // converting list value to string value
            const list_str = found_cls_list.map((value) => value.toString());
            console.log(list_str);

            // converting to list
            const filteredList = Object.entries(cls).filter(
              ([key, value], index) => list_str.includes(key)
            );

            console.log(filteredList);
            setFilteredList(filteredList);
            setImage(res.data.anno_img);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <video
            className="w-full aspect-video border-solid border-2 border-sky-100 rounded-t-2xl"
            ref={videoRef}
            width="640"
            height="480"
          />
          <canvas hidden ref={canvasRef} width="0" height="0" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{props.name}</h2>
          <p>id: {props.id}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-primary" onClick={startCamera}>
              Start cam
            </button>
            <div>
              {/* The button to open modal */}
              <label htmlFor={`modal-${props.id}`} className="btn btn-sm">
                see detection
              </label>

              {/* Put this part before </body> tag */}
              <input
                type="checkbox"
                id={`modal-${props.id}`}
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Object Detected</h3>
                  <img
                    src={`data:image/jpeg;base64,${image_data}`}
                    alt="annotated image"
                  />
                  {filteredList.map((list) => (
                    <p className="py-4">{list[1]}</p>
                  ))}

                  <div className="modal-action">
                    <label htmlFor={`modal-${props.id}`} className="btn">
                      Ok
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {show_notification && <NotificationComponent />}
      </div>
      {/* <NotificationComponent data={responseData} modalId={`modal-${props.id}`} /> */}
    </div>
  );
};

export default WebCamVideo;
