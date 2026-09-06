import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t}from"./iframe-BxGJe6Y9.js";import{n,t as r}from"./GithubIcon-CIUk81sE.js";var i,a,o,s,c;e((()=>{n(),i=t(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={component:r,title:`Shared/Icons/Github Icon`,tags:[`autodocs`]},s={decorators:[e=>(0,i.jsx)(`span`,{className:`text-foreground block h-8 w-8 fill-current`,children:(0,i.jsx)(e,{})})],play:async({canvas:e})=>{await a(e.getByRole(`img`,{name:`GitHub`})).toBeInTheDocument()}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <span className="text-foreground block h-8 w-8 fill-current">
        <Story />
      </span>],
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole("img", {
      name: "GitHub"
    })).toBeInTheDocument();
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`]}))();export{s as Default,c as __namedExportsOrder,o as default};