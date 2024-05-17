OptiSalud Web Application
OptiSalud is a comprehensive web application designed to manage the inventory of medical supplies across multiple clinics. This application is intended for administrators to efficiently handle the inventory data, including adding, updating, and deleting medication records. It is integrated with Firebase for seamless data management and authentication.

Table of Contents
Features
Technologies Used
Setup and Installation
Usage
File Structure
Contributing
License
Contact
Features
User Authentication: Secure login for administrators using Firebase Authentication.
Medication Management: Add, update, and delete medications from the inventory.
Real-Time Data: Syncs with Firebase to provide real-time data updates.
Search and Sort: Search for medications and sort the list by name or code.
Responsive Design: Optimized for various screen sizes.
Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Firebase (Firestore Database, Authentication)
Tools: Node.js, npm
Setup and Installation
Prerequisites
Ensure you have the following installed:

Node.js (with npm)
Firebase project set up
Installation
Clone the repository:

bash
Copiar código
git clone https://github.com/your-username/optisalud-web.git
cd optisalud-web
Install dependencies:

bash
Copiar código
npm install
Set up Firebase:

Create a Firebase project in the Firebase Console.
Enable Firestore Database and Authentication.
Add your Firebase configuration to files/conexion2.js.
Run the application:

bash
Copiar código
npm start
Usage
Authentication
Admins need to log in using their credentials to access the dashboard.

Medication Management
Add Medication: Navigate to crearMed.html to add a new medication.
Update Medication: Modify the quantity of existing medications directly in the table.
Delete Medication: Remove medications from the inventory using the delete button.
Search and Sort
Use the search bar to filter medications by name.
Use the dropdown to sort medications by name or code.
File Structure
bash
Copiar código
optisalud-web/
├── files/
│   ├── conexion2.js      # Firebase configuration and initialization
│   └── principal1.js     # Main JavaScript functionality for the web app
├── styles/
│   └── style.css         # CSS styles for the web app
├── index.html            # Main HTML file
├── crearMed.html         # HTML file for adding new medications
└── README.md             # This README file
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

Fork the repository
Create your feature branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature/YourFeature)
Create a new Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any inquiries or issues, please contact:

Name: [Your Name]
Email: [your-email@example.com]
GitHub: your-github-username
