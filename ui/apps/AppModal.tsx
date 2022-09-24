import { LinkIcon } from '@chakra-ui/icons';
import {
  Box, Button, Heading, Icon, IconButton, Image, Link, List, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text,
} from '@chakra-ui/react';
import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';

import type { AppCategory, AppItemOverview } from 'types/client/apps';

import { TEMPORARY_DEMO_APPS } from 'data/apps';
import ghIcon from 'icons/social/git.svg';
import tgIcon from 'icons/social/telega.svg';
import twIcon from 'icons/social/tweet.svg';
import starFilledIcon from 'icons/star_filled.svg';
import starOutlineIcon from 'icons/star_outline.svg';
import { nbsp } from 'lib/html-entities';

type Props = {
  id: string;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteClick: (id: string, isFavorite: boolean) => void;
}

const AppModal = ({
  id,
  onClose,
  isFavorite,
  onFavoriteClick,
}: Props) => {
  const {
    title,
    author,
    description,
    url,
    site,
    github,
    telegram,
    twitter,
    logo,
    categories,
  } = TEMPORARY_DEMO_APPS.find(app => app.id === id) as AppItemOverview;

  const socialLinks = [
    Boolean(telegram) && {
      icon: tgIcon,
      url: telegram,
    },
    Boolean(twitter) && {
      icon: twIcon,
      url: twitter,
    },
    Boolean(github) && {
      icon: ghIcon,
      url: github,
    },
  ].filter(Boolean) as Array<{ icon: FunctionComponent; url: string }>;

  const handleFavoriteClick = useCallback(() => {
    onFavoriteClick(id, isFavorite);
  }, [ onFavoriteClick, id, isFavorite ]);

  return (
    <Modal
      isOpen={ Boolean(id) }
      onClose={ onClose }
      size={{ base: 'full', lg: 'md' }}
      isCentered
    >
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader
          display="grid"
          gridTemplateColumns={{ base: 'auto 1fr' }}
          paddingRight={{ sm: 12 }}
        >
          <Box
            w={{ base: '72px', sm: '144px' }}
            h={{ base: '72px', sm: '144px' }}
            marginRight={{ base: 6, sm: 8 }}
            gridRow={{ base: '1 / 3', sm: '1 / 4' }}
          >
            <Image
              src={ logo }
              alt={ `${ title } app icon` }
            />
          </Box>

          <Heading
            as="h2"
            gridColumn={ 2 }
            fontSize={{ base: '2xl', sm: '3xl' }}
            fontWeight="medium"
            lineHeight={ 1 }
            color="blue.600"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            { title }
          </Heading>

          <Text
            variant="secondary"
            gridColumn={ 2 }
            fontSize="sm"
            fontWeight="normal"
            lineHeight={ 1 }
          >
            By{ nbsp }{ author }
          </Text>

          <Box
            gridColumn={{ base: '1 / 3', sm: 2 }}
            marginTop={{ base: 6, sm: 0 }}
          >
            <Box display="flex">
              <Button
                href={ url }
                as="a"
                size="sm"
                marginRight={ 2 }
                width={{ base: '100%', sm: 'auto' }}
              >
                Launch app
              </Button>

              <IconButton
                aria-label="Mark as favorite"
                title="Mark as favorite"
                variant="outline"
                colorScheme="gray"
                w={ 9 }
                h={ 8 }
                onClick={ handleFavoriteClick }
                icon={ isFavorite ?
                  <Icon as={ starFilledIcon } w={ 4 } h={ 4 } color="yellow.400"/> :
                  <Icon as={ starOutlineIcon } w={ 4 } h={ 4 } color="gray.300"/> }
              />
            </Box>
          </Box>
        </ModalHeader>

        <ModalCloseButton/>

        <ModalBody>
          <Heading
            as="h3"
            fontSize="2xl"
            marginBottom={ 4 }
          >
            Overview
          </Heading>

          <Box marginBottom={ 2 }>
            { categories.map((category: AppCategory) => (
              <Tag
                colorScheme="blue"
                marginRight={ 2 }
                marginBottom={ 2 }
                key={ category.id }
              >
                { category.name }
              </Tag>
            )) }
          </Box>

          <Text>{ description }</Text>
        </ModalBody>

        <ModalFooter
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems={{ base: 'flex-start', sm: 'center' }}
        >
          { site && (
            <Link
              isExternal
              href={ site }
              display="flex"
              alignItems="center"
              paddingRight={{ sm: 2 }}
              marginBottom={{ base: 3, sm: 0 }}
              maxW="100%"
              overflow="hidden"
            >
              <Icon
                as={ LinkIcon }
                display="inline"
                verticalAlign="baseline"
                boxSize={ 3 }
                marginRight={ 2 }
              />

              <Text
                color="inherit"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                { site }
              </Text>
            </Link>
          ) }

          { socialLinks.length && (
            <List
              marginLeft={{ sm: 'auto' }}
              display="grid"
              gridAutoFlow="column"
              columnGap={ 2 }
            >
              { socialLinks.map(({ icon, url }) => (
                <Link
                  aria-label={ `Link to ${ url }` }
                  title={ url }
                  key={ url }
                  href={ url }
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  isExternal
                  w={ 10 }
                  h={ 10 }
                >
                  <Icon
                    as={ icon }
                    w="20px"
                    h="20px"
                    display="block"
                  />
                </Link>
              )) }
            </List>
          ) }
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppModal;