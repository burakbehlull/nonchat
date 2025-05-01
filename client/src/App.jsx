import { Layout } from "@pages"
import { useStore } from "@hooks"

function App() {
	const { getTheme, setTheme } = useStore()
	const x = ()=> {
		const th = getTheme()
		console.log("th", th)
	}
  return (
	<>
	
		<button onClick={x}>get</button>
		<button onClick={()=> setTheme("31")}>set</button>
		<Layout />
	</>
  )
}

export default App
