## this is for the interview of `pay.com`

### Explanation
  currently only API serverside (grpc) 
  `/reservation`

### How to use

  ## prerequiries

      - please install mysql 5.x
      - create user root with password `P@ssw0rd`
      - mysql -uroot -pP@ssw0rd` && `create database reservation_prod
      - mysql -uroot -pP@ssw0rd < ./sql/seedsData.sql

  ### how to  start server
   ```node.js
      node index.js
   ```
  ## client side
   
       node reservationClient.js [get/make]
  
 ### server side test 
   
     npm test 
    
 ### mysql table overviw
 
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1364181/9d4c4808-c960-6c49-6c2e-7d00a16bbad4.png)


## Undone
 https://github.com/oshigoto46/paycom-interview/issues/6



