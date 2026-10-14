// Ambient declarations (no imports or exports in this file so declarations remain truly global)

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: any;
  export default content;
}

declare module '*.webp' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module 'react-lottie';
declare module 'google-map-react';
declare module 'react-apple-login';
declare module 'react-facebook-login';
declare module 'react-image-magnifiers';
declare module 'react-image-magnify';
declare module 'emoji-picker-react';
declare module 'base-64';
