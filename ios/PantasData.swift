import Foundation
import React
import CryptoKit

@objc(PantasData)
class PantasData: NSObject {

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }

  @objc func simpleEncrypt(_ data: String, key: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        do {
            guard let keyData = Data(base64Encoded: key) else {
                throw NSError(domain: "InvalidKey", code: 1, userInfo: nil)
            }
            let symmetricKey = SymmetricKey(data: keyData)

            guard let dataToEncrypt = data.data(using: .utf8) else {
                throw NSError(domain: "InvalidData", code: 2, userInfo: nil)
            }

            let iv = AES.GCM.Nonce() // Generate a random 12-byte IV
            let sealedBox = try AES.GCM.seal(dataToEncrypt, using: symmetricKey, nonce: iv)
            let combined = iv + sealedBox.ciphertext + sealedBox.tag
            resolve(combined.base64EncodedString())
        } catch {
            reject("ENCRYPTION_ERROR", error.localizedDescription, error)
        }
    }

    @objc func simpleDecrypt(_ encryptedData: String, key: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        do {
            guard let keyData = Data(base64Encoded: key) else {
                throw NSError(domain: "InvalidKey", code: 1, userInfo: nil)
            }
            let symmetricKey = SymmetricKey(data: keyData)

            guard let encryptedBytes = Data(base64Encoded: encryptedData) else {
                throw NSError(domain: "InvalidEncryptedData", code: 2, userInfo: nil)
            }

            let iv = try AES.GCM.Nonce(data: encryptedBytes.prefix(12)) // Extract the 12-byte IV
            let ciphertext = encryptedBytes.dropFirst(12).dropLast(16) // Extract the ciphertext
            let tag = encryptedBytes.suffix(16) // Extract the 16-byte tag

            let sealedBox = try AES.GCM.SealedBox(nonce: iv, ciphertext: ciphertext, tag: tag)
            let decryptedData = try AES.GCM.open(sealedBox, using: symmetricKey)
            resolve(String(data: decryptedData, encoding: .utf8))
        } catch {
            reject("DECRYPTION_ERROR", error.localizedDescription, error)
        }
    }
}
