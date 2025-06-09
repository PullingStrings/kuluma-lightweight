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
  // usernameOrEmail: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(6),
  displayName: z.string().min(3),
  email: z.string().email(),
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
    const res = await api.post("/api/auth/register", data)
    useAuthStore.getState().setSession(res.data.token, res.data.user)
    router.replace(next)
  }

  return (
    <main className='grid place-items-center h-screen p-4'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-sm space-y-4'
      >
        <h1 className='text-2xl font-semibold text-center'>
          Register to Kuluma
        </h1>
        <Input placeholder='Username' {...register("username")} />
        {errors.username && (
          <p className='text-red-500 text-sm'>{errors.username.message}</p>
        )}
        <Input type='email' placeholder='Email' {...register("email")} />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}
        <Input
          type='password'
          placeholder='Password'
          {...register("password")}
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}
        <Input
          type='display name'
          placeholder='Display Name'
          {...register("displayName")}
        />
        <Button disabled={isSubmitting} className='w-full'>
          {isSubmitting ? "Signing in…" : "Register"}
        </Button>
      </form>
    </main>
  )
}
