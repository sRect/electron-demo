import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface IParams {
  code: string;
}

function ResultPage() {
  const [code, setCode] = useState('404');
  const params: IParams = useParams();

  useEffect(() => {
    setCode(params.code);
  }, [params.code]);

  console.log(params);

  return <div>当前code: {code}</div>;
}

export default ResultPage;
