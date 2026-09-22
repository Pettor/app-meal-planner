import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{G as n,i as r,n as i,r as a}from"./iframe-BLBebFNs.js";import{G as o,d as s,t as c}from"./dist-DaOtRWkO.js";import{n as l,t as ee}from"./clsx-_2dUCx3I.js";import{B as u,H as d,c as f,f as p,it as m,m as h,t as g}from"./esm-bnb9huIp.js";import{i as _,o as v}from"./RecipeSampleData-BF9_X84N.js";import{n as y,t as te}from"./SettingsAboutSection-D_RTz73r.js";import{n as b,t as ne}from"./SettingsAccountSection-B_d_KhAB.js";import{n as x,t as re}from"./SettingsAppearanceSection-DCcuGQyV.js";import{n as S,t as ie}from"./SettingsDataSection-CDA3w6tv.js";import{n as C,t as w}from"./SettingsDefaultTagsSection-x_AWp9Av.js";import{d as T,t as E}from"./PlanUtils-Dx70Wpbk.js";import{n as D,t as O}from"./SettingsLanguageSection-DLhtV5Dj.js";import{r as k,t as A}from"./src-CwJjCHu3.js";function j(e){return`settings-section-${e}`}function M({isOpen:e,sections:t,initialSection:n,onClose:r,account:i,appearance:c,language:l,defaultTags:u,data:d,aboutDetails:f}){let p=a(),m=k(`sm`),[h,g]=(0,N.useState)(n??t[0]??`appearance`),_=(0,N.useRef)(null);(0,N.useEffect)(()=>{e&&n&&g(n)},[e,n]),(0,N.useEffect)(()=>{if(!e||m||!n)return;let t=requestAnimationFrame(()=>{let e=_.current,t=e?.querySelector(`#${j(n)}`);if(!e||!t)return;let r=t.getBoundingClientRect().top-e.getBoundingClientRect().top+e.scrollTop;e.scrollTo({top:r,behavior:`smooth`})});return()=>cancelAnimationFrame(t)},[e,m,n]);let v=p.formatMessage({description:`SettingsModal: heading - title`,defaultMessage:`Settings`,id:`A5kccO`});function y(e){switch(e){case`account`:return p.formatMessage({description:`SettingsModal: tab - account`,defaultMessage:`Account`,id:`itKwWQ`});case`appearance`:return p.formatMessage({description:`SettingsModal: tab - appearance`,defaultMessage:`Appearance`,id:`miFRsV`});case`language`:return p.formatMessage({description:`SettingsModal: tab - language`,defaultMessage:`Language`,id:`ypOlkq`});case`tags`:return p.formatMessage({description:`SettingsModal: tab - default tags`,defaultMessage:`Your default tags`,id:`XdjdbR`});case`data`:return p.formatMessage({description:`SettingsModal: tab - data`,defaultMessage:`Data`,id:`fPc6KK`});case`about`:return p.formatMessage({description:`SettingsModal: tab - about`,defaultMessage:`About`,id:`pPj4qN`})}}function b(e){switch(e){case`account`:return p.formatMessage({description:`SettingsModal: body - account section purpose`,defaultMessage:`The details you signed in with.`,id:`5Vzqiv`});case`appearance`:return p.formatMessage({description:`SettingsModal: body - appearance section purpose`,defaultMessage:`Light, dark, or follow the operating system.`,id:`S6tf2s`});case`language`:return p.formatMessage({description:`SettingsModal: body - language section purpose`,defaultMessage:`Interface language. Recipe text stays as you wrote it.`,id:`n6xojA`});case`tags`:return p.formatMessage({description:`SettingsModal: body - default tags section purpose`,defaultMessage:`Offered first when you set quotas for a week. Click one to remove it.`,id:`ICh02C`});case`data`:return p.formatMessage({description:`SettingsModal: body - data section purpose`,defaultMessage:`Recipes, tags and the current week live in one JSON blob. Paste to replace, download to back up.`,id:`kJRKid`});case`about`:return p.formatMessage({description:`SettingsModal: body - about section purpose`,defaultMessage:`Which build of the app you are looking at.`,id:`I58VNp`})}}function x(e){switch(e){case`account`:return i?(0,P.jsx)(ne,{...i}):(0,P.jsx)(P.Fragment,{});case`appearance`:return(0,P.jsx)(re,{...c});case`language`:return(0,P.jsx)(O,{...l});case`tags`:return u?(0,P.jsx)(w,{...u}):(0,P.jsx)(P.Fragment,{});case`data`:return d?(0,P.jsx)(ie,{...d}):(0,P.jsx)(P.Fragment,{});case`about`:return(0,P.jsx)(te,{...f})}}function S(){return(0,P.jsxs)(o,{orientation:`vertical`,selectedKey:h,onSelectionChange:e=>g(e),className:`min-h-0 flex-1 gap-0`,children:[(0,P.jsxs)(`div`,{className:`border-separator bg-surface-secondary flex w-53 shrink-0 flex-col border-r px-3 py-5`,children:[(0,P.jsx)(`div`,{className:`text-muted px-2.5 pb-2.5 text-xs font-medium tracking-[0.09em] uppercase`,children:v}),(0,P.jsx)(o.List,{"aria-label":p.formatMessage({description:`SettingsModal: aria-label - settings navigation`,defaultMessage:`Settings navigation`,id:`QJ8Qdm`}),className:`gap-1`,children:t.map(e=>(0,P.jsxs)(o.Tab,{id:e,className:`data-[selected=true]:text-foreground h-auto w-full justify-start gap-2.5 rounded-md px-3 py-2.25 text-left whitespace-nowrap`,children:[F[e],y(e),(0,P.jsx)(o.Indicator,{className:`bg-accent top-0 h-full w-0.5 rounded-none shadow-none`})]},e))})]}),(0,P.jsxs)(`div`,{className:`flex min-h-0 min-w-0 flex-1 flex-col`,children:[(0,P.jsxs)(`div`,{className:`border-separator flex items-start gap-3 border-b px-6 pt-5 pb-3.5`,children:[(0,P.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,P.jsx)(s.Heading,{className:`text-lg`,children:y(h)}),(0,P.jsx)(`p`,{className:`text-muted mt-1 text-sm`,children:b(h)})]}),(0,P.jsx)(s.CloseTrigger,{className:`static shrink-0`})]}),t.map(e=>(0,P.jsx)(o.Panel,{id:e,className:`m-0 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-6 py-5`,children:x(e)},e))]})]})}function C(){return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(`div`,{className:`border-separator flex items-center gap-3 border-b px-5 pt-5 pb-4`,children:[(0,P.jsx)(s.Heading,{className:`min-w-0 flex-1 text-lg`,children:v}),(0,P.jsx)(s.CloseTrigger,{className:`static shrink-0`})]}),(0,P.jsx)(`div`,{ref:_,className:`flex min-h-0 flex-1 flex-col overflow-y-auto`,children:t.map((e,t)=>(0,P.jsxs)(`section`,{id:j(e),"aria-labelledby":`${j(e)}-heading`,className:ee(`flex flex-col gap-2.5 px-5 py-5`,t>0&&`border-separator border-t`),children:[(0,P.jsxs)(`div`,{className:`mb-0.5`,children:[(0,P.jsxs)(`h3`,{id:`${j(e)}-heading`,className:`font-family-display flex items-center gap-2 text-lg font-normal`,children:[F[e],y(e)]}),(0,P.jsx)(`p`,{className:`text-muted mt-1 text-sm`,children:b(e)})]}),x(e)]},e))})]})}return(0,P.jsx)(s,{isOpen:e,onOpenChange:e=>!e&&r(),children:(0,P.jsx)(s.Backdrop,{variant:`blur`,children:(0,P.jsx)(s.Container,{size:`lg`,children:(0,P.jsx)(s.Dialog,{"aria-label":v,className:`h-[86vh] max-w-220 gap-0 overflow-hidden p-0 sm:h-[min(38.75rem,86vh)]`,children:m?S():C()})})})})}var N,P,F,I=e((()=>{N=t(n(),1),g(),c(),A(),l(),i(),y(),b(),x(),S(),C(),D(),P=r(),F={account:(0,P.jsx)(f,{className:`size-4.5 shrink-0`}),appearance:(0,P.jsx)(h,{className:`size-4.5 shrink-0`}),language:(0,P.jsx)(u,{className:`size-4.5 shrink-0`}),tags:(0,P.jsx)(p,{className:`size-4.5 shrink-0`}),data:(0,P.jsx)(m,{className:`size-4.5 shrink-0`}),about:(0,P.jsx)(d,{className:`size-4.5 shrink-0`})},M.__docgenInfo={description:`Every preference, behind one nav rail.

On desktop the rail names the sections and the pane header says what each one
is for, so no section repeats its own title. Below \`sm\` there is no rail at
all: the sections stack into one scrolling page, each under its own heading.`,methods:[],displayName:`SettingsModal`,props:{isOpen:{required:!0,tsType:{name:`boolean`},description:``},sections:{required:!0,tsType:{name:`Array`,elements:[{name:`SettingsSection`}],raw:`SettingsSection[]`},description:``},initialSection:{required:!1,tsType:{name:`SettingsSection`},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},account:{required:!1,tsType:{name:`SettingsAccountSectionProps`},description:`Signed in only — before that there is no account to show.`},appearance:{required:!0,tsType:{name:`SettingsAppearanceSectionProps`},description:``},language:{required:!0,tsType:{name:`SettingsLanguageSectionProps`},description:``},defaultTags:{required:!1,tsType:{name:`SettingsDefaultTagsSectionProps`},description:`Signed in only — the cook's own tags.`},data:{required:!1,tsType:{name:`SettingsDataSectionProps`},description:`Signed in only — the cook's own data.`},aboutDetails:{required:!0,tsType:{name:`SettingsAboutSectionProps`},description:``}}}})),L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{I(),T(),v(),{expect:L,fn:R,screen:z}=__STORYBOOK_MODULE_TEST__,B={component:M,title:`Feedback/Settings Modal`,parameters:{layout:`fullscreen`}},V={isOpen:!0,sections:[`account`,`appearance`,`language`,`tags`,`data`,`about`],onClose:R(),account:{name:`John Doe`,email:`john.doe@example.com`},appearance:{themeSelector:{mode:`auto`,onSelect:R()}},language:{locale:`en`,onSelect:R()},defaultTags:{tags:E,catalogue:_,isBrowserOpen:!1,onToggleTag:R(),onOpenBrowser:R(),onCloseBrowser:R()},data:{json:`{
  "version": 1
}`,status:`idle`,onJsonChange:R(),onApply:R(),onDownload:R(),onReset:R()},aboutDetails:{appName:`My App`,appVersion:`1.0.0`,serverVersion:`2.0.0`}},H={args:V},U={args:{...V,initialSection:`account`}},W={args:{...V,initialSection:`appearance`}},G={args:{...V,initialSection:`language`}},K={args:{...V,initialSection:`tags`}},q={args:{...V,initialSection:`data`}},J={args:{...V,initialSection:`about`}},Y={args:{...V,sections:[`appearance`,`language`,`about`],account:void 0,defaultTags:void 0,data:void 0}},X={args:V,globals:{viewport:{value:`iphonex`}}},Z={args:{...V,initialSection:`data`},globals:{viewport:{value:`iphonex`}}},Q={args:V,play:async({userEvent:e})=>{await e.click(await z.findByRole(`tab`,{name:`Language`})),await L(await z.findByText(`Interface language. Recipe text stays as you wrote it.`)).toBeInTheDocument(),await e.click(await z.findByRole(`tab`,{name:`Your default tags`})),await L(await z.findByRole(`button`,{name:`Browse all tags`})).toBeInTheDocument()}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "account"
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "appearance"
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "language"
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "tags"
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "data"
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "about"
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    sections: ["appearance", "language", "about"] as Props["sections"],
    account: undefined,
    defaultTags: undefined,
    data: undefined
  }
}`,...Y.parameters?.docs?.source},description:{story:`Signed out: only the preferences that apply to anyone.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...X.parameters?.docs?.source},description:{story:"Below `sm` there is no rail: every section stacks into one scrolling page.",...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "data"
  },
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...Z.parameters?.docs?.source},description:{story:`Opening on a section scrolls the stack to it rather than selecting a tab.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  // The modal renders into a portal, so it is queried off the document, not the canvas.
  play: async ({
    userEvent
  }) => {
    // The pane header, not the section, carries the title and what it is for.
    await userEvent.click(await screen.findByRole("tab", {
      name: "Language"
    }));
    await expect(await screen.findByText("Interface language. Recipe text stays as you wrote it.")).toBeInTheDocument();
    await userEvent.click(await screen.findByRole("tab", {
      name: "Your default tags"
    }));
    await expect(await screen.findByRole("button", {
      name: "Browse all tags"
    })).toBeInTheDocument();
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`Account`,`Appearance`,`Language`,`DefaultTags`,`Data`,`About`,`SignedOut`,`Phone`,`PhoneOpenedOnData`,`Interaction`]}))();export{J as About,U as Account,W as Appearance,q as Data,H as Default,K as DefaultTags,Q as Interaction,G as Language,X as Phone,Z as PhoneOpenedOnData,Y as SignedOut,$ as __namedExportsOrder,B as default};