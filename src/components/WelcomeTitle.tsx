import { Heading } from '@chakra-ui/react';
import {memo} from 'react';
import { getNameAndId } from '../utils/helper';

export const WelcomeTitle = memo(({ title }: {title: string}) => {
    const name = getNameAndId().name || 'Guest'
  
    return (
      
      <Heading as="h1" size="xs" p="25px" textAlign="center" >
        Welcome {name}👋 {title}
      </Heading>
    );
  });
