import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/postregonboarding/2"}
            title={"How to use the App"}
            description={"You will start by setting up your family unit. Once everything is set up, you can switch to child mode by tapping on the account manager icon (top left), and hand off the app to your children. They will mark chores as complete every day, as they do them."}
            btnLabel={"NEXT"}
            image={require('../../../assets/images/onboarding/postreg_screen1.png')}
        />
    );
}