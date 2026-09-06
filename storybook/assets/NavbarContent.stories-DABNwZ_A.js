import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{G as n,i as r,n as i,r as a}from"./iframe-BxGJe6Y9.js";import{at as o,t as s}from"./dist-DFOu2y8R.js";import{n as c,t as l}from"./clsx-_2dUCx3I.js";import{n as u,t as d}from"./QuickMenu-DUPY-2S_.js";import{R as f,ct as p,ft as m,g as h,i as g,t as _,u as v,v as y}from"./esm-CRIJbiOO.js";import{n as b,t as x}from"./UserAvatar-DSlHf8wz.js";function S(e){return[{id:`recipes`,name:e.formatMessage({description:`NavMenuItems: menu-item - recipes`,defaultMessage:`Recipes`,id:`BpvAE5`}),shortName:e.formatMessage({description:`NavMenuItems: menu-item - recipes (short, mobile tab bar)`,defaultMessage:`Recipes`,id:`lzH6R6`}),href:`#/`,icon:(0,C.jsx)(m,{className:`h-[18px] w-[18px]`})},{id:`plan`,name:e.formatMessage({description:`NavMenuItems: menu-item - plan`,defaultMessage:`Plan`,id:`SIwWzu`}),shortName:e.formatMessage({description:`NavMenuItems: menu-item - plan (short, mobile tab bar)`,defaultMessage:`Plan`,id:`DmSF9w`}),href:`#/plan`,icon:(0,C.jsx)(h,{className:`h-[18px] w-[18px]`})},{id:`week`,name:e.formatMessage({description:`NavMenuItems: menu-item - this week`,defaultMessage:`This week`,id:`myl/z5`}),shortName:e.formatMessage({description:`NavMenuItems: menu-item - this week (short, mobile tab bar)`,defaultMessage:`Week`,id:`/4Y51F`}),href:`#/week`,icon:(0,C.jsx)(p,{className:`h-[18px] w-[18px]`})},{id:`shop`,name:e.formatMessage({description:`NavMenuItems: menu-item - shopping`,defaultMessage:`Shopping`,id:`LS5BYx`}),shortName:e.formatMessage({description:`NavMenuItems: menu-item - shopping (short, mobile tab bar)`,defaultMessage:`Shopping`,id:`aAqsh5`}),href:`#/shopping`,icon:(0,C.jsx)(y,{className:`h-[18px] w-[18px]`})},{id:`community`,name:e.formatMessage({description:`NavMenuItems: menu-item - community`,defaultMessage:`Community`,id:`b6ZYZt`}),shortName:e.formatMessage({description:`NavMenuItems: menu-item - community (short, mobile tab bar)`,defaultMessage:`Friends`,id:`YfA5jn`}),href:`#/community`,icon:(0,C.jsx)(g,{className:`h-[18px] w-[18px]`})}]}var C,w=e((()=>{_(),C=r()}));function T(e){window.location.hash=e.replace(/^#/,``)}function E(){return(0,k.jsxs)(`svg`,{viewBox:`0 0 24 24`,className:`text-accent h-[26px] w-[26px] flex-none`,"aria-hidden":`true`,children:[(0,k.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10.2`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`}),(0,k.jsx)(`circle`,{cx:`12`,cy:`12`,r:`6.6`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.1`,opacity:`0.4`}),(0,k.jsx)(`path`,{d:`M8.7 12.1L11.2 14.6L15.5 9.9`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.9`,strokeLinecap:`round`,strokeLinejoin:`round`})]})}function D({quickMenu:e,avatarName:t,avatarEmail:n,activeTab:r=`recipes`,onTabChange:i,accountMenu:s}){let c=a(),[u,p]=(0,O.useState)(!1),m=(0,O.useMemo)(()=>S(c),[c]),h=n?`@${n.split(`@`)[0]}`:``;function g(e){e.disabled||(i?i(e.id):T(e.href))}let _=c.formatMessage({description:`NavbarContent: heading - app title in navbar`,defaultMessage:`Meal Planner`,id:`MwZQf8`}),y=c.formatMessage({description:`NavbarContent: tooltip - disabled nav item not built yet`,defaultMessage:`Coming soon`,id:`3rWi7W`});return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(`header`,{className:`bg-background/70 border-border sticky top-0 z-40 border-b backdrop-blur-lg dark:shadow-[0_1px_0_rgba(0,0,0,0.5)]`,children:(0,k.jsxs)(`div`,{className:`mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6`,children:[(0,k.jsxs)(`button`,{type:`button`,className:`flex min-w-0 shrink-0 items-center gap-2`,onClick:()=>i?i(`recipes`):T(`#/`),"aria-label":_,children:[(0,k.jsx)(E,{}),(0,k.jsx)(`span`,{className:`truncate text-xl font-normal`,style:{fontFamily:`var(--font-family-display)`},children:_})]}),(0,k.jsx)(`nav`,{className:`hidden min-w-0 flex-1 items-center justify-center gap-5 sm:flex`,"aria-label":c.formatMessage({description:`NavbarContent: aria-label - navigation tabs`,defaultMessage:`Navigation`,id:`3R8Sia`}),children:m.map(e=>{let t=e.id===r;return(0,k.jsxs)(`button`,{type:`button`,onClick:()=>g(e),"aria-current":t?`page`:void 0,"aria-disabled":e.disabled,title:e.disabled?y:void 0,className:l(`inline-flex items-center gap-1.5 py-2 text-sm whitespace-nowrap transition-colors`,e.disabled?`text-muted/50 cursor-default`:t?`text-foreground font-medium shadow-[inset_0_-2px_0_0_var(--accent)]`:`text-muted hover:text-foreground cursor-pointer`),children:[e.icon,e.name]},e.id)})}),(0,k.jsx)(`div`,{className:`flex shrink-0 items-center`,children:(0,k.jsxs)(o,{isOpen:u,onOpenChange:p,children:[(0,k.jsx)(o.Trigger,{"data-testid":`home-page__menu-button`,children:(0,k.jsxs)(`div`,{className:`border-border bg-surface flex cursor-pointer items-center gap-2 rounded-full border py-0.5 pr-2.5 pl-0.5`,children:[(0,k.jsx)(x,{name:t,size:`sm`}),h&&(0,k.jsx)(`span`,{className:`text-muted hidden text-xs font-medium sm:inline`,children:h})]})}),(0,k.jsx)(o.Content,{placement:`bottom end`,children:(0,k.jsxs)(o.Dialog,{className:`w-63 overflow-hidden p-0`,children:[(0,k.jsxs)(`div`,{className:`border-separator flex items-center gap-2.5 border-b p-3.5`,children:[(0,k.jsx)(x,{name:t,size:`md`}),(0,k.jsxs)(`span`,{className:`flex min-w-0 flex-col`,children:[(0,k.jsx)(`span`,{className:`truncate text-sm font-semibold`,children:t}),h&&(0,k.jsx)(`span`,{className:`text-muted truncate text-xs`,children:h})]})]}),s&&(0,k.jsxs)(`div`,{className:`border-separator flex flex-col border-b p-2`,children:[(0,k.jsxs)(`button`,{type:`button`,className:`hover:bg-surface-secondary flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm`,onClick:()=>{p(!1),s.onOpenProfile()},"data-testid":`navbar__my-profile`,children:[(0,k.jsx)(v,{className:`h-[18px] w-[18px]`}),c.formatMessage({description:`NavbarContent: menu-item - open your own community profile`,defaultMessage:`My profile`,id:`izLyKM`})]}),(0,k.jsxs)(`button`,{type:`button`,className:`hover:bg-surface-secondary flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm`,onClick:()=>{p(!1),s.onOpenInbox()},"data-testid":`navbar__inbox`,children:[(0,k.jsx)(f,{className:`h-[18px] w-[18px]`}),c.formatMessage({description:`NavbarContent: menu-item - open the recommendations inbox`,defaultMessage:`Inbox`,id:`TsXLmk`}),s.unreadCount>0&&(0,k.jsx)(`span`,{className:`bg-accent text-accent-foreground ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold`,children:c.formatMessage({description:`NavbarContent: badge - unread recommendations`,defaultMessage:`{count} new`,id:`co8SjV`},{count:s.unreadCount})})]})]}),(0,k.jsx)(`div`,{className:`p-2`,children:(0,k.jsx)(d,{onSettings:()=>{p(!1),e.onSettings()},onLogout:()=>{p(!1),e.onLogout()},onSearch:()=>{p(!1),e.onSearch()}})})]})})]})})]})}),(0,k.jsx)(`nav`,{className:`border-border bg-background/85 fixed inset-x-0 bottom-0 z-40 flex h-[62px] items-stretch border-t backdrop-blur-lg sm:hidden`,style:{paddingBottom:`env(safe-area-inset-bottom)`},"aria-label":_,children:m.map(e=>{let t=e.id===r;return(0,k.jsxs)(`button`,{type:`button`,onClick:()=>g(e),"aria-current":t?`page`:void 0,"aria-disabled":e.disabled,className:l(`flex flex-1 flex-col items-center justify-center gap-1 px-1 text-[10px] tracking-[0.01em]`,e.disabled?`text-muted/50`:t?`text-accent font-medium`:`text-muted`),children:[(0,k.jsx)(`span`,{className:l(`h-0.5 w-5 rounded-full`,t&&!e.disabled?`bg-accent`:`bg-transparent`)}),e.icon,(0,k.jsx)(`span`,{className:`max-w-full truncate`,children:e.shortName})]},e.id)})})]})}var O,k,A=e((()=>{O=t(n(),1),_(),s(),c(),i(),w(),u(),b(),k=r(),D.__docgenInfo={description:``,methods:[],displayName:`NavbarContent`,props:{quickMenu:{required:!0,tsType:{name:`QuickMenuProps`},description:``},avatarName:{required:!0,tsType:{name:`string`},description:``},avatarEmail:{required:!1,tsType:{name:`string`},description:``},activeTab:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"recipes"`,computed:!1}},onTabChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:``},accountMenu:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  unreadCount: number;
  onOpenProfile: () => void;
  onOpenInbox: () => void;
}`,signature:{properties:[{key:`unreadCount`,value:{name:`number`,required:!0}},{key:`onOpenProfile`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!0}},{key:`onOpenInbox`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!0}}]}},description:`Community entries in the account dropdown, with the inbox's unread count.`}}}})),j,M=e((()=>{j={quickMenu:{onSettings:()=>console.log(`onSettings`),onLogout:()=>console.log(`onLogout`),onSearch:()=>console.log(`onSearch`)},avatarName:`John Doe`,avatarEmail:`john.doe@example.com`}})),N,P,F,I,L,R,z,B,V,H,U,W,G;e((()=>{A(),M(),{expect:N,fn:P,within:F}=__STORYBOOK_MODULE_TEST__,I={component:D,title:`Navigation/Navbar Content`,parameters:{layout:`fullscreen`}},L={...j},R={args:L},z={args:L,parameters:{viewport:{value:`full`}}},B={args:L,globals:{viewport:{value:`iphonex`}}},V={args:L,play:async({canvas:e,userEvent:t})=>{let n=e.getByTestId(`home-page__menu-button`);await N(n).toBeInTheDocument(),await t.click(n);let r=F(document.body);await N(r.getByTestId(`quick-menu__settings-button`)).toBeInTheDocument(),await t.click(r.getByTestId(`quick-menu__settings-button`))}},H={args:{...L,activeTab:`plan`,accountMenu:{unreadCount:2,onOpenProfile:P(),onOpenInbox:P()}},play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByTestId(`home-page__menu-button`));let r=F(document.body);await N(r.getByText(`2 new`)).toBeInTheDocument(),await n.click(r.getByTestId(`navbar__inbox`)),await N(e.accountMenu?.onOpenInbox).toHaveBeenCalled(),await n.click(t.getByTestId(`home-page__menu-button`)),await n.click(r.getByTestId(`navbar__my-profile`)),await N(e.accountMenu?.onOpenProfile).toHaveBeenCalled()}},U={args:{...L,activeTab:`recipes`,onTabChange:P()},play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getAllByRole(`button`,{name:`Plan`})[0]),await N(e.onTabChange).toHaveBeenCalledWith(`plan`),await n.click(t.getAllByRole(`button`,{name:`Community`})[0]),await N(e.onTabChange).toHaveBeenCalledWith(`community`),await n.click(t.getByRole(`button`,{name:`Meal Planner`})),await N(e.onTabChange).toHaveBeenCalledWith(`recipes`)}},W={args:{...L,quickMenu:{onSettings:P(),onLogout:P(),onSearch:P()}},play:async({args:e,canvas:t,userEvent:n})=>{let r=F(document.body);await n.click(t.getByTestId(`home-page__menu-button`)),await n.click(r.getByTestId(`quick-menu__search-button`)),await N(e.quickMenu.onSearch).toHaveBeenCalled(),await n.click(t.getByTestId(`home-page__menu-button`)),await n.click(r.getByTestId(`quick-menu__logout-button`)),await N(e.quickMenu.onLogout).toHaveBeenCalled()}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    const menuButton = canvas.getByTestId("home-page__menu-button");
    await expect(menuButton).toBeInTheDocument();
    await userEvent.click(menuButton);
    const body = within(document.body);
    await expect(body.getByTestId("quick-menu__settings-button")).toBeInTheDocument();
    await userEvent.click(body.getByTestId("quick-menu__settings-button"));
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    activeTab: "plan",
    accountMenu: {
      unreadCount: 2,
      onOpenProfile: fn(),
      onOpenInbox: fn()
    }
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("home-page__menu-button"));
    const body = within(document.body);

    // The inbox entry carries the unread count that got the cook here.
    await expect(body.getByText("2 new")).toBeInTheDocument();
    await userEvent.click(body.getByTestId("navbar__inbox"));
    await expect(args.accountMenu?.onOpenInbox).toHaveBeenCalled();
    await userEvent.click(canvas.getByTestId("home-page__menu-button"));
    await userEvent.click(body.getByTestId("navbar__my-profile"));
    await expect(args.accountMenu?.onOpenProfile).toHaveBeenCalled();
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    activeTab: "recipes",
    onTabChange: fn()
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    // Every nav entry reports which section it is, rather than navigating itself.
    await userEvent.click(canvas.getAllByRole("button", {
      name: "Plan"
    })[0] as HTMLElement);
    await expect(args.onTabChange).toHaveBeenCalledWith("plan");
    await userEvent.click(canvas.getAllByRole("button", {
      name: "Community"
    })[0] as HTMLElement);
    await expect(args.onTabChange).toHaveBeenCalledWith("community");

    // The app title goes home.
    await userEvent.click(canvas.getByRole("button", {
      name: "Meal Planner"
    }));
    await expect(args.onTabChange).toHaveBeenCalledWith("recipes");
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    quickMenu: {
      onSettings: fn(),
      onLogout: fn(),
      onSearch: fn()
    }
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    const body = within(document.body);
    await userEvent.click(canvas.getByTestId("home-page__menu-button"));
    await userEvent.click(body.getByTestId("quick-menu__search-button"));
    await expect(args.quickMenu.onSearch).toHaveBeenCalled();
    await userEvent.click(canvas.getByTestId("home-page__menu-button"));
    await userEvent.click(body.getByTestId("quick-menu__logout-button"));
    await expect(args.quickMenu.onLogout).toHaveBeenCalled();
  }
}`,...W.parameters?.docs?.source}}},G=[`Responsive`,`Desktop`,`Phone`,`Interaction`,`WithCommunityMenu`,`TabNavigation`,`QuickMenuActions`]}))();export{z as Desktop,V as Interaction,B as Phone,W as QuickMenuActions,R as Responsive,U as TabNavigation,H as WithCommunityMenu,G as __namedExportsOrder,I as default};