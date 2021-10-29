import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { activityResponse } from '../../interfaces/interfaces';
import './styles.css';

const FriendUpdate: React.FC<{
    activity: activityResponse
}> = ({
    activity
}) => {
    
    const [formatDate, setFormatDate] = useState<string>();

    useEffect(() => {
        var now = new Date();

        console.log(now.toJSON().slice(0, 19), activity.updateTime)
        var ms = moment(now.toJSON().slice(0, 19),"DD-MM-YYYYTHH:mm:ss").diff(moment(activity.updateTime,"DD-MM-YYYYTHH:mm:ss"));
        console.log(ms);
        var d = moment.duration(ms);
        console.log(d)
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        console.log(s);

        setFormatDate(s);
    }, [])

    return (
        <div className="card" key={activity.codActivity}>
            <div className="card-body">
                <h5 className="card-title">
                    <img src={activity.profilePic} className='friend-picture' alt="Foto de perfil de seu amigo" />
                    {activity.nameUser} {activity.descriType}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">{formatDate}</h6><br/>
                <div className="card" key={`obj-${activity.codActivity}`}>
                    <h5 className="card-header">{activity.description}</h5><br/>
                </div>
            </div>
        </div>
    );
};

export default FriendUpdate;