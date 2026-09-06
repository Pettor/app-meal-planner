import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{G as n,i as r}from"./iframe-BxGJe6Y9.js";function i({value:e,total:t,subLabel:n,size:r=132,strokeWidth:i=12}){let s=t>0?Math.max(0,Math.min(1,e/t)):0,c=(r-i)/2,l=2*Math.PI*c,u=l*(1-s),d=(0,a.useId)();return(0,o.jsxs)(`div`,{className:`relative`,style:{width:r,height:r},children:[(0,o.jsxs)(`svg`,{width:r,height:r,children:[(0,o.jsx)(`defs`,{children:(0,o.jsxs)(`linearGradient`,{id:`gauge-${d}`,x1:`0`,y1:`0`,x2:`1`,y2:`1`,children:[(0,o.jsx)(`stop`,{offset:`0%`,stopColor:`var(--accent)`,stopOpacity:`0.8`}),(0,o.jsx)(`stop`,{offset:`100%`,stopColor:`var(--accent)`,stopOpacity:`1`})]})}),(0,o.jsx)(`circle`,{cx:r/2,cy:r/2,r:c,fill:`none`,stroke:`var(--border)`,strokeWidth:i}),(0,o.jsx)(`circle`,{cx:r/2,cy:r/2,r:c,fill:`none`,stroke:`url(#gauge-${d})`,strokeWidth:i,strokeDasharray:l,strokeDashoffset:u,strokeLinecap:`round`,transform:`rotate(-90 ${r/2} ${r/2})`,className:`[transition:stroke-dashoffset_800ms_cubic-bezier(.2,.9,.2,1)]`})]}),(0,o.jsx)(`div`,{className:`absolute inset-0 grid place-items-center text-center`,children:(0,o.jsxs)(`div`,{children:[(0,o.jsxs)(`div`,{className:`font-mono text-3xl font-semibold tracking-tight tabular-nums`,children:[Math.round(s*100),`%`]}),(0,o.jsx)(`div`,{className:`text-default-500 mt-0.5 text-[11px]`,children:n})]})})]})}var a,o,s=e((()=>{a=t(n(),1),o=r(),i.__docgenInfo={description:``,methods:[],displayName:`Gauge`,props:{value:{required:!0,tsType:{name:`number`},description:``},total:{required:!0,tsType:{name:`number`},description:``},subLabel:{required:!0,tsType:{name:`string`},description:``},size:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`132`,computed:!1}},strokeWidth:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`12`,computed:!1}}}}})),c,l,u,d,f,p,m,h;e((()=>{s(),c={title:`Display/Gauge`,component:i,tags:[`autodocs`]},l={value:1280,total:2350,subLabel:`active rate`},u={args:l},d={args:{...l,value:2100,total:2350,subLabel:`completion`}},f={args:{...l,value:300,total:2350,subLabel:`conversion`}},p={args:{...l,value:0,subLabel:`no data`}},m={args:{...l,size:80,strokeWidth:8}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    value: 2100,
    total: 2350,
    subLabel: "completion"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    value: 300,
    total: 2350,
    subLabel: "conversion"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    value: 0,
    subLabel: "no data"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    size: 80,
    strokeWidth: 8
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`High`,`Low`,`Empty`,`Small`]}))();export{u as Default,p as Empty,d as High,f as Low,m as Small,h as __namedExportsOrder,c as default};