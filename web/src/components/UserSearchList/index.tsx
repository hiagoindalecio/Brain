import './styles.css'

const UserSearchList: React.FC<{pesquisa: string}> = (pesquisa) => {
    

    return (
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
        </ul>
    )
}

export default UserSearchList;