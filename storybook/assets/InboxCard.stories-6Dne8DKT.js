import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{n,o as r}from"./RecipeSampleData-DKdWjSE_.js";import{i,n as a,r as o}from"./CommunitySampleData-TKcJX8eP.js";import{n as s,t as c}from"./InboxCard-Bxful7rk.js";import{a as l,l as u,s as d}from"./CommunityUtils-DWRFMwN9.js";var f,p,m,h,g,_,v,y,b,x,S,C;e((()=>{s(),i(),l(),r(),f=t(),{expect:p,fn:m}=__STORYBOOK_MODULE_TEST__,h={component:c,title:`Display/Inbox Card`,tags:[`autodocs`],decorators:[e=>(0,f.jsx)(`div`,{className:`w-180`,children:(0,f.jsx)(e,{})})]},g=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],_=o[1],v=n.find(e=>e.id===`c7`),y={item:{id:`n1`,kind:`week`,from:a[1],action:`recommended a week`,ago:`1d ago`,note:`Thought of you when I put this week together. The Tuesday one is the winner.`,title:_.title,tags:u(_,n),days:d(_,n,g)},onOpenProfile:m(),onAccept:m(),onDismiss:m()},b={args:y},x={args:{...y,item:{id:`n2`,kind:`recipe`,from:a[0],action:`recommended a recipe`,ago:`3d ago`,note:`Twenty-five minutes and it tastes like you tried much harder.`,title:v.title,tags:v.tags,days:[]}}},S={args:y,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByTestId(`inbox-card__accept--n1`)),await p(e.onAccept).toHaveBeenCalled()}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    item: {
      id: "n2",
      kind: "recipe",
      from: SampleCommunityPeople[0]!,
      action: "recommended a recipe",
      ago: "3d ago",
      note: "Twenty-five minutes and it tastes like you tried much harder.",
      title: recipe.title,
      tags: recipe.tags,
      days: []
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("inbox-card__accept--n1"));
    await expect(args.onAccept).toHaveBeenCalled();
  }
}`,...S.parameters?.docs?.source}}},C=[`AWeek`,`ARecipe`,`AcceptsOnClick`]}))();export{x as ARecipe,b as AWeek,S as AcceptsOnClick,C as __namedExportsOrder,h as default};