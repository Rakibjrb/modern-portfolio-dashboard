import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./routes/routes";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: '"Lexend", sans-serif',
          },
        }}
      >
        <RouterProvider router={router} />
        <Toaster position="bottom-right" richColors />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);