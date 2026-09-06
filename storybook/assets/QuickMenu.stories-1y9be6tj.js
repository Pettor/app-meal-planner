import{i as e}from"./preload-helper-CT_b8DTk.js";import{c as t,t as n}from"./src-CO1J98b5.js";import{n as r,t as i}from"./QuickMenu-DUPY-2S_.js";var a,o,s,c,l,u;e((()=>{n(),r(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={component:i,title:`Actions/Quick Menu`,tags:[`autodocs`],decorators:[t]},s={onSettings:()=>console.log(`onSettings`),onLogout:()=>console.log(`onLogout`),onSearch:()=>console.log(`onSearch`)},c={args:s},l={args:s,play:async({canvas:e,userEvent:t})=>{let n=e.getByTestId(`quick-menu__search-button`),r=e.getByTestId(`quick-menu__settings-button`),i=e.getByTestId(`quick-menu__logout-button`);await a(n).toBeInTheDocument(),await a(r).toBeInTheDocument(),await a(i).toBeInTheDocument(),await t.click(n),await t.click(r),await t.click(i)}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    const searchButton = canvas.getByTestId("quick-menu__search-button");
    const settingsButton = canvas.getByTestId("quick-menu__settings-button");
    const logoutButton = canvas.getByTestId("quick-menu__logout-button");
    await expect(searchButton).toBeInTheDocument();
    await expect(settingsButton).toBeInTheDocument();
    await expect(logoutButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    await userEvent.click(settingsButton);
    await userEvent.click(logoutButton);
  }
} satisfies Story`,...l.parameters?.docs?.source}}},u=[`Default`,`Interaction`]}))();export{c as Default,l as Interaction,u as __namedExportsOrder,o as default};