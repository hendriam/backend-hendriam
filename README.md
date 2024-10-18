# backend-hendriam

This project is a simple RESTful API built with NodeJS using the Repository Pattern.
I implemented the repository pattern in this project. The Repository Pattern is a design pattern in software development that aims to separate data access logic from business logic. By using this pattern, interactions with data sources (such as databases) are encapsulated in a separate layer known as the repository. This project demonstrates how to implement this design pattern in a RESTful API.

## Getting Started

### Prerequisites

Before you can run the project locally, you need to import the database, which I have provided in the `dump.sql`.

### Create a Database and Table

```sql
CREATE DATABASE marketplace;
```

```sql
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `harga` decimal(10,0) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
```

```sql
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `ongkir` decimal(10,0) DEFAULT NULL,
  `diskon` decimal(10,0) DEFAULT NULL,
  `total_bayar` decimal(10,0) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
```

```sql
CREATE TABLE `transaction_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transaksi_id` int DEFAULT NULL,
  `produk_id` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
```

### Clone the Repository and Install package

```bash
git https://github.com/hendriam/backend-hendriam.git
cd backend-hendriam
npm install
```

### Setting Environment Variables

Make sure the environment variables for database configuration and logging are set before running the application. You can do this with the following command in the terminal:

```bash
export APP_HOST=localhost
export APP_PORT=3000
export DB_HOST=localhost
export DB_PORT=3306
export DB_USER=root
export DB_PASS=
export DB_NAME=marketplace
export JWT_SECRET=ccee94dea3077d9f7fff8d00ddf3afe3ce747e5f1b388f661b698cddeaca4e98
export JWT_EXPIRED=1d
export LEVEL_LOG=info
```

### Running the Project

```bash
node index.js
```

The server will start on http://localhost:3000/.

### About User Roles

In this API, there are two types of users: merchant and customer.
Merchants can perform crud product operations and view transaction lists.
Customers can view products and make transactions.
For the user I use dummy data in the `data_user.js` file.

### API Endpoints

Copy this client code on your postman or insomnia app, please!

### Merchant User

##### Generate Token

Description: This endpoint for generate new token.

```
POST /api/v1/auth HTTP/1.1
Content-Type: application/json
User-Agent: insomnia/10.0.0
Host: localhost:3000
Content-Length: 54
{
	"username": "merchant1",
	"password": "merchant1"
}
```

##### Create a New Product

Description: This endpoint for create a new product.

```
POST /api/v1/product HTTP/1.1
Content-Type: application/json
User-Agent: insomnia/10.0.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1lcmNoYW50IDEiLCJsZXZlbCI6Im1lcmNoYW50IiwiaWF0IjoxNzI5MTQxMjE2LCJleHAiOjE3MjkyMjc2MTZ9.UWRb_60oumeJgs_nf-Fl5ZW3e4GHv3GQIu2q3TIim_M
Host: localhost:3000
Content-Length: 40
{
	"nama": "Product 1",
	"harga": 3000
}
```

##### Get All Products

Description: Retrieves a list of all products.

```
GET /api/v1/product HTTP/1.1
User-Agent: insomnia/10.0.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkN1c3RvbWVyIDIiLCJsZXZlbCI6ImN1c3RvbWVyIiwiaWF0IjoxNzI5MTQ1OTYzLCJleHAiOjE3MjkyMzIzNjN9.nk0Vda9p8jTiaWNv63Wy2drjULTgFj7Guw0hwfoU3ic
Host: localhost:3000
```

##### Get a product by ID

Description: Retrieves details of a product by its ID.

```
GET /api/v1/product/1 HTTP/1.1
User-Agent: insomnia/10.0.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkN1c3RvbWVyIDIiLCJsZXZlbCI6ImN1c3RvbWVyIiwiaWF0IjoxNzI5MTQ1OTYzLCJleHAiOjE3MjkyMzIzNjN9.nk0Vda9p8jTiaWNv63Wy2drjULTgFj7Guw0hwfoU3ic
Host: localhost:3000
```

##### Update a product

Description: Updates the details of an existing product by its ID.

```
PUT /api/v1/product/4 HTTP/1.1
Content-Type: application/json
User-Agent: insomnia/10.0.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1lcmNoYW50IDEiLCJsZXZlbCI6Im1lcmNoYW50IiwiaWF0IjoxNzI5MTQxMjE2LCJleHAiOjE3MjkyMjc2MTZ9.UWRb_60oumeJgs_nf-Fl5ZW3e4GHv3GQIu2q3TIim_M
Host: localhost:3000
Content-Length: 40
{
	"nama": "Product 3",
	"harga": 2000
}
```

##### Delete a Product

Description: Deletes a Product by its ID.

```
DELETE /api/v1/product/3 HTTP/1.1
User-Agent: insomnia/10.0.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1lcmNoYW50IDEiLCJsZXZlbCI6Im1lcmNoYW50IiwiaWF0IjoxNzI5MTQxMjE2LCJleHAiOjE3MjkyMjc2MTZ9.UWRb_60oumeJgs_nf-Fl5ZW3e4GHv3GQIu2q3TIim_M
Host: localhost:3000
```

##### Get All Transactions

Description: Retrieves a list of all Transactions.

```
GET /api/v1/transaksi HTTP/1.1
User-Agent: insomnia/10.0.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1lcmNoYW50IDEiLCJsZXZlbCI6Im1lcmNoYW50IiwiaWF0IjoxNzI5MTQxMjE2LCJleHAiOjE3MjkyMjc2MTZ9.UWRb_60oumeJgs_nf-Fl5ZW3e4GHv3GQIu2q3TIim_M
Host: localhost:3000
```

### Customer User

##### Generate Token

Description: This endpoint for generate new token.

```
POST /api/v1/auth HTTP/1.1
Content-Type: application/json
User-Agent: insomnia/10.0.0
Host: localhost:3000
Content-Length: 54
{
	"username": "customer1",
	"password": "customer1"
}
```

##### Create Transaction

Description: This endpoint for create a new transaction.

```
POST /api/v1/transaksi HTTP/1.1
Content-Type: application/json
User-Agent: insomnia/10.0.0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkN1c3RvbWVyIDIiLCJsZXZlbCI6ImN1c3RvbWVyIiwiaWF0IjoxNzI5MTQ1OTYzLCJleHAiOjE3MjkyMzIzNjN9.nk0Vda9p8jTiaWNv63Wy2drjULTgFj7Guw0hwfoU3ic
Host: localhost:3000
Content-Length: 83
{
	"items": [
		{
			"id": 1,
			"qty": 2
		},
		{
			"id": 4,
			"qty": 3
		}
	]
}
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
