import { FormControl, Input } from "@chakra-ui/react";
import { Button, Text } from "@chakra-ui/react";
import { hasNameAndId } from "../utils/helper";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FormType } from "../hooks/useFormHandler";
import {memo} from 'react';

export const FormNameInputUI = memo(({ register, error }: {register: UseFormRegister<FormType>; error?: FieldError}) => (
    <>
        {!hasNameAndId() && (
            <FormControl pt="20px" pb="20px">
                <Input
                    {...register("name")}
                    fontFamily="'Poppins', sans-serif"
                    variant="flushed"
                    placeholder="Your name"
                    width="100%"
                />
                {error && (
                    <Text color="red" size="sm">
                        {error.message}
                    </Text>
                )}
            </FormControl>
        )}
    </>
));

export const FormEmailInputUI = memo(({ register, error }: {register: UseFormRegister<FormType>; error?: FieldError}) => (
    <FormControl pt="20px" pb="20px">
        <Input
            {...register("email")}
            fontFamily="'Poppins', sans-serif"
            variant="flushed"
            placeholder="Email Adress"
            width="100%"
        />
        {error && <Text color="red">{error.message}</Text>}
    </FormControl>
));

export const FormMessageInputUI = memo(({ register, error, placeholderText }: {register: UseFormRegister<FormType>; placeholderText: string; error?: FieldError}) => (
    <FormControl pt="20px" pb="20px">
        <Input
            {...register("message")}
            as="textarea"
            variant="flushed"
            fontFamily="'Poppins', sans-serif"
            placeholder={placeholderText}
            height="xs"
            width="100%"
            resize="none"
        />
        {error && <Text color="red">{error.message}</Text>}
    </FormControl>
));

export const FormTagsInputUI = memo(({ onChange, value, placeholderText, error }: { onChange: any; value: string; placeholderText: string; error?: FieldError }) => (
    <FormControl pt="20px" pb="20px">
        <Input
            onChange={onChange}
            value={value}
            placeholder={placeholderText}
            fontFamily="'Poppins', sans-serif"
            variant="flushed" // Keeps the style consistent with other inputs
            width="100%"
        />
        {error && <Text color="red">{error.message}</Text>}
    </FormControl>
));


export const FormSubmitButtonUI = memo(({ onSubmit, title }: {onSubmit: () => void; title: string}) => (
    <Button colorScheme="blue" onClick={onSubmit}>
        {title}
    </Button>
));
