import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,r as n}from"./react-intl-BjG-Y2l6.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{n as i,t as a}from"./SignUpForm-DG6LyX0b.js";import{i as o,n as s,r as c,t as l}from"./BasicLayoutDecorator--4yO0PA8.js";import{n as u,t as d}from"./AuthSwitchPrompt-CYh-sEoz.js";function f({appName:e,signUpForm:t,onBack:r}){let i=n();return(0,p.jsx)(c,{appName:e,title:i.formatMessage({description:`SignUpView: heading - start planning`,defaultMessage:`Start planning`,id:`/BF4g+`}),subtitle:i.formatMessage({description:`SignUpView: body - sign-up description`,defaultMessage:`Set up an account, add a few recipes, and the first week plans itself.`,id:`UMr38c`}),onBack:r,footer:(0,p.jsx)(d,{text:i.formatMessage({description:`SignUpView: body - sign-in prompt`,defaultMessage:`Already cooking with us?`,id:`JpnP8y`}),actionLabel:i.formatMessage({description:`SignUpView: link - sign in`,defaultMessage:`Sign in`,id:`g/QbwD`}),onPress:r}),children:(0,p.jsx)(a,{...t})})}var p;function m(){return(m=e((()=>{t(),o(),u(),i(),p=r(),f.__docgenInfo={description:``,methods:[],displayName:`SignUpView`,props:{appName:{required:!0,tsType:{name:`string`},description:``},signUpForm:{required:!0,tsType:{name:`SignUpFormProps`},description:``},onBack:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var h,g,_,v,y;function b(){return(b=e((()=>{m(),s(),h={component:f,title:`Views/Sign Up`,tags:[`!test`],parameters:{layout:`fullscreen`},decorators:[l()],argTypes:{signUpForm:{table:{disable:!0}}}},g={appName:`Meal Planner`,signUpForm:{loading:!1,onSubmit:()=>console.log(`onSubmit`)},onBack:()=>console.log(`onBack`)},_={args:g,parameters:{viewport:{value:`full`}}},v={args:g,globals:{viewport:{value:`iphonex`}}},y=[`Fullscreen`,`Phone`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...v.parameters?.docs?.source}}}})))()}b();export{_ as Fullscreen,v as Phone,y as __namedExportsOrder,h as default};