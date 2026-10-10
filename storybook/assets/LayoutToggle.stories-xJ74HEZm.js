import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-Q1GcV6wX.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./LayoutToggle-axuyAOdq.js";var a,o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{a=t(),r(),o=n(),{expect:s}=__STORYBOOK_MODULE_TEST__,c={component:i,title:`Input/Layout Toggle`,tags:[`autodocs`]},l={options:[{value:`table`,label:`Timetable`},{value:`cards`,label:`Cards`}],value:`table`,onChange:()=>{}},u={args:l},d={args:{options:[{value:`rows`,label:`List`},{value:`grid`,label:`Week grid`}],value:`grid`,onChange:()=>{}}},f={args:l,render:function(e){let[t,n]=(0,a.useState)(`table`);return(0,o.jsx)(i,{...e,value:t,onChange:n})},play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`button`,{name:`Timetable`}),r=e.getByRole(`button`,{name:`Cards`});await s(n).toHaveAttribute(`aria-pressed`,`true`),await t.click(r),await s(r).toHaveAttribute(`aria-pressed`,`true`),await s(n).toHaveAttribute(`aria-pressed`,`false`)}},p=[`Default`,`PlannerLayouts`,`Switches`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    options: [{
      value: "rows",
      label: "List"
    }, {
      value: "grid",
      label: "Week grid"
    }],
    value: "grid",
    onChange: () => {}
  }
}`,...d.parameters?.docs?.source},description:{story:`The planner's review step offers the same control over its own two layouts.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  render: function Render(args) {
    const [value, setValue] = useState("table");
    return <Component {...args} value={value} onChange={setValue} />;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    const timetable = canvas.getByRole("button", {
      name: "Timetable"
    });
    const cards = canvas.getByRole("button", {
      name: "Cards"
    });
    await expect(timetable).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(cards);
    await expect(cards).toHaveAttribute("aria-pressed", "true");
    await expect(timetable).toHaveAttribute("aria-pressed", "false");
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as Default,d as PlannerLayouts,f as Switches,p as __namedExportsOrder,c as default};