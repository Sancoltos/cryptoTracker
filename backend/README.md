# Crypto Tracker - Phase 2

**By: Adam Walters**

**Dataset Source:** [Kaggle - Crypto Currencies Daily Prices](https://www.kaggle.com/datasets/svaningelgem/crypto-currencies-daily-prices)


## Requirements

- Node.js (v18+)
- npm

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run the server:
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## Project Structure
```
cryptoTracker/
├── data/                  # JSON data files
├── modules/               # Feature modules
│   ├── crypto/           # Cryptocurrency management
│   ├── dailyPrice/       # Price tracking
│   └── watchlist/        # Watchlist management
├── server.js             # Main server file
└── package.json          # Dependencies
```

## Features

- **Cryptocurrencies** - Add, view, update, delete crypto info
- **Price Tracking** - Track daily prices and price history  
- **Watchlist** - Manage personal crypto watchlist
- **Validation** - Input validation on all POST/PUT requests
- **Error Handling** - Proper error responses

## API Endpoints

### Crypto
- `GET /crypto` - Get all cryptocurrencies
- `POST /crypto` - Add new cryptocurrency
- `PUT /crypto/:name` - Update cryptocurrency
- `DELETE /crypto/:name` - Delete cryptocurrency

### Prices
- `GET /prices/:name/history` - Get price history
- `GET /prices/:name/daily` - Get latest price
- `POST /prices` - Add daily price

### Watchlist
- `GET /watchlist` - Get watchlist
- `POST /watchlist` - Add to watchlist
- `DELETE /watchlist/:name` - Remove from watchlist
---

## GitHub Repository

[https://github.com/Sancoltos/cryptoTracker](https://github.com/Sancoltos/cryptoTracker)
