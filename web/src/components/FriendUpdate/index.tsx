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
        function SplitTime(numberOfHours: number){
            var Days = Math.floor(numberOfHours/24);
            var Remainder = numberOfHours % 24;
            var Hours = Math.floor(Remainder);
            var Minutes = Math.floor(60*(Remainder-Hours));
            return({"Days":Days,"Hours":Hours,"Minutes":Minutes})
        }
        
        function takeTime() {
            var now = new Date();
            var ms = moment(now.toJSON().slice(0, 19),"YYYY-MM-DDTHH:mm:ss").diff(moment(activity.updateTime,"YYYY-MM-DDTHH:mm:ss"));
            var d = moment.duration(ms);
            var timeAgo = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");

            if (timeAgo.split(':')[0] as unknown as number >= 24) { // Caso tenha completado pelo menos um dia
                var convertedTime = SplitTime(timeAgo.split(':')[0] as unknown as number);

                timeAgo = `${convertedTime.Days} ${convertedTime.Days > 1 ? 'dias' : 'dia'} 
                    ${convertedTime.Hours > 0 ? `e ${convertedTime.Hours} ${convertedTime.Hours > 1 ? 'horas' : 'hora'}` : ''} 
                     atrás`
            } else if (timeAgo === '0:00') { // Num um minuto
                timeAgo = 'Alguns segundos atrás'
            } else { // Menos de 24 horas
                timeAgo = `${timeAgo.split(':')[0] as unknown as number > 0 ? //dias
                timeAgo.split(':')[0] as unknown as number > 1 ? 
                    timeAgo.split(':')[0] + ' horas' : 
                    timeAgo.split(':')[0] + ' hora' :
                ''}` + 
                `${timeAgo.split(':')[0] as unknown as number > 0 && timeAgo.split(':')[1] as unknown as number > 0 ? ' e ' : ''}` + 
                `${timeAgo.split(':')[1] as unknown as number > 0 ? //horas
                timeAgo.split(':')[1] as unknown as number > 1 ? 
                    `${timeAgo.split(':')[1]} minutos` : 
                    `${timeAgo.split(':')[1]} minuto` :
                ''}` + 
                ' atrás';
            }

            return (timeAgo);
        }

        setFormatDate(takeTime());
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