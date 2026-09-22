import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BLBebFNs.js";import{n,t as r}from"./WeekPickerDialog-DdYcs6mO.js";import{n as i,t as a}from"./WeekSwitcher-BZiQbw4d.js";function o({switcher:e,dialog:t}){return(0,s.jsxs)(`div`,{className:`print:hidden`,"data-testid":`navbar__week-picker`,children:[(0,s.jsx)(a,{...e}),(0,s.jsx)(r,{...t})]})}var s,c=e((()=>{n(),i(),s=t(),o.__docgenInfo={description:`The week the whole app is pointed at, always reachable from the navbar:
step a week either way, or open the calendar to jump anywhere.`,methods:[],displayName:`HeaderWeekPicker`,props:{switcher:{required:!0,tsType:{name:`WeekSwitcherProps`},description:"The compact `‹ W36 ›` control that sits in the navbar."},dialog:{required:!0,tsType:{name:`WeekPickerDialogProps`},description:`The "Schedule" calendar the chip opens.`}}}})),l,u,d,f,p,m,h,g,_,v;e((()=>{c(),{expect:l,fn:u}=__STORYBOOK_MODULE_TEST__,d={component:o,title:`Navigation/Header Week Picker`,tags:[`autodocs`]},f=[10,11,12,13].map((e,t)=>({weekNumber:e,statusDotClassName:t===0?`bg-success`:t===1?`bg-warning`:`bg-default-300`,mealsLabel:t===0?`7 filled`:``,isSelected:t===1,days:Array.from({length:7},(e,n)=>({dayNumber:2+t*7+n,isCurrentMonth:!0,isToday:t===1&&n===2,hasPlannedMeal:t===0})),onSelect:u()})),p={switcher:{label:`W11`,hint:`Week 11 · This week`,statusDotClassName:`bg-warning`,onPrevious:u(),onNext:u(),onOpenPicker:u()},dialog:{isOpen:!1,title:`March 2026`,dayNames:[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],weeks:f,onPrevMonth:u(),onNextMonth:u(),onToday:u(),onClose:u()}},m={args:p},h={args:{...p,switcher:{...p.switcher,label:`W14`,hint:`Week 14 · In 3 weeks`,statusDotClassName:`bg-default-300`}}},g={args:{...p,dialog:{...p.dialog,isOpen:!0}}},_={args:p,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:p.switcher.label})),await l(e.switcher.onOpenPicker).toHaveBeenCalled(),await n.click(t.getByRole(`button`,{name:`Next week`})),await l(e.switcher.onNext).toHaveBeenCalled(),await n.click(t.getByRole(`button`,{name:`Previous week`})),await l(e.switcher.onPrevious).toHaveBeenCalled()}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...m.parameters?.docs?.source},description:{story:`How the picker sits in the navbar: a compact chip between two step arrows.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    switcher: {
      ...defaultArgs.switcher,
      label: "W14",
      hint: "Week 14 · In 3 weeks",
      statusDotClassName: "bg-default-300"
    }
  }
}`,...h.parameters?.docs?.source},description:{story:`A week nobody has planned yet — the dot goes grey.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    dialog: {
      ...defaultArgs.dialog,
      isOpen: true
    }
  }
}`,...g.parameters?.docs?.source},description:{story:`The "Schedule" calendar the chip opens, with every week's status at a glance.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: defaultArgs.switcher.label
    }));
    await expect(args.switcher.onOpenPicker).toHaveBeenCalled();
    await userEvent.click(canvas.getByRole("button", {
      name: "Next week"
    }));
    await expect(args.switcher.onNext).toHaveBeenCalled();
    await userEvent.click(canvas.getByRole("button", {
      name: "Previous week"
    }));
    await expect(args.switcher.onPrevious).toHaveBeenCalled();
  }
}`,..._.parameters?.docs?.source}}},v=[`Closed`,`UnplannedWeek`,`CalendarOpen`,`OpensTheCalendar`]}))();export{g as CalendarOpen,m as Closed,_ as OpensTheCalendar,h as UnplannedWeek,v as __namedExportsOrder,d as default};