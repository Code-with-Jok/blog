import CodeBlock from "@/components/CodeBlock";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MDContentProps {
  content: string;
}

const MDContent = ({ content }: MDContentProps) => {
  if (!content) return null;
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "text";

            const isBlock = match || String(children).includes("\n");

            if (!isBlock) {
              return (
                <code
                  className="bg-gray-100 text-indigo-600 rounded px-1.5 py-0.5 font-mono text-sm border border-gray-200 mx-1"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <div className="my-8 rounded-xl overflow-hidden shadow-md ring-1 ring-gray-200/50">
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                />
              </div>
            );
          },
          p({ children, ...props }) {
            return (
              <p
                className="text-gray-700 leading-8 mb-6 font-normal text-lg"
                {...props}
              >
                {children}
              </p>
            );
          },
          h1({ children, ...props }) {
            return (
              <h1
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
                {...props}
              >
                {children}
              </h1>
            );
          },
          h2({ children, ...props }) {
            return (
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 pb-2 border-b border-gray-600/50"
                {...props}
              >
                {children}
              </h2>
            );
          },
          h3({ children, ...props }) {
            return (
              <h3
                className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4"
                {...props}
              >
                {children}
              </h3>
            );
          },
          h4({ children, ...props }) {
            return (
              <h4
                className="text-lg md:text-xl font-semibold text-gray-800 mt-6 mb-3"
                {...props}
              >
                {children}
              </h4>
            );
          },
          h5({ children, ...props }) {
            return (
              <h5
                className="text-base font-semibold text-gray-800 mt-4 mb-2 uppercase tracking-wide"
                {...props}
              >
                {children}
              </h5>
            );
          },
          h6({ children, ...props }) {
            return (
              <h6
                className="text-sm font-bold text-gray-700 mt-4 mb-2"
                {...props}
              >
                {children}
              </h6>
            );
          },
          a({ children, ...props }) {
            return (
              <a
                className="text-primary hover:text-blue-700 hover:underline font-medium transition-colors cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          },
          img({ src, alt, ...props }) {
            return (
              <figure className="my-8">
                <img
                  className="w-full rounded-xl shadow-md border border-gray-100"
                  src={src}
                  alt={alt}
                  {...props}
                />
                {alt && (
                  <figcaption className="text-center text-gray-500 text-sm mt-3 italic">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          strong({ children, ...props }) {
            return (
              <strong className="font-bold text-gray-900" {...props}>
                {children}
              </strong>
            );
          },
          em({ children, ...props }) {
            return (
              <em className="text-gray-800 italic" {...props}>
                {children}
              </em>
            );
          },
          ul({ children, ...props }) {
            return (
              <ul
                className="list-disc list-outside ml-6 mb-6 text-gray-700 space-y-2"
                {...props}
              >
                {children}
              </ul>
            );
          },
          ol({ children, ...props }) {
            return (
              <ol
                className="list-decimal list-outside ml-6 mb-6 text-gray-700 space-y-2"
                {...props}
              >
                {children}
              </ol>
            );
          },
          li({ children, ...props }) {
            return (
              <li className="pl-2 leading-relaxed text-lg" {...props}>
                {children}
              </li>
            );
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote
                className="border-l-4 border-primary/40 pl-6 py-2 my-8 italic text-gray-600 bg-gray-50 rounded-r-lg"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          hr({ ...props }) {
            return <hr className="my-10 border-gray-200" {...props} />;
          },
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left border-collapse" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          thead({ children, ...props }) {
            return (
              <thead className="bg-gray-50 border-b border-gray-200" {...props}>
                {children}
              </thead>
            );
          },
          tbody({ children, ...props }) {
            return (
              <tbody className="divide-y divide-gray-100" {...props}>
                {children}
              </tbody>
            );
          },
          tr({ children, ...props }) {
            return (
              <tr className="hover:bg-gray-50/50 transition-colors" {...props}>
                {children}
              </tr>
            );
          },
          td({ children, ...props }) {
            return (
              <td className="p-4 text-gray-600 align-top text-sm" {...props}>
                {children}
              </td>
            );
          },
          th({ children, ...props }) {
            return (
              <th
                className="p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider"
                {...props}
              >
                {children}
              </th>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MDContent;
