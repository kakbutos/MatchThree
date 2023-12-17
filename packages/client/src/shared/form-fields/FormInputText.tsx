import {
  Controller,
  Control,
  FieldValues,
  UseControllerOptions,
} from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type FormInputTextProps = TextFieldProps & {
  name: string;
  control: Control<FieldValues>;
  rules?: UseControllerOptions['rules'];
};

export const FormInputText: React.FC<FormInputTextProps> = ({
  name,
  control,
  rules,
  ...textFieldProps
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={(field, state) => (
      <TextField
        id={name}
        error={state.invalid}
        helperText={
          state.invalid ? control.formState.errors[name]?.message : ' '
        }
        inputProps={field}
        fullWidth
        margin="normal"
        {...textFieldProps}
      />
    )}
  />
);
