import React, {memo, useRef} from "react";
import { message } from "antd";
import { UploadOutlined } from '@ant-design/icons';

type TInputEvent = {
  target: HTMLInputElement
}

const Upload:React.FC<Partial<TSMyUpload.TInput>> = ({title="点击上传", multiple=false, onAfterChange=():void => {}}) => {
  const inputRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  const onChange = (e:TInputEvent):void => {
    console.log(e);

    const files: FileList | never[] = e?.target?.files || [];

    if(e?.target?.value === "" || files.length === 0) {
      return;
    }

    if(files && files.length > 0) {
      const arr = files as Array<File>;
      const fileList: Array<TSMyUpload.File> = [...arr].map((file: Partial<TSMyUpload.File>) => { 
        return {
          file,
          name: file.name || ""
        }
      });
  
      onAfterChange && onAfterChange(fileList);
      messageApi.success("操作成功");
    } else {
      console.log("files is null");
      messageApi.warning("请选择文件");
    }
  }

  const beforeUpload = () => {
    const input = inputRef.current as HTMLInputElement | null;
    if(input) {
      input.click();
    }
  }

  return (
    <>
      {contextHolder}
      <div className="flex items-center gap-[5px] px-[8px] py-[4px] cursor-pointer" onClick={beforeUpload}>
        <UploadOutlined />
        <span>{title}</span>
        <input ref={inputRef} hidden type="file" accept="image/png, image/jpeg" multiple={multiple} onChange={onChange} />
      </div>
    </>
  )
}

export default memo(Upload);
