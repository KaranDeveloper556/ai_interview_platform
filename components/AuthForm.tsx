"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "./ui/button";
import { toast } from "sonner";
import CustomFormField from "./CustomFormField";
import { Form } from "./ui/form";

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";

  const authFormSchema = (type: FormType) => {
    return z.object({
      name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
      email: z.string().min(3),
      password: z.string().min(6),
    });
  };
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully. Please Sign In");
        router.push("/sign-in");
      } else {
        toast.success("Sign In succesfully.");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong? ${err}`);
    }
  }

  return (
    <div className="card-border lg:min-w-139">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/main-logo.png" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepPulse</h2>
        </div>
        <h3>
          Refine your interview skills. Practice AI powered job interview.
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <CustomFormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter Name"
              />
            )}

            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter Email"
            />

            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter Password"
              type="password"
            />

            <Button type="submit" className="btn w-full">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-blue-400 ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
