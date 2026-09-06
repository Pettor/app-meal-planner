import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{n,t as r}from"./CommunityCardHeader-dg1e8VUG.js";import{i,n as a}from"./CommunitySampleData-TKcJX8eP.js";var o,s,c,l,u,d,f,p,m,h;e((()=>{n(),i(),o=t(),{expect:s,fn:c}=__STORYBOOK_MODULE_TEST__,l={component:r,title:`Display/Community Card Header`,tags:[`autodocs`],decorators:[e=>(0,o.jsx)(`div`,{className:`border-border w-160 rounded-lg border`,children:(0,o.jsx)(e,{})})]},u=a[0],d={person:u,action:`shared a week`,ago:`2d ago`,onOpenProfile:c()},f={args:d},p={args:{person:u,showHandle:!0,withBorder:!0,ago:`4d ago`,onOpenProfile:c()}},m={args:d,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`link`,{name:u.name})),await s(e.onOpenProfile).toHaveBeenCalled()}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    person,
    showHandle: true,
    withBorder: true,
    ago: "4d ago",
    onOpenProfile: fn()
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("link", {
      name: person.name
    }));
    await expect(args.onOpenProfile).toHaveBeenCalled();
  }
}`,...m.parameters?.docs?.source}}},h=[`WithAction`,`WithHandle`,`OpensProfileOnClick`]}))();export{m as OpensProfileOnClick,f as WithAction,p as WithHandle,h as __namedExportsOrder,l as default};