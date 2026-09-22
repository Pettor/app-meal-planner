import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SettingsLanguageSection-DLhtV5Dj.js";var r,i,a,o,s,c,l,u;e((()=>{t(),{expect:r,fn:i}=__STORYBOOK_MODULE_TEST__,a={component:n,title:`Feedback/Settings Modal/Language Section`,tags:[`autodocs`]},o={locale:`en`,onSelect:i()},s={args:o},c={args:{...o,locale:`sv`}},l={args:o,play:async({args:e,canvas:t,userEvent:n})=>{await r(t.getByRole(`button`,{name:`English`})).toHaveAttribute(`aria-pressed`,`true`),await n.click(t.getByRole(`button`,{name:/Svenska/})),await r(e.onSelect).toHaveBeenCalledWith(`sv`)}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    locale: "sv"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await expect(canvas.getByRole("button", {
      name: "English"
    })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(canvas.getByRole("button", {
      name: /Svenska/
    }));
    await expect(args.onSelect).toHaveBeenCalledWith("sv");
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`,`Swedish`,`Interaction`]}))();export{s as Default,l as Interaction,c as Swedish,u as __namedExportsOrder,a as default};