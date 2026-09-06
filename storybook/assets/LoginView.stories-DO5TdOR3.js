import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t,n,r}from"./iframe-BxGJe6Y9.js";import{_ as i,t as a,wt as o}from"./dist-DFOu2y8R.js";import{X as s,t as c}from"./esm-CRIJbiOO.js";import{i as l,n as u,r as d,t as f}from"./BasicLayoutDecorator-3kQjRcW3.js";import{n as p,t as m}from"./AuthSwitchPrompt-B48RlLMR.js";import{n as h,t as g}from"./LoginForm-Dr3z84cm.js";function _({appName:e,loginForm:t,error:n,onSettings:a,onSignUp:c}){let l=r();return(0,v.jsx)(d,{appName:e,title:l.formatMessage({description:`LoginView: heading - welcome back`,defaultMessage:`Welcome back`,id:`ciI966`}),subtitle:l.formatMessage({description:`LoginView: body - sign in tagline`,defaultMessage:`Sign in and pick up where the week left off.`,id:`oJDoLK`}),headerAction:(0,v.jsx)(o,{isIconOnly:!0,variant:`ghost`,onPress:a,"aria-label":l.formatMessage({description:`LoginView: aria-label - settings button`,defaultMessage:`Settings`,id:`WYAsZQ`}),"data-testid":`login-view__settings-button`,children:(0,v.jsx)(s,{className:`h-5 w-5`})}),banner:(0,v.jsxs)(v.Fragment,{children:[y,n&&(0,v.jsxs)(i,{status:`danger`,"data-testid":`login-view__error`,children:[(0,v.jsx)(i.Indicator,{}),(0,v.jsx)(i.Content,{children:(0,v.jsx)(i.Description,{children:n})})]})]}),footer:(0,v.jsx)(m,{text:l.formatMessage({description:`LoginView: body - sign-up prompt`,defaultMessage:`New here?`,id:`U3f1k3`}),actionLabel:l.formatMessage({description:`LoginView: link - create an account`,defaultMessage:`Create an account`,id:`rFtjCS`}),onPress:c}),children:(0,v.jsx)(g,{...t})})}var v,y,b=e((()=>{c(),a(),n(),l(),p(),h(),v=t(),y=!1,_.__docgenInfo={description:``,methods:[],displayName:`LoginView`,props:{appName:{required:!0,tsType:{name:`string`},description:``},loginForm:{required:!0,tsType:{name:`LoginFormProps`},description:``},error:{required:!1,tsType:{name:`string`},description:``}}}})),x,S,C,w,T,E;e((()=>{b(),u(),x={component:_,title:`Views/Login`,tags:[`!test`],parameters:{layout:`fullscreen`},decorators:[f()],argTypes:{loginForm:{table:{disable:!0}}}},S={appName:`Meal Planner`,loginForm:{loading:!1,onForgotPassword:()=>console.log(`handleForgotPassword`),onSubmit:()=>console.log(`onSubmit`)},onSettings:()=>console.log(`onSettings`),onSignUp:()=>console.log(`handleSignUp`)},C={args:S,parameters:{viewport:{value:`full`}}},w={args:{...S,error:`Incorrect username or password.`},parameters:{viewport:{value:`full`}}},T={args:S,globals:{viewport:{value:`iphonex`}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    error: "Incorrect username or password."
  },
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...T.parameters?.docs?.source}}},E=[`Fullscreen`,`WithError`,`Phone`]}))();export{C as Fullscreen,T as Phone,w as WithError,E as __namedExportsOrder,x as default};