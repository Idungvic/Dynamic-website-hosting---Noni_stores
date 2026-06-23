# 🛍️ noni Store’s

![Status](https://img.shields.io/badge/Status-Live-brightgreen) ![AWS](https://img.shields.io/badge/Cloud-AWS%20DynamoDB-orange) ![React](https://img.shields.io/badge/Frontend-React.js-blue) ![Node](https://img.shields.io/badge/Backend-Node.js-green) ![S3](https://img.shields.io/badge/Hosted-AWS%20S3-yellow)

A bright, colorful, and vibrant full stack e-commerce web application where customers can browse and purchase fashion items including Shoes, Clothes, Dresses, Bags, Accessories, and Jewelry. Built with React.js, Node.js, and AWS DynamoDB, hosted live on AWS S3.

🌐 **Live Site:** <http://noni-stores-website.s3-website-us-west-2.amazonaws.com>

-----

## ✨ Features

- Browse products across 6 fashion categories
- Add items to shopping cart and wishlist
- Full checkout with 7 payment options
- Automated order confirmation emails via EmailJS
- Admin dashboard with live sales analytics
- Cloud storage powered by AWS DynamoDB
- Hosted live on AWS S3

-----

## 💳 Payment Options

- Debit Card (Visa, Mastercard, Verve)
- OPay
- PalmPay
- PayPal
- Moniepoint
- USSD (No internet needed)
- Cash Payment (Walk-in customers)

-----

## 🛒 Product Categories

Shoes, Clothes, Dresses, Bags, Accessories, Jewelry

-----

## 🛠️ Tech Stack

|Layer   |Technology                         |
|--------|-----------------------------------|
|Frontend|React.js, React Router, React Icons|
|Backend |Node.js, Express.js                |
|Database|AWS DynamoDB (us-west-2)           |
|Hosting |AWS S3 Static Website              |
|Email   |EmailJS                            |

-----

## 📁 Project Structure

```
noni-stores/
  backend/
    server.js
    package.json
  frontend/
    src/
      components/
        Navbar.js
        Footer.js
        ProductCard.js
      context/
        StoreContext.js
      data/
        products.js
      pages/
        Home.js
        Products.js
        ProductDetail.js
        Cart.js
        Wishlist.js
        Checkout.js
        OrderConfirmation.js
        Admin.js
      App.js
      App.css
    public/
  .gitignore
  README.md
```

-----

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- AWS Account
- EmailJS Account

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Chinonsoviv/noni-stores.git
cd noni-stores
```

**2. Set up the backend**

```bash
cd backend
npm install
```

**3. Create backend/.env**

```
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
PORT=5000
```

**4. Set up the frontend**

```bash
cd ../frontend
npm install
```

**5. Run the app**

Terminal 1:

```bash
cd backend
node server.js
```

Terminal 2:

```bash
cd frontend
npm start
```

Visit `http://localhost:3000`

-----

## ☁️ AWS Setup

1. Create two DynamoDB tables in us-west-2
1. Table 1: `noniOrders` with partition key `id` (String)
1. Table 2: `noniProducts` with partition key `id` (String)
1. Add your AWS credentials to `backend/.env`

-----

## 📧 Email Setup

1. Create an account at emailjs.com
1. Connect your Gmail as an email service
1. Create an order confirmation template
1. Add your Service ID, Template ID, and Public Key to `Checkout.js`

-----

## 🌐 Deployment

**Frontend on AWS S3:**

```bash
cd frontend
npm run build
```

Upload the build folder contents to your S3 bucket with static website hosting enabled.

**Backend on Render.com:**

1. Connect your GitHub repository to Render
1. Set root directory to `backend`
1. Add environment variables
1. Deploy

-----

## 👩‍💻 Author

**Idung Victor Hogan**
Cloud Computing and Full Stack Development Portfolio Project 2026

[![GitHub](https://img.shields.io/badge/GitHub-Chinonsoviv-black)](https://github.com/Chinonsoviv)