import type {NextConfig} from 'next';
const policy=["default-src 'self'","script-src 'self' 'unsafe-inline' https://apis.google.com","style-src 'self' 'unsafe-inline'","img-src 'self' data: https://*.googleusercontent.com","font-src 'self'","connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebaseapp.com","frame-src https://www.youtube-nocookie.com https://accounts.google.com https://*.firebaseapp.com","object-src 'none'","base-uri 'self'","form-action 'self'","frame-ancestors 'none'"].join('; ');
const config:NextConfig={
 poweredByHeader:false,allowedDevOrigins:['127.0.0.1','localhost'],turbopack:{root:process.cwd()},
 experimental:{globalNotFound:true},
 async redirects(){return [{source:'/',destination:'/en',permanent:false}]},
 async headers(){return [{source:'/:path*',headers:[
  {key:'X-Content-Type-Options',value:'nosniff'},
  {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
  {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=(), payment=()'},
  {key:'X-Frame-Options',value:'DENY'},
  {key:'Cross-Origin-Opener-Policy',value:'same-origin-allow-popups'},
  // Console observation first; enforcing this before testing all providers can break sign-in.
  {key:'Content-Security-Policy-Report-Only',value:policy}
 ]}]}
};
export default config;
