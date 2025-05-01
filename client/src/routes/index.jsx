import { useRoutes } from 'react-router-dom'
import { Home } from '@pages'
export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
    ])

}