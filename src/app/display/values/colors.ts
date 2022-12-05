export enum Colors{
    white = '#ffffff',
    purple800 = '#2c2c54',
    purple500 = '#343466',
    purple400 = '#40407a',
    purple300 = '#706fd3',
    purple200 = '#abaafa',
    brightRed = '#ff0066',
    brightGreen = '#33d9b2',

    red = '#fc5c65',
    orange = '#fd9644',
    yellow = '#f7b731',
    green = '#26de81',
    blue = '#4b7bec',
    turqouis = '#2bcbba',

    pink = '#ff92c9',
    redDark = '#eb3b5a',
    orangeDark = '#fa8231',
    yellowLight = '#fed330',
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