import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/onboarding/5"}
            title={"Rewards Tab"}
            description={"The rewards tab is where you can manage and|assign rewards your children are eligible for."}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}