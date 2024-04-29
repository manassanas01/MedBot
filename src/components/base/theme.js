const isDarkMode = false;

const colors = {
    //primary: '#061529',
    primary: '#001F4B',
    blue: '#08A4F7',
    dark: '#252525',
    dark_2: '#3B3B3B',
    black: '#000000',
    white: '#FFFFFF',
    grey: '#cccccc',
    lightgrey: '#EFEFEF',
    blue: '#08A0F8',
    green: '#E7F5FB',
    black: '#1C1C1C',
    whitesmoke: '#F5F5F5',
    Royal_Blue: '#015EE9'
}

const fonts = {
    Nunito_Regular: 'Nunito-Regular',
    Nunito_Medium: 'Nunito-Medium',
    Nunito_SemiBold: 'Nunito-SemiBold',
    Nunito_Bold: 'Nunito-Bold',
    Inter_Regular: 'Inter-Regular',
    Inter_Bold: 'Inter-Bold',
    Inter_Medium: 'Inter-Medium',
    Inter_SemiBold: 'Inter-SemiBold',
}

const url = 'https://firestore.googleapis.com/v1/'
const apiurl = url + 'projects/medbot-98533/databases/(default)/documents'

export {
    apiurl, colors,
    fonts, isDarkMode, url
};

