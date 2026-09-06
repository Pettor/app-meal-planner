import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./ConfirmDialog-CkBPbqLk.js";var r,i,a,o,s,c,l,u,d;e((()=>{t(),{expect:r,fn:i,screen:a}=__STORYBOOK_MODULE_TEST__,o={component:n,title:`Feedback/Confirm Dialog`,tags:[`autodocs`],parameters:{layout:`fullscreen`}},s={isOpen:!0,title:`Delete this recipe?`,subject:`Mushroom risotto`,body:`You wrote this one, so removing it deletes it for good. It will also be cleared from any planned day that used it.`,confirmLabel:`Delete it`,onConfirm:i(),onCancel:i()},c={args:s},l={args:{...s,tone:`accent`,title:`Load this week?`,subject:`Fish twice, cheap the rest`,body:`Copied into next week as a draft. Nothing is saved until you say so.`,confirmLabel:`Load into planner`}},u={args:s,play:async({args:e,userEvent:t})=>{await t.click(await a.findByTestId(`confirm-dialog__confirm`)),await r(e.onConfirm).toHaveBeenCalled()}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    tone: "accent",
    title: "Load this week?",
    subject: "Fish twice, cheap the rest",
    body: "Copied into next week as a draft. Nothing is saved until you say so.",
    confirmLabel: "Load into planner"
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    userEvent
  }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.click(await screen.findByTestId("confirm-dialog__confirm"));
    await expect(args.onConfirm).toHaveBeenCalled();
  }
}`,...u.parameters?.docs?.source}}},d=[`Danger`,`Accent`,`Confirms`]}))();export{l as Accent,u as Confirms,c as Danger,d as __namedExportsOrder,o as default};