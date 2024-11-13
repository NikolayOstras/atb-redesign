interface ErrorMessageProps {
	error: string
}

export function ErrorMessage({ error }: ErrorMessageProps) {
	return (
		<div className='flex items-center justify-center'>
			<p>{error}</p>
		</div>
	)
}
