import { useEffect } from "react"

import { Layout } from "@pages"
import { useStore } from "@hooks"

function App() {
	
  const { setTheme } = useStore()
  
  const local = localStorage.getItem("theme")
  useEffect(()=>{
	  if(local=="dark") setTheme("dark")
  }, [])
  
  return (
	<>
		<Layout />
	</>
  )
}

export default App
