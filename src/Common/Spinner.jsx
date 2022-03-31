import { CircularProgress } from "@mui/material";

function Spinner({ className, ...rest }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
      {...rest}
    >
      <CircularProgress />
    </div>
  );
}

export default Spinner;
