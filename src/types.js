// @flow

export type SguidPayloadType = {|
  id: number | string,
  namespace: string,
  type: string
|};

export type FromSguidType = (publicKey: string, expectedNamespace: string, expectedResourceTypeName: string, sguid: string) => SguidPayloadType;

export type ToSguidType = (secretKey: string, namespace: string, type: string, id: number | string) => string;
