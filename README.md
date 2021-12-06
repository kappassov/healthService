
## About The Project

<img src="https://user-images.githubusercontent.com/54112738/144759160-a30bb57c-04aa-4c49-ad7c-1ca06b718a20.png" width="90%"></img> 

Full stack web application as a part of an assignment from Database Systems course.
The idea is to create web service for Public Servants and Doctors with different accessible data. In this service they can track and edit necessary data for their work.
### [Click here to visit](https://dbhw-health.herokuapp.com/) 🌐

### Built With

* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org)
* [Express](https://expressjs.com)
* [Bootstrap](https://getbootstrap.com)
* [PostgreSQL](https://www.postgresql.org/)

## Getting Started

To set up this project locally follow these steps below:

_Make sure that you have everything installed from the list above, including setting up Postgres database from .sql file_
1. Clone the repo
   ```sh
   git clone https://github.com/kappassov/healthService.git
   ```
2. Install NPM packages in ```root``` and in ```client``` directories
   ```sh
   npm install && cd client && npm install
   ```
3. Create your own dotenv file and enter appropriate data for your database
   ```
    PGHOST = 
    PGUSER = 
    PGPASSWORD =
    PGPORT = 
    PGDATABASE = 
   ```
4. Run following scripts in ```root``` directory
   ```
    npm start
    cd client npm start
   ```
