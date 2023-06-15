import { Configuration, OpenAIApi } from "openai";
const openAiConf = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openAi = new OpenAIApi(openAiConf);



// eslint-disable-next-line no-undef
exports.handler = async function (event) {
  const conversationArray = JSON.parse(event.body)


  // try {
  //   const response = await openAi.createCompletion({
  //     model: "gpt-3.5-turbo",
  //     prompt: event.body,





  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
    // body: conversationArray,
  };
};
