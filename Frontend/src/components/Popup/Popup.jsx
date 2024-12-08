import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../Redux/Slices/PopupSlice";
import UploadForm from "./UploadForm";
// import GroupPostForm from "./GroupPostForm";

const Popup = () => {
  const { isPopupOpen, popupType, payload } = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  if (!isPopupOpen) return null;

  const handleClose = () => dispatch(closePopup());

  return (
    <div className="popup" style={{
      position: "absolute",
      zIndex: 100,
      top: "10%",
      left: "40%",
      background: "white",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      border: "1px solid"
  }}>
      <div className="popup-content">
        <button onClick={handleClose}>Đóng</button>
        {popupType === "avatar" && <UploadForm type="avatar" payload={payload} />}
        {popupType === "coverPhoto" && <UploadForm type="coverPhoto" payload={payload} />}
        {/* {popupType === "groupPost" && <GroupPostForm payload={payload} />} */}
      </div>
    </div>
  );
};

export default Popup;
