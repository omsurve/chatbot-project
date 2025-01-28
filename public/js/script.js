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
  