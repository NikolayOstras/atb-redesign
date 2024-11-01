import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Category } from '../pages/Category'
import { Error } from '../pages/Error'
import { Home } from '../pages/Home'
import { Subcategory } from '../pages/Subcategory'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<Home />
			</Layout>
		),
		errorElement: <Error />,
	},
	{
		path: '/category/:categoryId',
		element: (
			<Layout>
				<Category />
			</Layout>
		),
		errorElement: <Error />,
	},
	{
		path: '/category/:categoryId/:subCategoryId',
		element: (
			<Layout>
				<Subcategory />
			</Layout>
		),
		errorElement: <Error />,
	},
])
