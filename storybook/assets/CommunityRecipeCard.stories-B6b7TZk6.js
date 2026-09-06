import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{n,o as r}from"./RecipeSampleData-DKdWjSE_.js";import{n as i,t as a}from"./CommunityCardHeader-dg1e8VUG.js";import{i as o,n as s}from"./CommunitySampleData-TKcJX8eP.js";import{n as c,t as l}from"./CommunityRecipeCard-Ckx5_RQ-.js";var u,d,f,p,m,h,g,_,v,y,b,x,S,C;e((()=>{c(),i(),o(),r(),u=t(),{expect:d,fn:f}=__STORYBOOK_MODULE_TEST__,p={component:l,title:`Display/Community Recipe Card`,tags:[`autodocs`],decorators:[e=>(0,u.jsx)(`div`,{className:`w-180`,children:(0,u.jsx)(e,{})})]},m=n.find(e=>e.author.id!==`me`&&e.photoUrl!==null),h=n.find(e=>e.author.id!==`me`&&e.photoUrl===null),g=s.find(e=>e.id===m.author.id),_={recipe:m,onRecommend:f(),onOpen:f()},v={args:_},y={args:{..._,recipe:h}},b={args:{..._,header:(0,u.jsx)(a,{person:g,action:`added a recipe`,ago:`3d ago`,onOpenProfile:f()})}},x={args:{..._,photoHeight:`short`}},S={args:_,play:async({args:e,canvas:t,userEvent:n})=>{await n.click(t.getByRole(`button`,{name:`View recipe`})),await d(e.onOpen).toHaveBeenCalled()}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    recipe: withoutPhoto
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    header: <CommunityCardHeader person={author} action="added a recipe" ago="3d ago" onOpenProfile={fn()} />
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    photoHeight: "short"
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "View recipe"
    }));
    await expect(args.onOpen).toHaveBeenCalled();
  }
}`,...S.parameters?.docs?.source}}},C=[`WithPhoto`,`WithoutPhoto`,`InTheFeed`,`ShortPhoto`,`OpensOnClick`]}))();export{b as InTheFeed,S as OpensOnClick,x as ShortPhoto,v as WithPhoto,y as WithoutPhoto,C as __namedExportsOrder,p as default};