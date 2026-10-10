import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./SunIcon-BVWfxVsK.js";import{n as i,t as a}from"./SettingsOptionRow-O46V6i2q.js";var o,s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{n(),i(),o=t(),{expect:s,fn:c}=__STORYBOOK_MODULE_TEST__,l={component:a,title:`Feedback/Settings Modal/Option Row`,tags:[`autodocs`]},u={icon:(0,o.jsx)(r,{className:`size-4.75`}),label:`Light`,isSelected:!1,onSelect:c()},d={args:u},f={args:{...u,isSelected:!0}},p={args:{...u,label:`System`,note:`follows your OS`}},m={args:u,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:`Light`})),await s(e.onSelect).toHaveBeenCalled()}},h=[`Default`,`Selected`,`WithNote`,`Interaction`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}}})))()}g();export{d as Default,m as Interaction,f as Selected,p as WithNote,h as __namedExportsOrder,l as default};