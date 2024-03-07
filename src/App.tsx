import { Fragment } from "react";
import "./App.css";
import AutoComplete from "@components/AutoComplete";
import FetchData from "@utils/FetchData";
function App() {
  const apiUrl = "https://restcountries.com/v3.1/all";

  return (
    <Fragment>
      {FetchData({
        apiUrl,
        WrappedComponent: AutoComplete,
      })}
    </Fragment>
  );
}

export default App;
