import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/nonauth/onboarding/4"}
            title={"Reward Discipline"}
            description={"How well your children complete their chores will determine their kredit score. The higher their score, the more bamboo bucks they will earn."}
            btnLabel={"NEXT"}
            image={require('../../../assets/images/onboarding/screen3_kid_with_phone.png')}
        />
    );
}