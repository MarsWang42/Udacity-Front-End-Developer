var formattedName;
var formattedRole;

var bio = {
  "name" : "Mars Wang",
  "role" : "Web Developer",
  "contacts" : {
    "email" : "marswang92@gmail.com",
    "mobile" : "626-241-8298",
    "location" : "Irvine"
  },
  "skills" : [
  "Java", "Python"
  ],
  "photo" : "./images/fry.jpg"
}
var education = {
  "schools" : [
    {
      "name" : "Tongji University",
      "location" : "Shanghai",
      "degree" : "Bachelor",
      "majors" : "Civil Engineering",
      "dates" : "2010"
    },
    {
      "name" : "UC Irvine",
      "location" : "Irvine",
      "degree" : "Masters",
      "majors" : "Tranportation Science",
      "dates" : "2015"
    }
  ]
}

var work = {
  "jobs" : [
    {
      "title" : "Web Developer",
      "employer" : "Google",
      "date worked" : "June-20th-2017",
      "location" : "Maintain View",
      "description" : "Hoplefully I can be there next year!"
    },
    {
      "title" : "Engineer",
      "employer" : "Azure",
      "date worked" : "June-20th-2017",
      "location" : "Maintain View",
      "description" : "Hoplefully I can be there next year!"
    }
  ]
}

var projects = {
  "projects" : [
    {
    "title" : "Dense passenger flow Analysis system",
    "dates" : "2014",
    "description" : "Designed and developed an application that enables real-time data acquisition with the Wi-Fi based indoor positioning system. It is capable to acquire the positional information effectively and can be used for passenger flow analysis. Some algorithms have been developed to acquire and analyze the characteristic of pedestrian, such as volume, speed and density.",
    "images" : "adsfasdf"
    },
    {
    "title" : "DSRC program of SAIC Motor",
    "dates" : "2014",
    "description" : "Designed and set up a system in Tongji campus which enables V2V short-range wireless communication in transportation. An HMI (human machine interface) was developed for vehicle’s active safety based on WAVE.",
    "images" : "adsfasdf"
    }
  ]
}


formattedName = HTMLheaderName.replace("%data%", bio.name);
formattedRole = HTMLheaderRole.replace("%data%", bio.role);
formattedPhone = HTMLmobile.replace("%data%", bio.contacts.mobile);
formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
formattedBiopic = HTMLbioPic.replace("%data%", bio.photo);
formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);
$("#header").append(formattedBiopic);
$("#header").append(formattedPhone);
$("#header").append(formattedEmail);
$("#header").append(formattedLocation);



if (bio.skills.length > 0) {
  $("#header").append(HTMLskillsStart);
  for (var i = 0; i < bio.skills.length; i++) {
    var formattedSkills = HTMLskills.replace("%data%", bio.skills[i]);
    $("#skills").append(formattedSkills);
  }
}

education.display = function() {
  if (education.schools.length > 0) {
  for (school in education.schools){
    $("#education").append(HTMLschoolStart);
    var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name);
    var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
    var formattedDates = HTMLworkDates.replace("%data%", education.schools[school].dates);
    var formattedSchoolTitle = formattedName + formattedDegree + formattedDates;
    $(".education-entry:last").append(formattedSchoolTitle);

    var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors)
    $(".education-entry:last").append(formattedMajor);
    }
  }
}

work.display = function() {
  if (work.jobs.length > 0) {
  for (job in work.jobs){
    $("#workExperience").append(HTMLworkStart);
    var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
    var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
    var formattedEmployerTitle = formattedEmployer + formattedTitle;
    $(".work-entry:last").append(formattedEmployerTitle);

    var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job]["date worked"]);
    $(".work-entry:last").append(formattedDates);

    var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description)
    $(".work-entry:last").append(formattedDescription);
    }
  }
}

projects.display = function() {
  if (projects.projects.length > 0) {
    for (project in projects.projects) {
      $("#projects").append(HTMLprojectStart);
      var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
      $(".project-entry:last").append(formattedTitle);
      var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
      $(".project-entry:last").append(formattedDates);
      var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
      $(".project-entry:last").append(formattedDescription);
    }
  }
}

education.display();
work.display();
projects.display();

$("#mapDiv").append(googleMap)




