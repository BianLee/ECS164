import React, { useEffect, useRef, useState } from "react";
import { Configuration } from "openai";

/* 
const configuration = new Configuration({
  organization: "org-nHiwQat684aQeg9S4Mkpqq84",
  apiKey: "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",
});
*/

function App() {
  const audioContextRef = useRef(null);
  const socketRef = useRef(null);
  const audioQueue = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [userInput, setUserInput] = useState(""); // State to hold user input

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  const generateText = async () => {
    try {
      const apiRequestBody = {
        model: "text-babbage-001", // Specify Babbage model here
        prompt: userInput, // Use user input as prompt
        max_tokens: 60, // Adjust as needed to control response length
      };
      const response = await fetch(
        "https://api.openai.com/v1/completions", // Updated endpoint for GPT-3 models
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`, // Replace with your actual OpenAI API key
          },
          body: JSON.stringify(apiRequestBody),
        }
      );
      if (!response.ok) {
        console.log(response.status);
        console.log(response.statusText);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data.choices[0].text);
      setGeneratedText(data.choices[0].text);
      startTTSStream(data.choices[0].text);
    } catch (error) {
      console.error("Error generating text:", error);
    }
    // Following is using gpt-3.5-turbo
    /* 
    try {
      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              userInput +
              "Keep the response to 100 words or less. Less is better",
          },
        ],
      };
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "OpenAI-Organization": "org-nHiwQat684aQeg9S4Mkpqq84",
            Authorization: `Bearer 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`, // Replace with your actual OpenAI API key
          },
          body: JSON.stringify(apiRequestBody),
        }
      );
      if (!response.ok) {
        console.log(response.status);
        console.log(response.statusText);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data.choices[0].message.content);
      setGeneratedText(data.choices[0].message.content);
      startTTSStream(data.choices[0].message.content);
    } catch (error) {
      console.error("Error generating text:", error);
    }
      */
  };

  const startTTSStream = (text) => {
    const wsUrl =
      "wss://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream-input?model_id=eleven_monolingual_v1";
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = function () {
      const bosMessage = {
        text: " ",
        voice_settings: {
          stability: 0.5,
          similarity_boost: true,
        },
        xi_api_key: "6ec6a451d2ee80120d295ed14bd80e10", // Replace with your ElevenLab API key
      };

      socketRef.current.send(JSON.stringify(bosMessage));

      const textMessage = {
        text: text,
        try_trigger_generation: true,
      };

      socketRef.current.send(JSON.stringify(textMessage));

      const eosMessage = {
        text: "",
      };

      socketRef.current.send(JSON.stringify(eosMessage));
    };

    socketRef.current.onmessage = function (event) {
      const response = JSON.parse(event.data);

      if (response.audio) {
        const audioChunk = atob(response.audio);
        const buffer = new ArrayBuffer(audioChunk.length);
        const view = new Uint8Array(buffer);

        for (let i = 0; i < audioChunk.length; i++) {
          view[i] = audioChunk.charCodeAt(i);
        }

        audioQueue.current.push(buffer);
        // Only process the next chunk if no audio is currently playing
        if (!isPlaying) {
          processNextAudioChunk();
        }
      } else {
        console.log("No audio data in the response");
      }

      // If this is the final message and there are no more chunks in the queue, stop playing
      if (response.isFinal && audioQueue.current.length === 0) {
        setIsPlaying(false);
      }
    };

    socketRef.current.onerror = function (error) {
      console.error(`WebSocket Error: ${error}`);
    };

    socketRef.current.onclose = function (event) {
      if (event.wasClean) {
        console.info(
          `Connection closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.warn("Connection died");
      }
    };
  };

  const processNextAudioChunk = () => {
    if (audioQueue.current.length > 0 && !isPlaying) {
      setIsPlaying(true);
      const audioData = audioQueue.current.shift();
      audioContextRef.current.decodeAudioData(
        audioData,
        (decodedBuffer) => {
          const source = audioContextRef.current.createBufferSource();
          source.buffer = decodedBuffer;
          source.connect(audioContextRef.current.destination);
          source.start();
          source.onended = () => {
            setIsPlaying(false);
            if (audioQueue.current.length > 0) {
              processNextAudioChunk();
            }
          };
        },
        (error) => {
          console.error("Error decoding audio data:", error);
        }
      );
    }
  };

  return (
    <>
      <center>
        <h1>OpenAI and ElevenLab Integration</h1>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here"
        />
        <br />
        <button onClick={generateText}>Generate and Speak</button>
        <p>Generated Text: {generatedText}</p>
      </center>
    </>
  );
}

export default App;
