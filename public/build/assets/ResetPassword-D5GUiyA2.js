import{W as w,r as f,j as s,a as x}from"./app-DyCF4hii.js";import{G as j}from"./GuestLayout-DquElfEs.js";import{I as t}from"./InputError-BmfdEc8a.js";import{I as m}from"./InputLabel-Cq_aJarn.js";import{P as v}from"./PrimaryButton-CnZkqVuK.js";import{T as i}from"./TextInput-CTSfM5Co.js";import"./ApplicationLogo-Ce3HBs5f.js";function y({token:l,email:n}){const{data:e,setData:o,post:d,processing:p,errors:r,reset:c}=w({token:l,email:n,password:"",password_confirmation:""});f.useEffect(()=>()=>{c("password","password_confirmation")},[]);const u=a=>{a.preventDefault(),d(route("password.store"))};return s.jsxs(j,{children:[s.jsx(x,{title:"Reset Password"}),s.jsxs("form",{onSubmit:u,children:[s.jsxs("div",{children:[s.jsx(m,{htmlFor:"email",value:"Email"}),s.jsx(i,{id:"email",type:"email",name:"email",value:e.email,className:"mt-1 block w-full",autoComplete:"username",onChange:a=>o("email",a.target.value)}),s.jsx(t,{message:r.email,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(m,{htmlFor:"password",value:"Password"}),s.jsx(i,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",autoComplete:"new-password",isFocused:!0,onChange:a=>o("password",a.target.value)}),s.jsx(t,{message:r.password,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(m,{htmlFor:"password_confirmation",value:"Confirm Password"}),s.jsx(i,{type:"password",id:"password_confirmation",name:"password_confirmation",value:e.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:a=>o("password_confirmation",a.target.value)}),s.jsx(t,{message:r.password_confirmation,className:"mt-2"})]}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(v,{className:"ms-4",disabled:p,children:"Reset Password"})})]})]})}export{y as default};
