declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.jpg' {
  const jpg: string;
  export default jpg;
}
