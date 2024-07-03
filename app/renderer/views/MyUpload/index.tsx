import React, {memo, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Upload from "@/components/Upload";
import { Image } from "antd";

const MyUpload:React.FC = () => {
  const navigate = useNavigate();
  const [imgPath, setImgPath] = useState<string>("");

  const gotoHome = (): void => {
    navigate("/");
  }

  const handleOnAfterChange = (files: TSMyUpload.File[]):void => {
    if(files.length) {
      const url = URL.createObjectURL(files[0].file as File);
      setImgPath(url);
    }
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imgPath);
    }
  }, [imgPath]);

  return (
    <div className="w-full flex flex-col gap-[10px]">
      <div className="w-[200px]">
        <Button type="dashed" danger onClick={gotoHome}>回到首页</Button>
      </div>

      <h3>选择文件并本地进行预览测试</h3>

      <Upload onAfterChange={handleOnAfterChange} />

      {
        imgPath 
        ? <Image
            width={200}
            src={imgPath}
          /> 
        : ""
      }
    </div>
  )
}

export default memo(MyUpload);
