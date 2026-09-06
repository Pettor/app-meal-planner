import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./LogoFull-CnXf0Kwx.js";var r,i,a,o,s,c;e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,title:`Shared/Branding/Logo/Full`,tags:[`autodocs`]},a={args:{appName:`My App`,size:`small`},play:async({canvas:e})=>{await r(e.getByText(`My App`)).toBeInTheDocument()}},o={args:{appName:`My App`,size:`medium`},play:async({canvas:e})=>{await r(e.getByText(`My App`)).toBeInTheDocument()}},s={args:{appName:`My App`,size:`large`},play:async({canvas:e})=>{await r(e.getByText(`My App`)).toBeInTheDocument()}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    appName: "My App",
    size: "small"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    appName: "My App",
    size: "medium"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    appName: "My App",
    size: "large"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("My App")).toBeInTheDocument();
  }
}`,...s.parameters?.docs?.source}}},c=[`FullSmall`,`FullMedium`,`FullLarge`]}))();export{s as FullLarge,o as FullMedium,a as FullSmall,c as __namedExportsOrder,i as default};