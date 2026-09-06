import{i as e}from"./preload-helper-CT_b8DTk.js";import{o as t,r as n}from"./RecipeSampleData-DKdWjSE_.js";import{n as r,t as i}from"./RecipeScanDialog-BcU8Uckb.js";var a,o,s,c,l,u,d,f,p,m,h,g,_,v;e((()=>{r(),t(),{expect:a,fn:o,screen:s}=__STORYBOOK_MODULE_TEST__,c={component:i,title:`Feedback/Recipe Scan Dialog`,tags:[`autodocs`],parameters:{layout:`fullscreen`}},l={isOpen:!0,stage:`capture`,scansRemaining:3,scannedRecipe:null,correction:``,onCorrectionChange:o(),onPhotoSelected:o(),onRerun:o(),onUseRecipe:o(),onClose:o()},u={args:l},d={args:{...l,scansRemaining:0}},f={args:{...l,stage:`working`,scansRemaining:2}},p={args:{...l,stage:`preview`,scansRemaining:2,scannedRecipe:n}},m={args:{...l,stage:`preview`,scansRemaining:2,scannedRecipe:n},globals:{viewport:{value:`iphonex`}}},h={args:{...l,stage:`preview`,scansRemaining:2,scannedRecipe:n},play:async({args:e,userEvent:t})=>{await t.click(await s.findByTestId(`recipe-scan-dialog__use`)),await a(e.onUseRecipe).toHaveBeenCalled()}},g={args:{...l,stage:`preview`,scansRemaining:2,scannedRecipe:n},play:async({args:e,userEvent:t})=>{let n=await s.findByRole(`button`,{name:`Re-read`});await a(n).toBeDisabled(),await t.type(await s.findByRole(`textbox`,{name:/Something off/}),`400g`),await a(e.onCorrectionChange).toHaveBeenCalled()}},_={args:{...l,stage:`preview`,scansRemaining:2,scannedRecipe:n,correction:`400g mushrooms`},play:async({args:e,userEvent:t})=>{await t.click(await s.findByRole(`button`,{name:`Re-read`})),await a(e.onRerun).toHaveBeenCalled()}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    scansRemaining: 0
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    stage: "working",
    scansRemaining: 2
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    stage: "preview",
    scansRemaining: 2,
    scannedRecipe: SampleScannedRecipe
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    stage: "preview",
    scansRemaining: 2,
    scannedRecipe: SampleScannedRecipe
  },
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    stage: "preview",
    scansRemaining: 2,
    scannedRecipe: SampleScannedRecipe
  },
  play: async ({
    args,
    userEvent
  }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.click(await screen.findByTestId("recipe-scan-dialog__use"));
    await expect(args.onUseRecipe).toHaveBeenCalled();
  }
}`,...h.parameters?.docs?.source},description:{story:`From the preview, the scanned recipe can be accepted straight into the editor.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    stage: "preview",
    scansRemaining: 2,
    scannedRecipe: SampleScannedRecipe
  },
  play: async ({
    args,
    userEvent
  }) => {
    const reread = await screen.findByRole("button", {
      name: "Re-read"
    });
    await expect(reread).toBeDisabled();
    await userEvent.type(await screen.findByRole("textbox", {
      name: /Something off/
    }), "400g");
    await expect(args.onCorrectionChange).toHaveBeenCalled();
  }
}`,...g.parameters?.docs?.source},description:{story:`Typing a correction is reported up, and re-reading only unlocks once there is one.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    stage: "preview",
    scansRemaining: 2,
    scannedRecipe: SampleScannedRecipe,
    correction: "400g mushrooms"
  },
  play: async ({
    args,
    userEvent
  }) => {
    await userEvent.click(await screen.findByRole("button", {
      name: "Re-read"
    }));
    await expect(args.onRerun).toHaveBeenCalled();
  }
}`,..._.parameters?.docs?.source},description:{story:`With the correction already filled in, re-reading is available.`,..._.parameters?.docs?.description}}},v=[`Capture`,`NoScansLeft`,`Working`,`Preview`,`Phone`,`UsesTheScannedRecipe`,`CorrectsAndRereads`,`RereadsWithCorrection`]}))();export{u as Capture,g as CorrectsAndRereads,d as NoScansLeft,m as Phone,p as Preview,_ as RereadsWithCorrection,h as UsesTheScannedRecipe,f as Working,v as __namedExportsOrder,c as default};