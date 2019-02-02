import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/"}
            title={""}
            description={""}
            btnLabel={"NEXT"}
            image={null}
        />
    );
}