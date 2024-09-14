import { FormControlLabel, Checkbox } from '@mui/material';
import { useFormikContext } from 'formik';

export const CustomCheckboxField = ({ name, label }) => {
  const { values, handleChange } = useFormikContext();

  return <FormControlLabel control={<Checkbox name={name} checked={values[name]} onChange={handleChange} />} label={label} />;
};
