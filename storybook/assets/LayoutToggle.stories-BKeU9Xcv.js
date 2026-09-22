import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{G as n,i as r}from"./iframe-BLBebFNs.js";import{n as i,t as a}from"./LayoutToggle-Co37pYYN.js";var o,s,c,l,u,d,f,p,m;e((()=>{o=t(n(),1),i(),s=r(),{expect:c}=__STORYBOOK_MODULE_TEST__,l={component:a,title:`Input/Layout Toggle`,tags:[`autodocs`]},u={options:[{value:`table`,label:`Timetable`},{value:`cards`,label:`Cards`}],value:`table`,onChange:()=>{}},d={args:u},f={args:{options:[{value:`rows`,label:`List`},{value:`grid`,label:`Week grid`}],value:`grid`,onChange:()=>{}}},p={args:u,render:function(e){let[t,n]=(0,o.useState)(`table`);return(0,s.jsx)(a,{...e,value:t,onChange:n})},play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`button`,{name:`Timetable`}),r=e.getByRole(`button`,{name:`Cards`});await c(n).toHaveAttribute(`aria-pressed`,`true`),await t.click(r),await c(r).toHaveAttribute(`aria-pressed`,`true`),await c(n).toHaveAttribute(`aria-pressed`,`false`)}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source},description:{story:`The planner's review step offers the same control over its own two layouts.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m=[`Default`,`PlannerLayouts`,`Switches`]}))();export{d as Default,f as PlannerLayouts,p as Switches,m as __namedExportsOrder,l as default};