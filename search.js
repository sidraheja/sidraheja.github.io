  $(function()
  {
   // post-page load methods go here...
    $("#speech").text("This is what we hear.");
  });
  
  var MAXSONGS = 7; //this is to remain constant
  
  //<script type="text/javascript" src="https://www.google.com/jsapi"></script>
  //This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    
//This function creates an <iframe> (and YouTube player) after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() 
  {
      player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: '',      
    });
  }

if (annyang) 
{
  var commands = 
  {
    'play *song' : function(song) 
    {
      console.log("you said "); console.log(song);
      $("#speech").text("You said " + song);
      var searchFinal = song;
      searchFinal = searchFinal.replace(/ /g, "+");   //replaces all whitespaces with a "+" to make the url work
      var url = "https://gdata.youtube.com/feeds/api/videos?q=" + searchFinal +"&format=5&max-results=7&v=2&alt=jsonc"; 

      var songList = [];
      $.getJSON(url, function(person)
      {
        //storing video ids as an array of strings
        for (i = 0; i < MAXSONGS; i++)
        {
          var nextSong = String( person.data.items[i]['id'] );
          songList.push(nextSong);
          console.log("stored "); console.log(nextSong);
        }
        player.stopVideo();
        player.loadPlaylist(songList);
      });
    },
    
    'stop' : function()
    {
      console.log("pause");
      $("#speech").text("Pausing the video");
      player.pauseVideo();
    },
    
    'next' : function()
    {
      console.log("next");
      $("#speech").text("Next video");
      player.nextVideo();
    },
    
    'back' : function()
    {
      console.log("previous");
      $("#speech").text("Previous vid");
      player.previousVideo();
    },
    
    'stock' : function()
    {
      console.log("pause");
      $("#speech").text("Pausing the video");
      player.pauseVideo();
  /*  Pauses the currently playing video. The final player state after 
      this function executes will be paused (2) unless the player is in 
      the ended (0) state when the function is called, in which case the 
      player state will not change.
  */
    },

    'top' : function()
    {
      console.log("pause");
      $("#speech").text("Pausing the video");
      player.pauseVideo();
  /*  Pauses the currently playing video. The final player state after 
      this function executes will be paused (2) unless the player is in 
      the ended (0) state when the function is called, in which case the 
      player state will not change.
  */
    },

    'resume' : function()
    {
      console.log("resume");
      $("#speech").text("Continuing the video");
      player.playVideo();
    },

    'continue' : function()
    {
      console.log("resume");
      $("#speech").text("Continuing the video");
      player.playVideo();
    },
    
    /*
    '*words' : function()
    {
      console.log("unrecognized command");
      $("#speech").text("You said " + words);
    }
    */
  };
  
  annyang.addCommands(commands);
  annyang.start();
  console.log("anneyang is ready");
}

function search()
{
  var searchResultSong = $('#songName').val();
  var searchResultArtist = $('#songArtist').val();
  if (!searchResultSong && !searchResultArtist)
  {
    console.log("Didn't enter anything into the search fields");
    return;
  }
  
  
  var searchFinal = searchResultSong + "+" + searchResultArtist;
  searchFinal = searchFinal.replace(/ /g, "+");
  $("#speech").text(searchFinal);
  
  var url = "https://gdata.youtube.com/feeds/api/videos?q=" + searchFinal +"&format=5&max-results=7&v=2&alt=jsonc";
  console.log("you searched for: ");
  console.log(searchFinal); console.log(" found at: ");
  console.log(url);

  var songList = [];
  $.getJSON(url, function(person)
  {
    //var playId = person.data.items[0].id;
    //console.log(playId);
    //songList.push( String(playId) );
    for (i = 0; i < MAXSONGS; i++)
    {
      //console.log(person.data.items[i]['id']);
      var nextSong = String( person.data.items[i].id );
      songList.push(nextSong);
      console.log("stored "); console.log(nextSong);
    }

    player.stopVideo();    
    player.loadPlaylist(songList);
  });
} // end of search

/*
function searchByKeyword()
{
  var songList = [];
  var searchResultSong = $('#songName').val();
  var searchResultArtist = $('#songArtist').val();
  if (!searchResultSong && !searchResultArtist)
  {
    console.log("Didn't type anything into search fields");
    return;
  }
  var searchFinal = searchResultSong + "+" + searchResultArtist;
  searchFinal = searchFinal.replace(/ /g, "+");
  //var results = YouTube.Search.list('id,snippet', {q: searchFinal, maxResults: 8});
  var results = gapi.client.youtube.search.list({
    q: searchFinal,
    //part: 'snippet',
    maxResults: 8
  });
  
  for(var i in results.items)
  {
    var item = results.items[i];
    var nextSong = String( item.id.videoId );
    console.log("adding " + nextSong);
    songList.push(nextSong);
    //Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
  }
  
  // https://www.googleapis.com/youtube/v3/search  &format=5&max-results=7
  /*
  var url = "https://gdata.youtube.com/feeds/api/videos?q=" + searchFinal +"&format=5&max-results=7&v=2&alt=jsonc";
  console.log("you searched for: \n");
  console.log(searchFinal); console.log("\n found at: ");
  console.log(url);
  */
  
  /*
  $.getJSON(url, function(person)
  {
    //var playId = person.data.items[0].id;
    //console.log(playId);
    //songList.push( String(playId) );
    for (i = 0; i < MAXSONGS; i++)
    {
      //console.log(person.data.items[i]['id']);
      var nextSong = String( person.data.items[i].id );
      songList.push(nextSong);
      console.log("stored "); console.log(nextSong); console.log("\n");
    }
  
    player.stopVideo();
    player.loadPlaylist(songList);
  }); 
  player.stopVideo();
  player.loadPlaylist(songList);
} */
