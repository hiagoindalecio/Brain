import React, { useContext, useLayoutEffect, useState } from 'react';
import ActivityContext from '../../contexts/activity';
import AuthContext from '../../contexts/auth';
import './styles.css';

const Feed : React.FC = () => {
    const { user } = useContext(AuthContext);
    const { getFriendsActivity } = useContext(ActivityContext);
    const [divs, setDivs] = useState<[JSX.Element]>();

    useLayoutEffect(() => {
        findFriendsActivity();
    }, [])

    async function findFriendsActivity() {
        const act = await getFriendsActivity(user ? user.id as number : -1);
        console.log(act);
        if(act.length > 0) {
            var divss: [JSX.Element] = [<p>teste</p>];
            act.map((acti) => {
                divss.push(
                    <><div>
                        <p>{acti.codActivity}</p>
                        <br />
                        <h3>{acti.nameUser} {acti.descriType}</h3>
                        <br />
                        <h2>{acti.description}</h2>
                        <br />
                        <p>{acti.updateTime}</p>
                    </div><br /> <br /></>)
            })

            setDivs(divss);
        }
    }

    return (
        <fieldset>
            <div className="feed-page">
                <div className="feed-content">
                    {divs}
                </div>
            </div>
        </fieldset>
    )
}

export default Feed;