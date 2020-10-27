# Cyber Dindarolo

Applicazioni Web e Mobile Project - UNIMORE

## Requirements

- Python3
- Django
- React
- React Native with EXPO
- Node, npm

## Folders project navigation:

- `/backend`: All general Django configurations of the backend(settings.py, urls...). 
- `/api`: API management.
- `/jwt_auth`: JWT authentication management.
- `/frontend`: Web frontend developed in React
- `/mobile/DindaroloMobile`: Native app for Android developed with React Native

## Start Web and Mobile Project

- (optional) Create python3 venv
- Install backend requirements: `pip install -r requirements.txt`
- Run Server: `python3 manage.py runserver <IP:port>` (default localhost:8000)
- If Server IP different from default: 
1. Add your IP to `ALLOWED_HOSTS` list in `/backend/settings.py`
2. Replace `baseURL` variable with your IP and port in: `/frontend/src/apiServices.js` and `DindaroloMobile/components/apiServices.js`
3. `cd frontend/ && npm run build` to update changes

## Project specs agreed

- Each user should be registered to obtain an access to the portal.
- A user can gain a credit adding name, description, quantity and unit price of products bought. Each product inserted will be available for the other users.
- Each user can buy a product (if credit is sufficient) available in the portal choosing a product available and inserting quantity bought.
- For each user is available a history of all his transactions done (both positive and negative transactions).



## API Features

- Nobody which is not authenticated can't interact with the portal.

- Authentication with JWT:	
    - register account posting `username`, `email`(UNIQUE), `password`, `password2` at `/jwt_auth/register/`.
    - login (if account available) posting `username` and `password` at: `/api/token/`.
	- Both login and register returns an `Access Token`(valid for 5 minutes) and a `Refresh token`(valid for 24h).



- Add product:			
Each user can add a product (and gain a credit), putting `name`, `description`, `quantity` and `unit_price` to `/api/products/` . 
 Product inserted will be available for all other users.
 
    - If the product inserted is already available, quantity and unit_price will be updated:
    
	    - `new_quantity_available` = `previous_quantity_available` + `quantity_inserted`.
	
	    - new unit price for product will be weighted:  ((`previous unit_price` * `previous quantity`) + (`new unit_price` * `new_quantity`)) / `total_quantity`)

	    - `new_budget_available` for user: `old_budget _available` + (`quantity` * `unit_price`)



- Make a transaction(buy something available in the portal):	Each user can buy a product, previously inserted from someone, choosing `product` and inserting `quantity` of pieces we want to buy to `/api/transactions/`:

	- If sufficient budget, if sufficient quantity available => Transaction created. `New budget` for user = `old_budget` - (`quantity_bought` * `unit_price_product`).


- View list of all products available inserted by users:

    - GET at `/api/products/` 	=> return: `product_name`, `description`, `quantity_available`, `weighted unit_price` 

- View History of transactions made by an user, positive and negative:
    - GET `/api/transactions/`   => return: list of `product name`, `quantity`, `unit_price`, `subtotal`, `currency`, `date of transaction`, `type of transaction`(positive or negative transaction)

- Obtain budget available for current user: 
    - GET `/api/budget` => return `user_id`, `budget available`




