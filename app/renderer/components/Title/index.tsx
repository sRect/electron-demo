import React from 'react';

interface IProps{
  text: string;
  styles: React.CSSProperties;
}

function Title({text, styles}:IProps) {
  return (
    <div>child components: <span style={styles}>{text}</span></div>
  )
}

export default Title;
