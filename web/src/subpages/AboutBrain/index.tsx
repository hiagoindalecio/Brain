import React from 'react';
import './styles.css';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import imageOne from '../../assets/imageOne.jpg';
import imageTwo from '../../assets/imageTwo.jpg';
import imageThree from '../../assets/imageThree.jpg';
import imageFour from '../../assets/imageFour.jpg';

const AboutBrain: React.FC = () =>  {
    return (
        <fieldset>
            <div className="aboutpage">
                <div className="texts">
                    <h4>A Brain</h4>
                    <p><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Estamos aqui para te ajudar e te incentivar a prosseguir com seus projetos e estudos, mantendo a saúde mental em dia! Nós sabemos como isso é 
                        muito difícil quando temos muitas tarefas ao longo do dia e as vezes o cansaço nos desmotiva. A pesar de todas as complicações nós sabemos da importância de seguir 
                        aprendendo com as próprias pernas e estamos aqui para te motivar, e melhor, utilizando seu prório mérito para isso!
                    </p>
                    <h4><br/>Como funciona?</h4>
                    <p><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Quem seta seus próprios objetivos não pode ser ninguém diferente de você certo? Visto isso existe uma área de checkpoits só sua! E afinal, como 
                        isso funciona? É simples, basicamente você cria objetivos, ou como apelidamos, os checkpoits e você mesmo é quem gerencia os prazos e a conclusão de cada um, e o 
                        melhor, a cada checkpoint completo você receberá pontos que liberaram novos níveis 😊.
                    </p>
                </div>
                <Carousel>
                    <div>
                        <img src={imageOne} alt="Homem observando a vasta cidade pela janela" />
                        <p className="legend">Na sociedade atual somos sufocados com informações diáriamente.</p>
                    </div>
                    <div>
                        <img src={imageTwo} alt="Garoto estudando em um notebook sentado em uma escadaria pública" />
                        <p className="legend">Nós sabemos que seu dia é extremamente ocupado.</p>
                    </div>
                    <div>
                        <img src={imageThree} alt="Homem aparentemente aflito sentado em um café com um notebook sobre a mesa" />
                        <p className="legend">E quase sempre fica difícil se organizar para alcançar seus objetivos.</p>
                    </div>
                    <div>
                        <img src={imageFour} alt="Óculos sob um caderno de anotações" />
                        <p className="legend">A Brain está aqui para auxiliá-lo a se organizar e alcançar seus objetivos.</p>
                    </div>
                </Carousel>
            </div>
        </fieldset>
    );
}

export default AboutBrain;