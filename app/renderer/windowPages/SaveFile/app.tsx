import React, {memo, useState} from "react";
import { ipcRenderer } from "electron";
import { Input, Button } from "antd";
import { CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {openMainProcessDialog, openMainProcessSaveDialog} from "@/utils";

interface ISelectorState {
  [p: string]: ISelectorState;
}

const SaveFile = () => {
  const storageUserName = useSelector((state: ISelectorState) => state.loginReducer.username);
  const [savePath, setSavePath] = useState<string>("/Users/fangchaoqun/Desktop");

  const handleChangePath = async ():Promise<void> => {
    try {
      const path: Awaited<Promise<string>> = await openMainProcessDialog();

      console.log("path:", path);
      setSavePath(path);
    } catch (error) {
      console.error(error)
    }
  };

  const handleSave = async ():Promise<void> => {
    const testBlob = new Blob(['我是Blob'],{type: 'text/plain'});

    const data:TSaveFileProps = {
      fileName: "test",
      fileExtensions: "txt",
      filePath: savePath,
      arrayBuffer: await testBlob.arrayBuffer()
    }

    await openMainProcessSaveDialog(data);
  }

  const handleOnHideWindow = ():void => {
    ipcRenderer.send("saveFileWindowHide");
  }

  const handleOnMinWindow = ():void => {
    ipcRenderer.send("saveFileWindowMin");
  }

  return (
    <div className="w-full flex flex-col gap-[20px] p-[16px] box-border">
      <div className="flex gap-[10px] items-center">
        <Button shape="circle" icon={<CloseOutlined />} size="small" onClick={handleOnHideWindow}></Button>
        <Button shape="circle" icon={<MinusOutlined />} size="small" onClick={handleOnMinWindow}></Button>
      </div>

      <span>测试：获取来自main窗口，缓存store中，loginReducer的数据：{storageUserName}</span>

      <div className="w-full flex items-center gap-[10px]">
        <Input value={savePath} disabled />
        <Button type="primary" ghost onClick={handleChangePath}>更改路径</Button>
        <Button type="primary" onClick={handleSave}>保存</Button>
      </div>
    </div>
  );
};

export default memo(SaveFile);
