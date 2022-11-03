/*eslint-disable*/

const PinInput = {
    baseStyle: {
      border: "1px solid #D0D5DD",
      borderRadius: "200px",
      ":focus": {
        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF",
      },
    },
    variants: {
      error: {
        ":focus": {
          boxShadow: "0px 0px 0px 4px #FEE4E2",
        },
      },
    },
    defaultProps: {
      variant: null,
    },
  };
  
  export default PinInput;
  