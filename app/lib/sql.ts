import postgres from 'postgres'

const url =  `postgres://postgres:postgres@localhost:5432/test_database`
console.log(url)
const sql = postgres(url)
export default sql