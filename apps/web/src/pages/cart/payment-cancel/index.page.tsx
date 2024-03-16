import { NextPage } from 'next';
import Head from 'next/head';
import PaymentStatus from 'pages/cart/components/PaymentStatus';

const PaymentCancel: NextPage = () => (
  <>
    <Head><title>Payment Failed</title></Head>
    <PaymentStatus status="cancel" />
  </>
);

export default PaymentCancel;
