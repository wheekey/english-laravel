import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
            <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                {props.auth.user ? (
                    <InertiaLink href="/dashboard" className="text-sm text-gray-700 underline">
                        Dashboard
                    </InertiaLink>
                ) : (
                    <>
                        <InertiaLink href={route('login')} className="text-sm text-gray-700 underline">
                            Log in
                        </InertiaLink>

                        <InertiaLink href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                            Register
                        </InertiaLink>

                        <InertiaLink href={route('game')} className="ml-4 text-sm text-gray-700 underline">
                            Game
                        </InertiaLink>
                    </>
                )}
            </div>

            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <h1>123</h1>


            </div>
        </div>
    );
}
