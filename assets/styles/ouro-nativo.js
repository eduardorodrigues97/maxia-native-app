import React from "react";

const css = require('./styles.html')

const tagStyles = {
    img: {
        aspectRatio: 'auto',
    },
  
    'p, span, h3, h4, h5': {
        textAlign: 'justify',
        marginTop: '0pt',
        marginBottom: '0pt', 
        lineHeight: 1.2,
        fontSize: '100%'
    },
  
    h6: {
        textAlign: 'right !important',
        fontSize: 10,
        // wordWrap: 'breakWord !important',
        display: 'block',
        fontWeight: 'normal',
        fontFamily: 'Bold'
        // marginBlockStart: '1mm !important',
        // marginBlockEnd: '2mm !important',
        // marginInlineStart: '0px !important',
        // marginInlineEnd: '0px !important',
    }
}

const ouroCSS = `
<!DOCTYPE html> 
<head>
    <link href="//db.onlinewebfonts.com/c/6f1a075af8afe852f3e3c8a75e49bc31?family=DINNextRoundedLTPro-Bold" rel="stylesheet" type="text/css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>
        
    </style>
</head>
`

export { tagStyles, ouroCSS, css }