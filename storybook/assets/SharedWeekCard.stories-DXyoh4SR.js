import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,o as r}from"./RecipeSampleData-CBRM2MON.js";import{n as i,t as a}from"./CommunityCardHeader-i2ZrOxx1.js";import{i as o,n as s,r as c}from"./CommunitySampleData-DWWrebhI.js";import{a as l,c as u,l as d,s as f}from"./CommunityUtils-B4LUvKvo.js";import{n as p,t as m}from"./SharedWeekCard-C-Zj-hXD.js";var h,g,_,v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{p(),i(),o(),l(),r(),h=t(),{expect:g,fn:_}=__STORYBOOK_MODULE_TEST__,v={component:m,title:`Display/Shared Week Card`,tags:[`autodocs`],decorators:[e=>(0,h.jsx)(`div`,{className:`w-180`,children:(0,h.jsx)(e,{})})]},y=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],b=c[0],x=s.find(e=>e.id===b.ownerId),S={week:{id:b.id,title:b.title,note:b.note,tags:d(b,n),days:f(b,n,y),photos:u(b,n),usesLabel:`31 uses`,agoLabel:`2d ago`},onRecommend:_(),onUse:_()},C={args:{...S,showAgeBesideTitle:!0}},w={args:{...S,header:(0,h.jsx)(a,{person:x,action:`shared a week`,ago:`2d ago`,onOpenProfile:_()})}},T={args:{...S,header:(0,h.jsx)(a,{person:x,showHandle:!0,withBorder:!0,ago:`2d ago`,onOpenProfile:_()})}},E={args:S,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:`Use this week`})),await g(e.onUse).toHaveBeenCalled()}},D=[`WithoutHeader`,`InTheFeed`,`InTheWeeksGrid`,`UsesTheWeekOnClick`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    showAgeBesideTitle: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    header: <CommunityCardHeader person={owner} action="shared a week" ago="2d ago" onOpenProfile={fn()} />
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    header: <CommunityCardHeader person={owner} showHandle withBorder ago="2d ago" onOpenProfile={fn()} />
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Use this week"
    }));
    await expect(args.onUse).toHaveBeenCalled();
  }
}`,...E.parameters?.docs?.source}}}})))()}O();export{w as InTheFeed,T as InTheWeeksGrid,E as UsesTheWeekOnClick,C as WithoutHeader,D as __namedExportsOrder,v as default};