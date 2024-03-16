import { useMutation } from 'react-query';
import { apiService } from 'services';

export function usePay() {
  const pay = () => apiService.post('/checkout');

  interface PayResponse {
    checkoutLink: string;
  }

  return useMutation<PayResponse>(pay, {
    onSuccess: (data) => {
      window.location.href = data.checkoutLink;
    },
  });
}
