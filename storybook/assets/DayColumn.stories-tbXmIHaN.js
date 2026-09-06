import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{n,t as r}from"./DayColumn-HzZtrRQ1.js";function i({label:e}){return(0,a.jsx)(`div`,{className:`border-separator border-t px-3.5 py-6 text-sm`,children:e})}var a,o,s,c,l,u,d;e((()=>{n(),a=t(),o={title:`Display/Day Column`,component:r,tags:[`autodocs`],decorators:[e=>(0,a.jsx)(`div`,{className:`w-53`,children:(0,a.jsx)(e,{})})]},s={dayLabel:`Monday`,dateNumber:`31`,monthLabel:`Aug`,peopleLabel:`4 people`,isToday:!1,children:(0,a.jsx)(i,{label:`Red lentil dal`})},c={args:s},l={args:{...s,isToday:!0}},u={args:{...s,children:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i,{label:`Halloumi and chickpea salad`}),(0,a.jsx)(i,{label:`Mushroom risotto`})]})}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isToday: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    children: <>
        <SampleMeal label="Halloumi and chickpea salad" />
        <SampleMeal label="Mushroom risotto" />
      </>
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Today`,`TwoMeals`]}))();export{c as Default,l as Today,u as TwoMeals,d as __namedExportsOrder,o as default};