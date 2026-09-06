import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./AmbientBackground-BTBzUhuj.js";var r,i,a,o,s;e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,title:`Shared/Layout/Background/Ambient`,tags:[`autodocs`],parameters:{layout:`fullscreen`}},a={},o={play:async({canvasElement:e})=>{await r(e.querySelector(`div`)).toBeInTheDocument()}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelector("div")).toBeInTheDocument();
  }
}`,...o.parameters?.docs?.source}}},s=[`Default`,`Interaction`]}))();export{a as Default,o as Interaction,s as __namedExportsOrder,i as default};