// document ready function to check if DOM loaded or not
$(document).ready(function(){
  var enterAccessToken = prompt("Enter your token here");

  // assign token here
  var userAccessToken = enterAccessToken;


  // function starts here
  function getUserAboutInfo(){

    $.ajax('https://graph.facebook.com/me?fields=email,name,first_name,hometown,age_range,birthday,education,gender,quotes,work,cover&access_token='+ userAccessToken,{

      timeout: 10000,

      success: function(response){
          console.log(response);
          console.log(typeof(response));
          $("#username").text(response.name);
          $("#profile-name").text(response.first_name);
          $("#userName").text(response.name);
          $("#userBirthday").text(response.birthday);
          $("#userEmail").text(response.email);
          $("#userAgeRange").text(response.age_range.min);
          $("#userGender").text(response.gender);
          $("#userHometown").text(response.hometown.name);
          $("#favQuotes").text(response.quotes);
          $("#fieldOfStudy").text(response.education[0].concentration[0].name);
          $("#userSchool").text(response.education[0].school.name);
          $("#profileID").html('<a target="_blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
          $("#cover-photo").html('<img src='+response.cover.source+' style="width:100%; height:100%;">')
      },


      error: function(xhr){
          console.log("Request not completed, check for your token, or some other error.");
          alert("An error occured: " + xhr.status + " " + xhr.statusText)
          if(response.error){
            console.log(response.error.message);
            alert(response.error.message);
          }
      },

      complete: function(xhr){
          console.log("REQUEST ENDED.")
      }

      }// end argument list

    ); // end ajax call

  } // function getUserAboutInfo() ENDS

  $("#a-heading").on('click',getUserAboutInfo);
  $("#a-heading").trigger('click');

});
