import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{n,o as r}from"./RecipeSampleData-DKdWjSE_.js";import{n as i,t as a}from"./RecipeCard-Bq2PqBQ9.js";var o,s,c,l,u,d,f,p,m,h,g,_,v;e((()=>{i(),r(),o=t(),{expect:s,fn:c}=__STORYBOOK_MODULE_TEST__,l={component:a,title:`Display/Recipe Card`,tags:[`autodocs`],decorators:[e=>(0,o.jsx)(`div`,{className:`w-64`,children:(0,o.jsx)(e,{})})]},u=n[0],d=n[6],f={recipe:u,onOpen:c(),onRemove:c()},p={args:f},m={args:{...f,recipe:n[1]}},h={args:{recipe:d,showSaveAction:!0,onOpen:c(),onSave:c()}},g={args:{recipe:{...d,isSaved:!0},showSaveAction:!0,onOpen:c(),onSave:c()}},_={args:f,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:`Open ${u.title}`})),await s(e.onOpen).toHaveBeenCalledWith(u.id)}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    recipe: SampleRecipes[1]!
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    recipe: communityRecipe,
    showSaveAction: true,
    onOpen: fn(),
    onSave: fn()
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    recipe: {
      ...communityRecipe,
      isSaved: true
    },
    showSaveAction: true,
    onOpen: fn(),
    onSave: fn()
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: \`Open \${ownRecipe.title}\`
    }));
    await expect(args.onOpen).toHaveBeenCalledWith(ownRecipe.id);
  }
}`,..._.parameters?.docs?.source}}},v=[`Default`,`WithoutPhoto`,`FromTheCommunity`,`AlreadySaved`,`OpensOnClick`]}))();export{g as AlreadySaved,p as Default,h as FromTheCommunity,_ as OpensOnClick,m as WithoutPhoto,v as __namedExportsOrder,l as default};