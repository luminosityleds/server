# Database  Structure

There are two collections created: One for accounts and one for devices.
<br>

Within **accounts** there are the following fields:
<dt><b>_id : ObjectId</b></dt>
    <dd>A unique object identifier added to have a primary key for accounts.</dd>
<br>
<dt><b>creationDate : Date</b></dt>
    <dd>A date object for logging the time when the account was created.</dd>
<br>
<dt><b>deletionDate : Date | NULL</b></dt>
    <dd>A date object that is NULL by default. When NULL, the account is implicitly considered not deleted. Once deleted, a date will be recorded.</dd>
<br>
<dt><b>lastUpdated : Date</b></dt>
    <dd>A date object for logging the last time a change was made to the document.</dd>
<br>
<dt><b>email : String</b></dt>
    <dd>An email for the account credentials. Used for login and user representation purposes.</dd>
<br>
<dt><b>name : String</b></dt>
    <dd>A name for the account credentials. Needed for login authentication purposes.</dd>
<br>
<dt><b>devicesLinked : Array</b></dt>
    <dd>An array of devices registered to an account. Stores unique device objectIds to reference from the mongoDB collection of devices.</dd>
<br>
* ``lastUpdated`` is a required field and the ``devicesLinked`` array may be empty.

<br>
<hr>
<br>

Within **devices** there are the following fields:
<dt><b>_id : ObjectId</b></dt>
    <dd>A unique object identifier added to have a primary key for devices.</dd>
<br>
<dt><b>uuid : String</b></dt>
    <dd>A unique object identifier added to have an additional, shorter, primary key for identifying devices.</dd>
<br>
<dt><b>lastUpdated : Date</b></dt>
    <dd>A date object for logging the last time a change was made to the document.</dd>
<br>
<dt><b>powered : Bool</b></dt>
    <dd>A true/false status for determining whether or not a device has power and is ready for use with the site.</dd>
<br>
<dt><b>poweredTimestamp : Date</b></dt>
    <dd>A date object for timestamping when the powered boolean was last updated.</dd>
<br>
<dt><b>connected : Bool</b></dt>
    <dd>A true/false status for determining whether or not a device is connected and ready for use with the site.</dd>
<br>
<dt><b>connectedTimestamp : Date</b></dt>
    <dd>A date object for timestamping when the connected boolean was last updated.</dd>
<br>
<dt><b>color : String</b></dt>
    <dd>A hexadecimal representation of color for the device to display.</dd>
<br>
<dt><b>colorTimestamp : Date</b></dt>
    <dd>A date object for timestamping when the color string was last updated.</dd>
<br>
<dt><b>brightness : Integer</b></dt>
    <dd>An integer used to determine the strength of the light emitted from the device. Ranges from 0 to 100.</dd>
<br>
<dt><b>brightnessTimestamp : Date</b></dt>
    <dd>A date object for timestamping when the brightness integer was last updated.</dd>
<br>
* ``lastUpdated`` is required.
<br>
<br>
<br>

# Database Validation

Because it is desired for the database to only accept specific information, it is important to validate the data being handled. This will reduce the potential for errors to occur due to incorrect formatting and other potentially unexpected ways.

To validate the schema structure above, the `accounts` and `devices` collections were made with validation rules. Below is an example of how the Accounts validates data.

```js
   validator: {
      $jsonSchema: {
         bsonType: "object",
         title: "accounts",
         required: ["lastUpdated"],
         properties: {
            creationDate: {
               bsonType: "date"
            },
            deletionDate: {
               bsonType: ["date", "null"]
            },
            lastUpdated: {
               bsonType: "date"
            },
            email: {
               bsonType: "string",
               pattern: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            },
            name: {
               bsonType: "string"
            },
            devicesLinked: {
               bsonType: [ "array" ],
               uniqueItems: true,
               items: {
                  bsonType: "objectId"
               }
            }
         }
      }
   }
```

The validator will check data inputed to have approperiate field names, types, and formatting. Notably, `deletionDate` accepts both a date object as well as `NULL`. 

With the validator in place, queries can be used to test validation. For example, the following querey would pass and be inserted into the database.

```js
db.accounts.insertOne( {
   _id: ObjectId('6360f5b9c2da459f35c3ad33'),
   creationDate: new Date(),
   deletionDate: new Date(),
   lastUpdated: new Date(),
   email: "test.test@gmail.com",
   name: "Test",
   devicesLinked:[ObjectId("6360f5b9c2d6669035c3ad31")]
} )
```
Output: 
```json
{
  "acknowledged": true,
  "insertedId": {
    "$oid": "6360f5b9c2da459f35c3ad33"
  }
}
```
The result shows the querey passed validation and was successfully inserted into the database. Additionally, a query can be used to view/verify the newly created document was successfully inserted into the database.

Query:
```js
db.accounts.find({_id: ObjectId("6360f5b9c2da459035c3ad31")})
```
Result:
```json
[
  {
    "_id": {
      "$oid": "6360f5b9c2da459f35c3ad33"
    },
    "creationDate": {
      "$date": "2023-01-28T07:50:08.261Z"
    },
    "deletionDate": {
      "$date": "2023-01-28T07:50:08.261Z"
    },
    "lastUpdated": {
      "$date": "2023-01-28T07:50:08.261Z"
    },
    "email": "test.test@gmail.com",
    "name": "Test",
    "devicesLinked": [
      {
        "$oid": "6360f5b9c2d6669035c3ad31"
      }
    ]
  }
]
```
<br>
<hr>
<br>

On the other hand, if an invalid query is made, such as the one below:
```js
db.accounts.insertOne( {
   _id: ObjectId('6360f5b9c2da459f35c3ad33'),
   creationDate: new Date(),
   deletionDate: new Date(),
   lastUpdated: new Date(),
   email: "test.test@gmail.com",
   name: "Test",
   devicesLinked:[ObjectId("6360f5b9c2d6669035c3ad31"),
                  ObjectId("6360f5b9c2d6669035c3ad31")]
} )
```
Invalid because of duplicate items in the array: An error will occur and the query will not do anything.

![validation error](./imgs/validationError.png)

<br>
<br>
<br>
<hr>
The full MongoDB playground file is in this repo for viewing additional test cases and the set up for validation of the Devices collection. 