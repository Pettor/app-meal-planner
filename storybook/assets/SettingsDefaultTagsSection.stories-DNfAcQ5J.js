import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t,o as n}from"./RecipeSampleData-BF9_X84N.js";import{n as r,t as i}from"./SettingsDefaultTagsSection-x_AWp9Av.js";import{d as a,t as o}from"./PlanUtils-Dx70Wpbk.js";var s,c,l,u,d,f,p,m;e((()=>{r(),a(),n(),{expect:s,fn:c}=__STORYBOOK_MODULE_TEST__,l={component:i,title:`Feedback/Settings Modal/Default Tags Section`,tags:[`autodocs`]},u={tags:o,catalogue:t,isBrowserOpen:!1,onToggleTag:c(),onOpenBrowser:c(),onCloseBrowser:c()},d={args:u},f={args:{...u,tags:[]},play:async({canvas:e})=>{await s(e.getByText(`No default tags yet.`)).toBeInTheDocument()}},p={args:u,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:/vegetarian/})),await s(e.onToggleTag).toHaveBeenCalledWith(`vegetarian`),await n.click(t.getByRole(`button`,{name:`Browse all tags`})),await s(e.onOpenBrowser).toHaveBeenCalled()}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    tags: []
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("No default tags yet.")).toBeInTheDocument();
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: /vegetarian/
    }));
    await expect(args.onToggleTag).toHaveBeenCalledWith("vegetarian");
    await userEvent.click(canvas.getByRole("button", {
      name: "Browse all tags"
    }));
    await expect(args.onOpenBrowser).toHaveBeenCalled();
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Empty`,`Interaction`]}))();export{d as Default,f as Empty,p as Interaction,m as __namedExportsOrder,l as default};