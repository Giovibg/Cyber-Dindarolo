# Cyber Dindarolo

Applicazioni Web e Mobile Project - UNIMORE
Giovanni Bagnoli - 205960@studenti.unimore.it

## Requirements

- Python3
- Django
- React
- React Native with EXPO
- Node, npm

## Folders project navigation:

- `/backend`: Backend Django configurations (settings.py, urls...). 
- `/api`: API management.
- `/jwt_auth`: JWT authentication management.
- `/frontend`: Web frontend developed with React
- `/mobile/DindaroloMobile`: Native app for Android developed with React Native

## Start Web and Mobile Project

- (optional) Create python3 venv
- Install requirements: `pip install -r requirements.txt`
- Run Server: `python3 manage.py runserver <IP:port>` (default localhost:8000)
- If Server IP different from default: 
    1. Add your IP to `ALLOWED_HOSTS` list in `/backend/settings.py`
    2. Replace `baseURL` variable with your IP and port in: `/frontend/src/apiServices.js` and `DindaroloMobile/components/apiServices.js`
    3. `cd frontend/ && npm run build` to update changes
- Start mobile: `cd DindaroloMobile/` && `npm run android`
- (optional) some tests available: `python3 manage.py test api`
## Project specs agreed

- Each user should be registered to obtain an access to the portal.
- A user can gain a credit adding name, description, quantity and unit price of products bought. Each product inserted will be available for the other users.
- Each user can buy a product (if credit is sufficient) available in the portal choosing a product available and inserting quantity bought.
- For each user is available a history of all his transactions done (both positive and negative transactions).



## API Features

- Nobody which is not authenticated can't interact with the portal.

- Authentication with JWT:	
    - Register account: post `username`(UNIQUE), `email`(UNIQUE), `password`, `password2` at `/jwt_auth/register/`.
    - Login (if account available): post `username` and `password` at `/api/token/`.
	- Both login and register returns an `Access Token`(valid for 5 minutes) and a `Refresh Token`(valid for 24h).
    - Logout blacklisting refresh token: post `Refresh Token` at `/jwt_auth/blacklist`


- Add product:			
Each user can add a product (and gain a credit), putting `name`, `description`, `quantity` and `unit_price` to `/api/products/` . 
 Product inserted will be available for all other users.
 
    - If the product inserted is already available, quantity and unit_price will be updated:
    
	    - `new_quantity_available` = `previous_quantity_available` + `quantity_inserted`.
	
	    - `new unit price` =  ((`previous unit_price` * `previous quantity`) + (`new unit_price` * `new_quantity`)) / `new_quantity_available`)

	    - `new_budget_available` for user = `old_budget _available` + (`quantity_inserted` * `unit_price`)



- Make a transaction(buy something available in the portal):	Each user can buy a product, previously inserted from someone, choosing `product` and inserting `quantity` of pieces we want to buy to `/api/transactions/`:

	- If sufficient budget, if sufficient quantity available => Transaction created. `New budget` for user = `old_budget` - (`quantity_bought` * `unit_price_product`).


- View list of all products available inserted by users:

    - GET at `/api/products/` 	=> return: `product_name`, `description`, `quantity_available`, `unit_price` 

- View History of transactions made by an user, positive and negative:
    - GET `/api/transactions/`   => return: list of `product name`, `quantity`, `unit_price`, `subtotal`, `currency`, `date of transaction`, `type of transaction`(positive or negative transaction)

- Obtain budget available for current user: 
    - GET `/api/budget` => return `user_id`, `budget available`




