
var bio = {
    "name": "Mars Wang",
    "role": "Web Developer",
    "contacts": {
        "email": "marswang92@gmail.com",
        "mobile": "626-241-8298",
        "github": "Marswang92",
        "location": "Irvine"
    },
    "welcomeMessage": "Welcome to my page!",
    "skills": [
        "Java", "Python"
    ],
    "biopic": "./images/fry.jpg"
};

var education = {
    "schools": [
    {
        "name": "Tongji University",
        "location": "Shanghai",
        "degree": "Bachelor",
        "majors": ["Civil Engineering"],
        "dates": "2010",
        "url": "http://www.tongji.edu.cn/english/"
    },
    {
        "name": "UC Irvine",
        "location": "Irvine",
        "degree": "Masters",
        "majors": ["Tranportation Science"],
        "dates": "2015",
        "url": "https://uci.edu/"
    }],
    "onlineCourses": [
    {
      "title": "Web Developer Nanodegree",
      "school": "Udacity.com",
      "date": "2016",
      "url": "udacity.com"
    }]
};

var work = {
    "jobs": [{
        "title": "Web Developer",
        "employer": "Google",
        "dates": "June-20th-2017",
        "location": "Maintain View",
        "description": "Hoplefully I can be there next year!"
    }, {
        "title": "Engineer",
        "employer": "Azure",
        "dates": "June-20th-2017",
        "location": "Maintain View",
        "description": "Hoplefully I can be there next year!"
    }]
};

var projects = {
    "projects": [{
        "title": "Dense passenger flow Analysis system",
        "dates": "2014",
        "description": "Designed and developed an application that enables real-time data acquisition with the Wi-Fi based indoor positioning system. It is capable to acquire the positional information effectively and can be used for passenger flow analysis. Some algorithms have been developed to acquire and analyze the characteristic of pedestrian, such as volume, speed and density.",
        "images": "http://placehold.it/400x200"
    },
    {
        "title": "DSRC program of SAIC Motor",
        "dates": "2014",
        "description": "Designed and set up a system in Tongji campus which enables V2V short-range wireless communication in transportation. An HMI (human machine interface) was developed for vehicle’s active safety based on WAVE.",
        "images": "http://placehold.it/400x200"
    }]
};

bio.display = function() {

    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedWelcome = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
    var formattedPhone = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var firnattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var formattedBiopic = HTMLbioPic.replace("%data%", bio.biopic);
    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);
    $("#header").append(formattedBiopic);
    $("#header").append(formattedWelcome);
    $("#footerContacts, #topContacts").append(formattedPhone);
    $("#footerContacts, #topContacts").append(formattedEmail);
    $("#footerContacts, #topContacts").append(firnattedGithub);
    $("#footerContacts, #topContacts").append(formattedLocation);

    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        bio.skills.forEach(function(skill) {
            var formattedSkills = HTMLskills.replace("%data%", skill);
            $("#skills").append(formattedSkills);
        });
    }
};

education.display = function() {
    if (education.schools.length > 0) {
        education.schools.forEach(function(school) {
            $("#education").append(HTMLschoolStart);
            var formattedName = HTMLschoolName.replace("%data%", school.name);
            var formattedDegree = HTMLschoolDegree.replace("%data%", school.degree);
            var formattedDates = HTMLworkDates.replace("%data%", school.dates);
            var formattedSchoolTitle = formattedName + formattedDegree + formattedDates;
            $(".education-entry:last").append(formattedSchoolTitle);

            var formattedMajor = HTMLschoolMajor.replace("%data%", school.majors);
            $(".education-entry:last").append(formattedMajor);
        });
    }
};

work.display = function() {
    if (work.jobs.length > 0) {
        work.jobs.forEach(function(job) {
            $("#workExperience").append(HTMLworkStart);
            var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
            var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
            var formattedEmployerTitle = formattedEmployer + formattedTitle;
            $(".work-entry:last").append(formattedEmployerTitle);
            var formattedDates = HTMLworkDates.replace("%data%", job.dates);
            $(".work-entry:last").append(formattedDates);
            var formattedDescription = HTMLworkDescription.replace("%data%", job.description);
            $(".work-entry:last").append(formattedDescription);
        });
    }
};

projects.display = function() {
    if (projects.projects.length > 0) {
        projects.projects.forEach(function(project) {
            $("#projects").append(HTMLprojectStart);
            var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
            $(".project-entry:last").append(formattedTitle);
            var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
            $(".project-entry:last").append(formattedDates);
            var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);
            $(".project-entry:last").append(formattedDescription);
            var formattedImage = HTMLprojectImage.replace("%data%", project.images);
            $(".project-entry:last").append(formattedImage);
        });
    }
};

bio.display();
education.display();
work.display();
projects.display();

$("#mapDiv").append(googleMap);
