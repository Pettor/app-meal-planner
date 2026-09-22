import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./SettingsDataSection-CDA3w6tv.js";var r,i,a,o,s,c,l,u,d;e((()=>{t(),{expect:r,fn:i}=__STORYBOOK_MODULE_TEST__,a={component:n,title:`Feedback/Settings Modal/Data Section`,tags:[`autodocs`]},o={json:JSON.stringify({version:1,savedRecipeIds:[`r1`,`r3`],pinnedTags:[`vegetarian`,`quick`],plans:{},selectedWeekKey:`2026-09-07`},null,2),status:`idle`,onJsonChange:i(),onApply:i(),onDownload:i(),onReset:i()},s={args:o},c={args:{...o,status:`applied`}},l={args:{...o,json:`{ not json`,status:`invalid`},play:async({canvas:e})=>{await r(e.getByText(`Could not parse that JSON.`)).toBeInTheDocument()}},u={args:o,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:`Apply JSON`})),await r(e.onApply).toHaveBeenCalled(),await n.click(t.getByRole(`button`,{name:`Reset to sample data`})),await r(e.onReset).toHaveBeenCalled()}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    status: "applied"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    json: "{ not json",
    status: "invalid"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("Could not parse that JSON.")).toBeInTheDocument();
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Apply JSON"
    }));
    await expect(args.onApply).toHaveBeenCalled();
    await userEvent.click(canvas.getByRole("button", {
      name: "Reset to sample data"
    }));
    await expect(args.onReset).toHaveBeenCalled();
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Applied`,`ParseError`,`Interaction`]}))();export{c as Applied,s as Default,u as Interaction,l as ParseError,d as __namedExportsOrder,a as default};