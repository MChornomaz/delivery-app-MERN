This is a simple food delivery application built using the MERN stack. It allows users to browse restaurants, select dishes from menus, add them to the cart, place orders, and view order history using email or order ID.

Project Setup:

1. Clone the project to your local machine by running the following command:
git clone https://github.com/MChornomaz/delivery-app-MERN.git

2. Open separate terminal windows for the "front-end" and "back-end" directories and install the dependencies for each folder using the following command:
cd front-end
npm install

cd ../back-end
npm install

3.For the "back-end" directory, you need to add the MongoDB connection URL. Set the value for the mongodbUrl constant in the app.js file. This URL is obtained from your own MongoDB project by clicking the "Connect" button and selecting the "Drivers" option.

It is important to add this URL; otherwise, the server will not function correctly.


Running the Project:

Once all the dependencies are installed and the MongoDB URL is added:

1.Start the server by running the following command in the "back-end" directory:
npm start

2.Start the React project by running the following command in the "front-end" directory:
npm start


Project Description:

This is a user-friendly food delivery application. Users can select a restaurant for delivery, choose dishes from the menu, add them to the cart, place orders, and view order history using their email or order ID.

Technologies Used:

Server-Side: Node.js, Express, Mongoose
Client-Side: React, Redux Toolkit, React Router Dom 6, SCSS, React modules
Database: MongoDB Atlas
Deployment:

The project is deployed and can be accessed at the following link: https://delivery-app-2437d.web.app/

Feel free to explore the application and enjoy the food delivery experience!