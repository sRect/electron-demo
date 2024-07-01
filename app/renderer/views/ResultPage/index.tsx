import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Result, Button } from "antd";

interface IParams {
  code: string;
}

type CodeConf = "success" | "error" | "info" | "warning" | "404" | "403" | "500";

const ResultPage:React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<CodeConf>("404");
  const params: Partial<IParams> = useParams();

  useEffect(() => {
    setCode(params.code as CodeConf);
  }, [params.code]);

  console.log(params);

  return (
    <Result
      status={code}
      title={code}
      extra={<Button type="primary" onClick={() => navigate("/")}>Back Home</Button>}
    />
  );
}

export default ResultPage;
