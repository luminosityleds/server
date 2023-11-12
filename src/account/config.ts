// This config defines the environment variables which are on the left side of the OR operator
// The initalized variables with blank values are on the right side of the OR operator
// ?? is the nullish coalescing operator 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
// IMPORTANT: These variables are only scoped for the account microservice

export let config = {
    mongodb: {
        username: process.env.USR ?? "",
        password: process.env.PSW ?? "",
        clustername: process.env.CLUS ?? "",
        database: process.env.DB ?? "",
        collection: process.env.COL ?? ""
    },
    microservice: {
        account: "account",
        port: 5000
    }
};