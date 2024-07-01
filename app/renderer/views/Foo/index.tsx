import React from 'react';
import Title from '@/components/Title';
import { Link } from 'react-router-dom';

const Foo = () => {
  return (
    <div>
      Foo component
      <br />
      <Title {...{ text: 'hello', styles: { color: 'blue' } }} />
      <br />
      <Link to="/" replace>goto home</Link>
    </div>
  );
};

export default Foo;
