import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t,n,r}from"./iframe-BxGJe6Y9.js";import{_ as i,t as a,wt as o}from"./dist-DFOu2y8R.js";import{i as s,n as c,r as l,t as u}from"./BasicLayoutDecorator-3kQjRcW3.js";import{n as d,t as f}from"./AuthSwitchPrompt-B48RlLMR.js";import{n as p,t as m}from"./ForgotPasswordForm-B9Qc9hWQ.js";function h({appName:e,resetForm:t,sentToEmail:n,onBack:a}){let s=r();return n?(0,g.jsx)(l,{appName:e,title:s.formatMessage({description:`ForgotPasswordView: heading - check your inbox`,defaultMessage:`Check your inbox`,id:`KcvnhR`}),subtitle:s.formatMessage({description:`ForgotPasswordView: body - reset link sent`,defaultMessage:`The link only works once, so open it on the device you want to sign in on.`,id:`qOKlGC`}),onBack:a,children:(0,g.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,g.jsxs)(i,{status:`success`,"data-testid":`forgot-password-view__sent`,children:[(0,g.jsx)(i.Indicator,{}),(0,g.jsx)(i.Content,{children:(0,g.jsx)(i.Description,{children:s.formatMessage({description:`ForgotPasswordView: body - reset link confirmation`,defaultMessage:`If {email} has an account, a reset link is on its way. It expires in an hour.`,id:`JeUYrQ`},{email:(0,g.jsx)(`strong`,{children:n},`email`)})})})]}),(0,g.jsx)(o,{fullWidth:!0,variant:`secondary`,size:`lg`,onPress:a,"data-testid":`forgot-password-view__back-to-sign-in`,children:s.formatMessage({description:`ForgotPasswordView: button - back to sign in`,defaultMessage:`Back to sign in`,id:`Hfzkvj`})})]})}):(0,g.jsx)(l,{appName:e,title:s.formatMessage({description:`ForgotPasswordView: heading - reset your password`,defaultMessage:`Reset your password`,id:`JR/fbW`}),subtitle:s.formatMessage({description:`ForgotPasswordView: body - reset instructions`,defaultMessage:`Enter the email you signed up with and we'll send a link to set a new password.`,id:`H8obuS`}),onBack:a,footer:(0,g.jsx)(f,{text:s.formatMessage({description:`ForgotPasswordView: body - sign-in prompt`,defaultMessage:`Remembered it?`,id:`Rk6Lk7`}),actionLabel:s.formatMessage({description:`ForgotPasswordView: link - sign in`,defaultMessage:`Sign in`,id:`tGl7PF`}),onPress:a}),children:(0,g.jsx)(m,{...t})})}var g,_=e((()=>{a(),n(),s(),d(),p(),g=t(),h.__docgenInfo={description:``,methods:[],displayName:`ForgotPasswordView`,props:{appName:{required:!0,tsType:{name:`string`},description:``},resetForm:{required:!0,tsType:{name:`ForgotPasswordFormProps`},description:``},sentToEmail:{required:!1,tsType:{name:`string`},description:`Set once the reset link has been requested — swaps the form for a confirmation.`},onBack:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),v,y,b,x,S,C;e((()=>{_(),c(),v={component:h,title:`Views/Forgot Password`,tags:[`!test`],parameters:{layout:`fullscreen`},decorators:[u()],argTypes:{resetForm:{table:{disable:!0}}}},y={appName:`Meal Planner`,resetForm:{loading:!1,onSubmit:()=>console.log(`onSubmit`)},onBack:()=>console.log(`onBack`)},b={args:y,parameters:{viewport:{value:`full`}}},x={args:{...y,sentToEmail:`you@example.com`},parameters:{viewport:{value:`full`}}},S={args:y,globals:{viewport:{value:`iphonex`}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    sentToEmail: "you@example.com"
  },
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...S.parameters?.docs?.source}}},C=[`Fullscreen`,`LinkSent`,`Phone`]}))();export{b as Fullscreen,x as LinkSent,S as Phone,C as __namedExportsOrder,v as default};