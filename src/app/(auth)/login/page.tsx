"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import api from "@/lib/api"
import { useAuthStore } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams, useRouter } from "next/navigation"

const schema = z.object({
  usernameOrEmail: z.string().min(3),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get("next") || "/workspaces"

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const res = await api.post("/api/auth/login", data)
    const { accessToken, user } = res.data
    useAuthStore.getState().setSession(accessToken, user)
    router.replace(next)
  }

  return (
    <main className='flex flex-col justify-center place-items-center h-screen p-4'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-sm space-y-4'
      >
        <h1 className='text-2xl font-semibold text-center'>Log in to Kuluma</h1>
        <Input
          placeholder='Email or Username'
          {...register("usernameOrEmail")}
        />
        {errors.usernameOrEmail && (
          <p className='text-red-500 text-sm'>
            {errors.usernameOrEmail.message}
          </p>
        )}
        <Input
          type='password'
          placeholder='Password'
          {...register("password")}
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}
        <Button disabled={isSubmitting} className='w-full'>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      {/* if user does not have logins then create url that will redirect them to register page */}
      <p className='text-sm text-muted-foreground'>
        Don&#39;t have an account?{" "}
        <a href={`/register?next=${next}`} className='underline text-blue-500'>
          Register
        </a>
      </p>
    </main>
  )
}
