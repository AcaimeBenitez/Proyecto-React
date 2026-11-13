import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { ThemeProvider } from "@emotion/react"
import { theme } from "./styles/theme"
import { AuthProvider } from "./context/AuthContext"
import App from "./App.tsx"
import "./index.css"
import "./App.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)