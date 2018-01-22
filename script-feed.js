// document ready function to check if DOM loaded or not
$(document).ready(function(){

  // assign token here
  var userAccessToken = 'EAACEdEose0cBAFyiFg9Rktps9tY5qAHQEZAli9b5mAPF8TmrZA6WKOFKRXpgaKGZBvvNQsUDZBSde3RZAwVzccoOZBZC5dLbF0P3OFAFeZCwNi7ppbzchxvysUtZA2d38kULZA9OPO0jLAMZAxgu5HCWMpHA2NZBlCgHaYwyBr3mXZCxUimWTOryUxU33ZAKknskeADvQZBZAgBeiJPp7aO3XCkVcCBkA7HCZB0gR1qEZD';

  // function starts here
  function getUserPostInfo() {

      $.ajax('https://graph.facebook.com/me?fields=name, first_name,posts{created_time,type,full_picture,story,message,source}&access_token=' + userAccessToken,{

        timeout: 10000,

        success: function(response){
          console.log(response);
          console.log(typeof(response));
          $("#profile-name").text(response.first_name);

          $.each(response.posts.data, function(i, post){

            if(post.type==="status" && post.message){
              $("#feed-post").append('<div class="feed-content"><div class="row"><img src="feed-pic.jpg" class="feed-pic"><h6 class="feed-post-heading"></h6></div><br><div class="row" class="feed-content-message">'+post.message+'</div><br><div class="row feed-time">Created time: '+post.created_time+'</div></div><hr>');
            }

            else if(post.type==="photo" && post.message){
              $("#feed-post").append('<div class="feed-content"><div class="row"><img src="feed-pic.jpg" class="feed-pic"><h6 class="feed-post-heading"></h6></div><br><div class="row" class="feed-content-message">'+post.message+'</div><br><div class="row"><img src='+post.full_picture+' style="width:100%; height: 75%;"></div><br><div class="row feed-time">Created time: '+post.created_time+'</div></div><hr>')
            }

            else if(post.type==="photo" && !post.message){
              $("#feed-post").append('<div class="feed-content"><div class="row"><img src="feed-pic.jpg" class="feed-pic"><h6 class="feed-post-heading"></h6></div><br><div class="row"><img src='+post.full_picture+' style="width:100%; height: 75%;"></div><br><div class="row feed-time">Created time: '+post.created_time+'</div></div><hr>')
            }

            else if(post.type==="video"){
              $("#feed-post").append('<div class="feed-content"><div class="row"><img src="feed-pic.jpg" class="feed-pic"><h6 class="feed-post-heading"></h6></div><br><div class="row" class="feed-content-message">'+post.message+'</div><div class="row"><a href='+post.source+'>'+post.source+'</a></div><br><div class="row feed-time">Created time: '+post.created_time+'</div></div><hr>')
            }

          });

          $(".feed-post-heading").text(response.name);
        },

        error: function(xhr){
            console.log("Request not completed, check for your token, or some other error.");
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
            if(response.error){
              console.log(response.error.message);
              alert(response.error.message);
            }
        },

        complete: function(xhr){
            console.log("REQUEST ENDED.")
        }

      } // end of argument list

    ); // end of ajax call
  } // function getUserPostInfo() ENDS

  $("#status-head").on('click',getUserPostInfo);
  $("#status-head").trigger('click');

});
