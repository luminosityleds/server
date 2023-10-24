// This config defines the production variables which are on the left side of the OR operator
// The development variables are on the right side of the OR operator
// ?? is the nullish coalescing operator 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
// IMPORTANT: These variables are only scoped for the account microservice

export let config = {
    mongodb: {
        username: process.env.USR ?? process.env.DEV_USR,
        password: process.env.PSW ?? process.env.DEV_PSW,
        clustername: process.env.CLUS ?? process.env.DEV_CLUS,
        database: process.env.DB ?? process.env.DEV_DB,
        collection: process.env.COL ?? process.env.DEV_COL
    },
    microservice: {
        account: "account",
        port: 5000
    }
};