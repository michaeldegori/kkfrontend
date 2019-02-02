import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/onboarding/3"}
            title={"Introduction"}
            description={"As your kid completes a chore, you|get to review and either approve|or deny their request"}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}