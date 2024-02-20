// useFormValidation.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export interface FormType {
  name: string;
  email: string;
  message: string;
}

const createPostSchema = (nameOptional: boolean, emailOptional: boolean, messageOptional: boolean) => {
  return z.object({
    name: nameOptional ? z.string().optional() : z.string().nonempty({ message: "Name is required" }),
    email: emailOptional ? z.string().optional() : z.string().email({ message: "Email is not valid" }),
    message: messageOptional ? z.string().optional() : z.string().nonempty({ message: "Feedback is required" }),
  });
};

export const useFormValidation = (nameOptional = true, emailOptional = true, messageOptional = true) => {
  const methods = useForm({
    resolver: zodResolver(createPostSchema(nameOptional, emailOptional, messageOptional)),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return methods;
};
