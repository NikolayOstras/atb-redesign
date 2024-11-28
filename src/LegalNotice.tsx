export function LegalNotice() {
	return (
		<div className='bg-cBg-50 dark:bg-cMain-50 dark:text-cBg-50 text-cMain-50 p-8 rounded-lg shadow-md'>
			<h1 className='text-2xl font-bold mb-4'>Юридичне застереження</h1>
			<ol className='list-decimal list-inside space-y-4'>
				<li>
					<strong>Освітня мета</strong>
					<br />
					Цей проєкт є некомерційним і був створений виключно для освітніх цілей
					з метою демонстрації навичок вебдизайну та програмування.
				</li>
				<li>
					<strong>Відсутність афіліації</strong>
					<br />
					Цей проєкт не пов'язаний з офіційним сайтом або компанією{' '}
					<strong>АТБ-Маркет</strong>. Усі права на торговельні марки, логотипи,
					назви продуктів та інші захищені матеріали належать їхнім законним
					власникам.
				</li>
				<li>
					<strong>Інформація про дані</strong>
					<br />
					Продукти та дані, представлені на цьому сайті, були отримані з
					відкритих джерел (включно з загальнодоступними даними з{' '}
					<strong>atbmarket.com</strong>) виключно для освітніх і тестувальних
					цілей. Проєкт не призначений для комерційного використання.
				</li>
				<li>
					<strong>Інтелектуальна власність</strong>
					<br />
					Усі оригінальні матеріали, включаючи текст, дизайн, код та зображення,
					належать їхнім відповідним власникам авторських прав. Автор проєкту не
					претендує на права на ці матеріали.
				</li>
				<li>
					<strong>Видалення контенту</strong>
					<br />
					Якщо ви є власником будь-якого контенту, представленого на цьому
					сайті, і бажаєте, щоб він був видалений, будь ласка, зв’яжіться з
					автором електронною поштою:
					<a
						href='mailto:your-email@example.com'
						className='text-cAccent hover:underline'
					>
						nikki.ice.promo@gmail.com
					</a>
					.
				</li>
			</ol>
		</div>
	)
}
