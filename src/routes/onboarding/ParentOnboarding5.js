import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/onboarding/6"}
            title={"Alerts"}
            description={"In the alerts tab you will receive notifications on chores completed by your children"}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}