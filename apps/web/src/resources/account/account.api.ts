import { useMutation, useQuery } from 'react-query';

import { User } from 'types';

import { apiService } from 'services';

import queryClient from 'query-client';

export function useSignIn<T>() {
  const signIn = (data: T) => apiService.post('/account/sign-in', data);

  return useMutation<User, unknown, T>(signIn, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useSignOut() {
  const signOut = () => apiService.post('/account/sign-out');

  return useMutation(signOut, {
    onSuccess: () => {
      queryClient.setQueryData(['account'], null);
    },
  });
}

export function useSignUp<T>() {
  const signUp = (data: T) => apiService.post('/account/sign-up', data);

  return useMutation<User, unknown, T>(signUp, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useGet(options? : {}) {
  const get = () => apiService.get('/account');

  return useQuery<User>(['account'], get, options);
}
