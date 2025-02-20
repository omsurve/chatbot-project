const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');


document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input').value;
    const response = await fetch('/chat/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input }),
    });
    const data = await response.json();
  
    const messagesDiv = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${input}`;
    const botMessage = document.createElement('div');
    botMessage.textContent = `Bot: ${data.answer}`;
    messagesDiv.appendChild(userMessage);
    messagesDiv.appendChild(botMessage);
  
    document.getElementById('user-input').value = '';
  });

  const sendFAQ = async (question) => {
    const response = await fetch('/chat/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
  
    const messagesDiv = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${question}`;
    const botMessage = document.createElement('div');
    botMessage.textContent = `Bot: ${data.answer}`;
    messagesDiv.appendChild(userMessage);
    messagesDiv.appendChild(botMessage);
  };
  document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.querySelector('#chat-form'); // Replace with your form ID
    const chatInput = document.querySelector('#chat-input'); // Replace with your input ID
    const chatOutput = document.querySelector('#chat-output'); // Replace with your output container ID

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent page reload
        const question = chatInput.value.trim();

        if (!question) {
            chatOutput.innerHTML = 'Please ask a question.';
            return;
        }

        // Send the question to the server
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const data = await response.json();
            if (data.answer) {
                chatOutput.innerHTML = data.answer;
            } else {
                chatOutput.innerHTML = 'No response available.';
            }
        } catch (error) {
            chatOutput.innerHTML = 'Error connecting to server.';
            console.error(error);
        }
    });
});
function sendMessage() {
    const userMessage = userInput.value.trim();
  
    if (!userMessage) return;
  
    // Display the user's message
    appendMessage(userMessage, 'user');
  
    // Send the message to the bot
    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the bot's response
        appendMessage(data.answer, 'bot');
      })
      .catch((error) => {
        appendMessage('Sorry, something went wrong. Please try again.', 'bot');
        console.error('Error:', error);
      });
  
    // Clear the input field
    userInput.value = '';
  }
  
  // Function to append messages to the chat
  function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
  
    const bubbleElement = document.createElement('div');
    bubbleElement.classList.add('bubble');
    bubbleElement.textContent = message;
  
    messageElement.appendChild(bubbleElement);
    chatMessages.appendChild(messageElement);
  
    // Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  $(function() {
    var INDEX = 0; 
    $("#chat-submit").click(function(e) {
      e.preventDefault();
      var msg = $("#chat-input").val(); 
      if(msg.trim() == ''){
        return false;
      }
      generate_message(msg, 'self');
      var buttons = [
          {
            name: 'Existing User',
            value: 'existing'
          },
          {
            name: 'New User',
            value: 'new'
          }
        ];
      setTimeout(function() {      
        generate_message(msg, 'user');  
      }, 1000)
      
    })
    
    function generate_message(msg, type) {
      INDEX++;
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          <\/div>";
      str += "        <\/div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);
      if(type == 'self'){
       $("#chat-input").val(''); 
      }    
      $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
    }  
    
    function generate_button_message(msg, buttons){    
      /* Buttons should be object array 
        [
          {
            name: 'Existing User',
            value: 'existing'
          },
          {
            name: 'New User',
            value: 'new'
          }
        ]
      */
      INDEX++;
      var btn_obj = buttons.map(function(button) {
         return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
      }).join('');
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          <\/div>";
      str += "          <div class=\"cm-msg-button\">";
      str += "            <ul>";   
      str += btn_obj;
      str += "            <\/ul>";
      str += "          <\/div>";
      str += "        <\/div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);   
      $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
      $("#chat-input").attr("disabled", true);
    }
    
    $(document).delegate(".chat-btn", "click", function() {
      var value = $(this).attr("chat-value");
      var name = $(this).html();
      $("#chat-input").attr("disabled", false);
      generate_message(name, 'self');
    })
    
    $("#chat-circle").click(function() {    
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
    })
    
    $(".chat-box-toggle").click(function() {
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
    })
    
  })