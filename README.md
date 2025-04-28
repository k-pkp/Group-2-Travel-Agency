# Group 2 TravelAgency

This project is a web-based travel agency platform developed as part of the ITCS223_Introduction to Web Development course. It allows users to browse, search, and filter available hotels, while admins can manage services.

## Team Members

1. 6688010 Pakkapol Boonluck
2. 6688046 Warut Whankaveephart
3. 6688050 Chaiwat Kor-u-thaisathain
4. 6688053 Kritchanat Kulwanich
5. 6688087 Thanakorn Praditkanok
6. 6688191 Kittiyakarn Kaewmongkun

## Features

- User and admin login with different account types.
- Admin can add, remove, and edit services.
- Users can search and filter available services.

## Prerequisites

- Node.js (v16 or higher)
- MySQL Workbench
- Git

## Installation

### Backend

1. Clone the repository:
    ```bash
    git clone http://k-pkp/Group-2-TravelAgency.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Group-2-TravelAgency
    ```
3. Install backend dependencies:
    ```bash
    npm install
    npm install nodemon mysql2 cookie-parser
    ```
4. Update `server.js` with your MySQL credentials.

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install frontend dependencies:
    ```bash
    npm install -D vite --legacy-peer-deps
    npm install js-cookie dayjs @react-google-maps/api @radix-ui/react-select --legacy-peer-deps
    ```

## Usage

1. Start the backend server:
    ```bash
    npm run start
    ```
2. Start the frontend server:
    ```bash
    npm run dev
    ```
3. Open the website in your browser and explore the features.

## Hint!!
    If you mess up the installation please delete the folder and reinstall it then do as the provided installation guide in the readme file step by step... 
