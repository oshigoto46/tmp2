# this is for the interview of `pay.com`

## Explanation
  - API serverside (grpc) 
  - endpoint `/reservation`

## How to use

  ## prerequiries

      - please install mysql 5.x
      - create user root with password `P@ssw0rd`
      - mysql -uroot -pP@ssw0rd && `create database reservation_prod
      - mysql -uroot -pP@ssw0rd < ./sql/seedsData.sql

  ## how to  start server
   ```node.js
      node index.js
   ```
  
  ## how to startup reminder
   ```node.js
      node reservationReminder.js
   ```
   - will work every single hour to remind lists on the command line 
  ## client side
   
       node reservationClient.js [get/make]
  
 ## server side test 
   
     npm test 


  ![image](https://user-images.githubusercontent.com/50700020/130367230-4a0b71fc-46e2-4679-bff9-0e97320597df.png)
 ## mysql table overviw

![image](https://user-images.githubusercontent.com/50700020/130367145-243dd589-6793-4fa1-b10b-82af44f5da77.png)

## Undone
 https://github.com/oshigoto46/paycom-interview/issues/6



