import React from 'react';
import Title from '@/components/Title';

const Foo = () => {
  return (
    <div>
      Foo component
      <br />
      <Title {...{ text: 'hello', styles: { color: 'pink' } }} />
    </div>
  );
};

export default Foo;
