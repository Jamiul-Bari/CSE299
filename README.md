<!--
*** Best-README-Template.
*** https://github.com/othneildrew/Best-README-Template
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Jamiul-Bari/CSE299">
    <img src="readme_images/logo.png" alt="Logo" width="128" height="128">
  </a>

  <h3 align="center">tukitak-E</h3>

  <p align="center">
    An E-commerce project for CSE299
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Home Page](/readme_images/screenshot.png)

Our goal is to develop a functioning e-commerce website where
customers can visit and browse necessary groceries of everyday life, add them to
their cart, and checkout to complete their purchase as they would in a real-life
grocery shop. Our vision is to make the website as feature-rich, user-friendly, and
accessible as possible. The ultimate vision is definitely to add all the features
an e-commerce website can have, whether it’s a feature related to UI/UX or a
feature that is part of secure online payment.

### Built With
* [Django](https://www.djangoproject.com/)
* [React](https://reactjs.org/)
* [Django REST Framework](https://www.django-rest-framework.org/)
* [PostgreSQL](https://www.postgresql.org/)



### Prerequisites

Install these before running the project
* [Python](https://www.python.org/downloads/)
* [Node.js](https://nodejs.org/en/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Jamiul-Bari/CSE299.git
   ```
2. Configuration
   1. Configure the frontend
      1. Open your terminal or Command Line inside the root directory and change your directory to /frontend
      ```sh
      cd frontend
      ```
      2. Install required npm packages 
      ```sh
      npm install
      ```
      3. Now to start the React Development Server
      ```sh
      npm start
      ```
   2. Configure the Backend
      1. Open your terminal or Command Line inside the root directory.
      2. Install virtualenv python package
         ```sh
         pip install virtualenv
         ```
      3. Create a virtual environment in the root directory for this project using virtualenv.
         ```sh
         virtualenv venv
         ```
      4. Activate your virtual env “venv” before installing any python package for this project. Activate (For Windows) using - 
         ```sh
         venv/scripts/activate
         ```
      5. Now if your virtual environment activated correctly, you will see "venv" written in the command line interface.
      6. Now install the required packages for the backend as per "requirements.txt". Simply, run this command while you are in the root directory (the directory containing "requirements.txt")
         ```sh
         pip install -r requirements.txt
         ```
3. Now the project frontend (React) is what users will use. Since we are not rendering templates through Django. 