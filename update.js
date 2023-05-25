function handleTitleChange() {
    var titleElement = document.getElementById("tutorTitle");
    var otherTitleElement = document.getElementById("otherTitle");
    if (titleElement.value === "other") {
      otherTitleElement.style.display = "block";
    } else {
      otherTitleElement.style.display = "none";
    }
  }
  
  // Update tutor
  document.getElementById("updateTutor").addEventListener("submit", function (event) {
    event.preventDefault();
    const tutorOriginalEmail = document.getElementById("tutorOriginalEmail").value;
    const tutorTitle = document.getElementById("tutorTitle").value;
    const otherTitleInput = document.getElementById("otherTitle");
    const tutorFirstName = document.getElementById("tutorFirstName").value;
    const tutorSurname = document.getElementById("tutorSurname").value;
    const tutorPhone = document.getElementById("tutorPhone").value;
    const tutorEmail = document.getElementById("tutorEmail").value;
    const tutorLine1 = document.getElementById("tutorLine1").value;
    const tutorLine2 = document.getElementById("tutorLine2").value;
    const tutorTown = document.getElementById("tutorTown").value;
    const tutorCounty = document.getElementById("tutorCounty").value;
    const tutorEir = document.getElementById("tutorEir").value;
  
    let tutorData = {
      TutorOriginalEmail: tutorOriginalEmail,
      Title: tutorTitle === "other" ? otherTitleInput.value : tutorTitle,
      FirstName: tutorFirstName,
      Surname: tutorSurname,
      PhoneNumber: tutorPhone,
      EmailAddress: tutorEmail,
      Address: {
        Line1: tutorLine1,
        Line2: tutorLine2,
        Town: tutorTown,
        County: tutorCounty,
        Eircode: tutorEir,
      },
    };
  
    fetch(`http://localhost:3000/api/updateTutor/${tutorOriginalEmail}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorData),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Tutor updated successfully");
          document.getElementById("updateTutor").reset();
        } else {
          alert("Failed to update tutor. There might be no matching data.");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
  
  // Update student
  document.getElementById("updateStudent").addEventListener("submit", function (event) {
    event.preventDefault();
    const studentOriginalEmail = document.getElementById("studentOriginalEmail").value;
    const studentTitle = document.getElementById("studentTitle").value;
    const otherTitleInput = document.getElementById("otherTitle");
    const studentFirstName = document.getElementById("studentFirstName").value;
    const studentSurname = document.getElementById("studentSurname").value;
    const studentPhone = document.getElementById("studentPhone").value;
    const studentEmail = document.getElementById("studentEmail").value;
    const studentLine1 = document.getElementById("studentLine1").value;
    const studentLine2 = document.getElementById("studentLine2").value;
    const studentTown = document.getElementById("studentTown").value;
    const studentCounty = document.getElementById("studentCounty").value;
    const studentEir = document.getElementById("studentEir").value;
    const studentDOB = document.getElementById("studentDOB").value;
    const studentGuardian = document.getElementById("studentGuardian").value;
    const studentPermission = document.getElementById("studentPermission").value;
    const studentGender = document.getElementById("studentGender").value;
    const studentSubject = document.getElementById("studentSubject").value;
  
    let studentData = {
      StudentOriginalEmail: studentOriginalEmail,
      Title: studentTitle === "other" ? otherTitleInput.value : studentTitle,
      FirstName: studentFirstName,
      Surname: studentSurname,
      PhoneNumber: studentPhone,
      EmailAddress: studentEmail,
      Address: {
        Line1: studentLine1,
        Line2: studentLine2,
        Town: studentTown,
        County: studentCounty,
        Eircode: studentEir,
      },
      DOB: studentDOB,
      Guardian: studentGuardian,
      Permission: studentPermission,
      Gender: studentGender,
      Subject: studentSubject,
    };
  
    fetch(`http://localhost:3000/api/updateStudent/${studentOriginalEmail}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Student updated successfully");
          document.getElementById("updateStudent").reset();
        } else {
          alert("Failed to update student. There might be no matching data.");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
  
  // Update tutorial
  document.getElementById("updateTutorial").addEventListener("submit", function (event) {
    event.preventDefault();
    const tutorialOriginalID = document.getElementById("tutorialOriginalID").value;
    const tutorialDate = document.getElementById("tutorialDate").value;
    const tutorialTime = document.getElementById("tutorialTime").value;
    const tutorialStudents = document.getElementById("tutorialStudents").value.split(",");
    const tutorialTutor = document.getElementById("tutorialTutor").value;
    const tutorialFee = document.getElementById("tutorialFee").value;
    const tutorialNumber = document.getElementById("tutorialNumber").value;
    const tutorialAttendance = document.getElementById("tutorialAttendance").value;
    const tutorialSubject = document.getElementById("tutorialSubject").value;
    const otherSubjectInput = document.getElementById("otherSubject");
    const tutorialNotes = document.getElementById("tutorialNotes").value;
  
    let tutorialData = {
      TutorialOriginalID: tutorialOriginalID,
      TutorialDate: tutorialDate,
      TutorialTime: tutorialTime,
      Students: tutorialStudents,
      Tutor: tutorialTutor,
      Fee: tutorialFee,
      TutorialNumber: tutorialNumber,
      TutorialAttendance: tutorialAttendance,
      TutorialSubject: tutorialSubject === "Other" ? otherSubjectInput.value : tutorialSubject,
      TutorialNotes: tutorialNotes,
    };
  
    fetch(`http://localhost:3000/api/updateTutorial/${tutorialOriginalID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorialData),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Tutorial updated successfully");
          document.getElementById("updateTutorial").reset();
        } else {
          alert("Failed to update tutorial. There might be no matching data.");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
  