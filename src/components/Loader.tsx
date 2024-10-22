export function Loader() {
	return (
		<div
			className='inline-block h-5 w-5 animate-spin rounded-full border border-r-cMain-50 border-b-cMain border-cBg-50 '
			role='status'
		>
			<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
				Loading...
			</span>
		</div>
	)
}
