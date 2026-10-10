import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./SettingsDefaultTagsSection-DkiHJAqs.js";import{i as r,o as i}from"./RecipeSampleData-CBRM2MON.js";import{d as a,t as o}from"./PlanUtils-blfSQ-GB.js";var s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{t(),a(),i(),{expect:s,fn:c}=__STORYBOOK_MODULE_TEST__,l={component:n,title:`Feedback/Settings Modal/Default Tags Section`,tags:[`autodocs`]},u={tags:o,catalogue:r,isBrowserOpen:!1,onToggleTag:c(),onOpenBrowser:c(),onCloseBrowser:c()},d={args:u},f={args:{...u,tags:[]},play:async({canvas:e})=>{await s(e.getByText(`No default tags yet.`)).toBeInTheDocument()}},p={args:u,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:/vegetarian/})),await s(e.onToggleTag).toHaveBeenCalledWith(`vegetarian`),await n.click(t.getByRole(`button`,{name:`Browse all tags`})),await s(e.onOpenBrowser).toHaveBeenCalled()}},m=[`Default`,`Empty`,`Interaction`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}}})))()}h();export{d as Default,f as Empty,p as Interaction,m as __namedExportsOrder,l as default};