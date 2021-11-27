# Submission-Toll
Online Exam Portal

View the **[Live demo application](https://samyak3009.github.io/frontend-live/#/home_page)** 
# Getting started

### Frontend installation:
1. Clone repository
2. Install gulp
3. Run `gulp serve`

Make sure you have gulp installed globally (`npm install -g gulp`)

Node version must be 10.

### Making requests to the backend API

For convenience, we have a live API server running at https://microsoftback.herokuapp.com/ for the application to make requests against. 

The source code for the backend server (available for Django) can be found in the https://github.com/samyak3009/backend/.

If you want to change the API URL to a local server, simply edit `src/app/components/services/BaseUrl.js` and change `api` to the local server's 
Note: bower_components and node_modules are the dependencies file not the we pushed it on the repo for the easier installation for you. 

### Backend installation :
1.	Move to backend directory (`cd backend`).
2.	Run the environment (`.\env\Scripts\activate`) command to run env for window.
3.	In this environment all the dependencies are fulfilled which are mentioned in the requirement.txt file.
4.	Python should be installed in the system globally python version – 3.9.0
5.	The Database used here is the remote MySQL database so their no need to install the database.
6.	If wants to create a local database then install the MySQL database or install Xampp for windows then connect it to backend app by  simply editing the `backend/setting.py` file and after `run python manage.py makemigrations` & `python manage.py migrate`, note that if you are not using local database them no need to run these commands.
7.	Run `python manage.py runserver 8000`.
8.	The server will get started and gives you the address (e.g: http://127.0.0.1:8000). You can simply update it on frontend `src/app/components/services/BaseUrl.js` file if you want to connect it to local server.
9.	Again, go the frontend directory and `again Run gulp serve`.
10.	You will get redirected to the homepage for the app Automatically. 

<br />

