import { FC } from 'react';

import { useBreakpointValue } from '@chakra-ui/media-query';
import {
  Button,
  ButtonProps,
  IconButton,
  ResponsiveValue,
  forwardRef,
} from '@chakra-ui/react';

type ResponsiveIconButtonProps = ButtonProps & {
  hideTextBreakpoints?: Omit<ResponsiveValue<boolean>, 'boolean'>;
  icon: React.ReactElement;
  children: string;
  iconPosition?: 'left' | 'right';
};

export const ResponsiveIconButton: FC<
  React.PropsWithChildren<ResponsiveIconButtonProps>
> = forwardRef(
  (
    {
      hideTextBreakpoints = {
        base: true,
        md: false,
      },
      children,
      icon,
      iconPosition = 'left',
      ...rest
    },
    ref
  ) => {
    const responsiveStates = useBreakpointValue(hideTextBreakpoints);

    const buttonProps =
      iconPosition === 'right' ? { rightIcon: icon } : { leftIcon: icon };

    return responsiveStates ? (
      <IconButton aria-label={children} icon={icon} ref={ref} {...rest} />
    ) : (
      <Button ref={ref} {...buttonProps} {...rest}>
        {children}
      </Button>
    );
  }
);
