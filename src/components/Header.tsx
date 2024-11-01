import { useState } from 'react'

import { MenuIcon } from '../icons/MenuIcon'
import { Moon } from '../icons/Moon'
import { Sun } from '../icons/Sun'
import { X } from '../icons/X'
import useCategoriesStore from '../utils/store'
import { translateCategoriesToUA } from '../utils/translateCategoriesToUA'
import { Loader } from './Loader'
import { Menu } from './Menu'

export function Header() {
	const { categories, loading } = useCategoriesStore()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isDarkMode, setIsDarkMode] = useState(false)

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
		// Apply dark mode class to body or a wrapper element
		document.body.classList.toggle('dark', isDarkMode)
	}

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
				<div className='flex items-center gap-4'>
					<button onClick={() => toggleDarkMode()}>
						{isDarkMode ? <Moon /> : <Sun />}
					</button>
					{loading ? (
						<Loader />
					) : (
						<button onClick={toggleMenu}>
							{isMenuOpen ? <X /> : <MenuIcon />}
						</button>
					)}
				</div>
			</div>
			{isMenuOpen && <Menu categories={translateCategoriesToUA(categories)} />}
		</>
	)
}
