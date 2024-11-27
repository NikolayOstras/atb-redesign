const englishToUkrainianMap: Record<string, string> = {
	q: 'й',
	w: 'ц',
	e: 'у',
	r: 'к',
	t: 'е',
	y: 'н',
	u: 'г',
	i: 'ш',
	o: 'щ',
	p: 'з',
	'[': 'х',
	']': 'ї',
	a: 'ф',
	s: 'і',
	d: 'в',
	f: 'а',
	g: 'п',
	h: 'р',
	j: 'о',
	k: 'л',
	l: 'д',
	';': 'ж',
	"'": 'є',
	z: 'я',
	x: 'ч',
	c: 'с',
	v: 'м',
	b: 'и',
	n: 'т',
	m: 'ь',
	',': 'б',
	'.': 'ю',
	'/': '.',
	'`': 'ґ',
}

function translateToUkrainian(term: string): string {
	return term
		.split('')
		.map(char => englishToUkrainianMap[char.toLowerCase()] || char)
		.join('')
}

export const formatSearchTerm = (term: string) => {
	//  No longer a hook
	const translatedTerm = translateToUkrainian(term)

	return translatedTerm
		.split(' ')
		.map(
			word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
		)
		.join(' ')
}
