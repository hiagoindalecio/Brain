import React, { useContext, useLayoutEffect, useState } from 'react';
import FriendUpdate from '../../components/FriendUpdate';
import ActivityContext from '../../contexts/activity';
import AuthContext from '../../contexts/auth';
import './styles.css';

const Feed : React.FC = () => {
    const { user } = useContext(AuthContext);
    const { getFriendsActivity } = useContext(ActivityContext);
    const [divs, setDivs] = useState<[JSX.Element]>(
        [
            <div style={{ padding: 50 }}>
                <h3>
                    Parece que as coisas estão meio vazias por aqui :( <br/>
                    Vamos lá, pesquise por amigos e veja suas atualizações!
                </h3>
            </div>
        ]
    );

    useLayoutEffect(() => {
        findFriendsActivity();
    }, [])

    async function findFriendsActivity() {
        const act = await getFriendsActivity(user ? user.id as number : -1);

        if(act.length > 0) {
            var elements: [JSX.Element] = [<p></p>];
            act.map((acti) => {
                elements.push(
                    <><FriendUpdate activity={acti} /><br /></>
                )
            })

            setDivs(elements);
        }
    }

    return (
        <fieldset>
            <div className="feed-page">
                <div className="feed-content">
                    {
                        [...divs].map((elem,  index: number)=> 
                        <div key={index}>{elem}</div>
                    )
                    }
                </div>
            </div>
        </fieldset>
    )
}

export default Feed;