
const oracledb = require('oracledb');
const dbConfig = require('../../database/dbconfig');

const data = {
  rows: "",
  info: 0
} 


export default function handler(req, res) {
   
    if(req.method === 'GET'){
      getData(req)
      res.status(200).json({"Rows": data.rows});
    }
    else if(req.method === 'POST'){
      saveData(req)
      res.status(200).json("Succesfully inserted " +data.info+ " rows.");
    }
    else if(req.method === 'DELETE')
    {
      deleteData(req)
      res.status(200).json("Succesfully deleted " +data.info+ " rows.");
    } 

    else if(req.method === 'PUT')
    {
      updateData(req)
      res.status(200).json("Succesfully updated "+data.info+ " rows.");
    }  

    else{ res.status(400).json({ text:  'Bad request' });}

  }
  const getData = () =>{
    queryExecute(queryClause);
  }

  const saveData = (req) =>{
     const name = req.body.NAME;
     const queryClause = "INSERT INTO JUSSI.category (NAME) VALUES('"+name+"')";
     queryExecute(queryClause);
   
  }

   const updateData = (req) =>{
    const name = req.body.NAME
    const newName = req.body.NEW_NAME
    
    const queryClause = "UPDATE JUSSI.category SET NAME = '"+newName+ "' WHERE NAME = '" +name+ "'"
    queryExecute(queryClause);
   
   
 }


  const deleteData = (req) =>{
    queryExecute(queryClause);
  }

  async function queryExecute(query) {

    let connection;
  
    try {
      // Get a non-pooled connection
      
      connection = await oracledb.getConnection(dbConfig);
      oracledb.autoCommit = true;
      console.log('Connection was successful to oracledb!');
     
  
      try {
        let result = await connection.execute(query);
        data.info = result.rowsAffected;
        data.rows = result.rows;
        console.log(data.info)
       
 
      } catch (e) {
        if (e.errorNum != 942)
          console.error(e);
      }
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  



  



  




