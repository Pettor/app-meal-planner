import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{G as n,i as r}from"./iframe-BxGJe6Y9.js";import{n as i,t as a}from"./ToggleChip-g9iSKn0b.js";var o,s,c,l,u,d,f,p,m,h;e((()=>{o=t(n(),1),i(),s=r(),{expect:c}=__STORYBOOK_MODULE_TEST__,l={component:a,title:`Input/Toggle Chip`,tags:[`autodocs`]},u={label:`vegetarian`,isSelected:!1,onChange:()=>{}},d={args:u},f={args:{...u,isSelected:!0}},p={args:{...u,isSelected:!0,endContent:(0,s.jsx)(`span`,{className:`font-mono text-[11px] opacity-70`,children:`2840`})}},m={args:u,render:function(e){let[t,n]=(0,o.useState)(!1);return(0,s.jsx)(a,{...e,isSelected:t,onChange:n})},play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`button`,{name:`vegetarian`});await c(n).toHaveAttribute(`aria-pressed`,`false`),await t.click(n),await c(n).toHaveAttribute(`aria-pressed`,`true`)}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isSelected: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isSelected: true,
    endContent: <span className="font-mono text-[11px] opacity-70">2840</span>
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h=[`Unselected`,`Selected`,`WithCount`,`Toggles`]}))();export{f as Selected,m as Toggles,d as Unselected,p as WithCount,h as __namedExportsOrder,l as default};