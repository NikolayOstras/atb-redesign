import { useEffect, useState } from 'react'
import { MenuIcon } from '../icons/MenuIcon'
import { X } from '../icons/X'
import { TCategory, fetchCategories } from '../services/fetchCategories'
import { translateCategoriesToUA } from '../utils/translateCategoriesToUA'
import { Loader } from './Loader'
import { Menu } from './Menu'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [loading, setLoading] = useState(true)
	const [categories, setCategories] = useState<TCategory[]>([])

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await fetchCategories()

				// console.log(data)
				setCategories(translateCategoriesToUA(data))
			} catch (error) {
				console.error('Error fetching categories:', error)
			} finally {
				setLoading(false)
			}
		}

		loadCategories()
	}, [])

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<>
			<div className='relative flex justify-between items-center py-4'>
				<h1 className='font-semibold text-2xl'>ATB redesign</h1>
				{loading ? (
					<Loader />
				) : (
					<button onClick={toggleMenu}>
						{isMenuOpen ? <X /> : <MenuIcon />}
					</button>
				)}

				{/* Conditionally render the Menu component */}
			</div>
			{isMenuOpen && <Menu categories={categories} />}
		</>
	)
}
