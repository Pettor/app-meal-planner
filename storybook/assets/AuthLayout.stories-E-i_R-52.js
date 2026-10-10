import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./alert-DfTWOO0D.js";import{n as i,t as a}from"./button-CPgUre1k.js";import{i as o,n as s,r as c,t as l}from"./BasicLayoutDecorator--4yO0PA8.js";import{n as u,t as d}from"./AuthSwitchPrompt-CYh-sEoz.js";var f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{n(),i(),o(),u(),s(),f=t(),{expect:p}=__STORYBOOK_MODULE_TEST__,m={title:`Display/Auth Layout`,component:c,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[l()],argTypes:{banner:{table:{disable:!0}},footer:{table:{disable:!0}},headerAction:{table:{disable:!0}},children:{table:{disable:!0}}}},h={appName:`Meal Planner`,title:`Welcome back`,subtitle:`Sign in and pick up where the week left off.`,children:(0,f.jsx)(a,{variant:`primary`,children:`Sign in`}),footer:(0,f.jsx)(d,{text:`New here?`,actionLabel:`Create an account`,onPress:()=>{}})},g={args:h},_={args:{...h,banner:(0,f.jsxs)(r,{status:`warning`,children:[(0,f.jsx)(r.Indicator,{}),(0,f.jsx)(r.Content,{children:(0,f.jsx)(r.Description,{children:`Demo build. Any valid email and a password of at least 8 characters will get you in.`})})]})}},v={args:{...h,title:`Reset your password`,subtitle:`Enter the email you signed up with and we'll send a link to set a new password.`,footer:(0,f.jsx)(d,{text:`Remembered it?`,actionLabel:`Sign in`,onPress:()=>{}}),onBack:()=>{}}},y={args:h,globals:{viewport:{value:`iphonex`}}},b={args:{...h,onBack:()=>{}},play:async({canvas:e})=>{await p(e.getByRole(`heading`,{name:`Welcome back`})).toBeInTheDocument(),await p(e.getByTestId(`auth-layout__back-button`)).toBeInTheDocument(),await p(e.getByTestId(`auth-switch-prompt__action`)).toBeInTheDocument()}},x=[`Default`,`WithBanner`,`WithBackButton`,`Phone`,`Interaction`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    banner: <Alert status="warning">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>
            Demo build. Any valid email and a password of at least 8 characters will get you in.
          </Alert.Description>
        </Alert.Content>
      </Alert>
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    title: "Reset your password",
    subtitle: "Enter the email you signed up with and we'll send a link to set a new password.",
    footer: <AuthSwitchPrompt text="Remembered it?" actionLabel="Sign in" onPress={() => {}} />,
    onBack: () => {}
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    onBack: () => {}
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole("heading", {
      name: "Welcome back"
    })).toBeInTheDocument();
    await expect(canvas.getByTestId("auth-layout__back-button")).toBeInTheDocument();
    await expect(canvas.getByTestId("auth-switch-prompt__action")).toBeInTheDocument();
  }
}`,...b.parameters?.docs?.source}}}})))()}S();export{g as Default,b as Interaction,y as Phone,v as WithBackButton,_ as WithBanner,x as __namedExportsOrder,m as default};