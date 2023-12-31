'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {useCallback, useState} from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const loginModal = useLoginModal();


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    }= useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            phone:'',
            password:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues>= (data)=>{
        setIsLoading(true);
        axios.post('api/register', data)
        .then(() => {
            registerModal.onClose();
        })
        .catch((error)=>{
            toast.error('Terjadi Kesalahan');
        })
        .finally(()=>{
            setIsLoading(false);
            toast.success('Selamat akun anda telah terdaftar')
        })
    }

    const toggle = useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    },[registerModal, loginModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
            title='Selamat Datang di CariKost'
            subtitle='Buat Akun'/>
            <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required/>
             <Input
            id="name"
            label="Nama"
            disabled={isLoading}
            register={register}
            errors={errors}
            required/>
            <Input
            id="phone"
            label="No.WhatsApp"
            disabled={isLoading}
            register={register}
            errors={errors}
            required/>
             <Input
            id="password"
            label="Password"
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required/>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button
            outline
            label='Daftar dengan Google'
            icon={FcGoogle}
            onClick={()=>signIn('google')}/>

             <Button
            outline
            label='Daftar dengan Github'
            icon={AiFillGithub}
            onClick={()=>signIn('github')}/>

            <div
            className='
            text-neutral-500
            text-center
            font-light
            mt-4
            '>
                <div className='justify-center flex flex-row gap-2 items-center'>
                    <div>Sudah punya akun?</div>
                    <div
                    className='text-neutral-800
                    hover:underline
                    cursor-pointer'
                    onClick={toggle}>Login</div>
                    
                </div>
            </div>
        </div>
        
        
    )
    return ( 
      <Modal
      disabled= {isLoading}
      isOpen= {registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
     );
}
 
export default RegisterModal;