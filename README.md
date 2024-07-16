
Android
Minimum: Android 5.0 API 21 SDK

iOS
Minimum: iOS 13.0

Usage
import PantasData from 'react-native-pantas-data';

encryptTarget: string, key: string
const encrypted: string = await PantasData.simpleEncrypt(encryptTarget, key);
encryptedText: string, key: string
const decrypted: string = await PantasData.simpleDecrypt(encryptedText, key);