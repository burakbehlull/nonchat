import { Provider } from "@/components/ui/provider.jsx"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/index'

import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
	  <BrowserRouter>
		<App />
	  </BrowserRouter>
    </Provider>
  </StrictMode>,
)
