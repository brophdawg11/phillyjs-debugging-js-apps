import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as React from "react";

export function meta() {
  return [{ title: "Debugging JavaScript Applications" }];
}

export function loader() {
  return json({ message: "Hello PhillyJS!" });
}

export default function Index() {
  let data = useLoaderData<typeof loader>();
  let [x, setX] = React.useState(3);
  let [y, setY] = React.useState(2);
  let [op, setOp] = React.useState("+");
  let ref = React.useRef<HTMLInputElement>(null);

  // Yes I know this doesn't need to be memoized don't @ me
  let answer = React.useMemo(() => {
    switch (op) {
      case "":
        return "";
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
      case "x":
        return x * y;
      case "/":
        return x / y;
      default:
        throw new Error("Invalid operation");
    }
  }, [x, y, op]);

  return (
    <div>
      <style>{`
        body { font-size: 24px; font-family: arial;}
        input, span { margin-right: 1rem; font-size: 1.5rem; }
        input { width: 5rem; text-align: center; }
      `}</style>

      <h1>{data.message}</h1>
      <input
        ref={ref}
        value={x}
        onChange={(e) =>
          setX(e.target.value == "" ? 0 : Number(e.target.value))
        }
        style={{ marginRight: "1rem" }}
      />
      <input
        value={op}
        onChange={(e) => setOp(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <input
        value={y}
        onChange={(e) =>
          setY(e.target.value == "" ? 0 : Number(e.target.value))
        }
      />
      <span>=</span>
      <span>{answer}</span>
    </div>
  );
}
