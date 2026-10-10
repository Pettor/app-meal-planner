import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,r as n}from"./react-intl-BjG-Y2l6.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{n as i,t as a}from"./alert-DfTWOO0D.js";import{n as o,t as s}from"./button-CPgUre1k.js";import{i as c,n as l,r as u,t as d}from"./BasicLayoutDecorator--4yO0PA8.js";import{n as f,t as p}from"./AuthSwitchPrompt-CYh-sEoz.js";import{n as m,t as h}from"./ForgotPasswordForm-DGCvtoQ3.js";function g({appName:e,resetForm:t,sentToEmail:r,onBack:i}){let o=n();return r?(0,_.jsx)(u,{appName:e,title:o.formatMessage({description:`ForgotPasswordView: heading - check your inbox`,defaultMessage:`Check your inbox`,id:`KcvnhR`}),subtitle:o.formatMessage({description:`ForgotPasswordView: body - reset link sent`,defaultMessage:`The link only works once, so open it on the device you want to sign in on.`,id:`qOKlGC`}),onBack:i,children:(0,_.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,_.jsxs)(a,{status:`success`,"data-testid":`forgot-password-view__sent`,children:[(0,_.jsx)(a.Indicator,{}),(0,_.jsx)(a.Content,{children:(0,_.jsx)(a.Description,{children:o.formatMessage({description:`ForgotPasswordView: body - reset link confirmation`,defaultMessage:`If {email} has an account, a reset link is on its way. It expires in an hour.`,id:`JeUYrQ`},{email:(0,_.jsx)(`strong`,{children:r},`email`)})})})]}),(0,_.jsx)(s,{fullWidth:!0,variant:`secondary`,size:`lg`,onPress:i,"data-testid":`forgot-password-view__back-to-sign-in`,children:o.formatMessage({description:`ForgotPasswordView: button - back to sign in`,defaultMessage:`Back to sign in`,id:`Hfzkvj`})})]})}):(0,_.jsx)(u,{appName:e,title:o.formatMessage({description:`ForgotPasswordView: heading - reset your password`,defaultMessage:`Reset your password`,id:`JR/fbW`}),subtitle:o.formatMessage({description:`ForgotPasswordView: body - reset instructions`,defaultMessage:`Enter the email you signed up with and we'll send a link to set a new password.`,id:`H8obuS`}),onBack:i,footer:(0,_.jsx)(p,{text:o.formatMessage({description:`ForgotPasswordView: body - sign-in prompt`,defaultMessage:`Remembered it?`,id:`Rk6Lk7`}),actionLabel:o.formatMessage({description:`ForgotPasswordView: link - sign in`,defaultMessage:`Sign in`,id:`tGl7PF`}),onPress:i}),children:(0,_.jsx)(h,{...t})})}var _;function v(){return(v=e((()=>{i(),o(),t(),c(),f(),m(),_=r(),g.__docgenInfo={description:``,methods:[],displayName:`ForgotPasswordView`,props:{appName:{required:!0,tsType:{name:`string`},description:``},resetForm:{required:!0,tsType:{name:`ForgotPasswordFormProps`},description:``},sentToEmail:{required:!1,tsType:{name:`string`},description:`Set once the reset link has been requested — swaps the form for a confirmation.`},onBack:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var y,b,x,S,C,w;function T(){return(T=e((()=>{v(),l(),y={component:g,title:`Views/Forgot Password`,tags:[`!test`],parameters:{layout:`fullscreen`},decorators:[d()],argTypes:{resetForm:{table:{disable:!0}}}},b={appName:`Meal Planner`,resetForm:{loading:!1,onSubmit:()=>console.log(`onSubmit`)},onBack:()=>console.log(`onBack`)},x={args:b,parameters:{viewport:{value:`full`}}},S={args:{...b,sentToEmail:`you@example.com`},parameters:{viewport:{value:`full`}}},C={args:b,globals:{viewport:{value:`iphonex`}}},w=[`Fullscreen`,`LinkSent`,`Phone`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    sentToEmail: "you@example.com"
  },
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...C.parameters?.docs?.source}}}})))()}T();export{x as Fullscreen,S as LinkSent,C as Phone,w as __namedExportsOrder,y as default};