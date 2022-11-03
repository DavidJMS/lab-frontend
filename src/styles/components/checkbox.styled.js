import styled from '@emotion/styled'

const CheckboxStyled = styled.label`
  display: block;
  position: relative;
  padding-left: 2rem;
  cursor: pointer;
  min-height: 21px;

  // checkbox
  input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    margin: 0;
  }
  input[type="checkbox"] ~ .checkmark {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 0 2px #C6CED8;
    transition: all 0.2s ease-in-out;
  }

  input[type="checkbox"]:checked ~ .checkmark,
  input[type="checkbox"] ~ .checkmark:hover {
    box-shadow: 0 0 0 2px #1C397E;
  }

  input[type="checkbox"]:focus ~ .checkmark{
    box-shadow: 0 0 0 5px rgb(28 57 126 / 20%);
  }
  input[type="checkbox"]:disabled ~ .checkmark{
    box-shadow: 0 0 0 2px #C6CED8;
    background-color: #DFE6EE;
  }


  input[type="checkbox"]:checked ~ .checkmark:after {
    content: "";
    display: block;
    width: 70%;
    height: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 1L3.5 6.5L1 4' stroke='%231C397E' stroke-width='1.6666' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 2;
  }
  input[type="checkbox"]:disabled:checked ~ .checkmark:after{
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 1L3.5 6.5L1 4' stroke='%23ccc' stroke-width='1.6666' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }
`

export default CheckboxStyled
