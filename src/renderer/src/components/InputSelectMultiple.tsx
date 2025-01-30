import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  OutlinedInputProps,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { STYLE_VARIABLE } from '@renderer/constants/style-variable';
import { ILabelValue } from '@renderer/models/feature-type-interface';

export function InputSelectMultiple(props: IProps) {
  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    if (props.onChange) {
      props.onChange(value[0]);
    }
  };

  return (
    <div className={'w-full'}>
      {props.label && (
        <FormLabel className="" htmlFor={props.name}>
          <div className={`${props.errorMessage && 'text-red-500'} pb-1 capitalize`}>
            {props.label} {props.required && <span className={'text-red-600'}> *</span>}
          </div>
        </FormLabel>
      )}
      <FormControl sx={{ minWidth: 300, width: '100%' }}>
        <Select
          multiple
          value={props.value || []}
          onChange={handleChange}
          name={props.name}
          size={'small'}
          displayEmpty
          onBlur={props.onBlur}
          error={!!props.errorMessage}
          sx={{
            width: '100%',
            background: props.errorMessage
              ? STYLE_VARIABLE.COLORS.SYSTEM.LIGHT_RED
              : STYLE_VARIABLE.COLORS.SYSTEM.WHITE,
          }}
        >
          <MenuItem disabled value={''}>
            <em className={'text-gray-400 font-normal not-italic'}>{props.placeholder}</em>
          </MenuItem>
          {props.options &&
            props.options.map((option) => {
              const Icon = option.icon;
              return (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={props.value && props.value.includes(option.value)} />
                  <div className={`flex items-center gap-2`}>
                    {Icon && (
                      <div>
                        <Icon />
                      </div>
                    )}
                    <div>{option.label}</div>
                  </div>
                </MenuItem>
              );
            })}
        </Select>
        {props.errorMessage && <FormHelperText error={!!props.errorMessage}>{props.errorMessage}</FormHelperText>}
      </FormControl>
    </div>
  );
}

interface IProps {
  value?: string[];
  onChange?: (e?: string) => void;
  options?: ILabelValue<any>[];
  errorMessage?: any;
  label?: string;
  name?: string;
  required?: boolean;
  onBlur?: OutlinedInputProps['onBlur'];
  placeholder?: string;
  dataCheckingDisable?: any[];
}
