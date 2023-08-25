
const oracledb = require('oracledb');
const dbConfig = require('../../database/dbconfig');
import dateFormat, { masks } from "dateformat";

const data = {
  rows: "",
  info: 0
} 


export default function handler(req, res) {
   
    if(req.method === 'GET'){
      getData(req)
      console.log(data)
      res.status(200).json(data.rows);
    }
    else if(req.method ==='POST'){
      saveData(req)
      res.status(200).json("Succesfully inserted " +data.info+ " rows.");
    }
    else if(req.method ==='DELETE')
    {
      deleteData(req)
      res.status(200).json("Succesfully deleted " +data.info+ " rows.");
    } 

    else if(req.method ==='PUT')
    {
      updateData(req)
      res.status(200).json("Succesfully updated "+data.info+ " rows.");
    }  

    else{ res.status(400).json({ text:  'Bad request' });}

  }
  const getData = (req) =>{
     console.log(req.query.ID);

   
    if (req.query.ID !== null){
      const query1 = "SELECT jussi.t.*, jussi.c.name FROM JUSSI.TASK t INNER JOIN jussi.category c ON c.ID = t.CATEGORYID WHERE c.id="+req.query.ID+ "ORDER BY t.created";
      
       queryExecute(query1);

    }
    
  }


  const saveData = (req) =>{
     const desc = req.body.DESCRIPTION;
     const date = new Date();
     const category = req.body.CATEGORYID; 
     
     const formattedDay =(dateFormat(date, 'dd/mm/yyyy:HH:MM:ss'));
     console.log(formattedDay)
     
     const queryClause = "INSERT INTO JUSSI.task (DESCRIPTION,CREATED,CATEGORYID) VALUES('"+desc+"', TO_DATE('"+formattedDay+"', 'dd/mm/yyyy HH24:MI:SS'),"+category+")";
   
     queryExecute(queryClause);
    
  }

  const updateData = (req) =>{
    const description = req.body.DESCRIPTION
    const newDescription = req.body.NEW_DESCRIPTION
    
    const queryClause = "UPDATE JUSSI.task SET description = '"+newDescription+ "' WHERE description = '" +description+ "'";
  
    queryExecute(queryClause);
   
   return 'Save'
 }

  const deleteData = (req) =>{
    const id = req.query.ID;
    const queryClause = "DELETE FROM JUSSI.task where id =" +id+"";
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
       
       data.rows = result.rows;
       data.info = result.rowsAffected;
  
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
          console.log('Connection closed');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
