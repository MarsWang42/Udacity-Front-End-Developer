'use strict';

// Json of bio
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

// Json of education
var education = {
  "schools": [{
    "name": "Tongji University",
    "location": "Shanghai",
    "degree": "Bachelor",
    "majors": ["Civil Engineering"],
    "dates": "2010",
    "url": "http://www.tongji.edu.cn/english/"
  }, {
    "name": "UC Irvine",
    "location": "Irvine",
    "degree": "Masters",
    "majors": ["Tranportation Science"],
    "dates": "2015",
    "url": "https://uci.edu/"
  }],
  "onlineCourses": [{
    "title": "Web Developer Nanodegree",
    "school": "Udacity.com",
    "date": "2016",
    "url": "udacity.com"
  }]
};

// Json of work
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

// Json of projects
var projects = {
  "projects": [{
    "title": "Dense passenger flow Analysis system",
    "dates": "2014",
    "description": "Designed and developed an application that enables real-time data acquisition with the Wi-Fi based indoor positioning system. It is capable to acquire the positional information effectively and can be used for passenger flow analysis. Some algorithms have been developed to acquire and analyze the characteristic of pedestrian, such as volume, speed and density.",
    "images": ["http://placehold.it/400x200",
      "http://placehold.it/400x200"
    ]
  }, {
    "title": "DSRC program of SAIC Motor",
    "dates": "2014",
    "description": "Designed and set up a system in Tongji campus which enables V2V short-range wireless communication in transportation. An HMI (human machine interface) was developed for vehicle’s active safety based on WAVE.",
    "images": ["http://placehold.it/400x200",
      "http://placehold.it/400x200"
    ]
  }]
};

// Display function of bio
bio.display = function() {
  var formattedName = HTMLheaderName.replace("%data%", bio.name);
  var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
  var formattedWelcome = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
  var formattedPhone = HTMLmobile.replace("%data%", bio.contacts.mobile);
  var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
  var firnattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
  var formattedBiopic = HTMLbioPic.replace("%data%", bio.biopic);
  var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

  $("#header").prepend(formattedName, formattedRole);
  $("#header").append(formattedBiopic, formattedWelcome);
  $("#footerContacts, #topContacts").append(formattedPhone, formattedEmail, firnattedGithub, formattedLocation);

  if (bio.skills.length) {
    $("#header").append(HTMLskillsStart);
    bio.skills.forEach(function(skill) {
      var formattedSkills = HTMLskills.replace("%data%", skill);
      $("#skills").append(formattedSkills);
    });
  }
};

// Display function of education
education.display = function() {
  if (education.schools.length) {
    education.schools.forEach(function(school) {
      $("#education").append(HTMLschoolStart);
      var formattedName = HTMLschoolName.replace("%data%", school.name);
      var formattedDegree = HTMLschoolDegree.replace("%data%", school.degree);
      var formattedDates = HTMLworkDates.replace("%data%", school.dates);
      var formattedSchoolTitle = formattedName + formattedDegree + formattedDates;
      var $lastEducationEntry = $('.education-entry:last');
      var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);
      var formattedMajor = HTMLschoolMajor.replace("%data%", school.majors);
      $lastEducationEntry.append(formattedSchoolTitle, formattedLocation, formattedMajor);
    });
  }
  if (education.onlineCourses.length) {
    education.onlineCourses.forEach(function(onlineCourse) {
      $("#education").append(HTMLonlineClasses, HTMLschoolStart);
      var formattedTitle = HTMLonlineTitle.replace("%data%", onlineCourse.title);
      var formattedSchool = HTMLonlineSchool.replace("%data%", onlineCourse.school);
      var formattedDates = HTMLonlineDates.replace("%data%", onlineCourse.date);
      var formattedURL = HTMLonlineURL.replace("%data%", onlineCourse.url);
      $('.education-entry:last').append(formattedTitle + formattedSchool, formattedDates, formattedURL);
    });
  }
};

// Display function of work
work.display = function() {
  if (work.jobs.length) {
    work.jobs.forEach(function(job) {
      $("#workExperience").append(HTMLworkStart);
      var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
      var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
      var formattedEmployerTitle = formattedEmployer + formattedTitle;
      var formattedDates = HTMLworkDates.replace("%data%", job.dates);
      var formattedDescription = HTMLworkDescription.replace("%data%", job.description);
      var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
      $(".work-entry:last").append(formattedEmployerTitle, formattedDates, formattedLocation, formattedDescription);
    });
  }
};

// Display function of projects
projects.display = function() {
  if (projects.projects.length) {
    projects.projects.forEach(function(project) {
      $("#projects").append(HTMLprojectStart);
      var $lastProjectEntry = $('.project-entry:last');
      var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
      var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
      var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);
      $lastProjectEntry.append(formattedTitle, formattedDates, formattedDescription);
      project.images.forEach(function(image) {
        var formattedImage = HTMLprojectImage.replace("%data%", image);
        $lastProjectEntry.append(formattedImage);
      });
    });
  }
};

// Display all the information saved
bio.display();
education.display();
work.display();
projects.display();

// Display the map
$("#mapDiv").append(googleMap);
