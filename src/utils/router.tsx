import { Search } from '@/pages/Search'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Category } from '../pages/Category'
import { Error } from '../pages/Error'
import { Subcategory } from '../pages/Subcategory'
import { Home } from '../pages/home/Home'

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
	{
		path: '/search',
		element: (
			<Layout>
				<Search />
			</Layout>
		),
		errorElement: <Error />,
	},
])
