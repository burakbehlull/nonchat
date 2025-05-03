import { useRoutes } from 'react-router-dom'
import { Home, BaseChannel } from '@pages'
import { NotFound } from '@http'


export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/channel/:channelId',
            element: <BaseChannel />,
        },
        {
            path: '*',
            element: <NotFound />
        }
    ])

}