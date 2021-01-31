import React from 'react';
import './styles.css';

import styled, { keyframes } from 'styled-components'

import logo from '../../assets/logo.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
  .img-logo {
    max-width:123px;
    max-height:123px;
    width: auto;
    height: auto;
  }
`;

const AboutBrain: React.FC = () =>  {
    return (
        <fieldset>
            <Rotate><img src={logo} alt="logo" className="img-logo"/></Rotate>
            <div className="aboutpage">
                <div className="texts">
                    <h4>A Brain</h4>
                    <p><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Estamos aqui para te ajudar e te incentivar a prosseguir com seus projetos e estudos e manter sua saúde mental! Nós sabemos como isso é 
                        muito difícil quando temos muitas tarefas ao longo do dia e as vezes o cansaço nos desmotiva. A pesar de todas as complicações nós sabemos da importância de seguir 
                        aprendendo com as próprias pernas e estamos aqui para te motivar,&nbsp;e melhor,&nbsp;utilizando seu prório mérito para isso!
                    </p>
                    <h4><br/>Como funciona?</h4>
                    <p><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Quem seta seus próprios objetivos não pode ser ningém diferente de você certo? Visto isso existe uma área de checkpoits só sua! E afinal como 
                        isso funciona? É simples,&nbsp;basicamente você cria objetivos,&nbsp;ou como apelidamos,&nbsp;os checkpoits e você mesmo é quem gerencia os prazos e a conclusão de cada 
                        um,&nbsp;e o melhor,&nbsp;a cada checkpoint completo você receberá pontos que liberaram surpresinhas no futuro 😊.
                    </p>
                </div>
            </div>
        </fieldset>
    );
}

export default AboutBrain;