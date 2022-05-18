// deno-lint-ignore-file
import { React } from "../deps.ts";
type TStatus = "init" | "done";
type ToDoItem = {
  content: string;
  status: TStatus;
};

export default function ToDoList() {
  const [list, setList] = React.useState<Array<ToDoItem>>([]);
  const [content, setContent] = React.useState("");
  const [curStatus, setCurStatus] = React.useState<TStatus>("init");

  const handleInputChange = (e: any) => {
    const value = e.currentTarget.value.trim();
    setContent(value);
  };

  const handleInputKeypress = (e: any) => {
    if (e.code === "Enter") {
      setList([{ content, status: "init" }, ...list]);
      setContent("");
    }
  };

  const handleItemClick = (item: ToDoItem) => {
    item.status = item.status === "init" ? "done" : "init";
    setList([...list]);
  };

  const onTabChange = (e: any) => {
    if (e.target.dataset["value"]) {
      setCurStatus(e.target.dataset["value"]);
    }
  };

  const doneList = React.useMemo(() => {
    return list.filter((v) => v.status === "done");
  }, [list, list.length]);

  const undoneList = React.useMemo(() => {
    return list.filter((v) => v.status === "init");
  }, [list, list.length]);

  const getTabClass = React.useCallback(
    (s: TStatus) =>
      s === curStatus
        ? "cursor-pointer text-lg bg-blue-500 rounded text-white"
        : "cursor-pointer text-lg bg-gray-100 rounded",
    [curStatus],
  );

  const fianlList = curStatus === "done" ? doneList : undoneList;

  return (
    <div className="px-6">
      <input
        className="w-3/5 rounded border border-black p-2"
        placeholder="请输入内容,敲击回车添加待办"
        value={content}
        onChange={handleInputChange}
        onKeyPress={handleInputKeypress}
      />
      <div className="grid grid-cols-2 divide py-6" onClick={onTabChange}>
        <label data-value="init" className={getTabClass("init")}>
          未完成
        </label>
        <label data-value="done" className={getTabClass("done")}>
          已完成
        </label>
      </div>
      <ul className="px-4 flex justify-center items-center flex-col">
        {fianlList.map((v, idx) => {
          return (
            <li
              key={idx}
              className="cursor-pointer flex justify-between w-3/5 p-2  border-b border-black border-dashed"
              style={{
                textDecoration: v.status === "done" ? "line-through" : "",
              }}
              onClick={() => handleItemClick(v)}
            >
              {v.content}
              <div>
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={v.status === "done"}
                  readOnly
                />
                <label htmlFor="checkbox">
                  {v.status === "init" ? "未完成" : "已完成"}
                </label>
              </div>
            </li>
          );
        })}
        {fianlList.length === 0 && <div className="text-lg">暂无数据</div>}
      </ul>
    </div>
  );
}
