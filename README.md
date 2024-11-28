# ATB Website Redesign (Educational Project)

This is a non-commercial educational project that showcases a redesign of the ATB website using modern web development technologies. The project demonstrates skills in React, TypeScript, Tailwind CSS, and Zustand for state management.

## 🚀 Tech Stack

- **React**: Component-based UI development.
- **TypeScript**: Type-safe development for a better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for responsive and modern design.
- **Zustand**: Lightweight state management for React applications.
- **Biome.js**: Fast and modern code formatter and linter.
- **Lefthook**: Git hooks manager for maintaining code quality in teams.
- **Vitest**: Fast unit testing framework for modern TypeScript and JavaScript projects.
- **React Testing Library**: Testing utilities for React components focused on user interactions.

## 📄 Disclaimer

This project is intended for **educational purposes only**. It is not affiliated with or endorsed by **ATB-Market**. All trademarks, logos, and product information belong to their respective owners. For more information, please refer to the [Legal Disclaimer](#).

## 💡 Features

- Redesigned UI for the ATB website with a focus on usability and modern aesthetics.
- Responsive design using Tailwind CSS for a seamless experience across devices.
- State management with Zustand for efficient and scalable data handling.
- Type-safe components and logic with TypeScript.

## 🛠 How to Run

1. Clone the repository:
   git clone https://github.com/NikolayOstras/atb-redesign.git
   Install dependencies:
   npm install
   Start the development server:
   npm run dev
   Open http://localhost:5173 to view the project in your browser.
   📨 Contact
   For questions or issues, feel free to contact me at nikki.ice.promo@gmail.com

   ```

   ```

### `Card` Component

The `Card` component displays detailed information about a product, including its image, price, price trend, and favorite status. It also provides functionality to view price history and navigate to the product's link.

#### **Props**

The `Card` component receives the following props, defined by the `TProduct` type:

- `title` (`string`, required): The name of the product.
- `img` (`string`, required): URL of the product image.
- `price` (`string | number`, required): Current price of the product.
- `link` (`string`, required): External link to the product's page.
- `priceHistory` (`Array<{ date: string; price: string }>`): Historical price data for the product.
- `id` (`string`, required): Unique identifier for the product.

---

#### **Features**

1. **Favorite Toggle**  
   Users can mark the product as a favorite using the `ToggleFavoriteButton`, which updates the state using `useFavoritesStore`.

2. **Price Trend**

   - Displays an upward (`TriangleUp`) or downward (`TriangleDown`) arrow based on the comparison between the current and previous price.
   - If no previous price exists, no trend indicator is shown.

3. **Price History Chart**

   - Displays a detailed price history chart when the user clicks the chart toggle button.
   - The chart can be closed using the `onClose` handler.

4. **External Link**
   - Provides a direct link to the product's page using the `ArrowRight` icon.
   - Opens the link in a new tab with proper accessibility attributes.

---

#### **Implementation Details**

1. **State Management**

   - `useFavoritesStore`: Manages the favorite status of the product.
   - `useState`: Controls the visibility of the price history chart (`showChart`).

2. **Dynamic Price Trend**  
   The price trend (`position`) is calculated based on the comparison between `currentPrice` and `previousPrice`.

   - `position === 'up'`: Current price is higher than the previous price.
   - `position === 'down'`: Current price is lower than the previous price.

3. **Conditional Rendering**

   - The price history button and chart are only displayed if the `priceHistory` array contains more than one entry.

4. **Accessibility**
   - All buttons and links have appropriate `aria-labels` for accessibility compliance.

---

#### **Example Usage**

```tsx
import { Card } from '@/components/card/Card'

const product = {
	title: 'Smartphone',
	img: '/images/smartphone.jpg',
	price: '599.99',
	link: 'https://example.com/smartphone',
	priceHistory: [
		{ date: '2024-01-01', price: '699.99' },
		{ date: '2024-02-01', price: '599.99' },
	],
	id: 'product-123',
}

export default function App() {
	return (
		<div className='grid gap-4'>
			<Card {...product} />
		</div>
	)
}
```

### `Menu` Component

The `Menu` component renders a navigation menu that dynamically displays categories. It includes support for toggling category visibility and provides a loading indicator while data is being fetched.

#### **Props**

The `Menu` component accepts the following props:

- `categories` (`TCategory[] | null`, required):  
  An array of categories to display, or `null` if categories are loading.  
  Each `TCategory` object includes:

  - `id` (`string`): Unique identifier for the category.
  - `title` (`string`): Name of the category.
  - `subcategories?` (`TSubcategory[]`): Optional list of subcategories.

- `onClose` (`() => void`, required):  
  A callback function invoked when the menu or a category should be closed.

---

#### **Features**

1. **Dynamic Categories**

   - Categories are displayed using the `CategoryTitle` component.
   - Each category can be expanded or collapsed by clicking its title.

2. **Loading State**

   - Displays a `Loader` component if `categories` is `null`.

3. **Scrollable Menu**

   - Provides a scrollable view for long menus on smaller screens.
   - Adjusts styling for larger screens (e.g., flex-wrap layout for categories).

4. **State Management**
   - Tracks open categories using the `openCategories` state.
   - Allows only one category to be open at a time for better user experience.

---

#### **Implementation Details**

1. **Category Toggle**  
   The `toggleCategory` function adds or removes a category title from the `openCategories` array, allowing users to expand or collapse specific categories.

2. **Responsive Design**

   - Applies different layouts for small and large screens using Tailwind CSS classes (`flex-col` for small, `flex-row` for large).
   - Ensures usability on mobile devices with `scrollbar-gutter-stable` and custom scrolling.

3. **Conditional Rendering**

   - If `categories` is `null`, the `Loader` component is shown.
   - If `categories` contains data, the list of categories is rendered using the `map` function.

4. **Keyboard & Accessibility Support**
   - Each `CategoryTitle` is a clickable element with its own accessibility attributes.
   - The `onClose` function can be used to implement closing behavior for keyboard users.

---

#### **Example Usage**

```tsx
import { Menu } from '@/components/menu/Menu'

const mockCategories = [
	{ id: '1', title: 'Electronics' },
	{ id: '2', title: 'Home & Kitchen' },
	{ id: '3', title: 'Books', subcategories: [{ id: '3-1', title: 'Fiction' }] },
]

export default function App() {
	return (
		<div>
			<Menu
				categories={mockCategories}
				onClose={() => console.log('Menu closed')}
			/>
		</div>
	)
}
```

### `SearchComponent`

The `SearchComponent` provides a search bar with real-time suggestions based on user input. It includes debounce functionality to optimize API requests and displays a loading indicator while fetching data.

---

#### **Features**

1. **Real-Time Search**

   - Performs API calls to fetch search results matching the user's input.
   - Results are debounced to reduce unnecessary API requests.

2. **Loading Indicator**

   - Displays the `Loader` component while the search results are being fetched.

3. **Input Formatting**

   - Utilizes the `formatSearchTerm` utility to sanitize and format user input before initiating a search.

4. **State Management**
   - Uses local state to manage the search term and loading status.
   - Stores the search results in a centralized store (`useSearchStore`).

---

#### **Implementation Details**

1. **Debounced Search**

   - The `useDebounce` hook delays API calls until the user stops typing for 500ms.
   - Helps to minimize redundant network requests and improve performance.

2. **Search Logic**

   - The `startSearch` function (memoized with `useCallback`) handles API requests using `searchProductsByPrefix`.
   - Ensures results are stored in `useSearchStore` through the `setResults` method.

3. **Input Handling**

   - The `handleInputChange` function ensures that raw input is processed and formatted using the `formatSearchTerm` utility.
   - Maintains a responsive and user-friendly input experience.

4. **Loading State**
   - While search results are loading, a visual indicator (`Loader`) is displayed.

---

#### **Props**

This component does not accept any props. It manages its behavior and state internally.

---

#### **Example Usage**

```tsx
import { SearchComponent } from '@/components/search/SearchComponent'

export default function App() {
	return (
		<div className='p-4'>
			<SearchComponent />
		</div>
	)
}
```
