// Handle preflight requests
if (req.method === 'OPTIONS') {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  res.statusCode = 200;
  res.end();
  return;
}


import { Configuration, OpenAIApi } from "openai";
const openAiConf = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openAi = new OpenAIApi(openAiConf);



// eslint-disable-next-line no-undef
exports.handler = async function (event) {
  const conversationArray = JSON.parse(event.body)
  const conv = JSON.stringify(conversationArray)


  // try {
  //   const response = await openAi.createCompletion({
  //     model: "gpt-3.5-turbo",
  //     prompt: event.body,





  return {
    statusCode: 200,
    // body: JSON.stringify({ message: "Hello World" }),
    body: conv,
  };
};
