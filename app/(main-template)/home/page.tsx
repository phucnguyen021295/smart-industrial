'use client'
import Image from "next/image";
import { Layout, Button } from 'antd';
import H1 from '@/ts-components/Text/H1';

const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <Sider width={'23.7vw'}>Sider</Sider>
      <Content>Content</Content>
      <Sider width={'23.7vw'}>Sider</Sider>
    </Layout>
  );
}
