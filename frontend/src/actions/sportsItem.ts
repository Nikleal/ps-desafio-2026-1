'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createSportsItem(form: FormData) {
    const res = await api('POST', '/instruments', {data: form})

        if(!res.error){
            revalidatePath('/admin/produtos')
        }
    return JSON.stringify(res)
}

export async function updateSportsItem(form: FormData) {
    const id = form.get('id') as string

    const res = await api('POST', `instruments/${id}`, {data: form})

    if(!res.error){
        revalidatePath('/admin/produtos')
    }

    return JSON.stringify(res)
}
    
export async function destroySportsItem(id: string) {
    const res = await api('DELETE', `/instruments/${id}`)

    if(!res.error){
        revalidatePath('/admin/produtos')
    }
    return JSON.stringify(res)
}
