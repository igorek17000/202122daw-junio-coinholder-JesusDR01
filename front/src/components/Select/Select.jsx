import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const  BasicSelect = ({title, elementSelectedState, children}) => {
const [element, setElementSelected] = elementSelectedState;
  const handleChange = (event) => {
    setElementSelected(event.target.value);
  };

  return (
    <Box minWidth={120}>
      <FormControl fullWidth size="small">
        <InputLabel id="portfolio-selector-label">{title}</InputLabel>
        <Select
          labelId="portfolio-selector-label"
          id="portfolio-selector"
          value={element}
          label={title}
          onChange={handleChange}
        >
            {children}
        </Select>
      </FormControl>
    </Box>
  );
}
