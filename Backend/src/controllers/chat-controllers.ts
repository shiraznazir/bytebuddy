import { config as dotenvConfig } from "dotenv";
import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  console.log("Message ", message);
  try {
    console.log("try block");
    const user = await User.findById(res.locals.jwtData.id);
    console.log("try block 2 ", user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User is not registered OR Token malfunctioned" });
    }
    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    console.log("try block 3 ", chats);
    user.chats.push({ content: message, role: "user" });
    // send all chats with new one to openAI API
    const openaiConfig = configureOpenAI(); // Rename config to openaiConfig
    const openai = new OpenAIApi(openaiConfig);

    // get the latest response
    console.log("check111");
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    // console.log("OOOOOOOOOOOOOOOOKKKKKKKKKKKKKKKKK");    
    console.log("Check ", chatResponse);
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
