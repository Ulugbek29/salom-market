import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
<QueryClientProvider client={queryClient}>
  <Provider store={store}>
  <PersistGate persistor={persistor}>
    <BrowserRouter>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </BrowserRouter>
  </PersistGate>
  </Provider>
</QueryClientProvider>
);
