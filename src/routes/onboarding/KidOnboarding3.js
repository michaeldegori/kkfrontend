import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/kid/choreboard"}
            title={"Rewards screen"}
            description={"Here are your bamboo bucks!|Use them wisely"}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}