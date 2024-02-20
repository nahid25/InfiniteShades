import {memo, useState} from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../../components/Button';
import CreatePost from '../CreatePost/CreatePost';
import AllImages from './components/AllImages';

export const HomeScreen = memo(() => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagSelected = (tag: string) => {
    setSelectedTag(prevTag => (prevTag === tag ? null : tag));
  };

    return (
        <Layout
          createCustomButton={[
            <Link key="1" to="/about">
              <PrimaryButton buttonText={"About"} />
            </Link>,
            <Link key="2" to="/">
              <PrimaryButton buttonText={"Home"} _disabled={true} />
            </Link>,
            <CreatePost key="3" />,
          ]}
          onTagSelected={handleTagSelected} 
          selectedTag={selectedTag} 
          children={ <AllImages selectedTag={selectedTag} />}
        ></Layout>
      );
})