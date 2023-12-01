import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#0a4aac',
        paddingTop: 40,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom:30,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      }
});