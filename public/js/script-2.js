
const url = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey};

async function generateContent(userInput) {
    console.log(userInput)
  try {
    const payload = {
      contents: [
        {
          parts: [{ text: userInput }]
        }
      ]
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(Error: ${response.status} - ${response.statusText}\nDetails: ${errorDetails});
    }

    const data = await response.json();
    const candidates = data.candidates;
    console.log(data)
    if (candidates && candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "No response available from the chatbot.";
    }
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while generating a response.";
  }
}
async function chatWithBot() {
  const initialMessage = getUserprompt()
//    "Hello, may I know your name?";
  console.log(Chatbot: ${initialMessage});
  const userMessage = "My name is Alex. How are you?";
  const chatbotResponse = await generateContent(userMessage);
  console.log(Chatbot: ${chatbotResponse});
}

chatWithBot();