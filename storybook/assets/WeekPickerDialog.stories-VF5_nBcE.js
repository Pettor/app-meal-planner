import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./WeekPickerDialog-Cdh6ppje.js";import{c as r,d as i,r as a}from"./PlanUtils-1-XVbRr2.js";var o,s,c,l,u,d,f,p,m,h,g;e((()=>{t(),i(),{expect:o,fn:s,screen:c}=__STORYBOOK_MODULE_TEST__,l={component:n,title:`Feedback/Week Picker Dialog`,tags:[`autodocs`],parameters:{layout:`fullscreen`}},u=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],d=a(r(new Date)).map((e,t)=>({weekNumber:e.weekNumber,statusDotClassName:t===1?`bg-success`:t===2?`bg-warning`:`bg-default-300`,mealsLabel:t===1?`7 filled`:t===2?`3 filled`:``,isSelected:t===1,days:e.days.map(e=>({dayNumber:e.dayNumber,isCurrentMonth:e.isCurrentMonth,isToday:e.isToday,hasPlannedMeal:t===1})),onSelect:s()})),f={isOpen:!0,title:`March 2026`,dayNames:u,weeks:d,onPrevMonth:s(),onNextMonth:s(),onToday:s(),onClose:s()},p={args:f},m={args:{...f,weeks:d.map(e=>({...e,statusDotClassName:`bg-default-300`,mealsLabel:``,isSelected:!1,days:e.days.map(e=>({...e,hasPlannedMeal:!1}))}))}},h={args:f,play:async({args:e,userEvent:t})=>{await t.click(await c.findByRole(`button`,{name:`Next month`})),await o(e.onNextMonth).toHaveBeenCalled(),await t.click(await c.findByRole(`button`,{name:`Previous month`})),await o(e.onPrevMonth).toHaveBeenCalled()}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    weeks: weeks.map(week => ({
      ...week,
      statusDotClassName: "bg-default-300",
      mealsLabel: "",
      isSelected: false,
      days: week.days.map(day => ({
        ...day,
        hasPlannedMeal: false
      }))
    }))
  }
}`,...m.parameters?.docs?.source},description:{story:`Before any week has been planned, every row is unplanned and nothing is selected.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    userEvent
  }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.click(await screen.findByRole("button", {
      name: "Next month"
    }));
    await expect(args.onNextMonth).toHaveBeenCalled();
    await userEvent.click(await screen.findByRole("button", {
      name: "Previous month"
    }));
    await expect(args.onPrevMonth).toHaveBeenCalled();
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`NothingPlanned`,`StepsThroughMonths`]}))();export{p as Default,m as NothingPlanned,h as StepsThroughMonths,g as __namedExportsOrder,l as default};