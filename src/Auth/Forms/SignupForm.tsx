import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidationSchema } from "@/lib/Validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser} = useUserContext();
  const navigate = useNavigate();

  // 1. Define your form.
// Create a form using the useForm hook and specifying the inferred type from SignupValidationSchema
const form = useForm<z.infer<typeof SignupValidationSchema>>({
  // Set the resolver to integrate zod validation with the form library
  resolver: zodResolver(SignupValidationSchema),

  // Set default values for the form fields
  defaultValues: {
    name: "",
    username: "",
    email: "",
    password: "",
  },
});
  
  
 // Destructuring properties from the object returned by useCreateUserAccount hook
const {
  // Rename mutateAsync to createUserAccount for clarity
  mutateAsync: createUserAccount,

  // Rename isPending to isCreatingAccount for clarity
  isPending: isCreatingAccount,
} = useCreateUserAccount();

// Now, createUserAccount is an asynchronous function for creating a user account,
// and isCreatingAccount is a boolean indicating whether the creation process is pending.


  const { mutateAsync: signInAccount } =
    useSignInAccount();

  // 2. Define a submit handler.
// Async function called when the form is submitted
async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
  try {
    // Create a new user account using the createUserAccount function
    const newUser = await createUserAccount(values);

    // Check if the user account creation was unsuccessful
    if (!newUser) {
      // Display a toast message indicating that something went wrong
      return toast({
        title: "Something went wrong. Please login your new account",
      });
    }

    // Attempt to sign in the user using the signInAccount function
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    // Check if the sign-in process was unsuccessful
    if (!session) {
      // Display a toast message indicating that sign-in failed
      return toast({ title: "Sign in failed. Please try again" });
    }

    // Check if the user is successfully authenticated after sign-in
    const isLoggedIn = await checkAuthUser();

    // If the user is authenticated, reset the form, navigate to the home page, and display a success message
    if (isLoggedIn) {
      form.reset();  // Reset the form state
      navigate("/"); // Navigate to the home page
    } else {
      // If authentication fails, display a toast message indicating a sign-up failure
      toast({ title: "Sign up failed. Please try again." });
    }

  } catch (error) {
    // Log and handle any errors that occur during the form submission process
    console.error("Error during form submission:", error);
  }
}


  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
