import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{n,t as r}from"./WeekDayStrip-e5yvjVsP.js";var i,a,o,s,c,l;e((()=>{n(),i=t(),a={component:r,title:`Display/Week Day Strip`,tags:[`autodocs`],decorators:[e=>(0,i.jsx)(`div`,{className:`w-160`,children:(0,i.jsx)(e,{})})]},o=[{day:`Mon`,title:`Paneer butter masala`},{day:`Tue`,title:`Chana masala`},{day:`Wed`,title:`Red lentil dal`},{day:`Thu`,title:`Roast veg traybake with feta`},{day:`Fri`,title:`Miso aubergine rice bowls`},{day:`Sat`,title:`Coconut sambar`},{day:`Sun`,title:`Halloumi and chickpea salad`}],s={args:{days:o}},c={args:{days:o.map((e,t)=>t%3==1?{...e,title:`—`}:e)}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    days
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    days: days.map((day, index) => index % 3 === 1 ? {
      ...day,
      title: "—"
    } : day)
  }
}`,...c.parameters?.docs?.source}}},l=[`Default`,`WithEmptyDays`]}))();export{s as Default,c as WithEmptyDays,l as __namedExportsOrder,a as default};