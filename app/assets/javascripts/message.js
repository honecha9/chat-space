$(function(){
  function buildHTML(message){
    if (message.image) {
    
      var html =`
        <div class= "message" data-message-id=${message.id}>
          <div class="main_chat__message-list__message" >
              <div class="main_chat__message-list__message__user-name">
                  <div class="main_chat__message-list__message__user-name__talker">
                    ${message.user_name}
                  </div>
                  <div class="main_chat__message-list__message__user-name__date">
                    ${message.created_at}
                  </div>
              </div>
              <div class="main_chat__message-list__message__message-text">
                  <p class=".lower-message__content" >
                    ${message.content}
                  </p>
              </div>  
              <img src=${message.image}>
              </div>        
          </div>
        </div> `
     return html;
    } else  {
      var html = `
      <div class= "message" data-message-id=${message.id}>
          <div class="main_chat__message-list__message" data-message-id=${message.id}>
              <div class="main_chat__message-list__message__user-name">
                  <div class="main_chat__message-list__message__user-name__talker">
                    ${message.user_name}
                  </div>
                  <div class="main_chat__message-list__message__user-name__date">
                    ${message.created_at}
                  </div>
              </div>
              <div class="main_chat__message-list__message__message-text">
                  <p class=".lower-message__content" >
                      ${message.content}
                  </p>
              </div>
          </div>
      </div>`  
    return html;
    };    
  }
    $("#new_message").on('submit', function(e){
      e.preventDefault();
     
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax ({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data); 
        $('.main_chat__message-list').append(html);
        $('.main_chat__message-list').animate({scrollTop: $('.main_chat__message-list')[0].scrollHeight});
        $('form')[0].reset();
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました。");
      })
      .always(function(){
        $('.form__submit').prop('disabled', false);
      });
    })
    
    var reloadMessages = function(){
       var last_message_id = $('.message:last').data("message-id");
       $.ajax({
         url: "api/messages",
         type: 'get',
         dataType: 'json',
         data: {id: last_message_id}
       })
       .done(function(messages){
         if (messages.length !== 0){
          var insertHTML = '';
          //  追加するHTMLの入れ物
          $.each(messages, function( i, message){
            // 配列messagesの中身一つ一つを取り出し、htmlに変換したものを入れ物にいれる
            insertHTML += buildHTML(message)
          });
           //  メッセージが入ったhtmlを入れ物ごといれる
          $('.main_chat__message-list').append(insertHTML);
          $('.main_chat__message-list').animate ({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
        }
       })
       .fail(function(){
         alert('error');
       })   
    }
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});