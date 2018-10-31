import React from "react";
import Text from '../../common/KKText';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import EmptyState from "../../common/EmptyState";
import ItemTile from "../../common/ItemTile";

const AlertView = ({
    match:{path},
    alerts,
    kidsList,
    chores,
    loading
}) => (
    <FullPage>
        <Header leftAction={"avatarButton"} />
        {

            (alerts && alerts.length === 0)
            ? <EmptyState loading={loading}/>
            : alerts.map(({_id, kid: kidId, chore: choreId, timeStamp, customNote})=> {
                console.log(kidsList.map(k=>k._id));
                console.log(kidId);
                const kidObj = kidsList.find(k => k._id === kidId);
                const choreObj = chores.find(c => c._id === choreId);
                return (
                    <ItemTile key={_id} mainCaption={`${kidObj.name} - ${choreObj.name}`} />
                );
            })
        }
    </FullPage>
);

export default AlertView;