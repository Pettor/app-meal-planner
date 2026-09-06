import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t,n,r}from"./iframe-BxGJe6Y9.js";import{pt as i,t as a,wt as o,yt as s}from"./dist-DFOu2y8R.js";import{n as c,t as l}from"./clsx-_2dUCx3I.js";import{b as u,t as d}from"./esm-CRIJbiOO.js";import{n as f,o as p}from"./RecipeSampleData-DKdWjSE_.js";import{i as m,r as h}from"./RecipeUtils-BOmQs_cM.js";import{n as g,t as _}from"./PlanTypes-B3-xi2lF.js";import{_ as v,d as y,f as ee,g as te,l as b,o as x,p as S}from"./PlanUtils-1-XVbRr2.js";import{n as C,t as w}from"./NavbarLayoutDecorator-9v4NIZEh.js";function T({line:e,onToggle:t}){return(0,E.jsx)(i,{isSelected:e.isChecked,onChange:()=>t(),className:`border-separator hover:bg-surface-secondary/60 w-full border-b transition-colors last:border-b-0`,children:(0,E.jsxs)(i.Content,{"data-testid":`shopping-list__row`,className:`flex w-full items-center gap-3.5 px-5.5 py-3.25 text-left font-normal`,children:[(0,E.jsx)(i.Control,{className:`size-[19px] rounded-[5px]`,children:(0,E.jsx)(i.Indicator,{})}),(0,E.jsx)(`span`,{className:l(`flex-1 text-base`,e.isChecked?`text-default-500`:`text-foreground`),children:e.item}),(0,E.jsx)(`span`,{className:`text-default-500 text-sm font-medium tabular-nums`,children:e.amount})]})})}var E,D=e((()=>{a(),c(),E=t(),T.__docgenInfo={description:`One ingredient on the list — tap anywhere on the row to tick it off.`,methods:[],displayName:`ShoppingListRow`,props:{line:{required:!0,tsType:{name:`ShoppingLineViewModel`},description:``},onToggle:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function O({headingLead:e,headingAccent:t,subtitle:n,onPrint:i}){let a=r();return(0,k.jsxs)(`div`,{className:`flex flex-wrap items-end justify-between gap-5 print:hidden`,children:[(0,k.jsxs)(`div`,{children:[(0,k.jsx)(`div`,{className:`text-default-500 mb-2 text-xs font-medium tracking-[0.09em] uppercase`,children:a.formatMessage({description:`ShoppingPageHeader: eyebrow - from the plan`,defaultMessage:`From the plan`,id:`tOiWmt`})}),(0,k.jsxs)(`h1`,{className:`mb-2 text-4xl leading-none tracking-tight md:text-5xl`,children:[e,` `,(0,k.jsx)(`span`,{className:`text-gradient-brand font-extrabold`,children:t})]}),(0,k.jsx)(`p`,{className:`text-default-500 text-base`,children:n})]}),(0,k.jsxs)(o,{variant:`outline`,onPress:i,"data-testid":`shopping-page__print-list`,children:[(0,k.jsx)(u,{className:`mr-1.5 h-4 w-4`}),a.formatMessage({description:`ShoppingPageHeader: button - print list`,defaultMessage:`Print list`,id:`euXWAB`})]})]})}var k,A=e((()=>{d(),a(),n(),k=t(),O.__docgenInfo={description:`Title, week summary and the one action the shopping list offers.`,methods:[],displayName:`ShoppingPageHeader`,props:{headingLead:{required:!0,tsType:{name:`string`},description:``},headingAccent:{required:!0,tsType:{name:`string`},description:``},subtitle:{required:!0,tsType:{name:`string`},description:``},onPrint:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function j(e,t){if(!e)return[];let n=new Map;return e.draft.slots.forEach(e=>{let r=t.find(t=>t.id===e.recipeId);if(!r)return;let i=e.people/(r.servings||1);r.ingredients.forEach(e=>{let t=`${e.item}|${e.unit}`,r=n.get(t)??{key:t,item:e.item,unit:e.unit,quantity:0,hasUnmeasured:!1};e.quantity===null?r.hasUnmeasured=!0:r.quantity+=e.quantity*i,n.set(t,r)})}),[...n.values()].sort((e,t)=>e.key.localeCompare(t.key))}function M(e){return e.quantity?`${h(e.quantity,e.unit)}${e.hasUnmeasured?` +`:``}`:e.unit}var ne=e((()=>{m()}));function N(e,t,n,i){let a=r(),o=a.locale||`en-GB`,s=S(e),c=`${a.formatMessage({description:`UseShoppingOverview: label - week (lowercase)`,defaultMessage:`week`,id:`0PDyPk`})} ${ee(s)} · ${b(s,o)}`,l=j(t,n);return{headingLead:a.formatMessage({description:`UseShoppingOverview: heading - shopping`,defaultMessage:`Shopping`,id:`1wtnNI`}),headingAccent:a.formatMessage({description:`UseShoppingOverview: heading accent - list`,defaultMessage:`list`,id:`L8K0gq`}),subtitle:l.length?a.formatMessage({description:`UseShoppingOverview: subtitle - line count for the planned week`,defaultMessage:`{weekRange} · {count} lines for the planned week`,id:`xxU9J8`},{weekRange:c,count:l.length}):a.formatMessage({description:`UseShoppingOverview: subtitle - no week planned`,defaultMessage:`{weekRange} · No week planned`,id:`3ytiPV`},{weekRange:c}),lines:l.map(e=>({key:e.key,item:e.item,amount:M(e),isChecked:!!i[e.key]})),isEmpty:l.length===0}}var P=e((()=>{n(),y(),ne()}));function F({weekKey:e,plan:t,recipes:n,checkedLines:i,onToggleLine:a,onPrint:o}){let c=r(),l=N(e,t,n,i);return(0,I.jsxs)(`div`,{className:`mx-auto w-full max-w-[77.5rem] px-6 py-9`,children:[(0,I.jsx)(O,{headingLead:l.headingLead,headingAccent:l.headingAccent,subtitle:l.subtitle,onPrint:o}),(0,I.jsx)(s,{className:`mx-auto mt-6.5 max-w-[43.75rem] overflow-hidden print:border-0 print:shadow-none`,children:(0,I.jsxs)(s.Content,{className:`p-0`,children:[l.lines.map(e=>(0,I.jsx)(T,{line:e,onToggle:()=>a(e.key)},e.key)),l.isEmpty&&(0,I.jsx)(`p`,{className:`text-default-500 p-14 text-center`,children:c.formatMessage({description:`ShoppingView: body - nothing to shop for`,defaultMessage:`Plan a week first and the list builds itself.`,id:`BwAKKu`})})]})})]})}var I,L=e((()=>{a(),n(),D(),A(),P(),I=t(),F.__docgenInfo={description:`"Shopping list" — the planned week rolled up into one list to shop from.`,methods:[],displayName:`ShoppingView`,props:{weekKey:{required:!0,tsType:{name:`string`},description:"The week in view, keyed by its Monday (`YYYY-MM-DD`)."},plan:{required:!0,tsType:{name:`union`,raw:`SavedPlan | null`,elements:[{name:`SavedPlan`},{name:`null`}]},description:"The saved plan for that week, or `null` when it has never been planned."},recipes:{required:!0,tsType:{name:`Array`,elements:[{name:`Recipe`}],raw:`Recipe[]`},description:`The cook's own recipe pool — what the planned meals resolve against.`},checkedLines:{required:!0,tsType:{name:`Record`,elements:[{name:`string`},{name:`boolean`}],raw:`Record<string, boolean>`},description:"Ticked lines, keyed by `item|unit`."},onToggleLine:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(key: string) => void`,signature:{arguments:[{type:{name:`string`},name:`key`}],return:{name:`void`}}},description:``},onPrint:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{L(),g(),y(),p(),C(),{expect:R,fn:z,userEvent:B,within:V}=__STORYBOOK_MODULE_TEST__,H=te(),U=f.filter(e=>e.isSaved),W=_.map((e,t)=>({day:e,meal:`dinner`,people:4,recipeId:U[t%U.length]?.id??null})),G={status:`final`,savedAt:v(new Date),draft:{...x(),slots:W}},K={component:F,title:`Views/Shopping`,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[w()]},q={weekKey:H,plan:G,recipes:f,checkedLines:{},onToggleLine:z(),onPrint:z()},J={args:q,parameters:{viewport:{value:`full`}}},Y={args:{...q,checkedLines:Object.fromEntries((U[0]?.ingredients??[]).map(e=>[`${e.item}|${e.unit}`,!0]))},parameters:{viewport:{value:`full`}}},X={args:{...q,plan:null},parameters:{viewport:{value:`full`}}},Z={args:q,globals:{viewport:{value:`iphonex`}}},Q={args:q,parameters:{viewport:{value:`full`}},play:async({args:e,canvasElement:t})=>{let n=await V(t).findAllByRole(`checkbox`);await R(n.length).toBeGreaterThan(0),await R(n[0]).not.toBeChecked(),await B.click(n[0]),await R(e.onToggleLine).toHaveBeenCalledTimes(1)}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    checkedLines: Object.fromEntries((savedRecipes[0]?.ingredients ?? []).map(ingredient => [\`\${ingredient.item}|\${ingredient.unit}\`, true]))
  },
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...Y.parameters?.docs?.source},description:{story:`Lines already ticked off read back muted, with a filled checkbox.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    plan: null
  },
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
}`,...Q.parameters?.docs?.source},description:{story:`Ticking a row reports the line it belongs to, so the tick can be persisted.`,...Q.parameters?.docs?.description}}},$=[`Fullscreen`,`PartlyTickedOff`,`NotPlanned`,`Phone`,`TicksOffALine`]}))();export{J as Fullscreen,X as NotPlanned,Y as PartlyTickedOff,Z as Phone,Q as TicksOffALine,$ as __namedExportsOrder,K as default};