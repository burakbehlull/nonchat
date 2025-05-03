import { useRoutes } from 'react-router-dom'
import { Home, BaseChannel } from '@pages'
export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/channel/:channelId',
            element: <BaseChannel />,
        }
    ])

}