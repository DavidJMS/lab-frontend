import styled from '@emotion/styled'

const RadioStyled = styled.label`
  display: block;
  position: relative;
  padding-left: 2rem;
  cursor: pointer;
  min-height: 21px;
  
  // radio buttons
  input[type="radio"] {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    margin: 0;
  }
  input[type="radio"] ~ .checkmark {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #C6CED8;
    transition: all 0.2s ease-in-out;
  }

  input[type="radio"]:checked ~ .checkmark,
  input[type="radio"] ~ .checkmark:hover {
    box-shadow: 0 0 0 2px #1C397E;
  }

  input[type="radio"]:focus ~ .checkmark{
    box-shadow: 0 0 0 5px rgb(28 57 126 / 20%);
  }
  input[type="radio"]:disabled ~ .checkmark{
    box-shadow: 0 0 0 2px #C6CED8;
    background-color: #DFE6EE;
  }


  input[type="radio"]:checked ~ .checkmark:after {
    content: "";
    display: block;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #1C397E;
    z-index: 2;
  }
  input[type="radio"]:disabled:checked ~ .checkmark:after{
    background-color: #C6CED8;
  }
`

export default RadioStyled
