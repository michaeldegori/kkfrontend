import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/nonauth/onboarding/2"}
            title={"Introduction"}
            description={"KiddieKredit is a great way to make chores fun for your kids while teaching them the fundamentals of credit"}
            btnLabel={"NEXT"}
            image={require('../../../assets/images/onboarding/screen1_panda_w_book.png')}
        />
    );
}