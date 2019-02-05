import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/nonauth/onboarding/3"}
            title={"Assign Chores"}
            description={"As your kid completes a chore, you get to review and either approve or deny their request"}
            btnLabel={"NEXT"}
            image={require('../../../assets/images/onboarding/screen2_parent_panda.png')}
        />
    );
}