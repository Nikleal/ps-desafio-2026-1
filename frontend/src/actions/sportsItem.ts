'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createSportsItem(form: FormData) {
    const res = await api('POST', '/products', {data: form})

        if(!res.error){
            revalidatePath('/admin/produtos')
        }
    return JSON.stringify(res)
}

export async function updateSportsItem(form: FormData) {
    const id = form.get('id') as string

    const res = await api('POST', `/products/${id}`, {data: form})

    if(!res.error){
        revalidatePath('/admin/produtos')
    }

    return JSON.stringify(res)
}
    
export async function destroySportsItem(id: string) {
    const res = await api('DELETE', `/products/${id}`)

    if(!res.error){
        revalidatePath('/admin/produtos')
    }
    return JSON.stringify(res)
}

export async function buySportsItem(form: FormData) {
    const id = form.get('id') as string

    const res = await api('POST', `/products/${id}/buy`, {data: form})

    if(!res.error){
        revalidatePath('/admin/produtos')
    }

    return JSON.stringify(res)
}