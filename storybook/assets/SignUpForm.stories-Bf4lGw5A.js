import{i as e}from"./preload-helper-CT_b8DTk.js";import{c as t,t as n}from"./src-CO1J98b5.js";import{n as r,t as i}from"./SignUpForm-C7DiYNmB.js";var a,o,s,c,l,u,d,f,p,m;e((()=>{n(),r(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={component:i,title:`Forms/Sign Up`,decorators:[t],parameters:{a11y:{config:{rules:[{id:`color-contrast`,enabled:!1}]}}}},s={loading:!1,onSubmit:()=>console.log(`onSubmit`)},c={args:s},l={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`sign-up-form__username-input`),`username`),await t.type(e.getByTestId(`sign-up-form__email-input`),`email@provider.com`),await t.type(e.getByTestId(`sign-up-form__password-input`),`password`),await t.click(e.getByTestId(`sign-up-form__terms-checkbox`)),await t.click(e.getByTestId(`sign-up-form__submit-button`)),await a(e.getByTestId(`sign-up-form__username-input`)).toHaveValue(`username`),await a(e.getByTestId(`sign-up-form__email-input`)).toHaveValue(`email@provider.com`),await a(e.getByTestId(`sign-up-form__password-input`)).toHaveValue(`password`)}},u={args:s,play:async({canvas:e,userEvent:t})=>{await t.click(e.getByTestId(`sign-up-form__submit-button`)),await a(e.getByText(`We need to call you something`)).toBeInTheDocument(),await a(e.getByText(`Email must be valid`)).toBeInTheDocument(),await a(e.getByText(`Password is too short - should be 8 chars minimum`)).toBeInTheDocument()}},d={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`sign-up-form__username-input`),`username`),await t.type(e.getByTestId(`sign-up-form__email-input`),`email@provider.com`),await t.type(e.getByTestId(`sign-up-form__password-input`),`short`),await t.click(e.getByTestId(`sign-up-form__submit-button`)),await a(e.getByText(`Password is too short - should be 8 chars minimum`)).toBeInTheDocument()}},f={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`sign-up-form__username-input`),`username`),await t.type(e.getByTestId(`sign-up-form__email-input`),`email@provider.com`),await t.type(e.getByTestId(`sign-up-form__password-input`),`password`),await t.click(e.getByTestId(`sign-up-form__submit-button`)),await a(e.getByText(`Please accept the terms to continue`)).toBeInTheDocument()}},p={args:s,play:async({canvas:e,userEvent:t})=>{await t.type(e.getByTestId(`sign-up-form__password-input`),`kitchen-table-1!`),await a(e.getByTestId(`password-strength__label`)).toHaveTextContent(`Strong`)}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("sign-up-form__username-input"), "username");
    await userEvent.type(canvas.getByTestId("sign-up-form__email-input"), "email@provider.com");
    await userEvent.type(canvas.getByTestId("sign-up-form__password-input"), "password");
    await userEvent.click(canvas.getByTestId("sign-up-form__terms-checkbox"));
    await userEvent.click(canvas.getByTestId("sign-up-form__submit-button"));
    await expect(canvas.getByTestId("sign-up-form__username-input")).toHaveValue("username");
    await expect(canvas.getByTestId("sign-up-form__email-input")).toHaveValue("email@provider.com");
    await expect(canvas.getByTestId("sign-up-form__password-input")).toHaveValue("password");
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("sign-up-form__submit-button"));
    await expect(canvas.getByText("We need to call you something")).toBeInTheDocument();
    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument();
    await expect(canvas.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument();
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("sign-up-form__username-input"), "username");
    await userEvent.type(canvas.getByTestId("sign-up-form__email-input"), "email@provider.com");
    await userEvent.type(canvas.getByTestId("sign-up-form__password-input"), "short");
    await userEvent.click(canvas.getByTestId("sign-up-form__submit-button"));
    await expect(canvas.getByText("Password is too short - should be 8 chars minimum")).toBeInTheDocument();
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("sign-up-form__username-input"), "username");
    await userEvent.type(canvas.getByTestId("sign-up-form__email-input"), "email@provider.com");
    await userEvent.type(canvas.getByTestId("sign-up-form__password-input"), "password");
    await userEvent.click(canvas.getByTestId("sign-up-form__submit-button"));
    await expect(canvas.getByText("Please accept the terms to continue")).toBeInTheDocument();
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByTestId("sign-up-form__password-input"), "kitchen-table-1!");
    await expect(canvas.getByTestId("password-strength__label")).toHaveTextContent("Strong");
  }
}`,...p.parameters?.docs?.source}}},m=[`Standard`,`Success`,`MissingFields`,`PasswordTooShort`,`TermsNotAccepted`,`StrengthMeter`]}))();export{u as MissingFields,d as PasswordTooShort,c as Standard,p as StrengthMeter,l as Success,f as TermsNotAccepted,m as __namedExportsOrder,o as default};