"use client"

import Link from "next/link"
import { FormEvent, useRef, useState } from "react"
import { CustomButton, CustomInput, MessageRes } from "../common"
import apiClient from "@/services/apiService"
import useApiRequest from "@/hooks/useRequest"
import { SignInRes } from "@/types"
import { useRouter } from "next/navigation"

export const SignInForm = () => {
    const { loading, error, makeRequest } = useApiRequest<SignInRes, string>();

    const router = useRouter()

    const formRef = useRef<HTMLFormElement | null>(null)

    const [form, setForm] = useState({
        email : "",
        password : ""
    })

    const handleSubmit = async (e:FormEvent) => { 
        e.preventDefault()
        try {
            const data = await makeRequest(() => apiClient.post('/auth/signin', form));
            if(data) {
                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)
            }
            formRef.current?.reset()
            await router.push('/signin')
        } catch (err) {
            formRef.current?.reset()
            console.log(err)
        }
     }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
            <CustomInput 
                type="email" 
                title="Email" 
                handleChange={(e) => {setForm({...form, email : e.target.value})}}
            />
            <CustomInput 
                type="password" 
                title="Password"
                handleChange={(e) => setForm({...form, password : e.target.value})}/>
            <MessageRes error={error}/>
            <Link className="text-blue-500 hover:text-blue-600 text-end" href={`/forgot-password`}>lupa password?</Link>
            <CustomButton 
                title="Daftar"
                type="submit"
                loading={loading}
            />
            <span className="text-center">
                Belum punya akun? <Link className="text-blue-500 hover:text-blue-600" href={`/signup`}>Daftar</Link>
            </span>
        </form>
    )
}