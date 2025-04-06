# Solution-Challenge-2025

# EchoTechMarket

**Turning Trash into Treasure – An E-Waste Marketplace for a Sustainable Future**

EchoTechMarket is an innovative web platform that empowers users to sell, bid, and recycle used electronics. It promotes responsible consumption, reduces e-waste, and encourages environmental consciousness with built-in impact tracking and gamification through eco-points.

## 🌍 Problem Statement

With increasing electronic consumption and short device lifespans, the world is facing an e-waste crisis. Toxic components in electronics end up in landfills, damaging ecosystems and human health. There is a lack of accessible platforms encouraging proper disposal or reuse.

## 💡 Our Solution

EchoTechMarket provides a transparent auction-style platform for individuals to sell their old gadgets to buyers who value them most. With eco-impact tracking and incentives, the platform aims to extend the life cycle of electronics, making sustainability profitable.

## 🔥 Key Features

- **E-Waste Bidding System**: Sell your old electronics to the highest bidder in a fair and exciting auction model.
- **Product Listings**: Add electronic devices with images, descriptions, and starting bid.
- **Environmental Impact Tracker**: See how much CO₂ emissions and waste you’ve reduced.
- **Eco Points System** *(Coming Soon)*: Get rewarded for recycling and sustainable practices.
- **User Dashboard**: Track items listed, auctions won, and total environmental impact.
- **Authentication**: Secure user login and registration using Firebase.

## 🛠️ Built With

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Firebase Firestore (NoSQL database), Firebase Auth
- **Hosting**: Firebase Hosting
- **Design Tools**: Figma, Canva

## 🌱 Environmental Impact Tracking

When listing a product, users input the weight and material types. The system estimates:
- 🌫️ **CO₂ Emissions Saved**
- ♻️ **Materials Recovered** (like Plastic, Aluminum)
- 🗑️ **Waste Reduction Impact**

These are visualized in the **Environmental Impact Dashboard**, showing progress over time.

## 🎮 Eco Points System *(Upcoming Feature)*

Users earn **Eco Points** for:
- Listing products
- Successfully recycling or selling items
- Participating in green challenges

These points can be redeemed for discounts, badges, or leaderboard rankings.

## 🚀 Getting Started

### Prerequisites
- Node.js
- Firebase account

### Installation

```bash
git clone https://github.com/avantika1036/Solution-Challenge-2025.git
cd Solution-Challenge-2025
npm install
```

Set up your `.env` file with Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

### Run the app

```bash
npm start
```

## 📁 Project Structure

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

## 🏆 Acknowledgements

- Google Solution Challenge 2025
- Global E-Waste Monitor 2020
- Firebase Team & React Community

## 📜 License

MIT License

---

> 💚 *EchoTechMarket is not just an app—it's a step towards sustainable technology and a greener future.*
