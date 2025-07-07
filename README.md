# Macro tracker Backend

## Features

- **User Authentication** (Register/Login with JWT)
- **Profile Management** (Targets for calories, protein, water, etc.)
- One-time food import script from CSV
- **Food Search API**
- **Food Diary Logging**
- **Daily Dashboard** (Calories, protein, carbs, fat summary)

## Folder Structure

![image](https://github.com/user-attachments/assets/aa0008a8-ab72-43fc-9ed4-2d458d5c79e1)


## Setup IUnstructions

1. Clone and install
<pre>
git clone https://github.com/KeerthiKelam-minfy/macro_planner
cd macro_planner
npm install
</pre>

2. Configure Environment Variables  
  
Refer the env.example and create your .env file with all the environment variables.
  
3. Before starting the server, import the food database(one time only)
  
node scripts/importFoods.js

4. Start the server

npm start

# API Endpoints

✅ POST /api/auth/register
Register a new user

Body (JSON):
<pre>
{
  "name": "Keerthi K",
  "email": "keerthi@example.com",
  "password": "Keerthi@123"
}
</pre>

![image](https://github.com/user-attachments/assets/ca2f1075-a0db-4104-9dcb-d2ee20e8397d)
  
  
✅ POST /api/auth/login
Login user and get JWT

Body (JSON):

<pre>
{
  "email": "keerthi@example.com",
  "password": "Keerthi@123"
}  
</pre>

**Response:**
<pre>
{
  "token": "YOUR_JWT_TOKEN"
}
</pre>

🟡 Save the token and use it in headers for the routes below.

![image](https://github.com/user-attachments/assets/41e2ddb4-df9d-423c-b2a5-5330cdbd9275)

**(for protected routes)**
Header:  
Authorization: Bearer YOUR_JWT_TOKEN  
  
## PROFILE MANAGEMENT
(Protected routes)

✅ GET /api/profile
Get current user profile

Headers:
Authorization: Bearer YOUR_JWT_TOKEN

![image](https://github.com/user-attachments/assets/810df8a5-61e9-42f4-bc20-092e7f2e5bfa)
  
  
✅ PUT /api/profile  
Update macro targets  
   
Headers:  

Authorization: Bearer YOUR_JWT_TOKEN  
Body (JSON):  
<pre>
{
  "target_calories": 1900,
  "target_protein": 120,
  "target_carbs": 180,
  "target_fat": 60,
  "target_water": 3000
}  
</pre>

![image](https://github.com/user-attachments/assets/02b1f7b9-aac2-46fc-9ea0-532652a1df4e)
  
**FOOD**
✅ GET /api/foods?search=rice  
Search for food items  
  
Example:  
  
GET /api/foods?search=chicken
  
![image](https://github.com/user-attachments/assets/6c3ae52f-ade7-4690-9b21-8579434e4704)
   
**FOOD DIARY**
(Protected routes)
  
✅ POST /api/diary  
Manually log a food item for a user
  
Headers:  
  
Authorization: Bearer YOUR_JWT_TOKEN

Body (JSON):

{
  "food_id": "YOUR_FOOD_ID_you_got_from_food_search_endpoint",
  "quantity": 2,
  "meal_type": "Lunch",
  "log_date": "2025-07-07"
}

![image](https://github.com/user-attachments/assets/647b833c-2430-4e28-9fa7-da5795420e06)
![image](https://github.com/user-attachments/assets/fd70cc5d-6127-4019-bab2-acb21bd26461)


**Water Log  **
POST  
![image](https://github.com/user-attachments/assets/ebfa71b9-03ac-476c-b5c1-dac26d01afc7)
GET  
![image](https://github.com/user-attachments/assets/d5dbe7ce-e1ee-4c3d-b0e2-048ec7ab8c59)
  

**Weight Log  **
POST  
![image](https://github.com/user-attachments/assets/0d658854-60d4-4549-88d3-be6cf1b9eb65)
GET  
![image](https://github.com/user-attachments/assets/0a93b44d-16f9-452f-b2c8-a5455cc67c92)
  

✅ GET /api/dashboard?date=2025-07-07  
Get daily dashboard for calories, protein, etc.  

Headers:

Authorization: Bearer YOUR_JWT_TOKEN

Response:
<pre>
{
  "total_calories": 483,
  "total_protein": 30.5,
  "total_carbs": 40,
  "total_fat": 12
}
</pre>
   
![image](https://github.com/user-attachments/assets/a04060d1-f638-4681-b3c4-96640e7b82dd)
