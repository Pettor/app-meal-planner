import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-Q1GcV6wX.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./TextInputField-tdfCWGxc.js";var a,o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{a=t(),r(),o=n(),{expect:s}=__STORYBOOK_MODULE_TEST__,c={component:i,title:`Input/Text Input Field`,tags:[`autodocs`],decorators:[e=>(0,o.jsx)(`div`,{className:`w-80`,children:(0,o.jsx)(e,{})})]},l={value:``,onChange:()=>{},label:`Title`,placeholder:`e.g. Mushroom risotto`},u={args:l},d={args:{...l,label:`Base servings`,value:`4`,type:`number`,description:`Ingredients scale from this number.`}},f={args:{...l,errorMessage:`Give the recipe a name.`}},p={args:l,render:function(e){let[t,n]=(0,a.useState)(``);return(0,o.jsx)(i,{...e,value:t,onChange:n})},play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`textbox`,{name:`Title`});await t.type(n,`Miso butter noodles`),await s(n).toHaveValue(`Miso butter noodles`)}},m=[`Default`,`WithDescription`,`WithError`,`AcceptsTyping`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    label: "Base servings",
    value: "4",
    type: "number",
    description: "Ingredients scale from this number."
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    errorMessage: "Give the recipe a name."
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}}})))()}h();export{p as AcceptsTyping,u as Default,d as WithDescription,f as WithError,m as __namedExportsOrder,c as default};