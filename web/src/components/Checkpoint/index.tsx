import React from 'react';
import './styles.css';

import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

interface Task {
    description: string,
    date: string
}

const Checkpoint = (
    title: string,
    date: string,
    tasks: Task[]
) => {


    return (
        <div className="card">
            <h5 className="card-header">{title}</h5>
            <p className="card-text">Data limite: {date}</p>
            <div className="card-body">
                {
                    tasks.map(task => (
                        <React.Fragment>
                            <h5 className="card-title">●{task.description}</h5>
                            <p className="card-text">Data limite: {task.date}</p>
                            <button type="button" className="btn btn-primary btn-lg">Editar</button>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
    
};

export default Checkpoint;