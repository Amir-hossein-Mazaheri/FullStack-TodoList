import Btn from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

function Button({ text }) {
  return (
    <Btn
      sx={{
        borderRadius: "99px",
        paddingRight: "1.3rem",
        paddingLeft: "1.3rem",
        boxShadow: "none",
        backgroundColor: "#6B21A8",
        ":hover": {
          backgroundColor: "#5a1b8f",
          boxShadow: "none",
        },
      }}
      type="submit"
      variant="contained"
      className="bg-red-500"
      startIcon={<SaveIcon />}
    >
      <span>{text}</span>
    </Btn>
  );
}

export default Button;
