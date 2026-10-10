import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-Q1GcV6wX.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./ToggleChip-BG8uVdcx.js";var a,o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{a=t(),r(),o=n(),{expect:s}=__STORYBOOK_MODULE_TEST__,c={component:i,title:`Input/Toggle Chip`,tags:[`autodocs`]},l={label:`vegetarian`,isSelected:!1,onChange:()=>{}},u={args:l},d={args:{...l,isSelected:!0}},f={args:{...l,isSelected:!0,endContent:(0,o.jsx)(`span`,{className:`font-mono text-[11px] opacity-70`,children:`2840`})}},p={args:l,render:function(e){let[t,n]=(0,a.useState)(!1);return(0,o.jsx)(i,{...e,isSelected:t,onChange:n})},play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`button`,{name:`vegetarian`});await s(n).toHaveAttribute(`aria-pressed`,`false`),await t.click(n),await s(n).toHaveAttribute(`aria-pressed`,`true`)}},m=[`Unselected`,`Selected`,`WithCount`,`Toggles`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isSelected: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isSelected: true,
    endContent: <span className="font-mono text-[11px] opacity-70">2840</span>
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  render: function Render(args) {
    const [isSelected, setIsSelected] = useState(false);
    return <Component {...args} isSelected={isSelected} onChange={setIsSelected} />;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    const chip = canvas.getByRole("button", {
      name: "vegetarian"
    });
    await expect(chip).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(chip);
    await expect(chip).toHaveAttribute("aria-pressed", "true");
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{d as Selected,p as Toggles,u as Unselected,f as WithCount,m as __namedExportsOrder,c as default};