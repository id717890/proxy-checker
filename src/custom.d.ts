declare module '*.scss';
declare module '*.css';

//allow RegisterItem svg in typescript files, like: RegisterItem logo from './logo.svg'
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.woff' {
  const value: any;
  export default value;
}

declare module '*.woff2' {
  const value: any;
  export default value;
}
