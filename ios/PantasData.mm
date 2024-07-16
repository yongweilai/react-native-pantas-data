#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PantasData, NSObject)

RCT_EXTERN_METHOD(simpleEncrypt:(NSString *)data key:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(simpleDecrypt:(NSString *)data key:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
