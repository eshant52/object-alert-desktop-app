const NotificationComponent = (props) => {
  return (
    <>
      <label htmlFor={props.modalId} className="btn">
              detect
            </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id={props.modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Object Detected</h3>
          {props.data.map((list) => (
            <p className="py-4">{list[1]}</p>
          ))}
          <div className="modal-action">
            <label htmlFor={props.modalId} className="btn">
              Ok
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationComponent;
