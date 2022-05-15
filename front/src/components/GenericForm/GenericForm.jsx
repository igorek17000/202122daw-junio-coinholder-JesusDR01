//@ts-check
import React, { useEffect } from 'react';
import { StyledGenericForm } from './GenericForm.styled';
import {
  Button,
  FormControlLabel,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
export const GenericForm = ({
  formInitialState,
  handleSubmit,
  children,
  validationSchema,
  formTemplate,
}) => {

  const components = {
    text: (props) => {
      return (
        <TextField
          margin="normal"
          autoComplete="off"
          fullWidth
          {...props}
          setfieldvalue={undefined}
          radiooptions={undefined}
        />
      );
    },
    radio: (props) => {
      const [selectedValue, setSelectedValue] = React.useState('');
      useEffect(() => {
        setSelectedValue(props.defaultChecked);
      }, []);

      const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
      
      return (
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend"> {props.label}</FormLabel>
            <RadioGroup
              name={props.name}
              value={props.defaultChecked}
              onChange={(event) => {
                props.setfieldvalue(props.name, event.currentTarget.value);
              }}
            >
              {props?.radiooptions?.map((radioOption) => (
                <FormControlLabel
                  key={radioOption.value}
                  label={radioOption.label}
                  value={radioOption.value}
                  name={props.name}
                  control={<Radio />}
                  checked={radioOption.value === selectedValue}
                  onChange={handleChange}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </>
      );
    },
  };
  components.textArea = components.text;
  components.number = components.text;

  return (
    <StyledGenericForm
      initialValues={formInitialState}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, handleChange, submitForm, handleBlur, touched, errors, setFieldValue }) => (
        <>
          {formTemplate.map(
            (
              { type = 'text', name, label, placeholder = '', radioOptions = null, defaultChecked },
              idx,
            ) => {
              const GenericComponent = components[type];
              return (
                <GenericComponent
                  key={idx}
                  type={type}
                  id={name}
                  name={name}
                  label={label}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values[name]}
                  error={touched[name] && Boolean(errors[name])}
                  helperText={touched[name] && errors[name]}
                  multiline={type === 'textArea'}
                  rows={type === 'textArea' ? 3 : undefined}
                  placeholder={placeholder}
                  radiooptions={radioOptions}
                  defaultChecked={defaultChecked}
                  setfieldvalue={setFieldValue}
                />
              );
            },
          )}

          <Button type="submit" onClick={submitForm} fullWidth variant="contained">
            {children}
          </Button>
        </>
      )}
    </StyledGenericForm>
  );
};
