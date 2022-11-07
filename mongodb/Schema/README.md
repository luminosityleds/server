<h2>There are two collections created: One for accounts and one for devices.</h2>
<br>

Within **accounts** there are the following fields:
<dt><b>_id : ObjectID</b></dt>
    <dd>A unique object identifier added to have a primary key for accounts.</dd>
<br>
<dt><b>username : String</b></dt>
    <dd>A username for the account credentials. Used for login and user representation purposes.</dd>
<br>
<dt><b>password : String</b></dt>
    <dd>A password for the account credentials. Needed for login authentication purposes.</dd>
<br>
<dt><b>devices : Array</b></dt>
    <dd>An array of devices registered to an account. Stores unique device object IDs to reference from the mongo collection of devices.  A user </dd>
<br>
* id, username, password, and devices are required fields.  The <i>devices</i> array may be empty.

<br>
<hr>
<br>

Within **devices** there are the following fields:
<dt><b>_id : ObjectID</b></dt>
    <dd>A unique object identifier added to have a primary key for devices.</dd>
<br>
<dt><b>connected : Bool</b></dt>
    <dd>A true/false status for determining whether or not a device is connected and ready for use with the site.</dd>
<br>
<dt><b>color : String</b></dt>
    <dd>A hexadecimal representation of color for the device to display.</dd>
<br>
<dt><b>brightness : Integer</b></dt>
    <dd>An integer used to determine the strength of the light emitted from the device. Ranges from 0 to 100.</dd>
<br>
* All of the fields are required.
