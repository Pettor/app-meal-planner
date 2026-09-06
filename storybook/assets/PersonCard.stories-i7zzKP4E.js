import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{i as n,n as r}from"./CommunitySampleData-TKcJX8eP.js";import{n as i,t as a}from"./PersonCard-s9hxhvLi.js";var o,s,c,l,u,d,f,p,m,h,g;e((()=>{i(),n(),o=t(),{expect:s,fn:c}=__STORYBOOK_MODULE_TEST__,l={component:a,title:`Display/Person Card`,tags:[`autodocs`],decorators:[e=>(0,o.jsx)(`div`,{className:`w-73`,children:(0,o.jsx)(e,{})})]},u=r[0],d={person:u,counts:`6 weeks · 12 recipes`,isFollowing:!1,onToggleFollow:c(),onOpenProfile:c()},f={args:d},p={args:{...d,isFollowing:!0}},m={args:{...d,person:r[3]}},h={args:d,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByTestId(`person-card__follow--${u.id}`)),await s(e.onToggleFollow).toHaveBeenCalled()}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    isFollowing: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    person: SampleCommunityPeople[3]!
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId(\`person-card__follow--\${person.id}\`));
    await expect(args.onToggleFollow).toHaveBeenCalled();
  }
}`,...h.parameters?.docs?.source}}},g=[`NotFollowing`,`Following`,`DoesNotFollowYou`,`FollowsOnClick`]}))();export{m as DoesNotFollowYou,p as Following,h as FollowsOnClick,f as NotFollowing,g as __namedExportsOrder,l as default};