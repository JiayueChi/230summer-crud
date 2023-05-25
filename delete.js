const deleteTutorForm = document.getElementById("deleteTutor");
const deleteStudentForm = document.getElementById("deleteStudent");
const deleteTutorialForm = document.getElementById("deleteTutorial");

deleteTutorForm.addEventListener("submit", deleteTutor);
deleteStudentForm.addEventListener("submit", deleteStudent);
deleteTutorialForm.addEventListener("submit", deleteTutorial);

// Delete Tutor
async function deleteTutor(event) {
  event.preventDefault();
  const tutorEmail = document.getElementById("tutorEmail").value;
  try {
    const response = await fetch(`http://localhost:3000/api/deleteTutor/${encodeURIComponent(tutorEmail)}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message); // Deletion successful
      window.alert("Tutor deleted successfully!"); // Prompt or notification
    } else {
      console.error(data.message); // Deletion failed
      window.alert("Tutor deletion failed!"); // Prompt or notification
    }
  } catch (error) {
    console.error(error);
    window.alert("An error occurred while deleting the tutor. There might be no matching data."); // Prompt or notification
  }
}

// Delete Student
async function deleteStudent(event) {
  event.preventDefault();
  const studentEmail = document.getElementById("studentEmail").value;
  try {
    const response = await fetch(`http://localhost:3000/api/deleteStudent/${studentEmail}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message); // Deletion successful
      window.alert("Student deleted successfully!"); // Prompt or notification
    } else {
      console.error(data.message); // Deletion failed
      window.alert("Student deletion failed!"); // Prompt or notification
    }
  } catch (error) {
    console.error(error);
    window.alert("An error occurred while deleting the student. There might be no matching data."); // Prompt or notification
  }
}

// Delete Tutorial
async function deleteTutorial(event) {
  event.preventDefault();
  const tutorialNumber = document.getElementById("tutorialID").value;
  try {
    const response = await fetch(`http://localhost:3000/api/deleteTutorial/${encodeURIComponent(tutorialNumber)}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message); // Deletion successful
      window.alert("Tutorial deleted successfully!"); // Prompt or notification
    } else {
      console.error(data.message); // Deletion failed
      window.alert("Tutorial deletion failed!"); // Prompt or notification
    }
  } catch (error) {
    console.error(error);
    window.alert("An error occurred while deleting the tutorial. There might be no matching data."); // Prompt or notification
  }
}
