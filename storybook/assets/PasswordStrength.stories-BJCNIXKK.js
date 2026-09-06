import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./PasswordStrength-D6KZ7-Oe.js";var r,i,a,o,s,c,l,u,d,f;e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={title:`Display/Password Strength`,component:n,tags:[`autodocs`]},a={password:``},o={args:a},s={args:{password:`kitchen`}},c={args:{password:`kitchen1`}},l={args:{password:`kitchentable1`}},u={args:{password:`kitchen-table-1!`}},d={args:{password:`kitchen-table-1!`},play:async({canvas:e})=>{await r(e.getByTestId(`password-strength__label`)).toHaveTextContent(`Strong`)}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    password: "kitchen"
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    password: "kitchen1"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    password: "kitchentable1"
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    password: "kitchen-table-1!"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    password: "kitchen-table-1!"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByTestId("password-strength__label")).toHaveTextContent("Strong");
  }
}`,...d.parameters?.docs?.source}}},f=[`Empty`,`Weak`,`Fair`,`Good`,`Strong`,`Interaction`]}))();export{o as Empty,c as Fair,l as Good,d as Interaction,u as Strong,s as Weak,f as __namedExportsOrder,i as default};