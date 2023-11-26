

import {OpenAI} from "openai";

const openai = new OpenAI({apiKey: "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"});

openai
    .createChat({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello, I'm a human." }],
    })
    .then(res => console.log(res));