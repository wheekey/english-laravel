import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import DragDropContainer from '@/Components/Game/DragDropContainer';


const Index = () => {

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Falling Bears</h1>
            <img className="w-48" src="https://www.freevector.com/uploads/vector/preview/14243/FreeVector-Man-Playing-Football.jpg" alt=""/>

            <div className="">
                <DragDropContainer/>
            </div>
        </div>
    );
};

export default Index;
