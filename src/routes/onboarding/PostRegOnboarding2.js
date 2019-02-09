import React from 'react';
import BaseOnboardingView from "./BaseOnboardingView";

export default function(){
    return (
        <BaseOnboardingView
            nextRoute={"/maintabscreen/accountmanager"}
            title={"Next Steps"}
            description={"Next Steps are Simple: Add children to your family unit, add chores for them to do, add rewards to entice them, and hand off the app to your child"}
            btnLabel={"I'M READY"}
            image={null}
        />
    );
}