import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./WeekSwitcher-DjtBaOM4.js";var r,i,a,o,s,c,l,u,d;e((()=>{t(),{expect:r,fn:i}=__STORYBOOK_MODULE_TEST__,a={component:n,title:`Navigation/Week Switcher`,tags:[`autodocs`]},o={label:`This week`,hint:`week 14 · 3 Apr – 9 Apr`,statusDotClassName:`bg-success`,onPrevious:i(),onNext:i(),onOpenPicker:i()},s={args:o},c={args:{...o,label:`Week 15`,hint:`week 15 · 10 Apr – 16 Apr`,statusDotClassName:`bg-warning`}},l={args:{...o,label:`Week 16`,hint:`week 16 · 17 Apr – 23 Apr`,statusDotClassName:`bg-default-300`}},u={args:o,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:`Next week`})),await r(e.onNext).toHaveBeenCalled(),await n.click(t.getByRole(`button`,{name:`Previous week`})),await r(e.onPrevious).toHaveBeenCalled(),await n.click(t.getByRole(`button`,{name:o.label})),await r(e.onOpenPicker).toHaveBeenCalled()}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...s.parameters?.docs?.source},description:{story:`The week in view is planned and finalised — a green dot.`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    label: "Week 15",
    hint: "week 15 · 10 Apr – 16 Apr",
    statusDotClassName: "bg-warning"
  }
}`,...c.parameters?.docs?.source},description:{story:`A week saved but not yet published shows the draft dot.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    label: "Week 16",
    hint: "week 16 · 17 Apr – 23 Apr",
    statusDotClassName: "bg-default-300"
  }
}`,...l.parameters?.docs?.source},description:{story:`A week nobody has planned yet.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Next week"
    }));
    await expect(args.onNext).toHaveBeenCalled();
    await userEvent.click(canvas.getByRole("button", {
      name: "Previous week"
    }));
    await expect(args.onPrevious).toHaveBeenCalled();
    await userEvent.click(canvas.getByRole("button", {
      name: defaultArgs.label
    }));
    await expect(args.onOpenPicker).toHaveBeenCalled();
  }
}`,...u.parameters?.docs?.source}}},d=[`Planned`,`Draft`,`Unplanned`,`StepsBetweenWeeks`]}))();export{c as Draft,s as Planned,u as StepsBetweenWeeks,l as Unplanned,d as __namedExportsOrder,a as default};