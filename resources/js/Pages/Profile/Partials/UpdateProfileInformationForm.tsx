import { router } from '@inertiajs/core';
import { Link, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import { Country, Difficulty, Instrument, User } from '@/types';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
    user: User;
    countries: Country[];
    instruments: Instrument[];
    difficulties: Difficulty[];
}


export default function UpdateProfileInformationForm({ user, countries, instruments, difficulties }: Props) {
    const form = useForm({
        _method: 'PUT',
        name: user.name,
        email: user.email,
        country_code: user.country_code,
        instrument_id: user.instrument_id,
        difficulty_id: user.difficulty_id,
        photo: null as File | null,
    });
    const route = useRoute();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoRef = useRef<HTMLInputElement>(null);
    const page = useTypedPage();
    const [verificationLinkSent, setVerificationLinkSent] = useState(false);

    function updateProfileInformation() {
        form.post(route('user-profile-information.update'), {
            errorBag: 'updateProfileInformation',
            preserveScroll: true,
            onSuccess: () => clearPhotoFileInput(),
        });
    }

    function selectNewPhoto() {
        photoRef.current?.click();
    }

    function updatePhotoPreview() {
        const photo = photoRef.current?.files?.[0];

        if (!photo) {
            return;
        }

        form.setData('photo', photo);

        const reader = new FileReader();

        reader.onload = e => {
            setPhotoPreview(e.target?.result as string);
        };

        reader.readAsDataURL(photo);
    }

    function deletePhoto() {
        router.delete(route('current-user-photo.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
            },
        });
    }

    function clearPhotoFileInput() {
        if (photoRef.current?.value) {
            photoRef.current.value = '';
            form.setData('photo', null);
        }
    }

    return (
        <FormSection
            onSubmit={updateProfileInformation}
            title={'Profile Information'}
            description={`Update your account's profile information and email address.`}
            renderActions={() => (
                <>
                    <ActionMessage on={form.recentlySuccessful} className='mr-3'>
                        Saved.
                    </ActionMessage>

                    <PrimaryButton
                        className={classNames({ 'opacity-25': form.processing })}
                        disabled={form.processing}
                    >
                        Save
                    </PrimaryButton>
                </>
            )}
        >
            {/* <!-- Profile Photo --> */}
            {page.props.jetstream.managesProfilePhotos ? (
                <div className='col-span-6 sm:col-span-4'>
                    {/* <!-- Profile Photo File Input --> */}
                    <input
                        type='file'
                        className='hidden'
                        ref={photoRef}
                        onChange={updatePhotoPreview}
                    />

                    <InputLabel htmlFor='photo' value='Photo' />

                    {photoPreview ? (
                        // <!-- New Profile Photo Preview -->
                        <div className='mt-2'>
              <span
                  className='block rounded-full w-20 h-20'
                  style={{
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                      backgroundImage: `url('${photoPreview}')`,
                  }}
              ></span>
                        </div>
                    ) : (
                        // <!-- Current Profile Photo -->
                        <div className='mt-2'>
                            <img
                                src={user.profile_photo_url}
                                alt={user.name}
                                className='rounded-full h-20 w-20 object-cover'
                            />
                        </div>
                    )}

                    <SecondaryButton
                        className='mt-2 mr-2'
                        type='button'
                        onClick={selectNewPhoto}
                    >
                        Select A New Photo
                    </SecondaryButton>

                    {user.profile_photo_path ? (
                        <SecondaryButton
                            type='button'
                            className='mt-2'
                            onClick={deletePhoto}
                        >
                            Remove Photo
                        </SecondaryButton>
                    ) : null}

                    <InputError message={form.errors.photo} className='mt-2' />
                </div>
            ) : null}

            {/* <!-- Name --> */}
            <div className='col-span-6 sm:col-span-4'>
                <InputLabel htmlFor='name' value='Name' />
                <TextInput
                    id='name'
                    type='text'
                    className='mt-1 block w-full'
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    autoComplete='name'
                />
                <InputError message={form.errors.name} className='mt-2' />
            </div>

            {/* <!-- Email --> */}
            <div className='col-span-6 sm:col-span-4'>
                <InputLabel htmlFor='email' value='Email' />
                <TextInput
                    id='email'
                    type='email'
                    className='mt-1 block w-full'
                    value={form.data.email}
                    onChange={e => form.setData('email', e.currentTarget.value)}
                />
                <InputError message={form.errors.email} className='mt-2' />

                {page.props.jetstream.hasEmailVerification &&
                user.email_verified_at === null ? (
                    <div>
                        <p className='text-sm mt-2'>
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method='post'
                                as='button'
                                className='underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                onClick={e => {
                                    e.preventDefault();
                                    setVerificationLinkSent(true);
                                }}
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {verificationLinkSent && (
                            <div className='mt-2 font-medium text-sm text-green-600'>
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                ) : null}
            </div>

            {/* <!-- Instrument --> */}
            <div className='col-span-6 sm:col-span-4'>
                <InputLabel htmlFor='instrument_id' value='Instrument' />
                <select
                    id='instrument_id'
                    className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full'}
                    name={'instrument_id'}
                    autoFocus
                    onChange={e => form.setData('instrument_id', parseInt(e.currentTarget.value))}
                >
                    <option value=''>None</option>
                    {instruments.map((instrument) =>

                        <option selected={instrument.id === user.instrument_id}
                                value={instrument.id}>{instrument.name} </option>)
                    }
                </select>
                <InputError message={form.errors.instrument_id} className='mt-2' />
            </div>

            {/* <!-- Instrument --> */}
            <div className='col-span-6 sm:col-span-4'>
                <InputLabel htmlFor='difficulty_id' value='Difficulty' />
                <select
                    id='difficulty_id'
                    className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full'}
                    name={'difficulty_id'}
                    autoFocus
                    onChange={e => form.setData('difficulty_id', parseInt(e.currentTarget.value))}
                >
                    <option value=''>None</option>
                    {difficulties.map((difficulty) =>

                        <option selected={difficulty.id === user.difficulty_id}
                                value={difficulty.id}>{difficulty.name} </option>)
                    }
                </select>
                <InputError message={form.errors.difficulty_id} className='mt-2' />
            </div>

            {/* <!-- Country Code --> */}
            <div className='col-span-6 sm:col-span-4'>
                <InputLabel htmlFor='country_code' value='Country' />
                <select
                    id='country_code'
                    className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full'}
                    name={'country_code'}
                    autoFocus
                    onChange={e => form.setData('country_code', e.currentTarget.value)}
                >
                    <option>🏁 None</option>
                    {countries.map((country) =>
                        <option selected={country.id === user.country_code}
                                value={country.id}>{country.flag + ' ' + country.name} </option>)
                    }
                </select>
                <InputError message={form.errors.country_code} className='mt-2' />
            </div>
        </FormSection>
    );
}
