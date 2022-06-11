
# API Reign Test

This is a project to enter to Reign as a Software developer.
This Project is made with database PostgreSQL,  NestJS as a framework and code in Typescript 

##First step
First we have to clone the repository:

```bash
$ git clone git@
```



## DataBase (PostgreSQL)

in order to start this project we have to get a Mysql Database with PostgreSQL as main. Inside the folder "resources" we have a file called "dump-Reign_DB" this one is a dump database that contains the 3 tables used in the sistem "arcticle", "arcticle_tags", "tags" and some  data previously filled.
To run this dump file we have to execute

```bash
$ psql databasename < dump-Reign_DB
```


## Nest PROJECT CONFIG

we have to install all the npm libraries:

```bash
$ npm install
```

to execute the project we have to enter:

```bash
$ npm run start
```

### config file

inside the proyect in src/config.ts we have to configure the parameters of the server in order to work, the parameters are the next

- DB_HOST: Host of the Database
- DB_PORT: Port of the database
- DB_NAME: Name of the database
- DB_USER: User name
- DB_PASS: Password of the db User
- API_URL: API to recolect the data (in this case https://hn.algolia.com/api/v1/search_by_date?query=nodejs)


##API Test

to test the working API, there is a file inside resources called "Reign test API.postman_collection", this is a JSON with 5 Requests already tested in the server. this one are:

- Delete Arcticle (DELETE): Request that change the arcticle parameter "is_public" to false (this one is because the arcticle can't re enter)
- Get all Arcticles (GET): Request that return all the arcticles, the page paremeter can change to have more records
- Get Arcticle with title Filter (GET): Request that return a request based on the title (it's not a full filter, so incomplete titles works too)
- Get Arcticle with author Filter (GET): Request that return a request based on the author
- Get Arcticle with tag Filter (GET): Request that return a request based on the Tag

All the GET request can use all the parameters to filter data 
