import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";


const App = () => {

  return (
    <Provider store={store}>
      <div>
        <h1>From federated Example</h1>
      </div>
    </Provider>
  );
};

export default App;
