'use client'

import axios from 'axios';
import {signIn} from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {useCallback, useState} from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import {useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    }= useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });
    const toggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal])

    const onSubmit: SubmitHandler<FieldValues>= (data)=>{
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Anda telah masuk');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
            title='Selamat Datang di CariKost'
            subtitle='Masuk ke akun anda'/>
            <Input
            id="email"
            label="Email"
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
            label='Masuk dengan Google'
            icon={FcGoogle}
            onClick={()=>signIn('google')}/>

             <Button
            outline
            label='Masuk dengan Github'
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
                    <div>Belum punya akun?</div>
                    <div
                    className='text-neutral-800
                    hover:underline
                    cursor-pointer'
                    onClick={toggle}>Daftar</div>
                    
                </div>
            </div>
        </div>
        
        
    )
    return ( 
      <Modal
      disabled= {isLoading}
      isOpen= {loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
     );
}
 
export default LoginModal;