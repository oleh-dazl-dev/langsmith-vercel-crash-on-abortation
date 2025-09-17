import { anthropic } from "@ai-sdk/anthropic";
import * as ai from "ai";
import "dotenv/config";
import { wrapAISDK } from "langsmith/experimental/vercel";

const wrap = true;

const { streamText } = wrap ? wrapAISDK(ai) : ai;

let res: ai.StreamTextResult<ai.ToolSet, unknown>;

void (async () => {
  const abortController = new AbortController();

  try {
    res = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      messages: [{ role: "user", content: "tell me lorem ipsum poem" }],
      abortSignal: abortController.signal,
    });

    const abortAfterChunksCount = 5;

    let i = 0;
    for await (const p of res.fullStream) {
      if (p.type === "text-delta") {
        console.debug(p.text);

        if (i++ > abortAfterChunksCount) {
          abortController.abort();
          console.log("request aborted");
        }
      }
    }
  } catch {
    console.error("catch try/catch block");
  }
})()
  .catch((e) => {
    console.error(`catch async function`);
  })
  .then(() => {
    console.debug("then async function");
  });

while (true) {
  console.log("running...");
  await new Promise((r) => setTimeout(r, 1000));
}
