```mermaid
sequenceDiagram
    Note left of Pi4: Pi4 connected <br>to mongoDB (Wifi)
    participant Pi4
    participant mongoDB
    loop connected state
        Pi4 -->>mongoDB: connected STATE 
    end
    mongoDB->>Pi4: brightness/color REQUEST
    loop brightness/color state
        Pi4 -->>Pi4: brightness/color STATE
        Pi4 -->>mongoDB: brightness/color STATE
    end
```