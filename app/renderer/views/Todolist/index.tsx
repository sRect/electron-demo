import React, {memo, useState} from "react";
import TodoItem from "./TodoItem";
import {showErrorBox} from "@/utils";

interface IProps {
  [propsName: string]: unknown;
}

type Todolist = {
  inputValue: string; // 当前输入框输入的内容
  list: string[];
}

const defaultTodolist: Todolist = {
  inputValue: "",
  list: []
}

// 判断输入框输入的是否为空(非空断言)
function assertInputValue<T>(value: T): asserts value is NonNullable<T> {
  if(!value) {
    throw new Error("输入不可为空");
  }
} 

const Todolist: React.FC<IProps> = () => {
  const [todo, setTodo] = useState<Todolist>(defaultTodolist);

  const handleSubmit = ():void => {
    const val = todo.inputValue.trim();

    try {
      assertInputValue(val);

      const newList = [...todo.list, todo.inputValue];
      setTodo({list: newList, inputValue: ""});
    } catch (error) {
      console.error(error);
      showErrorBox((error as Error).message || "请输入内容后再进行提交");  
    }

  }

  const handleDeleteItem = (index:number) => {
    console.log(`delete index: ${index}`);
    const newList = [...todo.list];
    newList.splice(index, 1);

    setTodo({...todo, list: newList});
  }

  return (
    <div>
      <div>
        <label htmlFor="insertArea">输入内容：</label>
        <input id="insertArea" value={todo.inputValue} onChange={e => setTodo({...todo, inputValue: e.target.value})} />
        <button onClick={handleSubmit}>提交</button>
      </div>

      <ul>
        {
          todo.list.map((item, index) => <TodoItem key={index}  content={item} index={index} deleteItem={handleDeleteItem} />)
        }
      </ul>
    </div>
  );
}

export default memo(Todolist);
