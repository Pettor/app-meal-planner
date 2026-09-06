import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{G as n,i as r}from"./iframe-BxGJe6Y9.js";import{n as i,t as a}from"./TextInputField-B7Cer6cn.js";var o,s,c,l,u,d,f,p,m,h;e((()=>{o=t(n(),1),i(),s=r(),{expect:c}=__STORYBOOK_MODULE_TEST__,l={component:a,title:`Input/Text Input Field`,tags:[`autodocs`],decorators:[e=>(0,s.jsx)(`div`,{className:`w-80`,children:(0,s.jsx)(e,{})})]},u={value:``,onChange:()=>{},label:`Title`,placeholder:`e.g. Mushroom risotto`},d={args:u},f={args:{...u,label:`Base servings`,value:`4`,type:`number`,description:`Ingredients scale from this number.`}},p={args:{...u,errorMessage:`Give the recipe a name.`}},m={args:u,render:function(e){let[t,n]=(0,o.useState)(``);return(0,s.jsx)(a,{...e,value:t,onChange:n})},play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`textbox`,{name:`Title`});await t.type(n,`Miso butter noodles`),await c(n).toHaveValue(`Miso butter noodles`)}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    label: "Base servings",
    value: "4",
    type: "number",
    description: "Ingredients scale from this number."
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    errorMessage: "Give the recipe a name."
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  render: function Render(args) {
    const [value, setValue] = useState("");
    return <Component {...args} value={value} onChange={setValue} />;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    const input = canvas.getByRole("textbox", {
      name: "Title"
    });
    await userEvent.type(input, "Miso butter noodles");
    await expect(input).toHaveValue("Miso butter noodles");
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`WithDescription`,`WithError`,`AcceptsTyping`]}))();export{m as AcceptsTyping,d as Default,f as WithDescription,p as WithError,h as __namedExportsOrder,l as default};