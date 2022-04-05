import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Spinner from "../Common/Spinner";

function AuthLayout({
  className,
  loading,
  submitFunction,
  details,
  submitButtonText,
  children,
  ...rest
}) {
  return (
    <div className="flex py-12">
      <div
        className={`rounded-lg px-10 py-7 max-w-xl w-[95%] shadow-lg shadow-gray-200 m-auto ${className}`}
        {...rest}
      >
        <div className="relative">
          {!loading ? (
            <form onSubmit={submitFunction}>
              <div className="mb-5 flex justify-between">
                <h1 className="text-xl font-bold">{details.title}</h1>
                <div className="flex gap-2">
                  <span>Or</span>
                  <Link className="text-blue-500" to={details.link}>
                    <span>{details.text}</span>
                  </Link>
                </div>
              </div>
              <div className="space-y-8">{children}</div>

              <div className="mt-5 flex justify-between">
                <div className="ml-auto">
                  <Button type="submit" variant="contained">
                    <span>{submitButtonText}</span>
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
