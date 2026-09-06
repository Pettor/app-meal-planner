import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t,n,r}from"./iframe-BxGJe6Y9.js";import{i,n as a,r as o,t as s}from"./BasicLayoutDecorator-3kQjRcW3.js";import{n as c,t as l}from"./AuthSwitchPrompt-B48RlLMR.js";import{n as u,t as d}from"./SignUpForm-C7DiYNmB.js";function f({appName:e,signUpForm:t,onBack:n}){let i=r();return(0,p.jsx)(o,{appName:e,title:i.formatMessage({description:`SignUpView: heading - start planning`,defaultMessage:`Start planning`,id:`/BF4g+`}),subtitle:i.formatMessage({description:`SignUpView: body - sign-up description`,defaultMessage:`Set up an account, add a few recipes, and the first week plans itself.`,id:`UMr38c`}),onBack:n,footer:(0,p.jsx)(l,{text:i.formatMessage({description:`SignUpView: body - sign-in prompt`,defaultMessage:`Already cooking with us?`,id:`JpnP8y`}),actionLabel:i.formatMessage({description:`SignUpView: link - sign in`,defaultMessage:`Sign in`,id:`g/QbwD`}),onPress:n}),children:(0,p.jsx)(d,{...t})})}var p,m=e((()=>{n(),i(),c(),u(),p=t(),f.__docgenInfo={description:``,methods:[],displayName:`SignUpView`,props:{appName:{required:!0,tsType:{name:`string`},description:``},signUpForm:{required:!0,tsType:{name:`SignUpFormProps`},description:``},onBack:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),h,g,_,v,y;e((()=>{m(),a(),h={component:f,title:`Views/Sign Up`,tags:[`!test`],parameters:{layout:`fullscreen`},decorators:[s()],argTypes:{signUpForm:{table:{disable:!0}}}},g={appName:`Meal Planner`,signUpForm:{loading:!1,onSubmit:()=>console.log(`onSubmit`)},onBack:()=>console.log(`onBack`)},_={args:g,parameters:{viewport:{value:`full`}}},v={args:g,globals:{viewport:{value:`iphonex`}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y=[`Fullscreen`,`Phone`]}))();export{_ as Fullscreen,v as Phone,y as __namedExportsOrder,h as default};