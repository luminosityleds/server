# Sequence Diagrams
## embedded
* Pi4 (Microcomputer) = Raspberry Pi 4
* Shows interface between Pi4 & mongoDB
* Connect STATE of Pi4 to mongoDB (CRUD - UPDATE)
* Brightness/color STATE of Pi4 to mongoDB (CRUD - UPDATE)
## web_app
* MERN
* User requests change to brightness/color through web browser
* reactJS sends REQUEST command to expressJS
* expressJS (CRUD - CREATE) adds new request to mongoDB 
* can test in nodeJS (CRUD - CREATE) adds new request to mongoDB 
* mongoDB (CRUD - READ) constantly reading current brightness/color STATE
* nodeJS and expressJS reading this STATE
* expressJS tell reactJS to update UI in browser
* lazy loading to render brightness/color state
### Arrows
--> = GET 

&larr; = SET
