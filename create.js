document.getElementById('tutorForm').addEventListener('submit', insertTutor);
document.getElementById('studentForm').addEventListener('submit', insertStudent);
document.getElementById('tutorialForm').addEventListener('submit', insertTutorial);

function handleTitleChange() {
    var titleElement = document.getElementById("tutorTitle");
    var otherTitleElement = document.getElementById("otherTitle");
    if (titleElement.value === "other") {
        otherTitleElement.style.display = "block";
    } else {
        otherTitleElement.style.display = "none";
    }
}

function handleSubjectChange() {
    var subjectElement = document.getElementById("tutorialSubject");
    var otherSubjectElement = document.getElementById("otherSubject");
    if (subjectElement.value === "Other") {
        otherSubjectElement.style.display = "block";
    } else {
        otherSubjectElement.style.display = "none";
    }
}

async function insertTutor(event) {
    event.preventDefault();

    let title = document.getElementById('tutorTitle').value;
    if (title === "other") {
        title = document.getElementById('otherTitle').value;
    }

    const tutor = {
        Title: title,
        FirstName: document.getElementById('tutorFirstName').value,
        Surname: document.getElementById('tutorSurname').value,
        PhoneNumber: document.getElementById('tutorPhone').value,
        EmailAddress: document.getElementById('tutorEmail').value,
        HomeAddress: {
            AddressLine1: document.getElementById('tutorLine1').value,
            AddressLine2: document.getElementById('tutorLine2').value || null,
            Town: document.getElementById('tutorTown').value,
            CountyCity: document.getElementById('tutorCounty').value,
            EIRCODE: document.getElementById('tutorEir').value || null,
        },
    };

    try {
        const response = await fetch('http://localhost:3000/api/insertTutor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutor),
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`Error: ${message}`);
        }

        alert('Tutor inserted successfully');
    } catch (error) {
        alert(`Failed to insert tutor: ${error}`);
    }
}

async function insertStudent(event) {
    event.preventDefault();

    let title = document.getElementById('studentTitle').value;
    if (title === "other") {
        title = document.getElementById('otherTitle').value;
    }

    const student = {
        Title: title,
        FirstName: document.getElementById('studentFirstName').value,
        Surname: document.getElementById('studentSurname').value,
        PhoneNumber: document.getElementById('studentPhone').value,
        EmailAddress: document.getElementById('studentEmail').value,
        HomeAddress: {
            AddressLine1: document.getElementById('studentLine1').value,
            AddressLine2: document.getElementById('studentLine2').value || null,
            Town: document.getElementById('studentTown').value,
            CountyCity: document.getElementById('studentCounty').value,
            EIRCODE: document.getElementById('studentEir').value || null,
        },
        DOB: document.getElementById('studentDOB').value,
        ParentGuardian: document.getElementById('studentGuardian').value || null,
        Permission: document.getElementById('studentPermission').value,
        Gender: document.getElementById('studentGender').value,
        Subject: document.getElementById('studentSubject').value,
        RecordCreation: new Date().toISOString().split('T')[0],
    };

    try {
        const response = await fetch('http://localhost:3000/api/insertStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`Error: ${message}`);
        }

        alert('Student inserted successfully');
    } catch (error) {
        alert(`Failed to insert student: ${error}`);
    }
}

async function insertTutorial(event) {
    event.preventDefault();

    const students = document.getElementById('tutorialStudents').value.split(',').map(student => student.trim());

    let subject = document.getElementById('tutorialSubject').value;
    if (subject === "Other") {
        subject = document.getElementById('otherSubject').value;
    }

    const tutorial = {
        TutorialDate: document.getElementById('tutorialDate').value,
        TutorialTime: document.getElementById('tutorialTime').value,
        Students: students,
        Tutor: document.getElementById('tutorialTutor').value,
        Fee: document.getElementById('tutorialFee').value,
        TutorialNumber: document.getElementById('tutorialNumber').value,
        TutorialAttendance: document.getElementById('tutorialAttendance').value,
        TutorialSubject: subject,
        TutorialNotes: document.getElementById('tutorialNotes').value,
    };

    try {
        const response = await fetch('http://localhost:3000/api/insertTutorial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutorial),
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`Error: ${message}`);
        }

        alert('Tutorial details inserted successfully');
    } catch (error) {
        alert(`Failed to insert tutorial details: ${error}`);
    }
}

document.getElementById('studentDOB').onchange = function () {
    var dob = new Date(this.value);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    var age = Math.abs(age_dt.getUTCFullYear() - 1970);

    if (age < 18) {
        document.getElementById('studentGuardian').required = true;
    } else {
        document.getElementById('studentGuardian').required = false;
    }
};

