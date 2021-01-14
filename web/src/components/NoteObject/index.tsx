import React from 'react';
import './styles.css';

import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

const Note: React.FC<{
    idNote: number,
    idUser: number,
    summary: string,
    desc: string
}> = ({
    idNote,
    idUser,
    summary,
    desc
}) => {
    return (
        <div className="card" key={idNote}>
            <h5 className="card-header">{summary}</h5>
            <p className="card-text">Descrição: {desc}</p>
            <div className="btns">
                <button type="button" className="btn btn-primary btn-sm">Editar</button>
                <button type="button" className="btn btn-primary btn-sm btn-drop">Excluir</button>
            </div>
        </div>
    );
};

export default Note;