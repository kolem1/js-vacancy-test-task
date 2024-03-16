import { NextPage } from 'next';
import Head from 'next/head';
import PaymentStatus from 'pages/cart/components/PaymentStatus';

const PaymentSuccess: NextPage = () => (
  <>
    <Head><title>Payment Success</title></Head>
    <PaymentStatus status="success" />
  </>
);

export default PaymentSuccess;
