import { defineMessages } from "react-intl";

export const signUpFormMessages = defineMessages({
  userNameRequired: {
    description: "SignUpForm: error - username required",
    defaultMessage: "We need to call you something",
    id: "xpo7+y",
  },
  userNameLabel: {
    description: "SignUpForm: label - username input",
    defaultMessage: "Name",
    id: "XvNWOi",
  },
  userNamePlaceholder: {
    description: "SignUpForm: placeholder - username input",
    defaultMessage: "What should we call you?",
    id: "Tij9Hh",
  },
  emailLabel: {
    description: "SignUpForm: label - email input",
    defaultMessage: "Email",
    id: "DIddlg",
  },
  emailPlaceholder: {
    description: "SignUpForm: placeholder - email input",
    defaultMessage: "you@example.com",
    id: "YqgzbB",
  },
  passwordLabel: {
    description: "SignUpForm: label - password input",
    defaultMessage: "Password",
    id: "N7+yLP",
  },
  passwordPlaceholder: {
    description: "SignUpForm: placeholder - password input",
    defaultMessage: "At least 8 characters",
    id: "n+a27x",
  },
  togglePasswordVisibility: {
    description: "SignUpForm: aria-label - toggle password visibility button",
    defaultMessage: "Toggle password visibility",
    id: "QwECCi",
  },
  terms: {
    description: "SignUpForm: label - terms and privacy consent checkbox",
    defaultMessage: "I agree to the terms and privacy policy.",
    id: "9HQ90e",
  },
  termsRequired: {
    description: "SignUpForm: error - terms must be accepted",
    defaultMessage: "Please accept the terms to continue",
    id: "oyHEdk",
  },
  submit: {
    description: "SignUpForm: button - submit sign up",
    defaultMessage: "Create account",
    id: "7+S5V5",
  },
});
