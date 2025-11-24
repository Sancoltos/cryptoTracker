# CryptoTrak Phase 4

**Project Name:** CryptoTrak Phase 4  
**Class:** CPAN-212-0NE  
**Student:** Adam Walters  
**Dataset Source:** [Kaggle - Crypto Currencies Daily Prices](https://www.kaggle.com/datasets/svaningelgem/crypto-currencies-daily-prices)

---


## Features

- **Cryptocurrencies** - Add, view, update, delete crypto info with search and pagination
- **Price Tracking** - Track daily prices and view complete price history  
- **Watchlist** - Manage personal crypto watchlist with sorting options
- **Validation** - Input validation on all POST/PUT requests
- **Error Handling** - Proper error responses with middleware
- **Search & Filter** - Search cryptocurrencies by name with regex matching
- **Pagination & Sorting** - Full pagination and sorting support on all list endpoints

---

## Tech Stack

### Frontend
- React 18
- Vite
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB/Mongoose
- Express Validator

---

## Project Structure

### Backend
```
backend/
├── data/                  # JSON data files
├── modules/               # Feature modules
│   ├── crypto/           # Cryptocurrency management
│   │   ├── cryptoRoutes.js
│   │   ├── cryptoModel.js
│   │   └── cryptoValidation.js
│   ├── dailyPrice/       # Price tracking
│   │   ├── dailyPriceRoutes.js
│   │   ├── dailyPriceModel.js
│   │   └── dailyPriceValidation.js
│   └── watchlist/        # Watchlist management
│       ├── watchlistRoutes.js
│       ├── watchlistModel.js
│       └── watchlistValidation.js
├── server.js             # Main server file
└── package.json          # Dependencies
```

### Frontend
```
frontend/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddCrypto.jsx
│   │   ├── Button.jsx
│   │   ├── CryptoCard.jsx
│   │   ├── Header.jsx
│   │   ├── MarketOverview.jsx
│   │   ├── PriceHistory.jsx
│   │   ├── TabNavigator.jsx
│   │   └── Watchlist.jsx
│   ├── css/
│   │   ├── addCrypto.css
│   │   ├── cryptoCard.css
│   │   ├── Header.css
│   │   ├── marketOverview.css
│   │   └── TabNav.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
└── package.json
```

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root directory:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## API Endpoints

### Cryptocurrency Endpoints (`/crypto`)

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/crypto` | Get all cryptocurrencies | `search`, `sort_by`, `sort_order`, `limit`, `page` |
| GET | `/crypto/search/:name` | Search cryptocurrencies by name | - |
| GET | `/crypto/:name` | Get cryptocurrency by name | - |
| POST | `/crypto` | Add new cryptocurrency | - |
| POST | `/crypto/bulk` | Bulk insert cryptocurrencies | - |
| PUT | `/crypto/:name` | Update cryptocurrency | - |
| DELETE | `/crypto/:name` | Delete cryptocurrency | - |

**Example GET /crypto Response:**
```json
{
  "count": 100,
  "page": 1,
  "limit": 10,
  "data": [...]
}
```

### Daily Price Endpoints (`/prices`)

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/prices` | Get daily prices | `search`, `sort_by`, `sort_order`, `limit`, `page` |
| GET | `/prices/:name/history` | Get price history for cryptocurrency | - |
| GET | `/prices/:name/daily` | Get latest daily price | - |
| POST | `/prices` | Add daily price | - |
| PUT | `/prices/:id` | Update daily price | - |
| DELETE | `/prices/:id` | Delete daily price | - |

**Example GET /prices/:name/history Response:**
```json
[
  {
    "crypto_name": "Bitcoin",
    "date": "2024-01-01",
    "price": 45000,
    ...
  }
]
```

### Watchlist Endpoints (`/watchlist`)

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/watchlist` | Get watchlist items | `search`, `sort_by`, `sort_order`, `limit`, `page` |
| GET | `/watchlist/:id` | Get watchlist item by ID | - |
| POST | `/watchlist` | Add cryptocurrency to watchlist | - |
| DELETE | `/watchlist/:name` | Remove cryptocurrency from watchlist | - |

**Example POST /watchlist Request Body:**
```json
{
  "crypto_name": "Bitcoin"
}
```

---

## Query Parameters

All list endpoints support the following query parameters:

- `search` - Filter by crypto name (string)
- `sort_by` - Field to sort by (default varies by endpoint)
- `sort_order` - Sort order: `asc` or `desc` (default: `asc`)
- `limit` - Number of results per page (default: 10)
- `page` - Page number (default: 1)

**Example:**
```
GET /crypto?search=bit&sort_by=rank&sort_order=asc&limit=20&page=1
```

---

## Validation

All POST and PUT endpoints include validation middleware:

- **Crypto endpoints:** `validationCreateCryptek`, `validationUpdateCryptek`
- **Price endpoints:** `validationCreateDaily`, `validationUpdateDaily`
- **Watchlist endpoints:** `validatorAddToWatchlist`

Validation errors return a 400 status code with error details.

---

## Error Handling

The application includes comprehensive error handling:

- 200: Success
- 201: Created
- 400: Validation error
- 404: Resource not found
- 500: Server error

All errors are passed to Express error handling middleware using `next(error)`.

---

## Development

### Running in Development Mode

**Backend:**
```bash
npm run dev
```

**Frontend:**
```bash
npm run dev
```

### Building for Production

**Frontend:**
```bash
npm run build
```

The production build will be created in the `dist/` directory.

---

## License

This project is created for educational purposes as part of CPAN-212-0NE coursework.

---

## Author

**Adam Walters**  
CPAN-212-0NE