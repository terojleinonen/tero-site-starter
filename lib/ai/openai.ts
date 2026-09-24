import OpenAI from 'openai'

let client: OpenAI | null = null

// Created on first use so builds don't require OPENAI_API_KEY.
export function getOpenAI() {
  client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return client
}
