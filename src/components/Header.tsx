import { useState } from 'react'
import { MenuIcon } from '../icons/MenuIcon'
import { X } from '../icons/X'
import { Menu } from './Menu'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<div className='relative flex justify-between items-center py-4'>
			<h1 className='font-semibold text-2xl'>ATB redesign</h1>
			<button onClick={toggleMenu}>{isMenuOpen ? <X /> : <MenuIcon />}</button>

			{/* Conditionally render the Menu component */}
			{isMenuOpen && (
				<div className='absolute top-full right-0 p-2'>
					<Menu />
				</div>
			)}
		</div>
	)
}
