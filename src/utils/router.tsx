import { Search } from '@/pages/Search';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Category } from '../pages/Category';
import { ErrorPage } from '../pages/Error';
import { Home } from '../pages/Home';
import { Subcategory } from '../pages/Subcategory';

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<Home />
			</Layout>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: '/category/:categoryId',
		element: (
			<Layout>
				<Category />
			</Layout>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: '/category/:categoryId/:subCategoryId',
		element: (
			<Layout>
				<Subcategory />
			</Layout>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: '/search',
		element: (
			<Layout>
				<Search />
			</Layout>
		),
		errorElement: <ErrorPage />,
	},
]);
