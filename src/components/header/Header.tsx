import clsx from 'clsx' // Import clsx
import { useEffect, useState } from 'react'

import { Search } from '@/icons/Search'
import { Link } from 'react-router-dom'
import { MenuIcon } from '../../icons/MenuIcon'
import { Moon } from '../../icons/Moon'
import { Sun } from '../../icons/Sun'
import { X } from '../../icons/X'
import useCategoriesStore from '../../store/categories-store/store'
import { translateCategoriesToUA } from '../../utils/translateCategoriesToUA'
import { useLocalStorage, useMediaQuery } from '../../utils/utils'
import { Loader } from '../Loader'
import { Menu } from '../menu/Menu'

export function Header() {
	const isDesktop = useMediaQuery('(min-width: 1279px)')
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

	useEffect(() => {
		if (isDesktop) return
		isMenuOpen
			? document.body.classList.add('lock')
			: document.body.classList.remove('lock')
	}, [isMenuOpen])

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
					'transition-all',
					isScrolled &&
						'bg-cBg-50/90 backdrop-blur shadow-md fixed xl:top-2 rounded-md left-0 right-0 xl:left-[10%] xl:right-[10%] z-10 px-3 xl:px-12 dark:bg-cMain/90 dark:text-cBg-50'
				)}
			>
				<div className='flex justify-between items-center py-4 '>
					<h1 className=' text-2xl flex flex-col items-center'>
						<Link to='/'>
							<span className='hover:underline'>ATB</span>
							{!isScrolled && (
								<span className='block font-thin tracking-wide text-base'>
									redesign
								</span>
							)}
						</Link>
					</h1>
					<div className='flex items-center gap-4'>
						<Link to={'/search'}>
							<Search />
						</Link>
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
