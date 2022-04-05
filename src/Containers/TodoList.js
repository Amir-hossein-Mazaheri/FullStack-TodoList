import { Provider } from "react-redux";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import { BrowserRouter } from "react-router-dom";
import "moment/locale/en-ca";
import moment from "moment";
import store from "../Store/configStore";
import App from "./App";

// removes logs in production
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

function TodoList() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <LocalizationProvider
          dateAdapter={DateAdapter}
          locale={moment.locale("en-ca")}
        >
          <App />
        </LocalizationProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default TodoList;
