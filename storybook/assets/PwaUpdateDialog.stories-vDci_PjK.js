import{i as e}from"./preload-helper-CT_b8DTk.js";import{i as t,n,r}from"./iframe-BxGJe6Y9.js";import{Q as i,t as a,wt as o}from"./dist-DFOu2y8R.js";import{i as s,t as c,u as l}from"./src-CO1J98b5.js";function u(e,t,n,r){return[e.formatMessage({description:`PwaUpdateDialog: toast - update available`,defaultMessage:`A new version of {appName} is available`,id:`WMIsMz`},{appName:t}),{onClose:n,actionProps:{children:e.formatMessage({description:`PwaUpdateDialog: button - update`,defaultMessage:`Update`,id:`kaheVZ`}),onPress:r}}]}var d=e((()=>{})),f,p,m,h,g,_;e((()=>{a(),c(),n(),d(),f=t(),{expect:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Feedback/PWA Update`,decorators:[l,s]},g={render:()=>{let e=r();return(0,f.jsx)(o,{onPress:()=>{let[t,n]=u(e,`App`,()=>console.log(`onClose`),()=>console.log(`onUpdate`));i(t,n)},children:`Show Toast`})},play:async({canvas:e,userEvent:t})=>{await t.click(e.getByRole(`button`,{name:`Show Toast`}));let n=m(document.body);await p(await n.findByText(/A new version of App is available/i)).toBeInTheDocument(),await p(await n.findByRole(`button`,{name:/update/i})).toBeInTheDocument()}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const intl = useIntl();
    return <Button onPress={() => {
      const [msg, opts] = PwaUpdateDialogProps(intl, "App", () => console.log("onClose"), () => console.log("onUpdate"));
      toast(msg, opts);
    }}>
        Show Toast
      </Button>;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByRole("button", {
      name: "Show Toast"
    }));
    const body = within(document.body);
    await expect(await body.findByText(/A new version of App is available/i)).toBeInTheDocument();
    await expect(await body.findByRole("button", {
      name: /update/i
    })).toBeInTheDocument();
  }
}`,...g.parameters?.docs?.source}}},_=[`UpdateDialog`]}))();export{g as UpdateDialog,_ as __namedExportsOrder,h as default};