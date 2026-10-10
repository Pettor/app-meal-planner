import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,r as n}from"./react-intl-BjG-Y2l6.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{n as i,t as a}from"./clsx-CTwy9ux-.js";import{n as o,t as s}from"./button-CPgUre1k.js";import{n as c,t as l}from"./card-DEQFvxI7.js";import{n as u,t as d}from"./checkbox-C6ULWFgr.js";import{n as f,t as p}from"./PrinterIcon-Bwb7fQ15.js";import{n as m,o as h}from"./RecipeSampleData-CBRM2MON.js";import{n as g,t as _}from"./PlanTypes-yBG6o7ka.js";import{_ as v,d as y,f as b,g as x,l as ee,o as te,p as S}from"./PlanUtils-blfSQ-GB.js";import{n as C,t as w}from"./NavbarLayoutDecorator-DNMoygLm.js";import{n as ne,r as re,t as T}from"./ShoppingUtils-4RgBRyo0.js";function E({line:e,onToggle:t}){return(0,D.jsx)(d,{isSelected:e.isChecked,onChange:()=>t(),className:`border-separator hover:bg-surface-secondary/60 w-full border-b transition-colors last:border-b-0`,children:(0,D.jsxs)(d.Content,{"data-testid":`shopping-list__row`,className:`flex w-full items-center gap-3.5 px-5.5 py-3.25 text-left font-normal`,children:[(0,D.jsx)(d.Control,{className:`size-[19px] rounded-[5px]`,children:(0,D.jsx)(d.Indicator,{})}),(0,D.jsx)(`span`,{className:a(`flex-1 text-base`,e.isChecked?`text-default-500`:`text-foreground`),children:e.item}),(0,D.jsx)(`span`,{className:`text-default-500 text-sm font-medium tabular-nums`,children:e.amount})]})})}var D;function O(){return(O=e((()=>{u(),i(),D=r(),E.__docgenInfo={description:`One ingredient on the list — tap anywhere on the row to tick it off.`,methods:[],displayName:`ShoppingListRow`,props:{line:{required:!0,tsType:{name:`ShoppingLineViewModel`},description:``},onToggle:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}function k({headingLead:e,headingAccent:t,subtitle:r,onPrint:i}){let a=n();return(0,A.jsxs)(`div`,{className:`flex flex-wrap items-end justify-between gap-5 print:hidden`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`text-default-500 mb-2 text-xs font-medium tracking-[0.09em] uppercase`,children:a.formatMessage({description:`ShoppingPageHeader: eyebrow - from the plan`,defaultMessage:`From the plan`,id:`tOiWmt`})}),(0,A.jsxs)(`h1`,{className:`mb-2 text-4xl leading-none tracking-tight md:text-5xl`,children:[e,` `,(0,A.jsx)(`span`,{className:`text-gradient-brand font-extrabold`,children:t})]}),(0,A.jsx)(`p`,{className:`text-default-500 text-base`,children:r})]}),(0,A.jsxs)(s,{variant:`outline`,onPress:i,"data-testid":`shopping-page__print-list`,children:[(0,A.jsx)(p,{className:`mr-1.5 h-4 w-4`}),a.formatMessage({description:`ShoppingPageHeader: button - print list`,defaultMessage:`Print list`,id:`euXWAB`})]})]})}var A;function j(){return(j=e((()=>{f(),o(),t(),A=r(),k.__docgenInfo={description:`Title, week summary and the one action the shopping list offers.`,methods:[],displayName:`ShoppingPageHeader`,props:{headingLead:{required:!0,tsType:{name:`string`},description:``},headingAccent:{required:!0,tsType:{name:`string`},description:``},subtitle:{required:!0,tsType:{name:`string`},description:``},onPrint:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}function M(e,t,r,i){let a=n(),o=a.locale||`en-GB`,s=S(e),c=`${a.formatMessage({description:`UseShoppingOverview: label - week (lowercase)`,defaultMessage:`week`,id:`0PDyPk`})} ${b(s)} · ${ee(s,o)}`,l=T(t,r);return{headingLead:a.formatMessage({description:`UseShoppingOverview: heading - shopping`,defaultMessage:`Shopping`,id:`1wtnNI`}),headingAccent:a.formatMessage({description:`UseShoppingOverview: heading accent - list`,defaultMessage:`list`,id:`L8K0gq`}),subtitle:l.length?a.formatMessage({description:`UseShoppingOverview: subtitle - line count for the planned week`,defaultMessage:`{weekRange} · {count} lines for the planned week`,id:`xxU9J8`},{weekRange:c,count:l.length}):a.formatMessage({description:`UseShoppingOverview: subtitle - no week planned`,defaultMessage:`{weekRange} · No week planned`,id:`3ytiPV`},{weekRange:c}),lines:l.map(e=>({key:e.key,item:e.item,amount:ne(e),isChecked:!!i[e.key]})),isEmpty:l.length===0}}function N(){return(N=e((()=>{t(),y(),re()})))()}function P({weekKey:e,plan:t,recipes:r,checkedLines:i,onToggleLine:a,onPrint:o}){let s=n(),c=M(e,t,r,i);return(0,F.jsxs)(`div`,{className:`mx-auto w-full max-w-[77.5rem] px-6 py-9`,children:[(0,F.jsx)(k,{headingLead:c.headingLead,headingAccent:c.headingAccent,subtitle:c.subtitle,onPrint:o}),(0,F.jsx)(l,{className:`mx-auto mt-6.5 max-w-[43.75rem] overflow-hidden print:border-0 print:shadow-none`,children:(0,F.jsxs)(l.Content,{className:`p-0`,children:[c.lines.map(e=>(0,F.jsx)(E,{line:e,onToggle:()=>a(e.key)},e.key)),c.isEmpty&&(0,F.jsx)(`p`,{className:`text-default-500 p-14 text-center`,children:s.formatMessage({description:`ShoppingView: body - nothing to shop for`,defaultMessage:`Plan a week first and the list builds itself.`,id:`BwAKKu`})})]})})]})}var F;function I(){return(I=e((()=>{c(),t(),O(),j(),N(),F=r(),P.__docgenInfo={description:`"Shopping list" — the planned week rolled up into one list to shop from.`,methods:[],displayName:`ShoppingView`,props:{weekKey:{required:!0,tsType:{name:`string`},description:"The week in view, keyed by its Monday (`YYYY-MM-DD`)."},plan:{required:!0,tsType:{name:`union`,raw:`SavedPlan | null`,elements:[{name:`SavedPlan`},{name:`null`}]},description:"The saved plan for that week, or `null` when it has never been planned."},recipes:{required:!0,tsType:{name:`Array`,elements:[{name:`Recipe`}],raw:`Recipe[]`},description:`The cook's own recipe pool — what the planned meals resolve against.`},checkedLines:{required:!0,tsType:{name:`Record`,elements:[{name:`string`},{name:`boolean`}],raw:`Record<string, boolean>`},description:"Ticked lines, keyed by `item|unit`."},onToggleLine:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(key: string) => void`,signature:{arguments:[{type:{name:`string`},name:`key`}],return:{name:`void`}}},description:``},onPrint:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{I(),g(),y(),h(),C(),{expect:L,fn:R,userEvent:z,within:B}=__STORYBOOK_MODULE_TEST__,V=x(),H=m.filter(e=>e.isSaved),U=_.map((e,t)=>({day:e,meal:`dinner`,people:4,recipeId:H[t%H.length]?.id??null})),W={status:`final`,savedAt:v(new Date),draft:{...te(),slots:U}},G={component:P,title:`Views/Shopping`,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[w()]},K={weekKey:V,plan:W,recipes:m,checkedLines:{},onToggleLine:R(),onPrint:R()},q={args:K,parameters:{viewport:{value:`full`}}},J={args:{...K,checkedLines:Object.fromEntries((H[0]?.ingredients??[]).map(e=>[`${e.item}|${e.unit}`,!0]))},parameters:{viewport:{value:`full`}}},Y={args:{...K,plan:null},parameters:{viewport:{value:`full`}}},X={args:K,globals:{viewport:{value:`iphonex`}}},Z={args:K,parameters:{viewport:{value:`full`}},play:async({args:e,canvasElement:t})=>{let n=await B(t).findAllByRole(`checkbox`);await L(n.length).toBeGreaterThan(0),await L(n[0]).not.toBeChecked(),await z.click(n[0]),await L(e.onToggleLine).toHaveBeenCalledTimes(1)}},Q=[`Fullscreen`,`PartlyTickedOff`,`NotPlanned`,`Phone`,`TicksOffALine`],q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    checkedLines: Object.fromEntries((savedRecipes[0]?.ingredients ?? []).map(ingredient => [\`\${ingredient.item}|\${ingredient.unit}\`, true]))
  },
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...J.parameters?.docs?.source},description:{story:`Lines already ticked off read back muted, with a filled checkbox.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    plan: null
  },
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const lines = await canvas.findAllByRole("checkbox");
    await expect(lines.length).toBeGreaterThan(0);
    await expect(lines[0]).not.toBeChecked();
    await userEvent.click(lines[0] as HTMLElement);
    await expect(args.onToggleLine).toHaveBeenCalledTimes(1);
  }
}`,...Z.parameters?.docs?.source},description:{story:`Ticking a row reports the line it belongs to, so the tick can be persisted.`,...Z.parameters?.docs?.description}}}})))()}$();export{q as Fullscreen,Y as NotPlanned,J as PartlyTickedOff,X as Phone,Z as TicksOffALine,Q as __namedExportsOrder,G as default};