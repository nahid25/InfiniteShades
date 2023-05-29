// useFormValidation.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// 1. Create schema function
const createPostSchema = (emailOptional: boolean, messageOptional: boolean) => {
  return z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: emailOptional ? z.string().optional() : z.string().email({ message: "Email is not valid" }),
    message: messageOptional? z.string().optional(): z.string().nonempty("Feedback is required"),
  });
};

export const useFormValidation = (emailOptional = true, messageOptional = true) => {
  // 2. Use form with zodResolver
  const methods = useForm({
    resolver: zodResolver(createPostSchema(emailOptional, messageOptional)),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return methods;
};
