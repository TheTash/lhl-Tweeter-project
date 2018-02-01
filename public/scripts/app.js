
  $(document).ready(function(){
    function createTweetElement(tweet) {
      let $article = $('<article>').addClass('tweet-box');
      let $header = $('<header>').addClass('clear-fix');
      let $img = $('<img>').attr('src', tweet.user.avatars.small).addClass('logo');
      let $h1 = $('<h1>').text(tweet.user.name);
      let $h2 = $('<h2>').text(tweet.user.handle);
      let $h3 = $('<h3>').text(tweet.content.text);
      let $footer = $('<footer>').addClass('clear-fix')
      let $h4 = $('<h4>').text(tweet.created_at);
      let $div = $('<div>').addClass('tweet-icons');
      let $flag = $('<i>').addClass('fa fa-flag').attr('aria-hidden', true);
      let $share = $('<i>').addClass('fa fa-retweet').attr('aria-hidden', true);
      let $like = $('<i>').addClass('fa fa-heart').attr('aria-hidden', true);

      $header.append($img);
      $header.append($h1);
      $header.append($h2);
      $article.append($header);
      $article.append($h3);
      $div.append($flag);
      $div.append($share);
      $div.append($like);
      $footer.append($div);
      $footer.append($h4);
      $article.append($footer);
      return $article;
    }
    function renderTweets (tweets) {
      const articles_elm = $('.restOfTheTweets')
      tweets.forEach((tweet) => {
        articles_elm.prepend(createTweetElement(tweet));
      });
    }
      $("form").submit(function(event){
        if ( $('#tweet').val().length > 140) {
          event.stopPropagation();
            alert('brevity is the soul of wit. Yuor tWeEt iS toO loNg');
        } else if ($('#tweet').val() === ''){
          event.stopPropagation();
          alert("I'm glad you're here, but you have got to say something, for this to mean anything.")
        } else if($('#tweet').val() === null){
          event.stopPropagation();
          alert("Are you some sort of robot?");
        } else {
          var serial = $(this).serialize();
          $.post("/tweets", serial, function(data, status) {
            console.log(data, 'data', status, 'status');
          });
          $.get("/tweets", function(data){
            renderTweets(data);
          });
        }
        event.preventDefault();
      });
    });
