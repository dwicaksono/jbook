import * as esbuild from 'esbuild-wasm'
import { useEffect, useState, useRef} from 'react'
import ReactDom from 'react-dom'

const App = () => {
	const ref  = useRef<any>()
	const [code, setCode] = useState('')
	const [input, setInput] = useState('')

	useEffect(()=>{
		startService()
	},[])

	const startService = async() => {
	ref.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm',
		})
	}

	const handlerSubmit = async() => {
		if(!ref.current) return

		const result = await ref.current.transform(input, {
			loader: 'jsx',
			target: 'es2015'
		})
		setCode(result.code)
	}
    return (
			<div>
				<textarea value={input} onChange={e => setInput(e.target.value)}/>
				<button onClick={handlerSubmit}>Submit</button>
				<pre>{code}</pre>
			</div>
    )
}
ReactDom.render(
	<App/>,
	document.querySelector("#root")
	)