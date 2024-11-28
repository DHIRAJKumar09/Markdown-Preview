import React from "react";
import { useState,useEffect } from "react";
import logo from "./logo.svg";
import axios from 'axios'
import "./App.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [htmlPreview, setHtmlPreview] = useState("");

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  useEffect(() => {
   
    const fetchConvertedHTML = async () => {
      try {
        const response = await axios.post("http://localhost:5000/convert", {
          markdown,
        });
        setHtmlPreview(response.data.html);
      } catch (error) {
        console.error("Error converting markdown:", error);
      }
    };
    fetchConvertedHTML();
  }, [markdown]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
   
  
    <textarea
      style={{
        width: "50%",
        padding: "10px",
        fontFamily: "monospace",
        fontSize: "16px",
      }}
      value={markdown}
      onChange={handleMarkdownChange}
      placeholder="Write Markdown here..."
    />

  
    <div
      
      style={{
        width: "50%",
        padding: "10px",
        background: "#f4f4f4",
        overflowY: "auto",
      }}
    >
      <ReactMarkdown
        children={markdown}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  </div>
  );
}

export default App;
