$(document).ready(function () {

    // Send button click
    $("#send-btn").click(function () {
        let userInput = $("#user-input").val().trim();
        if (userInput !== "") {
            appendUserMessage(userInput);
            $("#user-input").val("");
            getBotResponse(userInput);
        }
    });

    // Enter key to send
    $("#user-input").keypress(function (e) {
        if (e.which === 13) {
            $("#send-btn").click();
        }
    });

    // Option button click
    $(document).on('click', '.option-btn', function () {
        let userMsg = $(this).attr('data-msg');
        appendUserMessage(userMsg);
        getBotResponse(userMsg);
    });

    // Append user message
    function appendUserMessage(msg) {
        $("#chat-window").append(`<div class="user-message">${msg}</div>`);
        scrollChatToBottom();
    }

    // Append bot message
    function appendBotMessage(msg, options = []) {
        let messageHTML = `<div class="bot-message">${msg}</div>`;
        if (options.length > 0) {
            messageHTML += '<div class="options">';
            options.forEach(option => {
                messageHTML += `<button class="option-btn" data-msg="${option}">${option}</button>`;
            });
            messageHTML += '</div>';
        }
        $("#chat-window").append(messageHTML);
        scrollChatToBottom();
    }

    // Bot response simulation
    function getBotResponse(userInput) {
        $.ajax({
            url: "http://localhost:3000/chat/ask", // Ensure this matches your backend route
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ message: userInput }), // Correct key name 'message'
            success: function (response) {
                let botMessage = response.reply || "Sorry, I couldn't fetch a response.";
                let options = response.options || []; 
                appendBotMessage(botMessage, options);
            },
            error: function (err) {
                appendBotMessage("⚠️ Error fetching response. Please try again.");
                console.error("Error:", err);
            }
        });
    }
    
    

    // Scroll chat to bottom
    function scrollChatToBottom() {
        let chatWindow = $("#chat-window");
        chatWindow.scrollTop(chatWindow.prop("scrollHeight"));
    }

});
