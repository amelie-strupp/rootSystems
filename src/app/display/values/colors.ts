export enum Colors{
    white = '#ffffff',
    purple900 = '#252547',
    purple800 = '#2c2c54',
    purple500 = '#343466',
    purple400 = '#40407a',
    purple300 = '#706fd3',
    purple200 = '#abaafa',
    brightRed = '#ff0066',
    brightGreen = '#33d9b2',

    palePurple100 = '#c9b3ff',
    palePurple200 = '#8e63f2',
    palePurple300 = '#5f36bf',

    red = '#fc5c65',
    orange = '#fd9644',
    yellow = '#f7b731',
    green = '#26de81',
    blue = '#4b7bec',
    turqouis = '#2bcbba',

    pink = '#ff9bd3',
    pinkDark = '#ff58ae',
    redDark = '#eb3b5a',
    orangeDark = '#fa8231',
    yellowLight = '#fed330',
    yellowGreenLight = '#9ae89e',
    yellowGreenDark = '#62b776',
    pinkRed = '#f57b92',
    pinkRedDark = '#e75272',
    greenDark = '#20bf6b',
    turqouisDark = '#0fb9b1',
    blueDark = '#2d98da',
    azul = '#4b7bec',
    azulDark = '#3867d6',
    purple = '#a55eea',
    purpleDark = '#8854d0',
    gray = '#d1d8e0',
    grayDark = '#a5b1c2'
}
export function colorNumber(color: string){
    return parseInt(color.replace('#', '0x'),16)
}