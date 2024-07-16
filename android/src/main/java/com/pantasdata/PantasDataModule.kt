package com.pantasdata


import com.facebook.react.bridge.*
import android.util.Base64
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec
import java.security.SecureRandom
import org.json.JSONArray
import org.json.JSONObject


class PantasDataModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android

  @ReactMethod
  fun simpleEncrypt(data: String, keyString: String, promise: Promise) {
    try {
      val key = SecretKeySpec(Base64.decode(keyString, Base64.DEFAULT), "AES")
      val cipher = Cipher.getInstance("AES/GCM/NoPadding")
      val iv = ByteArray(12) // 12 bytes for GCM IV
      SecureRandom().nextBytes(iv)
      val spec = GCMParameterSpec(128, iv) // 128-bit authentication tag
      cipher.init(Cipher.ENCRYPT_MODE, key, spec)
      val encryptedBytes = cipher.doFinal(data.toByteArray())
      val combined = iv + encryptedBytes // Prepend IV to the ciphertext
      val encryptedString = Base64.encodeToString(combined, Base64.DEFAULT)
      promise.resolve(encryptedString)
    } catch (e: Exception) {
      promise.reject("ENCRYPTION_ERROR", e)
    }
  }

  @ReactMethod
  fun simpleDecrypt(encryptedData: String, keyString: String, promise: Promise) {
    try {
      val key = SecretKeySpec(Base64.decode(keyString, Base64.DEFAULT), "AES")
      val decodedData = Base64.decode(encryptedData, Base64.DEFAULT)
      val iv = decodedData.copyOfRange(0, 12) // 12 bytes for GCM IV
      val encryptedBytes = decodedData.copyOfRange(12, decodedData.size)
      val cipher = Cipher.getInstance("AES/GCM/NoPadding")
      val spec = GCMParameterSpec(128, iv) // 128-bit authentication tag
      cipher.init(Cipher.DECRYPT_MODE, key, spec)
      val decryptedBytes = cipher.doFinal(encryptedBytes)
      val decryptedString = String(decryptedBytes)
      promise.resolve(decryptedString)
    } catch (e: Exception) {
      promise.reject("DECRYPTION_ERROR", e)
    }
  }

  companion object {
    const val NAME = "PantasData"
  }
}
