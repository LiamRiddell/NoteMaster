export default {
  space: [0, 4, 8, 16, 24, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [14, 16, 18, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 100,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    text: '#C5C6C7',
    background: '#15181C',
    primary: '#EDEEF2',
    secondary: '#43494F',
    muted: '#43494F',
    hover: '#9CA9B7',
    danger: '##FF5656'
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: '100',
      fontSize: 5
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'primary'
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    img: {
      maxWidth: '100%'
    }
  },
  // Button Variants
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      fontWeight: 'bold',
      transition: 'all 200ms ease',
      '&:hover': {
        bg: 'white',
        cursor: 'pointer'
      }
    },
    secondary: {
      color: 'primary',
      bg: 'background',
      fontWeight: 'bold',
      border: 'solid 2px',
      borderColor: 'primary',
      transition: 'all 200ms ease',
      '&:hover': {
        bg: '#27292C',
        cursor: 'pointer'
      }
    },
    danger: {
      color: 'danger',
      bg: '#3F292C',
      fontWeight: 'bold',
      border: 'solid 1px',
      borderColor: 'danger',
      transition: 'all 200ms ease',
      '&:hover': {
        bg: '#5E3133',
        cursor: 'pointer'
      }
    },
    link: {
      color: 'hover',
      bg: 'transparent',
      fontWeight: 'normal',
      border: 'solid 0',
      borderColor: 'muted',
      padding: '8px 0',
      fontSize: 14,
      display: 'inline-flex',
      alignContent: 'center',
      transition: 'all 200ms ease',
      textDecoration: 'none',
      '> i': {
        marginRight: 2
      },
      '&:hover': {
        color: 'primary',
        cursor: 'pointer'
      }
    },
    linkUpper: {
      color: 'hover',
      bg: 'transparent',
      fontWeight: 'normal',
      border: 'solid 0',
      borderColor: 'muted',
      padding: '8px 0',
      fontSize: 12,
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'all 200ms ease',
      textTransform: 'uppercase',
      textDecoration: 'none',
      outline: 0,
      '> i': {
        fontSize: 1,
        marginRight: 1,
        textDecoration: 'none'
      },
      '&:hover': {
        color: 'primary',
        cursor: 'pointer'
      }
    }
  },
  // Text Variants
  text: {
    muted: {
      fontWeight: '400',
      color: 'hover'
    },
    group: {
      fontWeight: '700',
      fontSize: 12,
      color: '#5F6872',
      textTransform: 'uppercase'
    },
    fieldDescription: {
      fontWeight: '400',
      color: '#5F6872',
      fontSize: 12
    }
  },
  // Forms
  forms: {
    input: {
      border: 'solid 2px',
      borderColor: 'secondary',
      outline: 'none',
      transition: 'all 120ms ease',
      '&:hover': {
        borderColor: 'hover',
        cursor: 'pointer'
      },
      '&:focus': {
        borderColor: 'primary',
        cursor: 'pointer'
      }
    },
    select: {
      border: 'solid 2px',
      borderColor: 'secondary',
      outline: 'none',
      transition: 'all 120ms ease',
      '> option': {
        appearance: 'none',
        outline: 'none',
        color: 'primary',
        backgroundColor: '#15181C',
        border: 'solid 2px red'
      },
      '&:hover': {
        borderColor: 'hover',
        cursor: 'pointer'
      },
      '&:focus': {
        borderColor: 'primary',
        cursor: 'pointer'
      }
    },
    label: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    }
  }
};
