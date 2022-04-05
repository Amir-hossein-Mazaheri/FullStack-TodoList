import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Alert = withReactContent(Swal);

const Message = Alert.mixin({
  toast: true,
  position: "top-right",
  width: "35rem",
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default Message;
