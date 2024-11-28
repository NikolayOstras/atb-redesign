export const formatSearchTerm = (term: string) => {
	return term
		.split(' ')
		.map(
			(word) =>
				word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase(),
		)
		.join(' ');
};
