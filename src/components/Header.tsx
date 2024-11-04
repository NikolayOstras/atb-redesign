import clsx from 'clsx' // Import clsx
import { useEffect, useState } from 'react'

import { MenuIcon } from '../icons/MenuIcon'
import { Moon } from '../icons/Moon'
import { Sun } from '../icons/Sun'
import { X } from '../icons/X'
import useCategoriesStore from '../utils/store'
import { translateCategoriesToUA } from '../utils/translateCategoriesToUA'
import { useLocalStorage } from '../utils/utils'
import { Loader } from './Loader'
import { Menu } from './Menu'

export function Header() {
	const { categories, loading } = useCategoriesStore()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		document.body.classList.toggle('dark', isDarkMode)
	}, [isDarkMode])

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
	}
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}
	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	return (
		<>
			<header
				className={clsx(
					// Use clsx here
					'transition-all',
					isScrolled &&
						'bg-cBg-50/90 backdrop-blur shadow-md fixed top-2 rounded-md left-0 right-0 xl:left-[10%] xl:right-[10%] z-10 px-12 dark:bg-cMain/90 dark:text-cBg-50'
				)}
			>
				<div className='flex justify-between items-center py-4 '>
					<h1 className=' text-2xl flex flex-col items-center'>
						ATB
						{!isScrolled && (
							<span className='block font-thin tracking-wide text-base'>
								redesign
							</span>
						)}
					</h1>
					<div className='flex items-center gap-4'>
						<button onClick={() => toggleDarkMode()}>
							{isDarkMode ? <Sun /> : <Moon />}
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

				{isMenuOpen && (
					<Menu
						categories={translateCategoriesToUA(categories)}
						onClose={closeMenu}
					/>
				)}
			</header>
		</>
	)
}
