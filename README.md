
## About The Project

[![Soon][product-screenshot]](https://example.com)

Full stack web application as a part of an assignment from Database Systems course.
The idea is to create web service for Public Servants and Doctors with different accessible data. In this service they can track and edit necessary data for their work.

### Built With

* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org)
* [Express](https://expressjs.com)
* [Bootstrap](https://getbootstrap.com)
* [PostgreSQL](https://www.postgresql.org/)

## Getting Started

To set up this project locally follow these steps below:

_Make sure that you have everything installed from the list above_
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
   
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
