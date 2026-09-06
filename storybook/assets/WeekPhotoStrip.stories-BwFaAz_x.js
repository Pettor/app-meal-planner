import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{n,o as r}from"./RecipeSampleData-DKdWjSE_.js";import{n as i,t as a}from"./WeekPhotoStrip-CA6oZTUm.js";var o,s,c,l,u,d,f;e((()=>{i(),r(),o=t(),s={component:a,title:`Display/Week Photo Strip`,tags:[`autodocs`],decorators:[e=>(0,o.jsx)(`div`,{className:`w-160`,children:(0,o.jsx)(e,{})})]},c=n.map(e=>e.photoUrl).filter(e=>e!==null),l={args:{photos:c.slice(0,4),weekTitle:`Meatless, still filling`}},u={args:{photos:[c[0]??null,null,c[1]??null,null],weekTitle:`Fish twice, cheap the rest`}},d={args:{photos:[null,null,null,null],weekTitle:`Cooking for two`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    photos: photos.slice(0, 4),
    weekTitle: "Meatless, still filling"
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    photos: [photos[0] ?? null, null, photos[1] ?? null, null],
    weekTitle: "Fish twice, cheap the rest"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    photos: [null, null, null, null],
    weekTitle: "Cooking for two"
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`PartlyEmpty`,`NoPhotos`]}))();export{l as Default,d as NoPhotos,u as PartlyEmpty,f as __namedExportsOrder,s as default};