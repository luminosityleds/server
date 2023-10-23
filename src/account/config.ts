// This config defines the production variables which are on the left side of the OR operator
// The development variables are on the right side of the OR operator
// ?? is the nullish coalescing operator 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
// IMPORTANT: These variables are only scoped for the account microservice

export let config = {
    mongodb: {
        username: process.env.USR ?? "username",
        password: process.env.PSW ?? "password",
        clustername: process.env.CLUS ?? "cluster",
        database: process.env.DB ?? "test"
    }
};