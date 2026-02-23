import { OpenAI } from "openai";

export const hfClient = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: "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",
});