import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/kid/onboarding/3"}
            title={"Choreboard"}
            description={"View new chores!|Don't miss any today!"}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}