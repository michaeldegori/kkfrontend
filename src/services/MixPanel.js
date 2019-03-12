import ExpoMixpanelAnalytics from 'expo-mixpanel-analytics';
const analytics = new ExpoMixpanelAnalytics("176fc395d5d56e92e530dbe4e32a0fac");

function getInternalChildName(kid){
    return kid.name.slice(0,2) + kid._id.slice(-5);
}

export function identifyUser(email){
    analytics.identify(email);
}

export function signupEvent($firstName, $lastName, $email){
    identifyUser($email);
    analytics.people_set({$firstName, $lastName, $email, $created: new Date().toISOString()});
    analytics.people_set_once({"First Login Time": new Date().toISOString()});
    analytics.track("Signup", {
        name: $firstName,
        email: $email
    });
}

export function loginEvent($firstName, $lastName, $email){
    identifyUser($email);
    analytics.people_set_once({$firstName, $lastName, $email});
    analytics.people_set({"Last Login Time": new Date().toISOString()});
    analytics.people_increment({"Number of Logins": 1});
    analytics.track("Log In", {
        name: $firstName
    })
}

export function addChild(kidsList){
    try{
        analytics.people_increment({"Number of Children Added": 1});
        analytics.people_set({
            "Kids List": kidsList.map((kid) => ({
                Name: getInternalChildName(kid),
                id: kid._id,
                Gender: kid.gender,
                DOB: kid.dob
            }))
        });
    }
    catch(e){
        console.log('$$$$$$$$$$$$#####################Tracking Exception at addChild');
    }
}

export function addFamilyAdmin(){

}

let modalOpeningTime;
export function openKreditEducationModal(){
    try{
        analytics.people_increment({"Times Opening Educational Modals": 1});
        modalOpeningTime = new Date().getTime();
    }
    catch(e){
        console.log('$$$$$$$$$$$$#####################Tracking Exception at openKreditEducationModal');
    }
}

export function closeKreditEducationModal(modalName, browsingMode){
    try{
        const openedDuration = new Date().getTime() - modalOpeningTime;
        analytics.people_increment({"Times Opening Educational Modals": 1});
        analytics.track("Educational Modal View", {
            "Modal Opened": browsingMode + " - " + modalName,
            Duration: Math.round(openedDuration/1000) + `.${Math.round((openedDuration%1000)/100)} sec`
        });
    }
    catch(e){
        console.log('$$$$$$$$$$$$#####################Tracking Exception at closeKreditEducationModal');
    }
}

export function addChore(choreObj, freq, numChildrenAssigned, kidsListLength){
    try {
        analytics.track("Add Chore", {
            "Chore Name": choreObj.name,
            "Chore Frequency": freq,
            "Chore Days Done": choreObj.weekdays.length,
            "Priority": choreObj.priority,
            "Description Length": choreObj.notes.length,
            "Number of Children Assigned": numChildrenAssigned,
            "Number of Children in Family": kidsListLength
        });
    }
    catch(e){
        console.log('$$$$$$$$$$$$#####################Tracking Exception at addChore');
    }
}

export function addReward(rewardObj, kidsList){
    try{
        analytics.track("Add Reward", {
            "Reward Name": rewardObj.name,
            "Cost": rewardObj.kkCost,
            "Description Length": rewardObj.notes.length,
            "Number of Children Assigned": rewardObj.rewardAppliesTo.length,
            "Number of Children in Family": kidsList.length
        });
    }
    catch(e){
        console.log('$$$$$$$$$$$$#####################Tracking Exception at addReward');
    }
}

export function requestCompleteChore(choreId, existingChores, childId, kidsList){
    try{
        const child = kidsList.find(k => k._id == childId);
        const choreObj = existingChores.find(c => c._id == choreId);

        analytics.track("Request Chore Completion", {
            "Chore Name": choreObj.name,
            "Child": getInternalChildName(child),
            childId
        });
    }
    catch(e){
        console.log('$$$$$$$$$$$$#####################Tracking Exception at requestCompleteChore');
    }
}

export function approveChore(choreId, existingChores, status, childId, kidsList){
    try{
        const child = kidsList.find(k => k._id == childId);
        const choreObj = existingChores.find(c => c._id == choreId);

        analytics.track("Manage Chore Approval", {
            "Chore Name": choreObj.name,
            "Child": getInternalChildName(child),
            childId,
            status
        });
    }
    catch(e){
        console.log('$$$$$$$$$$$$#####################Tracking Exception at approveChore');
    }
}