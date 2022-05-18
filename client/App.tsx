// deno-lint-ignore-file
import { React } from "../deps.ts";
import ToDoList from "./ToDoList.tsx";

export default function App() {
  const title = "Deno React ToDoList";
  React.useEffect(() => {
    // @ts-ignore
    document.title = title;
  }, []);
  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl mb-4">{title}</h1>
      <ToDoList />
    </div>
  );
}
