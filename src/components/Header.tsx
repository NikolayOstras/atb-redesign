import { useState } from 'react'

import { MenuIcon } from '../icons/MenuIcon'
import { X } from '../icons/X'
import useCategoriesStore from '../utils/store'
import { translateCategoriesToUA } from '../utils/translateCategoriesToUA'
import { Loader } from './Loader'
import { Menu } from './Menu'

export function Header() {
	const { categories, loading } = useCategoriesStore()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<>
			<div className='relative flex justify-between items-center py-4'>
				<h1 className=' text-2xl flex flex-col items-center'>
					ATB{' '}
					<span className='block font-thin tracking-wide text-base'>
						redesign
					</span>
				</h1>
				{loading ? (
					<Loader />
				) : (
					<button onClick={toggleMenu}>
						{isMenuOpen ? <X /> : <MenuIcon />}
					</button>
				)}
			</div>
			{isMenuOpen && <Menu categories={translateCategoriesToUA(categories)} />}
		</>
	)
}
