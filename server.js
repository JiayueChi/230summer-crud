const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors'); // Import cors module


async function main() {
  const uri = "mongodb+srv://<username>:<password>@cluster0.ehui8zt.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB cluster");

    await client.db("exam").collection("tutorial").createIndex({ "TutorialNumber": 1 }, { unique: true });
    await client.db("exam").collection("tutor").createIndex({ "EmailAddress": 1 }, { unique: true });
    await client.db("exam").collection("student").createIndex({ "EmailAddress": 1 }, { unique: true });

    const app = express();
    app.use(express.json());

    app.use(cors()); // Add this line to enable CORS

    // Insert Tutor
    app.post('/api/insertTutor', async (req, res) => {
      try {
        const tutor = req.body;
        await insertTutor(client, tutor);
        res.status(200).json({ message: 'Tutor inserted successfully' });
      } catch (e) {
        res.status(400).send(e.message);
      }
    });

    // Insert Student
    app.post('/api/insertStudent', async (req, res) => {
      try {
        const student = req.body;
        await insertStudent(client, student);
        res.status(200).json({ message: 'Student inserted successfully' });
      } catch (e) {
        res.status(400).send(e.message);
      }
    });

    // Insert Tutorial
    app.post('/api/insertTutorial', async (req, res) => {
      try {
        const tutorial = req.body;
        await insertTutorial(client, tutorial);
        res.status(200).json({ message: 'Tutorial inserted successfully' });
      } catch (e) {
        res.status(400).send(e.message);
      }
    });

    // Find all Tutors
    app.get('/api/findTutor', async (req, res) => {
        try {
        const tutors = await findTutors(client);
        res.status(200).json(tutors);
        } catch (e) {
        res.status(400).send(e.message);
        }
    });
    
    // Find all Students
    app.get('/api/findStudent', async (req, res) => {
        try {
        const students = await findStudents(client);
        res.status(200).json(students);
        } catch (e) {
        res.status(400).send(e.message);
        }
    });
    
    // Find all Tutorials
    app.get('/api/findTutorial', async (req, res) => {
        try {
        const tutorials = await findTutorials(client);
        res.status(200).json(tutorials);
        } catch (e) {
        res.status(400).send(e.message);
        }
    });
  

    // Update Tutor
    app.put('/api/updateTutor/:email', async (req, res) => {
      try {
        const tutorEmail = req.params.email;
        const updatedListing = req.body;
        await updateTutor(client, tutorEmail, updatedListing);
        res.status(200).json({ message: 'Tutor updated successfully' });
      } catch (e) {
        res.status(400).send(e.message);
      }
    });

    // Update Student
    app.put('/api/updateStudent/:email', async (req, res) => {
      try {
        const studentEmail = req.params.email;
        const updatedListing = req.body;
        await updateStudent(client, studentEmail, updatedListing);
        res.status(200).json({ message: 'Student updated successfully' });
      } catch (e) {
        res.status(400).send(e.message);
      }
    });

    // Update Tutorial
    app.put('/api/updateTutorial/:number', async (req, res) => {
      try {
        const tutorialNumber = req.params.number;
        const updatedTutorial = req.body;
        await updateTutorial(client, tutorialNumber, updatedTutorial);
        res.status(200).json({ message: 'Tutorial updated successfully' });
      } catch (e) {
        res.status(400).send(e.message);
      }
    });

    app.delete('/api/deleteTutor/:email', async (req, res) => {
        try {
          const tutorEmail = req.params.email;
          const result = await deleteTutor(client, tutorEmail);
          res.status(200).json({ message: 'Tutor deleted successfully' });
        } catch (e) {
          res.status(404).json({ message: e.message });
        }
      });
  
      app.delete('/api/deleteStudent/:email', async (req, res) => {
        try {
          const studentEmail = req.params.email;
          const result = await deleteStudent(client, studentEmail);
          res.status(200).json({ message: 'Student deleted successfully' });
        } catch (e) {
          res.status(404).json({ message: e.message });
        }
      });
  
      app.delete('/api/deleteTutorial/:number', async (req, res) => {
        try {
          const tutorialNumber = req.params.number;
          const result = await deleteTutorial(client, tutorialNumber);
          res.status(200).json({ message: 'Tutorial deleted successfully' });
        } catch (e) {
          res.status(404).json({ message: e.message });
        }
      });

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
}





async function insertTutor(client, newListing) {
    try {
      const result = await client.db("exam").collection("tutor").insertOne(newListing);
      console.log(`New listing created with the following id: ${result.insertedId}`);
    } catch (e) {
      if (e.code === 11000) {
        const errorMessage = 'Email Address must be unique.';
        console.error(errorMessage, e);
        throw new Error(errorMessage);
      } else {
        throw e;
      }
    }
}
async function insertStudent(client, newListing) {
    try {
      const result = await client.db("exam").collection("student").insertOne(newListing);
      console.log(`New listing created with the following id: ${result.insertedId}`);
    } catch (e) {
      if (e.code === 11000) {
        const errorMessage = 'Email Address must be unique.';
        console.error(errorMessage, e);
        throw new Error(errorMessage);
      } else {
        throw e;
      }
    }
}
async function insertTutorial(client, newListing) {
    try {
      const result = await client.db("exam").collection("tutorial").insertOne(newListing);
      console.log(`New listing created with the following id: ${result.insertedId}`);
    } catch (e) {
      if (e.code === 11000) {
        const errorMessage = 'Tutorial Number must be unique.';
        console.error(errorMessage, e);
        throw new Error(errorMessage);
      } else {
        throw e;
      }
    }
}
  


async function findTutors(client) {
    const result = await client.db("exam").collection("tutor").find({}).toArray();
    if (result.length > 0) {
      console.log("Found tutors in the collection");
      return result;
    } else {
      throw new Error("No tutors found");
    }
}
async function findStudents(client) {
    const result = await client.db("exam").collection("student").find({}).toArray();
    if (result.length > 0) {
      console.log("Found students in the collection");
      return result;
    } else {
      throw new Error("No students found");
    }
}
async function findTutorials(client) {
    const result = await client.db("exam").collection("tutorial").find({}).toArray();
    if (result.length > 0) {
      console.log("Found tutorials in the collection");
      return result;
    } else {
      throw new Error("No tutorials found");
    }
}




async function updateTutor(client, tutorEmail, updatedListing) {
    try {
      const result = await client.db("exam").collection("tutor").updateOne({ "EmailAddress": tutorEmail }, { $set: updatedListing });
      console.log(`${result.matchedCount} document(s) matched the query criteria.`);
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
  
      if (result.matchedCount === 0) {
        throw new Error(`No tutor found with the email '${tutorEmail}'`);
      }
    } catch (e) {
      if (e.code === 11000) {
        const errorMessage = 'Email Address must be unique.';
        console.error(errorMessage, e);
        throw new Error(errorMessage);
      } else {
        throw e;
      }
    }
}
async function updateStudent(client, studentEmail, updatedListing) {
    try {
      const result = await client.db("exam").collection("student").updateOne({ "EmailAddress": studentEmail }, { $set: updatedListing });
      console.log(`${result.matchedCount} document(s) matched the query criteria.`);
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
  
      if (result.matchedCount === 0) {
        throw new Error(`No student found with the email '${studentEmail}'`);
      }
    } catch (e) {
      if (e.code === 11000) {
        const errorMessage = 'Email Address must be unique.';
        console.error(errorMessage, e);
        throw new Error(errorMessage);
      } else {
        throw e;
      }
    }
}
async function updateTutorial(client, tutorialNumber, updatedTutorial) {
    try {
      const result = await client.db("exam").collection("tutorial").updateOne({ "TutorialNumber": tutorialNumber }, { $set: updatedTutorial });
      console.log(`${result.matchedCount} document(s) matched the query criteria.`);
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
  
      if (result.matchedCount === 0) {
        throw new Error(`No tutorials found with the number '${tutorialNumber}'`);
      }
    } catch (e) {
      if (e.code === 11000) {
        const errorMessage = 'Tutorial Number must be unique.';
        console.error(errorMessage, e);
        throw new Error(errorMessage);
      } else {
        throw e;
      }
    }
}



async function deleteTutor(client, tutorEmail) {
    const result = await client.db("exam").collection("tutor").deleteOne({ "EmailAddress": tutorEmail });
    if (result.deletedCount === 0) {
      throw new Error(`No tutor found with the email '${tutorEmail}'`);
    }
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
async function deleteStudent(client, studentEmail) {
    const result = await client.db("exam").collection("student").deleteOne({ "EmailAddress": studentEmail });
    if (result.deletedCount === 0) {
      throw new Error(`No student found with the email '${studentEmail}'`);
    }
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
async function deleteTutorial(client, tutorialNumber) {
    const result = await client.db("exam").collection("tutorial").deleteOne({ "TutorialNumber": tutorialNumber });
    if (result.deletedCount === 0) {
      throw new Error(`No tutorials found with the number '${tutorialNumber}'`);
    }
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}



main().catch(console.error);








/*

database description
3 tables: tutor, student, tutorial

tutor:
{
    "Title": string,    (selections)
    "FirstName": string,
    "Surname": string,
    "PhoneNumber": string,
    "EmailAddress": string, (unique, works as "primary key")
    "HomeAddress": { object
        "AddressLine1": string,
        "AddressLine2": string,
        "Town": string,
        "CountyCity": string,
        "EIRCODE": string"
    }
}

Student:
{
            "Title": string, (selections)
            "FirstName": string,
            "Surname": string,
            "PhoneNumber": string,
            "EmailAddress": string, (unique, works as "primary key")
            "HomeAddress": { object
                "AddressLine1": string,
                "AddressLine2": string,
                "Town": string,
                "CountyCity": string,
                "EIRCODE": string"
            },
            "DOB": date,
            "ParentGuardian": string,
            "Permission": string, (selections)
            "Gender": string, (selections)
            "Subject": string,
            "RecordCreation": date, auto-generated
}

tutorial:
{
            "TutorialDate": date,
            "TutorialTime": time,
            "Students": string(s),
            "Tutor": string,
            "Fee": string,
            "TutorialNumber": string, (unique, works as "primary key")
            "TutorialAttendance": string, (selections)
            "TutorialSubject": string, (selections)
            "TutorialNotes": string
}



*/
