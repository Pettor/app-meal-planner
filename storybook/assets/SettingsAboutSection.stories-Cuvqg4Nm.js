import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SettingsAboutSection-C737CmWc.js";var r,i,a,o,s;e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,title:`Feedback/Settings Modal/About Section`,tags:[`autodocs`]},a={appName:`My App`,appVersion:`1.0.0`,serverVersion:`2.0.0`},o={args:a,play:async({canvas:e})=>{await r(e.getByText(`About`)).toBeInTheDocument(),await r(e.getByText(`1.0.0`)).toBeInTheDocument()}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("About")).toBeInTheDocument();
    await expect(canvas.getByText("1.0.0")).toBeInTheDocument();
  }
}`,...o.parameters?.docs?.source}}},s=[`Default`]}))();export{o as Default,s as __namedExportsOrder,i as default};