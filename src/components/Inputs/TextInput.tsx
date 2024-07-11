import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
}

const TextInput = <T extends FieldValues>({
  register,
  errors,
  name,
  label,
  disabled,
}: TextInputProps<T>) => {
  return (
    <FormControl isInvalid={!!errors[name]} isRequired>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} disabled={disabled} {...register(name)} />
      <FormErrorMessage>
        {errors[name] && errors[name]?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
