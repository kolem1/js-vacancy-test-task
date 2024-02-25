import { ButtonVariant } from '@mantine/core';

declare module '@mantine/core' {
  interface MantineThemeOther {
    black: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      600: string;
    };
    blue: {
      10: '#EAF1FD';
      500: '#5692EF';
      600: '#2B77EB';
      700: '#235FBC';
    };
  }

  interface ButtonProps {
    variant?: ButtonVariant | 'primary' | 'secondary'
  }
}
