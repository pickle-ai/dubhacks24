import React from 'react';

function NavBar() {
    return (
        <>
        <div className="bg-emerald-700 h-full w-full py-6">
            <p className="text-center font-mono text-white">pickle ai</p>
        </div>
        </> 
    );
}

function Background() {
    return (
        <div className="flex justify-evenly">
            <div className="bg-emerald-600 h-screen w-1/4"></div>
            <div className="bg-slate-300 h-screen w-3/4"><p>code environment</p></div>
        </div>
    )
}

export default function WorkSpace() {
    return (
        <>
        <NavBar></NavBar>
        <Background></Background>
        </>
    )
}