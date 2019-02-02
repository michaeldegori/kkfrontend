import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/kid/onboarding/2"}
            title={"Kredit Dashboard"}
            description={"Check out your score here!|The goal is 100!"}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}