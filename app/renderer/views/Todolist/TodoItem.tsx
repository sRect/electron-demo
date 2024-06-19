import React, {memo} from "react";

type TodoItemProps = {
  content: string;
  index: number;
  deleteItem: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({content, index, deleteItem}) => {
  return <li><span>{index+1}: {content}</span> <button onClick={() => deleteItem(index)}>删除</button></li>
}

export default memo(TodoItem);
