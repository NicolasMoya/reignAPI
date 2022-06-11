export default {
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_NAME: 'postgres',
    DB_USER: 'postgres',
    DB_PASS: 'postgres',
    API_URL: 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
  
    VERSION: process.env.VERSION || 0
  }