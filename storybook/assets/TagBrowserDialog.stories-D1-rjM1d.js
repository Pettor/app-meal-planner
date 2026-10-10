import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-Q1GcV6wX.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,o as i}from"./RecipeSampleData-CBRM2MON.js";import{n as a,t as o}from"./TagBrowserDialog-DVS0j9zc.js";var s,c,l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{s=t(),a(),i(),c=n(),{expect:l,fn:u,screen:d}=__STORYBOOK_MODULE_TEST__,f={component:o,title:`Feedback/Tag Browser Dialog`,tags:[`autodocs`],parameters:{layout:`fullscreen`}},p={isOpen:!0,description:`Pick the tags that describe this recipe.`,catalogue:r,selectedTags:[`vegetarian`,`quick`],onToggleTag:u(),onClose:u()},m={args:p},h={args:{...p,selectedTags:[]}},g={args:p,globals:{viewport:{value:`iphonex`}}},_={args:{...p,onToggleTag:u()},render:function(e){let[t,n]=(0,s.useState)([]);return(0,c.jsx)(o,{...e,selectedTags:t,onToggleTag:t=>{e.onToggleTag(t),n(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t])}})},play:async({args:e,userEvent:t})=>{await t.type(await d.findByRole(`textbox`,{name:`Search community tags`}),`veg`);let n=await d.findByRole(`button`,{name:/^vegetarian/});await l(d.queryByRole(`button`,{name:/^italian/})).not.toBeInTheDocument(),await t.click(n),await l(e.onToggleTag).toHaveBeenCalledWith(`vegetarian`),await l(n).toHaveAttribute(`aria-pressed`,`true`)}},v=[`Default`,`NothingSelected`,`Phone`,`FiltersBySearch`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    selectedTags: []
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}}})))()}y();export{m as Default,_ as FiltersBySearch,h as NothingSelected,g as Phone,v as __namedExportsOrder,f as default};