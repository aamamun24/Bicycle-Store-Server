declare module 'sslcommerz-lts' {
  class SSLCommerz {
    constructor(storeId: string, storePassword: string, isLive: boolean);
    init(paymentData: Record<string, any>): Promise<any>;
  }

  export default SSLCommerz;
}
