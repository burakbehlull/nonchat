import { Provider as ChakraProvider } from "@ui"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/index'
import { SocketProvider } from "@services"

import { Toaster } from 'react-hot-toast'

import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
	<Provider store={store}>
		<ChakraProvider>
		  <SocketProvider>
			<BrowserRouter>
				<App />
				<Toaster
				  position="top-center"
				  reverseOrder={false}
				/>
			</BrowserRouter>
		  </SocketProvider>
		</ChakraProvider>
	</Provider>
  </StrictMode>,
)
