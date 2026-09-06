import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./AuthSwitchPrompt-B48RlLMR.js";var r,i,a,o,s,c,l,u;e((()=>{t(),{expect:r,fn:i}=__STORYBOOK_MODULE_TEST__,a={title:`Display/Auth Switch Prompt`,component:n,tags:[`autodocs`]},o={text:`New here?`,actionLabel:`Create an account`,onPress:i()},s={args:o},c={args:{...o,text:`Already cooking with us?`,actionLabel:`Sign in`}},l={args:o,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByTestId(`auth-switch-prompt__action`)),await r(e.onPress).toHaveBeenCalled()}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    text: "Already cooking with us?",
    actionLabel: "Sign in"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("auth-switch-prompt__action"));
    await expect(args.onPress).toHaveBeenCalled();
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`,`SignIn`,`Interaction`]}))();export{s as Default,l as Interaction,c as SignIn,u as __namedExportsOrder,a as default};