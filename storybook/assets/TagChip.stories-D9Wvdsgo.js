import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./TagChip-Th82R77c.js";var i,a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{n(),i=t(),{fn:a}=__STORYBOOK_MODULE_TEST__,o={title:`Display/Tag Chip`,component:r,tags:[`autodocs`]},s={tag:`vegetarian`},c={args:s},l={args:s,render:()=>(0,i.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:[`vegetarian`,`gluten-free`,`meat`,`fish`,`bbq`,`sheet-pan`,`quick`,`comfort`,`italian`].map(e=>(0,i.jsx)(r,{tag:e},e))})},u={args:s,render:()=>(0,i.jsx)(`div`,{className:`flex flex-wrap gap-1`,children:[`vegetarian`,`meat`,`quick`].map(e=>(0,i.jsx)(r,{tag:e,size:`sm`},e))})},d={args:s,render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap gap-1.5`,children:[(0,i.jsx)(r,{tag:`vegetarian`,onPress:a()}),(0,i.jsx)(r,{tag:`meat`,onPress:a(),isSelected:!0}),(0,i.jsx)(r,{tag:`bbq`,onPress:a(),endContent:`1,120`}),(0,i.jsx)(r,{tag:`quick`,onPress:a(),isSelected:!0,endContent:`3,600`})]})},f=[`Default`,`Families`,`Small`,`Interactive`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  render: () => <div className="flex flex-wrap gap-1.5">
      {["vegetarian", "gluten-free", "meat", "fish", "bbq", "sheet-pan", "quick", "comfort", "italian"].map(tag => <Component key={tag} tag={tag} />)}
    </div>
}`,...l.parameters?.docs?.source},description:{story:`Every tag is drawn the same; only the leading dot says which family it belongs to.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  render: () => <div className="flex flex-wrap gap-1">
      {["vegetarian", "meat", "quick"].map(tag => <Component key={tag} tag={tag} size="sm" />)}
    </div>
}`,...u.parameters?.docs?.source},description:{story:"`sm` is for grids too tight for a full-size tag — the week timetable's cells.",...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  render: () => <div className="flex flex-wrap gap-1.5">
      <Component tag="vegetarian" onPress={fn()} />
      <Component tag="meat" onPress={fn()} isSelected />
      <Component tag="bbq" onPress={fn()} endContent="1,120" />
      <Component tag="quick" onPress={fn()} isSelected endContent="3,600" />
    </div>
}`,...d.parameters?.docs?.source},description:{story:`The same primitive with a larger hit area, used wherever tags are picked.`,...d.parameters?.docs?.description}}}})))()}p();export{c as Default,l as Families,d as Interactive,u as Small,f as __namedExportsOrder,o as default};