import { GoogleGenerativeAI } from '@google/generative-ai';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../assets/fonts/icomoon/selection.json';
import { BackButton } from './base/CustomComponents';
import { colors, fonts } from './base/theme';

const APIKEY = 'AIzaSyD59hLwhrr2MXYSSUjebhx5VW9uXtR_Qks';
const genAI = new GoogleGenerativeAI(APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Msg1 = ({ text }) => (
    <View style={{
        backgroundColor: colors.Royal_Blue,
        borderRadius: 50,
        maxWidth: '95%',
        padding: 24,
        marginVertical: 12,
        marginRight: 'auto'
    }}>
        <Text style={{
            color: colors.white,
            fontFamily: fonts.Inter_Regular,
            fontSize: 14
        }}>
            {text.trim()}
        </Text>
    </View>
)

const Msg2 = ({ text }) => (
    <View style={{
        backgroundColor: colors.lightgrey,
        borderRadius: 50,
        maxWidth: '95%',
        padding: 20,
        marginVertical: 12,
        marginLeft: 'auto'
    }}>
        <Text style={{
            color: colors.black,
            fontFamily: fonts.Inter_Regular,
            fontSize: 14
        }}>
            {text.trim()}
        </Text>
    </View>
)

const ChatBot2 = ({ navigation }) => {
    const [text, settext] = React.useState();
    const [messages, setMessages] = React.useState([]);
    const [initialBotMessageSent, setInitialBotMessageSent] = React.useState(false);
    const [initialBotseq, setInitialBotseq] = React.useState(0);
    const scrollViewRef = React.useRef();

    const sendText = async () => {
        if (text.trim() === '') return; // Prevent sending Empty response

        // Add user message to the chat
        setMessages(prevMessages => [...prevMessages, { text: text, sender: 'user' }]);

        if (initialBotseq == 1) {
            if (text == 'Yes' || text == 'yes' || text == 'YES') {
                setMessages(prevMessages => [...prevMessages, { text: "Welcome! What brings you here today? Please let us know if you're experiencing any symptoms such as fever, chest pain, or headache.", sender: 'bot' }]);
                setInitialBotseq(2);
            }
        } else if (initialBotseq == 2) {
            setMessages(prevMessages => [...prevMessages, { text: "Could you kindly provide us with your past medical history? Also, do you have any family members with a history of medical ailments?", sender: 'bot' }]);
            setInitialBotseq(3);
        } else if (initialBotseq == 3) {
            setMessages(prevMessages => [...prevMessages, { text: "Could you please share your personal history regarding sleep patterns, smoking habits, and alcohol consumption?", sender: 'bot' }]);
            setInitialBotseq(4);
        } else if (initialBotseq == 4) {
            setMessages(prevMessages => [...prevMessages, { text: "Thank you for providing your answers. Your responses will be shared with the doctor you've scheduled your appointment with to streamline your consultation process.", sender: 'bot' }]);
            setInitialBotseq(5);
        }

        /*
        const result = await model.generateContent(text);
        const response = await result.response;
        const botResponse = response.text();
        console.log(botResponse);

        // Add chatbot response to the chat
        setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);*/



        // Clear input field after sending the message
        settext('');
    }

    React.useEffect(() => {
        if (!initialBotMessageSent) {
            setMessages(prevMessages => [...prevMessages, { text: "We've successfully booked your appointment for the selected time slot. Before we proceed, could you please answer a few questions? When you're ready, simply respond with 'Yes'.", sender: 'bot' }]);
            setInitialBotMessageSent(true);
            setInitialBotseq(1);
        }
        scrollViewRef.current.scrollToEnd({ animated: true });
        return () => {
        }
    }, [initialBotMessageSent, messages]);

    return (
        <SafeAreaView style={{
            backgroundColor: colors.white,
            height: '100%'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                zIndex: 4
            }}>
                <BackButton
                    onPress={() => navigation.goBack()}
                />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        fontFamily: fonts.Inter_SemiBold,
                        fontSize: 16,
                        color: colors.black,
                        marginRight: '25%'
                    }}>ChatBot</Text>
                </View>
            </View>
            <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingHorizontal: 24 }}>
                <View style={{
                    marginTop: 18
                }}>
                    {messages.map((message, index) => {
                        return message.sender === 'user' ? (
                            <Msg2 key={index} text={message.text} />
                        ) : (
                            <Msg1 key={index} text={message.text} />
                        );
                    })}
                </View>
            </ScrollView>
            <View style={{
                margin: 12,
                padding: 8,
                backgroundColor: colors.lightgrey,
                borderRadius: 18,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TextInput
                    style={{
                        fontFamily: fonts.Inter_Regular,
                        fontSize: 16,
                        padding: 4,
                        width: '75%',
                        borderWidth: 0,
                        borderBottomWidth: 0.8,
                        borderColor: colors.black,
                        color: colors.black
                    }}
                    placeholder="Type here ..."
                    placeholderTextColor={colors.black}
                    value={text}
                    onChangeText={(text) => settext(text)}
                />
                <TouchableOpacity
                    style={{
                        borderColor: colors.white,
                        borderWidth: 3,
                        borderRadius: 56,
                        height: 56,
                        width: 56,
                        backgroundColor: colors.Royal_Blue,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        sendText()
                        settext(null)
                    }}>
                    <Icon
                        name="paper-plane-regular"
                        size={20}
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ChatBot2;