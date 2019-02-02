import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/onboarding/4"}
            title={"Introduction"}
            description={"How well your children complete their chores|will determine their kredit score. The|higher their score, the more bamboo bucks they|can use to redeem rewards.||Just like in real life credit, it|takes time for their score to go up.|Calculations are done once a week."}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}