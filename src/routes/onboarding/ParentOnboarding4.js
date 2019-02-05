import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";
import userRepository from "../../stores/UserDataStore";

export default function(props){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/onboarding/5"}
            onNext={()=>{
                userRepository.finishOnboarding();
                props.history.push("/")
            }}
            title={"Teach About Finance"}
            description={"Just like in real life credit, it takes time for their score to go up. Kredit Calculations are done once a week, and children receive a configurable amount of bamboo bucks once a week."}
            btnLabel={"NEXT"}
            image={require('../../../assets/images/onboarding/screen4_kid_with_money.png')}
        />
    );
}