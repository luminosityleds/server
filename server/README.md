# Source: https://www.w3schools.com/nodejs/nodejs_get_started.asp
## Getting Started
Once you have downloaded and installed Node.js on your computer, let's try to display "Hello World" in a web browser.

The code tells the computer to write "Hello World!" if anyone (e.g. a web browser) tries to access your computer on port 8080.

## Command Line Interface
Node.js files must be initiated in the "Command Line Interface" program of your computer.

How to open the command line interface on your computer depends on the operating system. For Windows users, press the start button and look for "Windows Powershell", or simply write "powershell" in the search field.

Navigate to the folder that contains the file "helloWorld.js", the command line interface window should look something like this:

C:\Users\Your Name>_
Initiate the Node.js File
The file you have just created must be initiated by Node.js before any action can take place.

1. Make sure you are at the root of this directory
2. Start your command line interface, write `node helloWorld.js` and hit enter:

Now, your computer works as a server!

If anyone tries to access your computer on port 8080, they will get a "Hello World!" message in return!

Start your internet browser, and type in the address: http://localhost:8080

You can exit out of the script running by pressing `Ctrl + C`

## Getting Started with TypeScript
<b>Run all commands as an admin in the root of the server directory</b>

1. Download typescript globally `npm install -g typescript`
2. `npm install`
3. For Development ( all TS files in `./src` ): `npm run devStart`
4. For Build ( all JS files in `./build` ): `npm run build`
5. For Production ( all JS files in `./build` ): `npm run start`
6. `package.json` are where the scripts are configured
7. `tsconfig.json` defines that the built JS code populates in `./build` and that the source directroy is `./src` 

## Getting Started with MongoDB on Development Machine
<b>Talk with Aaron or Jason for credentials.  
IMPORTANT: Do not push the credentials up to Github</b>

<b>Run all commands as an admin in the root of the server directory</b>

MongoDB is the database that the project is using and a connection can be established to the server using nodeJS.

<ol type="1">
    <li>Get the credentials from Aaron or Jason</li>
    <ol type='a'>
        <li>MONGO_INITDB_ROOT_USERNAME</li>
        <li>MONGO_INITDB_ROOT_PASSWORD</li>
        <li>MONGO_INITDB_DATABASE</li>
    </ol>
    <li>Open a Git Bash terminal in VScode</li>
    <li><code>export MONGO_INITDB_ROOT_USERNAME=&lt;username&gt;</code></li>
    <li><code>export MONGO_INITDB_ROOT_PASSWORD=&lt;password&gt;</code></li>
    <li><code>export MONGO_INITDB_DATABASE=&lt;database&gt;</code></li>
    <li><code>npm run devStart</code></li>
    <ol type='a'>
        <li>PASS: 
            <br>
                <code>
                0 connecting 2 connected 1 disconnecting 3 disconnected 0   
                </code>
            </br>
        </li>
        <li>FAIL: 
            <br>
                <code>
                0 connecting 2 disconnected 0 
                C:\Users\&lt;machine&gt;\git\luminosity-led\server\node_modules\mongodb-connection-string-url\lib\index.js:111 throw new MongoParseError('URI contained empty userinfo section');
                </code>
            </br>
        </li>
    </ol>
</ol>

 