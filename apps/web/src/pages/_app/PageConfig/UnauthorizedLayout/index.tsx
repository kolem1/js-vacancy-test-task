import { FC, ReactElement } from 'react';

import { SimpleGrid, Image, Center, Stack, Box, Group, Text, rem, Container } from '@mantine/core';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <Container size={1440}>
    <SimpleGrid
      cols={{ base: 1, sm: 2 }}
      spacing={0}
    >
      <Center px="xl" w="100%" h="100vh" component="main">
        {children}
      </Center>

      <SimpleGrid visibleFrom="sm" cols={1} p="xl">
        <Stack bg="#F4F4F4" p="xl">
          <Box mb="auto">
            <Image
              alt="Shopy"
              h={40}
              w={135}
              src="/images/logo.svg"
            />
          </Box>
          <Box>
            <Center mb={58}>
              <Image maw={610} src="/images/promo.png" />
            </Center>
            <Box mb="xl">
              <Text fz={36} fw={700} lh={rem(44)}>Sell and buy products super quickly!</Text>
              <Text fz="xl" mt="sm">Save your time, we take care of all the processing.</Text>
            </Box>
            <Group gap="lg">
              <Image w={151} src="/images/avatars-group.png" />
              <Text>
                {' '}
                <Text fw={700} component="b">+100</Text>
                {' '}
                users from all over the world
              </Text>
            </Group>
          </Box>
        </Stack>
      </SimpleGrid>
    </SimpleGrid>
  </Container>
);

export default UnauthorizedLayout;
