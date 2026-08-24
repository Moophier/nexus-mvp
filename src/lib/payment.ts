export interface PaymentResponse {
  ok: boolean;
  txId?: string;
  error?: string;
}

export interface PaymentProvider {
  charge(orderRef: string, amountCents: number): Promise<PaymentResponse>;
  refund(orderRef: string): Promise<PaymentResponse>;

}

export const mockPayment: PaymentProvider = {
  async charge(orderRef, amountCents) {
    console.log(`[MockPayment] Charging ${amountCents} cents for ${orderRef}...`);
    return { ok: true, txId: `mock_tx_${Math.random().toString(36).substr(2, 9)}` };
  },
  async refund(orderRef: string) {
    console.log(`[MockPayment] Refunding ${orderRef}...`);
    return { ok: true, txId: `mock_ref_${Math.random().toString(36).substr(2, 9)}` };
  },
};

// Placeholder for future WeChat implementation
export const wechatPayment = {
  async charge(orderRef: string, amountCents: number): Promise<PaymentResponse> {
    throw new Error("WeChat Payment not yet implemented");
  },
  async refund(orderRef: string): Promise<PaymentResponse> {
    throw new Error("WeChat Payment not yet implemented");
  },
};
