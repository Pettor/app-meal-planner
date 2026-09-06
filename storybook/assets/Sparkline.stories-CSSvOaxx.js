import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{G as n,i as r}from"./iframe-BxGJe6Y9.js";function i({data:e,stroke:t,fill:n,width:r=86,height:i=28}){let s=(0,a.useId)();if(e.length<2)return null;let c=Math.min(...e),l=Math.max(...e)-c||1,u=r/(e.length-1),d=e.map((e,t)=>[t*u,i-(e-c)/l*(i-4)-2]),f=d.map((e,t)=>`${t===0?`M`:`L`}${e[0].toFixed(2)},${e[1].toFixed(2)}`).join(` `),p=`${f} L ${r},${i} L 0,${i} Z`,m=d[d.length-1]??[0,0];return(0,o.jsxs)(`svg`,{width:r,height:i,className:`block overflow-visible`,"aria-hidden":!0,children:[(0,o.jsx)(`defs`,{children:(0,o.jsxs)(`linearGradient`,{id:`sg-${s}`,x1:`0`,x2:`0`,y1:`0`,y2:`1`,children:[(0,o.jsx)(`stop`,{offset:`0%`,stopColor:n,stopOpacity:`0.35`}),(0,o.jsx)(`stop`,{offset:`100%`,stopColor:n,stopOpacity:`0`})]})}),(0,o.jsx)(`path`,{d:p,fill:`url(#sg-${s})`}),(0,o.jsx)(`path`,{d:f,fill:`none`,stroke:t,strokeWidth:1.75,strokeLinejoin:`round`,strokeLinecap:`round`}),(0,o.jsx)(`circle`,{cx:m[0],cy:m[1],r:2.5,fill:t})]})}var a,o,s=e((()=>{a=t(n(),1),o=r(),i.__docgenInfo={description:``,methods:[],displayName:`Sparkline`,props:{data:{required:!0,tsType:{name:`Array`,elements:[{name:`number`}],raw:`number[]`},description:``},stroke:{required:!0,tsType:{name:`string`},description:``},fill:{required:!0,tsType:{name:`string`},description:``},width:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`86`,computed:!1}},height:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`28`,computed:!1}}}}})),c,l,u,d,f,p,m,h,g,_,v,y;e((()=>{s(),c={title:`Display/Sparkline`,component:i,tags:[`autodocs`]},l=[22,24,23,28,26,31,30,34,33,38,36,45],u=[45,42,38,35,33,30,28,25,22,20,18,15],d=[14,13.5,14.2,13,13.5,12.8,13.1,12.9,12.6,13,12.8,12.5],f={data:l,stroke:`var(--accent)`,fill:`var(--accent)`},p={args:f},m={args:{...f,stroke:`var(--success)`,fill:`var(--success)`}},h={args:{...f,data:d,stroke:`var(--warning)`,fill:`var(--warning)`}},g={args:{...f,data:u,stroke:`var(--danger)`,fill:`var(--danger)`}},_={args:{...f,stroke:`#9353d3`,fill:`#9353d3`}},v={args:{...f,width:160,height:40}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    stroke: "var(--success)",
    fill: "var(--success)"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    data: flat,
    stroke: "var(--warning)",
    fill: "var(--warning)"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    data: downtrend,
    stroke: "var(--danger)",
    fill: "var(--danger)"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    stroke: "#9353d3",
    fill: "#9353d3"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    width: 160,
    height: 40
  }
}`,...v.parameters?.docs?.source}}},y=[`Accent`,`Success`,`Warning`,`Downtrend`,`Violet`,`Wide`]}))();export{p as Accent,g as Downtrend,m as Success,_ as Violet,h as Warning,v as Wide,y as __namedExportsOrder,c as default};