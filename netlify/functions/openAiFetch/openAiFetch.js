
import { Configuration, OpenAIApi } from "openai";
const openAiConf = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openAi = new OpenAIApi(openAiConf);



// eslint-disable-next-line no-undef
exports.handler = async function (event) {
  const conversationArray = JSON.parse(event.body)
  const conv = JSON.stringify(conversationArray)

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  }
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "This was a preflight call!",
    }
  } else if (event.httpMethod === "POST") {
    return {
      statusCode: 200,
      headers,
      // body: JSON.stringify({ message: "Hello World" }),
      body: conv,
    };
  }
};