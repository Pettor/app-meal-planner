import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BLBebFNs.js";import{m as n,t as r}from"./esm-bnb9huIp.js";import{n as i,t as a}from"./SettingsOptionRow-QBNnH7HX.js";var o,s,c,l,u,d,f,p,m,h;e((()=>{r(),i(),o=t(),{expect:s,fn:c}=__STORYBOOK_MODULE_TEST__,l={component:a,title:`Feedback/Settings Modal/Option Row`,tags:[`autodocs`]},u={icon:(0,o.jsx)(n,{className:`size-4.75`}),label:`Light`,isSelected:!1,onSelect:c()},d={args:u},f={args:{...u,isSelected:!0}},p={args:{...u,label:`System`,note:`follows your OS`}},m={args:u,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:`Light`})),await s(e.onSelect).toHaveBeenCalled()}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isSelected: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    label: "System",
    note: "follows your OS"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Light"
    }));
    await expect(args.onSelect).toHaveBeenCalled();
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Selected`,`WithNote`,`Interaction`]}))();export{d as Default,m as Interaction,f as Selected,p as WithNote,h as __namedExportsOrder,l as default};