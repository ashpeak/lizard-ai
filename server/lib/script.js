const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    message: [{
      'role': 'user',
      'content': 'Hello, who are you?',
    }],
    max_tokens: 100
  });

  console.log(response);
}

main();