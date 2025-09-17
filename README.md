# langsmith-vercel-crash-on-abortation

Repo to reproduce this issue https://github.com/langchain-ai/langsmith-sdk/issues/2023

Repo contains minimal code base to reproduce `AI_NoOutputGeneratedError` happening when aborting request using `abortController` and `abortSignal`.
Note, that there is boolean `wrap` variable in [index.ts](/src/index.ts) file (line 6).
If variable set to true, `streamText` function is wrapped with `wrapAISDK` wrapper, otherwise - original implementation from Vercel's AI SDK is used.
In case of wrapping process is crashing with following output:

```
Error occurred during processOutputs. Sending unprocessed outputs: NoOutputGeneratedError [AI_NoOutputGeneratedError]: No output generated. Check the stream for errors.
    at Object.flush (file:///Users/olehrak/repos/langsmith-vercel-crash-on-abortation/node_modules/ai/dist/index.mjs:4692:27)
    at invokePromiseCallback (node:internal/webstreams/util:172:10)
    at Object.<anonymous> (node:internal/webstreams/util:177:23)
    at transformStreamDefaultSinkCloseAlgorithm (node:internal/webstreams/transformstream:621:43)
    at node:internal/webstreams/transformstream:379:11
    at writableStreamDefaultControllerProcessClose (node:internal/webstreams/writablestream:1162:28)
    at writableStreamDefaultControllerAdvanceQueueIfNeeded (node:internal/webstreams/writablestream:1253:5)
    at writableStreamDefaultControllerClose (node:internal/webstreams/writablestream:1220:3)
    at writableStreamClose (node:internal/webstreams/writablestream:722:3)
    at writableStreamDefaultWriterClose (node:internal/webstreams/writablestream:1091:10) {
  cause: undefined,
  Symbol(vercel.ai.error): true,
  Symbol(vercel.ai.error.AI_NoOutputGeneratedError): true
}
Error in patchRun for run 600df124-bde9-4c20-8c86-90a0e84546d8 NoOutputGeneratedError [AI_NoOutputGeneratedError]: No output generated. Check the stream for errors.
    at Object.flush (file:///Users/olehrak/repos/langsmith-vercel-crash-on-abortation/node_modules/ai/dist/index.mjs:4692:27)
    at invokePromiseCallback (node:internal/webstreams/util:172:10)
    at Object.<anonymous> (node:internal/webstreams/util:177:23)
    at transformStreamDefaultSinkCloseAlgorithm (node:internal/webstreams/transformstream:621:43)
    at node:internal/webstreams/transformstream:379:11
    at writableStreamDefaultControllerProcessClose (node:internal/webstreams/writablestream:1162:28)
    at writableStreamDefaultControllerAdvanceQueueIfNeeded (node:internal/webstreams/writablestream:1253:5)
    at writableStreamDefaultControllerClose (node:internal/webstreams/writablestream:1220:3)
    at writableStreamClose (node:internal/webstreams/writablestream:722:3)
    at writableStreamDefaultWriterClose (node:internal/webstreams/writablestream:1091:10) {
  cause: undefined,
  Symbol(vercel.ai.error): true,
  Symbol(vercel.ai.error.AI_NoOutputGeneratedError): true
}
then async function
node:internal/process/promises:394
    triggerUncaughtException(err, true /* fromPromise */);
    ^

NoOutputGeneratedError [AI_NoOutputGeneratedError]: No output generated. Check the stream for errors.
    at Object.flush (file:///Users/olehrak/repos/langsmith-vercel-crash-on-abortation/node_modules/ai/dist/index.mjs:4692:27)
    at invokePromiseCallback (node:internal/webstreams/util:172:10)
    at Object.<anonymous> (node:internal/webstreams/util:177:23)
    at transformStreamDefaultSinkCloseAlgorithm (node:internal/webstreams/transformstream:621:43)
    at node:internal/webstreams/transformstream:379:11
    at writableStreamDefaultControllerProcessClose (node:internal/webstreams/writablestream:1162:28)
    at writableStreamDefaultControllerAdvanceQueueIfNeeded (node:internal/webstreams/writablestream:1253:5)
    at writableStreamDefaultControllerClose (node:internal/webstreams/writablestream:1220:3)
    at writableStreamClose (node:internal/webstreams/writablestream:722:3)
    at writableStreamDefaultWriterClose (node:internal/webstreams/writablestream:1091:10) {
  cause: undefined,
  Symbol(vercel.ai.error): true,
  Symbol(vercel.ai.error.AI_NoOutputGeneratedError): true
}
```

Otherwise, request is cancelled and process continue execution.

# Getting started

## Prerequisites

- Node.js >= 24
- npm

## Installation

```
git clone https://github.com/oleh-dazl-dev/langsmith-vercel-crash-on-abortation.git
cd langsmith-vercel-crash-on-abortation
npm i
```

## Setup

1. clone [`.env.example`](./.env.example) and rename to [`.env`](./.env)
2. set correct values for environment variables:
   - `ANTHROPIC_API_KEY`
   - `LANGSMITH_WORKSPACE_ID`
   - `LANGSMITH_PROJECT`
   - `LANGSMITH_API_KEY`

## Running locally

```
npm start
```
