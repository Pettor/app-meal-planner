import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./WeekDayStrip-BkC_Gkzp.js";var i,a,o,s,c,l;function u(){return(u=e((()=>{n(),i=t(),a={component:r,title:`Display/Week Day Strip`,tags:[`autodocs`],decorators:[e=>(0,i.jsx)(`div`,{className:`w-160`,children:(0,i.jsx)(e,{})})]},o=[{day:`Mon`,title:`Paneer butter masala`},{day:`Tue`,title:`Chana masala`},{day:`Wed`,title:`Red lentil dal`},{day:`Thu`,title:`Roast veg traybake with feta`},{day:`Fri`,title:`Miso aubergine rice bowls`},{day:`Sat`,title:`Coconut sambar`},{day:`Sun`,title:`Halloumi and chickpea salad`}],s={args:{days:o}},c={args:{days:o.map((e,t)=>t%3==1?{...e,title:`—`}:e)}},l=[`Default`,`WithEmptyDays`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}}})))()}u();export{s as Default,c as WithEmptyDays,l as __namedExportsOrder,a as default};