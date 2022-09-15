import React from 'react';

import { FieldProps, useField } from '@formiz/core';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';

type FieldHiddenProps = FieldProps & FormGroupProps;

export const FieldHidden: React.FC<
  React.PropsWithChildren<FieldHiddenProps>
> = (props) => {
  const { isValid, isSubmitted, errorMessage, otherProps } = useField({
    debounce: 0,
    ...props,
  });
  const { ...rest } = otherProps as Omit<FieldHiddenProps, keyof FieldProps>;
  const showError = !isValid && isSubmitted;
  const formGroupProps = {
    errorMessage,
    showError,
  };

  if (showError) {
    return <FormGroup {...formGroupProps} {...rest} />;
  }
  return null;
};
