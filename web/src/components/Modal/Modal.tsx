import React,{ useState, PureComponent, ChangeEvent, FormEvent } from 'react'
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import './Modal.css'
import $ from "jquery";


interface ModalProps {
    props : any;
    onClose: () => void;
}

    

    

const Modal: React.FC<ModalProps> = ({onClose, props}) => {
    const [secondEmail, setSecondEmail] = useState<JSX.Element>();
    const [secondPassword, setSecondPassword] = useState<JSX.Element>();
    const [nameUser, setNameUser] = useState<JSX.Element>();
    const [action, setAction] = useState<String>('Salvar');
    const [formData, setFormData] = useState({
        summaryCheck: '',
        descCheck: '',
        dateCheck: '',
    });

//------------------------------------------------------------------------------------------
//Handle data  -----------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
    async function handleSubmit(event: FormEvent) {
        const formData = {
            summaryCheck: $("input[type=summary][name=summary]").val() as string,
            descCheck: $("textarea[id=description][name=desc]").val() as string,// setValue($("input[id=description][name=desc]").val()) as void,//
            dateCheck: $("input[type=date][id=dateCheck]").val() as string
        }
                 
        event.preventDefault();
        if (formData.dateCheck === '') {
            alert('Data inválida!');
        } else if (formData.descCheck === '') {
            alert('Você deve Preencher o campo de Descrição!');
        } else if (formData.summaryCheck === '') {
            alert('Você deve preencher o campo de Titulo!');
        }
        console.log("Data: " + formData.dateCheck + "\n Desc:" + formData.descCheck + "\n Summary:" + formData.summaryCheck)
    };

    const [value, setValue] = useState(props.name);

//    const handleChange = (event : any) => {
        //setValue(event.target.value);
//        const values = {
//            summaryCheck: $("input[type=summary][name=summary]").val() as string,
//            descCheck: setValue($("input[id=description][name=desc]").val()) as void,//$().val() as string,
//            dateCheck: $("input[type=date][id=dateCheck]").val() as string
//        }
//        
//        setFormData({...formData, ...values});
//        console.log(formData.dateCheck);
//        console.log(formData.descCheck);
//        console.log(formData.summaryCheck);
//    };

//------------------------------------------------------------------------------------------
//Modal Things -----------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
    const overlayRef = React.useRef(null);
    const handleOverlayClick = (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
        if(e.target === overlayRef.current){
            onClose();
        }
    };
    var $j = jQuery.noConflict();
// ;-; Datepicker from Jquery
//    $j(function() {
//        $j.datepicker.regional['pt-BR'];
//        $j("#picker").datepicker({
//            dateFormat: 'dd-mm-yy',
//            minDate:0,          
//        });      
//    });    
//    $j('#picker').datepicker();
//    $j('button.somebutton').on('click', function () {
//        var d = $j('#picker').datepicker('getValue');
//        console.log(d);
//    });                                 

//------------------------------------------------------------------------------------------
//Modal  -----------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
    return (
        
        <form  className="form-modal-checkpoint" onSubmit={handleSubmit}>
            <div className="modal" id="exampleModalCenter" role="dialog">
            <div  className={'modal-overlay'} onClick={handleOverlayClick} ref={overlayRef}/>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="recipient-name" className="col-form-label">
                                Titulo do checkpoint:
                            </label>
                            <input type="summary" name="summary" className="form-control" id="summary"></input>

                            <label htmlFor="message-text" className='col-form-label'>
                                Descrição:
                            </label>
                            <textarea id="description" name="desc" className='form-control'></textarea>

                            <label htmlFor="message-text" className='col-form-label'>
                                Data Limite:
                            </label>
                            
                            <input type="date" id="dateCheck" className="form-control"/>
                        
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="submit" name="submit" className="btn btn-primary" onClick={handleSubmit}>Criar Checkpoint</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Modal
