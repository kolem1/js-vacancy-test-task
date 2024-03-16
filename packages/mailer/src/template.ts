import { SignUpWelcome, SignUpWelcomeProps } from '../emails/sign-up-welcome';
import { VerifyEmail, VerifyEmailProps } from '../emails/verify-email';

export enum Template {
  RESET_PASSWORD,
  SIGN_UP_WELCOME,
  VERIFY_EMAIL,
}

export const EmailComponent = {
  [Template.SIGN_UP_WELCOME]: SignUpWelcome,
  [Template.VERIFY_EMAIL]: VerifyEmail,
};

export type TemplateProps = {
  [Template.SIGN_UP_WELCOME]: SignUpWelcomeProps;
  [Template.VERIFY_EMAIL]: VerifyEmailProps;
};
