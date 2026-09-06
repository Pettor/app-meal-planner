import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SettingsAppearanceSection-CnNUWsKR.js";var r,i,a,o,s,c,l,u;e((()=>{t(),{expect:r,fn:i}=__STORYBOOK_MODULE_TEST__,a={component:n,title:`Feedback/Settings Modal/Appearance Section`,tags:[`autodocs`]},o={themeSelector:{mode:`auto`,onSelect:i()}},s={args:o},c={args:{themeSelector:{mode:`dark`,onSelect:i()}}},l={args:o,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`radio`,{name:`Light`})),await r(e.themeSelector.onSelect).toHaveBeenCalledWith(`light`),await n.click(t.getByRole(`radio`,{name:`Dark`})),await r(e.themeSelector.onSelect).toHaveBeenCalledWith(`dark`)}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    themeSelector: {
      mode: "dark",
      onSelect: fn()
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("radio", {
      name: "Light"
    }));
    await expect(args.themeSelector.onSelect).toHaveBeenCalledWith("light");
    await userEvent.click(canvas.getByRole("radio", {
      name: "Dark"
    }));
    await expect(args.themeSelector.onSelect).toHaveBeenCalledWith("dark");
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`,`Dark`,`Interaction`]}))();export{c as Dark,s as Default,l as Interaction,u as __namedExportsOrder,a as default};