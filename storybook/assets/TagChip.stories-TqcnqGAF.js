import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{n,t as r}from"./TagChip-DJLRL-wU.js";var i,a,o,s,c,l,u,d;e((()=>{n(),i=t(),{fn:a}=__STORYBOOK_MODULE_TEST__,o={title:`Display/Tag Chip`,component:r,tags:[`autodocs`]},s={tag:`vegetarian`},c={args:s},l={args:s,render:()=>(0,i.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:[`vegetarian`,`gluten-free`,`meat`,`fish`,`bbq`,`sheet-pan`,`quick`,`comfort`,`italian`].map(e=>(0,i.jsx)(r,{tag:e},e))})},u={args:s,render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap gap-1.5`,children:[(0,i.jsx)(r,{tag:`vegetarian`,onPress:a()}),(0,i.jsx)(r,{tag:`meat`,onPress:a(),isSelected:!0}),(0,i.jsx)(r,{tag:`bbq`,onPress:a(),endContent:`1,120`}),(0,i.jsx)(r,{tag:`quick`,onPress:a(),isSelected:!0,endContent:`3,600`})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  render: () => <div className="flex flex-wrap gap-1.5">
      {["vegetarian", "gluten-free", "meat", "fish", "bbq", "sheet-pan", "quick", "comfort", "italian"].map(tag => <Component key={tag} tag={tag} />)}
    </div>
}`,...l.parameters?.docs?.source},description:{story:`Every tag is drawn the same; only the leading dot says which family it belongs to.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  render: () => <div className="flex flex-wrap gap-1.5">
      <Component tag="vegetarian" onPress={fn()} />
      <Component tag="meat" onPress={fn()} isSelected />
      <Component tag="bbq" onPress={fn()} endContent="1,120" />
      <Component tag="quick" onPress={fn()} isSelected endContent="3,600" />
    </div>
}`,...u.parameters?.docs?.source},description:{story:`The same primitive with a larger hit area, used wherever tags are picked.`,...u.parameters?.docs?.description}}},d=[`Default`,`Families`,`Interactive`]}))();export{c as Default,l as Families,u as Interactive,d as __namedExportsOrder,o as default};