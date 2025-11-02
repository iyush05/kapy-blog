"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { trpc } from "@/trpc/react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { OctagonAlertIcon } from "lucide-react";
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"


const formSchema = z.object({
    name: z.string().min(2, {message: "Minimum length of name should be 2"}),
    username: z.string().min(2, {message: "Minimum length of name should be 2"}),
    email: z.string().min(1, { message: "This field has to be filled"}).email("This is not a valid email."),
    password: z.string().min(5, { message: "Minimum password length should be 5."})
})

export const SignUpView = () => {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const createUser = trpc.auth.create.useMutation({
        onSuccess: () => {
            setPending(false);
            setError(null);
            console.log("User created successfully")
            router.push("/");
        },
        onError: (err) => {
            setError(err.message || "Something wend wrong");
            setPending(false)
            console.error("Failed adding user:", err);
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true)
    try {
        const result = await createUser.mutateAsync(values);
        setPending(false)
        console.log("User created:", result)
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Unexpected error occurred");
        }
        console.error("Failed adding user:", err);
    } finally {
        setPending(false);
    }
  }

    return (
    <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    Let&apos;s get started
                                </h1>
                                <p className="text-muted-foreground text-balance">
                                    Create your account
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dexter Morgan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="iyush05" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="dexter@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                        type="password"
                                        placeholder="*******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            {!!error && (
                                        <Alert className="bg-destructive/10 border-none">
                                            <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
                                            <AlertTitle>{error}</AlertTitle>
                                        </Alert>
                            )}
                            <Button
                                disabled={pending}
                                type="submit"
                                className="w-full">
                                Sign in
                            </Button>
                            <div className="text-center text-sm">
                                    Already have an account?{" "} 
                                    <Link href="/sign-in">
                                        Sign in
                                    </Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
)
}