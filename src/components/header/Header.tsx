import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Search } from '@/icons/Search'
import useLocalStorage from '@/utils/useLocalStorage'
import { useMediaQuery } from '@/utils/utils'
import { Link } from 'react-router-dom'
import { MenuIcon } from '../../icons/MenuIcon'
import { Moon } from '../../icons/Moon'
import { Sun } from '../../icons/Sun'
import { X } from '../../icons/X'
import useCategoriesStore from '../../store/categories-store/store'
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
	}, [isMenuOpen, isDesktop])

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
					'transition-all will-change-transform relative z-10',
					isScrolled && 'header __scrolled'
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
						<button type='button' onClick={() => toggleDarkMode()}>
							{isDarkMode ? <Sun /> : <Moon />}
						</button>
						{loading ? (
							<Loader />
						) : (
							<button type='button' onClick={toggleMenu}>
								{isMenuOpen ? <X /> : <MenuIcon />}
							</button>
						)}
					</div>
				</div>

				{isMenuOpen && <Menu categories={categories} onClose={closeMenu} />}
			</header>
		</>
	)
}
