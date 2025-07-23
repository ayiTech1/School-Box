# School box Ecommerce Platform

This is a Laravel + Inertia.js + React ecommerce platform. It includes admin management for products, categories, orders, brands, burners, shippings, reviews, wishlists, coupons, and more.

## Features
- Product, Category, Brand, Banner, and Order Management
- User authentication (admin & customer)
- Custom table components for all major resources
- Pagination, search, and CRUD operations
- API-ready backend

## Getting Started

### Prerequisites
- PHP 8+
- Composer
- Node.js & npm
- A database (SQLite, MySQL, etc.)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/ayiTech1/School-Box.git
   cd School-Box
   ```
2. Install PHP dependencies:
   ```sh
   composer install
   ```
3. Install JS dependencies:
   ```sh
   npm install
   ```
4. Copy and configure your environment:
   ```sh
   cp .env.example .env
   # Edit .env as needed
   php artisan key:generate
   ```
5. Run migrations and seeders:
   ```sh
   php artisan migrate --seed
   ```
6. Build frontend assets:
   ```sh
   npm run build
   ```
7. Start the development server:
   ```sh
   php artisan serve
   ```

## Usage
- Visit `/admin` for the admin dashboard.
- Use the sidebar to manage products, orders, brands, etc.
- Customers can browse and order products from the main site.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)