import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isEmailValid = () => {
        // Basic email validation (you can use a more complex regex if needed)
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const isPasswordValid = () => {
        // Check if the password meets your validation criteria (e.g., minimum length)
        return password.length >= 6; // Change this based on your requirements
    };

    const Register = () => {
        setEmailError(""); // Clear the previous error message
        setPasswordError(""); // Clear the previous error message

        if (!isEmailValid()) {
            setEmailError('Invalid email address');
            return;
        }

        if (!isPasswordValid()) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                navigation.navigate('Login');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setEmailError('That email address is already in use');
                } else {
                    // Handle other error codes here
                }
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Enter Email"
                    onChangeText={text => {
                        setEmail(text);
                        setEmailError(""); // Clear the error message when the user starts typing
                    }}
                />
                {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                <TextInput
                    value={password}
                    style={styles.input}
                    placeholder="Enter Password"
                    secureTextEntry
                    onChangeText={text => {
                        setPassword(text);
                        setPasswordError(""); // Clear the error message when the user starts typing
                    }}
                />
                {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
                <Button title="Register" onPress={Register} />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    wrapper: {
        width: '80%'
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    link: {
        color: 'blue'
    },
    error: {
        color: 'red',
        marginBottom: 10,
    }
});

export default RegisterScreen;
