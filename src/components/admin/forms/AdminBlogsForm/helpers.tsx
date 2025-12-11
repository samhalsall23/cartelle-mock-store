import { ReactNode } from "react";

export function convertStringToBlog(blogString: string): ReactNode {
  if (!blogString?.trim()) return <></>;

  console.log(blogString.split("/n"));

  return blogString.split("/n").map((line, index) => {
    if (line.startsWith("# ")) {
      return (
        <h3 key={index} className="text-base font-bold mb-2">
          {line.replace("# ", "")}
        </h3>
      );
    } else {
      return (
        <p key={index} className="text-sm mb-2">
          {line}
        </p>
      );
    }
  });
}
