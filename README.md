# E-Commerce MERN Stack Project

# How to secure API

express-rate-limit

# MVC (Model views controller) Architecture

- /test ---> health check
- /seed ---> seeding some data

- /api/users

  - POST /register -> create the user account
  - POST /activate -> activate the user account
  - GET /profile -> get the user account
  - DELETE /:id -> delete the user account
  - PUT /:id -> update the user account
  - PUT /update-password/:id -> update the password
  - POST /forget-password -> forget the password
  - PUT /reset-password -> reset the password
  - PUT - Admin /ban/:id -> ban the user
  - PUT - Admin /unban/:id -> unban the user
  - GET - Admin /export-users -> export all users

- /api/auth/ (JWT Auth)

  - POST /login -> isLoggedOut -> user login
  - POST /logout -> isLoggedIn - > user logout
  - GET /refresh -> get refresh token

- Middleware

  - isLoggedIn 
  - isLoggedOut
  - isAdmin 
  - uploadFile
  - getRefreshToken
  - userValidation
  - runValidation

- /api/category

  - POST / -> create the category (admin)
  - GET / -> get all the categories (admin)
  - GET /:id -> get the single category (admin)
  - POST / -> create a  category (admin)
  - DELETE /:id -> delete a category (admin)
  - PUT /:id -> update a category (admin)

 
- /api/product

  - POST / -> create the product (admin)
  - GET / -> get all the products
  - GET /:id -> get the single product 
  - POST / -> create a  blog (admin)
  - DELETE /:id -> delete a product (admin)
  - PUT /:id -> update a profuct (admin)

 
- /api/orders

  - POST / -> create the order (admin/user)
  - GET / -> get all the order (user/admin)
  - GET /:id -> get the single orders (admin) 
  - DELETE /:id -> delete a an order (admin)
  - PUT /:id -> update a order (admin)


- /api/payment

  - GET /token -> get the payment token (admin/user)
  - POST /process-payment -> process the payment(user/admin)



 
