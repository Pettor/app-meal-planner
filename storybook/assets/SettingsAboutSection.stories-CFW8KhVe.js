import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./SettingsAboutSection-CI7UHQRo.js";var r,i,a,o,s;function c(){return(c=e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,title:`Feedback/Settings Modal/About Section`,tags:[`autodocs`]},a={appName:`My App`,appVersion:`1.0.0`,serverVersion:`2.0.0`},o={args:a,play:async({canvas:e})=>{await r(e.getByText(`My App`)).toBeInTheDocument(),await r(e.getByText(`1.0.0`)).toBeInTheDocument()}},s=[`Default`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
    await expect(canvas.getByText("1.0.0")).toBeInTheDocument();
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as Default,s as __namedExportsOrder,i as default};