import { useState } from "react";
import { LuCheck, LuCode, LuCopy } from "react-icons/lu";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200 min-h-10">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {language}
          </span>
        </div>

        <button
          aria-label={copied ? "Copied!" : "Copy"}
          onClick={handleCopy}
          className="text-gray-500 hover:text-gray-700 focus:outline-none relative group "
        >
          {copied ? (
            <>
              <LuCheck className="text-green-600" size={16} />
              <span className="absolute -top-8 right-0 bg-black text-white text-xs  rounded-md px-2 py-1 opacity-80 group-hover:opacity-100 transition-all">
                Copied!
              </span>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <LuCopy className="text-green-600" size={16} />
              <span className="text-gray-500">Copy</span>
            </div>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          padding: "1rem",
          borderRadius: "0.5rem",
          overflowX: "auto",
          margin: 0,
          fontSize: "14px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
