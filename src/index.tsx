import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-pantas-data' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const PantasDataModule = NativeModules.PantasData
  ? NativeModules.PantasData
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

const PantasData = {
  async parseJson(jsonString: string): Promise<object> {
    return await PantasDataModule.parseJSON(jsonString);
  },

  simpleEncrypt(data: string, keyString: string): Promise<string> {
    return PantasDataModule.simpleEncrypt(data, keyString);
  },

  simpleDecrypt(encryptedData: string, keyString: string): Promise<string> {
    return PantasDataModule.simpleDecrypt(encryptedData, keyString);
  },
};
export default PantasData;