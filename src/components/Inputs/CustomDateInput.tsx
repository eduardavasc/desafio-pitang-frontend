import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
interface CustomDateInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  dateFormat: string;
  withPortal?: boolean;
  showTimeSelect?: boolean;
  timeIntervals?: number;
  minDate?: Date;
  minTime?: Date;
  maxTime?: Date;
  filterTime?: (time: Date) => boolean;
  showYearDropdown?: boolean;
}
const CustomDateInput = <T extends FieldValues>({
  name,
  label,
  control,
  dateFormat,
  errors,
  withPortal,
  showTimeSelect,
  timeIntervals,
  minDate,
  minTime,
  maxTime,
  filterTime,
  showYearDropdown,
}: CustomDateInputProps<T>) => {
  return (
    <FormControl isRequired mt={4} isInvalid={!!errors[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            withPortal={withPortal}
            showTimeSelect={showTimeSelect}
            timeIntervals={timeIntervals}
            minDate={minDate}
            minTime={minTime}
            maxTime={maxTime}
            filterTime={filterTime}
            showYearDropdown={showYearDropdown}
            dateFormat={dateFormat}
            customInput={<Input />}
          />
        )}
      />
      <FormErrorMessage>
        {errors[name] && errors[name]?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CustomDateInput;
