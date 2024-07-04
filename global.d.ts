declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.jpg' {
  const jpg: string;
  export default jpg;
}

declare module '*.jsx' {
  // 解决React报错JSX element type does not have any construct or call signatures
  const MyErrorBoundary: React.ElementType; // 或者更具体的类型
  export default MyErrorBoundary;
}

type TSaveFileProps = {
  fileName: string;
  fileExtensions: string;
  filePath: string;
  arrayBuffer: ArrayBuffer;
}
