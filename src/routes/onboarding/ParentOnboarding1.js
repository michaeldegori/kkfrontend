import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/onboarding/2"}
            title={"Introduction"}
            description={"KiddieKredit is a great way to make|chores fun for your kids while teaching|them the fundamentals of credit"}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}