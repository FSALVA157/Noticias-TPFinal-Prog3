import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import { Layout } from '../layouts/Layout'
import { About } from '../../about/components/About'
import { ProtectedRoutes } from '../components/ProtectedRoutes'
import { NewArticle } from '../../articles/components/NewArticle'
import { Articles } from '../../articles/components/Articles'


// const AboutComponent = lazy(() => import('../layouts/Layout'))  
// const ProtectedRoutComponent = lazy(() => import('../components/ProtectedRoutes'))
// const NewArticleComponent = lazy(() => import('../../articles/components/NewArticle'))
// const ArticlesComponent = lazy(() => import('../../articles/components/Articles'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: 'about',
                element: <About/>,
            },
            {
                path: 'write',
                element: <ProtectedRoutes>
                    <NewArticle/>
                </ProtectedRoutes>
            },
            {
                path: 'articles',
                element: <ProtectedRoutes>
                    <Articles/>
                </ProtectedRoutes>
            },
            {
                path: '*',
                element: <div>404</div>
            }
        ]
    },
    
])
