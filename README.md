# Oracle image
Create your image  [MAC docker-oracle](https://www.petefreitag.com/item/886.cfm/).
If you are using Mac M2 you sholud use Arm zip packages with 19 version. Replace compose.yml with oyr donloaded version of image (19.3.0).
You can use either xe or ee. In this example has been used EE(enterprise edition)
Load right image (Oracle Database 19c for LINUX ARM (aarch64))[IMAGE Download-page](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html#db_ee)


# Used npm packges
<ol>
 <li> npm oracledb </li>
 <li> npm dateformat </li>
</ol>
 
 # Setup

 ## Docker

When image installed you can set up running your image using project [compose.yml](/nextjs-blog/compose.yml)

## Connect to db
Recommeded way to connect to db and manage data is use graphic db cli [Dbeaver](https://dbeaver.io)

![Image to set up dbeaver](/nextjs-blog/images/dbeaver.png)


 ## Run program

  ```npm install``` <br>
  ```npm run dev```


  