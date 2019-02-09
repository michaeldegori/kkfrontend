import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/accountmanager/onboarding2"}
            title={"How to use the App"}
            description={"The purpose of this app is to teach responsibility and financial savviness to your children. You will start by setting up your family unit. Once everything is set up, you can switch to child mode by tapping on any of the children's names, and hand off the app to them. They will mark chores as complete every day, as they do them."}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}