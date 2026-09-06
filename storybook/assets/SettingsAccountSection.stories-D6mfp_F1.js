import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SettingsAccountSection-C-iWyiV9.js";var r,i,a,o,s,c;e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,title:`Feedback/Settings Modal/Account Section`,tags:[`autodocs`]},a={name:`John Doe`,email:`john.doe@example.com`},o={args:a,play:async({canvas:e})=>{await r(e.getByText(`John Doe`)).toBeInTheDocument(),await r(e.getByText(`john.doe@example.com`)).toBeInTheDocument()}},s={args:{name:``,email:``},play:async({canvas:e})=>{await r(e.queryByText(`John Doe`)).not.toBeInTheDocument(),await r(e.getByText(`Name`)).toBeInTheDocument()}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("John Doe")).toBeInTheDocument();
    await expect(canvas.getByText("john.doe@example.com")).toBeInTheDocument();
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  // The profile has not arrived yet, so both values fall back to a skeleton.
  args: {
    name: "",
    email: ""
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.queryByText("John Doe")).not.toBeInTheDocument();
    await expect(canvas.getByText("Name")).toBeInTheDocument();
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`,`Loading`]}))();export{o as Default,s as Loading,c as __namedExportsOrder,i as default};