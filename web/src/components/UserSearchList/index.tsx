import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import ModalMessage from '../ModalMessages/ModalMessages';
import './styles.css'

const UserSearchList: React.FC<{pesquisa: string}> = (props) => {
    const { findUser } = useContext(AuthContext);
    const [foundUsers, setFoundUsers] = useState<JSX.Element[]>([<></>]);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        async function goToProfile(userCode: string | undefined) {
            if (userCode) {
                history.push(`/profile/${userCode}`);
            }
        }

        async function receiveUsers() {
            var result = await findUser(props.pesquisa);

            if ('message' in result) {
                setMessage(result.message);
                setIsModalMessageVisible(true);
            } else {
                var userArray: JSX.Element[] = [];
                result.forEach((user) => {
                    userArray.push(
                        <li className="list-group-item" key={user.cod} data-index={user.cod} onClick={event => goToProfile(event.currentTarget.dataset.index)} >
                            <img src={user.profile_pic} alt="User" className='picture'/>
                            {user.name}
                        </li>)
                });
                setFoundUsers(userArray);
            }
        }

        receiveUsers();
    }, [findUser, props.pesquisa, history]);

    return (
        <ul className="list-group list-group-flush">
            {
                foundUsers.map(user => {
                    return (
                        <div key={user.key}>
                            {user}
                        </div>
                    )
                })
            }
            {
                isModalMessageVisible ? 
                <ModalMessage props={{message}} onClose={() => {
                    setIsModalMessageVisible(false); 
                }}></ModalMessage> 
                : null
            }
        </ul>
    )
}

export default UserSearchList;