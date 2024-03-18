import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./tailwind.css";

import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./routes/Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
