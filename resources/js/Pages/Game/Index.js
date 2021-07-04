import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import DragDropContainer from '@/Components/Game/DragDropContainer';


const Index = () => {

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Falling Bears</h1>

            <div className="container mx-auto w-1/3 flex flex-col items-center">
                <DragDropContainer/>
            </div>
        </div>
    );
};

export default Index;
