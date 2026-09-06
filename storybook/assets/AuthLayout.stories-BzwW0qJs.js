import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{_ as n,t as r,wt as i}from"./dist-DFOu2y8R.js";import{i as a,n as o,r as s,t as c}from"./BasicLayoutDecorator-3kQjRcW3.js";import{n as l,t as u}from"./AuthSwitchPrompt-B48RlLMR.js";var d,f,p,m,h,g,_,v,y,b;e((()=>{r(),a(),l(),o(),d=t(),{expect:f}=__STORYBOOK_MODULE_TEST__,p={title:`Display/Auth Layout`,component:s,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[c()],argTypes:{banner:{table:{disable:!0}},footer:{table:{disable:!0}},headerAction:{table:{disable:!0}},children:{table:{disable:!0}}}},m={appName:`Meal Planner`,title:`Welcome back`,subtitle:`Sign in and pick up where the week left off.`,children:(0,d.jsx)(i,{variant:`primary`,children:`Sign in`}),footer:(0,d.jsx)(u,{text:`New here?`,actionLabel:`Create an account`,onPress:()=>{}})},h={args:m},g={args:{...m,banner:(0,d.jsxs)(n,{status:`warning`,children:[(0,d.jsx)(n.Indicator,{}),(0,d.jsx)(n.Content,{children:(0,d.jsx)(n.Description,{children:`Demo build. Any valid email and a password of at least 8 characters will get you in.`})})]})}},_={args:{...m,title:`Reset your password`,subtitle:`Enter the email you signed up with and we'll send a link to set a new password.`,footer:(0,d.jsx)(u,{text:`Remembered it?`,actionLabel:`Sign in`,onPress:()=>{}}),onBack:()=>{}}},v={args:m,globals:{viewport:{value:`iphonex`}}},y={args:{...m,onBack:()=>{}},play:async({canvas:e})=>{await f(e.getByRole(`heading`,{name:`Welcome back`})).toBeInTheDocument(),await f(e.getByTestId(`auth-layout__back-button`)).toBeInTheDocument(),await f(e.getByTestId(`auth-switch-prompt__action`)).toBeInTheDocument()}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    title: "Reset your password",
    subtitle: "Enter the email you signed up with and we'll send a link to set a new password.",
    footer: <AuthSwitchPrompt text="Remembered it?" actionLabel="Sign in" onPress={() => {}} />,
    onBack: () => {}
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b=[`Default`,`WithBanner`,`WithBackButton`,`Phone`,`Interaction`]}))();export{h as Default,y as Interaction,v as Phone,_ as WithBackButton,g as WithBanner,b as __namedExportsOrder,p as default};