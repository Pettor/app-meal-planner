import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{G as n,i as r}from"./iframe-BxGJe6Y9.js";import{i,o as a}from"./RecipeSampleData-DKdWjSE_.js";import{n as o,t as s}from"./TagBrowserDialog-BWEGzbV2.js";var c,l,u,d,f,p,m,h,g,_,v,y;e((()=>{c=t(n(),1),o(),a(),l=r(),{expect:u,fn:d,screen:f}=__STORYBOOK_MODULE_TEST__,p={component:s,title:`Feedback/Tag Browser Dialog`,tags:[`autodocs`],parameters:{layout:`fullscreen`}},m={isOpen:!0,description:`Pick the tags that describe this recipe.`,catalogue:i,selectedTags:[`vegetarian`,`quick`],onToggleTag:d(),onClose:d()},h={args:m},g={args:{...m,selectedTags:[]}},_={args:m,globals:{viewport:{value:`iphonex`}}},v={args:{...m,onToggleTag:d()},render:function(e){let[t,n]=(0,c.useState)([]);return(0,l.jsx)(s,{...e,selectedTags:t,onToggleTag:t=>{e.onToggleTag(t),n(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t])}})},play:async({args:e,userEvent:t})=>{await t.type(await f.findByRole(`textbox`,{name:`Search community tags`}),`veg`);let n=await f.findByRole(`button`,{name:/^vegetarian/});await u(f.queryByRole(`button`,{name:/^italian/})).not.toBeInTheDocument(),await t.click(n),await u(e.onToggleTag).toHaveBeenCalledWith(`vegetarian`),await u(n).toHaveAttribute(`aria-pressed`,`true`)}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    selectedTags: []
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    // Selection is driven locally so the play function sees the toggle take effect.
    onToggleTag: fn()
  },
  render: function Render(args) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    return <Component {...args} selectedTags={selectedTags} onToggleTag={tag => {
      args.onToggleTag(tag);
      setSelectedTags(current => current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag]);
    }} />;
  },
  play: async ({
    args,
    userEvent
  }) => {
    // The modal renders in a portal, so query the whole document rather than the canvas.
    await userEvent.type(await screen.findByRole("textbox", {
      name: "Search community tags"
    }), "veg");
    const vegetarian = await screen.findByRole("button", {
      name: /^vegetarian/
    });
    await expect(screen.queryByRole("button", {
      name: /^italian/
    })).not.toBeInTheDocument();
    await userEvent.click(vegetarian);
    await expect(args.onToggleTag).toHaveBeenCalledWith("vegetarian");
    await expect(vegetarian).toHaveAttribute("aria-pressed", "true");
  }
}`,...v.parameters?.docs?.source}}},y=[`Default`,`NothingSelected`,`Phone`,`FiltersBySearch`]}))();export{h as Default,v as FiltersBySearch,g as NothingSelected,_ as Phone,y as __namedExportsOrder,p as default};