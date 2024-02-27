import { useState } from 'react';
import { Flex, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Input, Textarea, Button, Select, Text, useBreakpointValue, Avatar } from '@chakra-ui/react';
import { IoMdArrowRoundBack } from "react-icons/io";

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const handleTabsChange = (index: any) => {
    const tabs = ['edit', 'privacy', 'notifications']; // Add more tabs as needed
    setActiveTab(tabs[index]);
  };

  // Define the type for orientation that Tabs component expects
  type Orientation = "horizontal" | "vertical" | undefined;

  // Dynamically set the Tabs orientation based on the screen size
  const tabsOrientation = useBreakpointValue({ base: 'horizontal', lg: 'vertical' }) as Orientation;

  return (
    <Flex
      minHeight={{ base: '0', lg: '100vh' }}
      align="center"
      justify="center"
      p={4}
    >
      <Tabs variant="soft-rounded" onChange={handleTabsChange} orientation={tabsOrientation} width="full" maxWidth={{base: "100%" ,lg: "50%"}} mx="auto">
        {/* Use Flex to conditionally render the TabList based on orientation */}
        {tabsOrientation === 'horizontal' ? (
          <TabList>
            <Tab><IoMdArrowRoundBack /></Tab>
            <Tab>Edit Profile</Tab>
            <Tab>Privacy</Tab>
            <Tab>Notifications</Tab>
            {/* Add more <Tab> components as needed for additional settings */}
          </TabList>
        ) : null}

        <Flex direction={{ base: 'column', lg: 'row' }} width="full">
          {tabsOrientation === 'vertical' ? (
            <Box
              flexShrink={0}
              minWidth={{ lg: '250px' }}
              width={{ base: 'full', lg: '250px' }}
              borderWidth="1px"
              borderColor="gray.200"
              p={4}
              mb={{ base: 4, lg: 0 }}
              height={{ base: 'auto', lg: '100%' }}
            >
              <TabList position="sticky" top="0" zIndex="sticky" bg="white">
                <Tab>Edit Profile</Tab>
                <Tab>Privacy</Tab>
                <Tab>Notifications</Tab>
                {/* Add more <Tab> components as needed for additional settings */}
              </TabList>

            </Box>
          ) : null}

          <TabPanels
            flex="1"
            width={{ base: 'full', lg: 'auto' }}
            p="4"
            height="fit-content"
            overflowY="auto"
          >
            <TabPanel>
              {/* Edit Profile Tab */}
              <Box>
              <TabPanel>
                {/* Edit Profile Tab */}
                <Box mb={4}>
                  {/* User image and name */}
                  <Flex alignItems="center" mb={4}>
                    <Box borderRadius="full" overflow="hidden" width="50px" height="50px" mr={3}>
                      {/* You might want to dynamically load the image source here */}
                      <Avatar src="/path-to-user-image.jpg" />
                    </Box>
                    <Text fontWeight="bold">Nahid. Ekon</Text> {/* Replace with dynamic data if needed */}
                  </Flex>
                </Box>
              </TabPanel>

                <Input placeholder="Username" mb={4} />
                <Input placeholder="Email" mb={4} />
                <Textarea placeholder="Bio" mb={4} />
                <Select placeholder="Select gender" mb={4}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
                {/* Add more input fields as required */}
                <Button colorScheme="blue">Save Changes</Button>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <Text>Privacy Tab content. Coming soon...</Text>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <Text>Notifications Tab content. Coming soon...</Text>
              </Box>
            </TabPanel>
            {/* Add more <TabPanel> components as needed for additional settings */}
          </TabPanels>
        </Flex>
      </Tabs>
    </Flex>
  );
};

export default UserSettings;
