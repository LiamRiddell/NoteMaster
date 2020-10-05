/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
/** @jsx jsx */
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  jsx,
  Box,
  Button,
  Text,
  Heading,
  Link,
  Input,
  Label,
  Select,
  Flex
} from 'theme-ui';
import { useHistory } from 'react-router';
import { preferencesSave } from '../../redux/actions/preferences';

// LR: Import components
import TitlebarComponent from '../../components/TitlebarSimple/TitlebarSimpleComponent';
import { ScrollableContentComponent } from '../../components/ScrollableContent/ScrollableContentComponent';
import { ContainerComponent } from '../../components/Container/ContainerComponent';
import { TooltipComponent } from '../../components/Tooltip/TooltipComponent';

// LR: Import styles
import styles from './PreferencesRoute.css';

const PreferencesRoute = ({ preferences, updatePreferences }) => {
  const history = useHistory();

  const fontFamilyChange = e => {
    updatePreferences({
      fontFamily: e.target.value,
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const fontSizeChange = e => {
    updatePreferences({
      fontSize: Number(e.target.value),
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const fontWeightChange = e => {
    updatePreferences({
      fontWeight: e.target.value,
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const lineHeightChange = e => {
    updatePreferences({
      lineHeight: Number(e.target.value),
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const lineNumbersChange = e => {
    updatePreferences({
      lineNumbers: e.target.value,
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const autoLaunchChange = e => {
    updatePreferences({
      autoLaunch: e.target.value === 'true',
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const nmlEnabledChange = e => {
    updatePreferences({
      nmlEnabled: e.target.value === 'true',
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const fontLigaturesChange = e => {
    updatePreferences({
      fontLigatures: e.target.value === 'true',
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const nmlBaseCurrencyChange = e => {
    updatePreferences({
      nmlBaseCurrency: e.target.value,
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const wrappingIndentChange = e => {
    updatePreferences({
      wrappingIndent: e.target.value,
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const editorThemeChange = e => {
    updatePreferences({
      editorTheme: e.target.value,
      // HACK: If the initial content is updated to match the existing autosaveContent then the user will lose all changes
      // since the file was read from the disk into memory.
      editorContent: preferences.autosaveContent
    });
  };

  const navigateToNotes = e => {
    updatePreferences({
      editorContent: preferences.autosaveContent
    });

    history.push('/');
  };

  const {
    editorTheme,
    fontFamily,
    fontSize,
    fontWeight,
    lineNumbers,
    lineHeight,
    fontLigatures,
    autoLaunch,
    nmlEnabled,
    nmlBaseCurrency,
    wrappingIndent
  } = preferences;

  const renderNmlOptions = () => {
    return (
      <Box
        className={
          nmlEnabled ? styles.smartOptionsActive : styles.smartOptionsHidden
        }
        mb="2"
      >
        <Flex mt="3">
          <Box sx={{ flex: '1 1 auto' }}>
            <TooltipComponent content="Set this value to your most commonly used currency. The default is: USD.">
              <Label mt="2" variant="labelTooltip">
                Base Currency
              </Label>
            </TooltipComponent>
          </Box>
          <Box>
            <Select
              disabled={!nmlEnabled}
              defaultValue={nmlBaseCurrency}
              onChange={nmlBaseCurrencyChange}
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </Select>
          </Box>
        </Flex>
      </Box>
    );
  };

  return (
    <div className={styles.container} data-tid="container">
      <div className={styles.header}>
        <TitlebarComponent />
      </div>
      <div className={styles.preferences}>
        <ContainerComponent padding="0 8px 0 0">
          <Button variant="linkUpper" mb="0" onClick={navigateToNotes}>
            <i className="ri-arrow-left-line" /> Return to Notes
          </Button>
        </ContainerComponent>
        <ScrollableContentComponent>
          <ContainerComponent padding="0 8px 0 0">
            <Heading mt="0" as="h1">
              Preferences
            </Heading>
            <Text mt="1" mb="3" variant="muted">
              Customize NoteMaster to your desire. You can request features on{' '}
              <Link
                href="https://github.com/LiamRiddell/NoteMaster"
                target="_blank"
                rel="noreferer"
              >
                NoteMaster GitHub
              </Link>
              .
            </Text>

            {/* Editor */}
            <Box mb="4">
              <Text mb="2" variant="group">
                Editor
              </Text>

              <Flex mt="3">
                <Box sx={{ flex: '1 1 auto' }}>
                  <TooltipComponent content="When enabled, NoteMaster Smart Mode automatically recognizes keywords, and intelligently provides results as you type. The default is: Enabled.">
                    <Label mt="2" variant="labelTooltip">
                      Smart Mode
                    </Label>
                  </TooltipComponent>
                </Box>
                <Box>
                  <Select
                    defaultValue={nmlEnabled ? 'true' : 'false'}
                    onChange={nmlEnabledChange}
                  >
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                  </Select>
                </Box>
              </Flex>

              {/* NoteMaster Language */}
              {renderNmlOptions()}

              {/* Line Numbers */}
              <Flex mt="3">
                <Box sx={{ flex: '1 1 auto' }}>
                  <TooltipComponent content="When enabled, line numbers will be displayed on the left side of the editor. The default is: Off.">
                    <Label mt="2" variant="labelTooltip">
                      Line Numbers
                    </Label>
                  </TooltipComponent>
                </Box>
                <Box>
                  <Select
                    defaultValue={lineNumbers}
                    onChange={lineNumbersChange}
                  >
                    <option value="off">Off</option>
                    <option value="on">On</option>
                    <option value="relative">Relative</option>
                    <option value="interval">Interval</option>
                  </Select>
                </Box>
              </Flex>

              {/* Text Wrap Indentation */}
              <Flex mt="3">
                <Box sx={{ flex: '1 1 auto' }}>
                  <TooltipComponent content="This effects how long sentences wrap onto a new line. The default is: Same.">
                    <Label mt="2" variant="labelTooltip">
                      Text Wrap Indent
                    </Label>
                  </TooltipComponent>
                </Box>
                <Box>
                  <Select
                    defaultValue={wrappingIndent}
                    onChange={wrappingIndentChange}
                  >
                    <option value="same">Same</option>
                    <option value="indent">Indent</option>
                    <option value="deepIndent">Deep Indent</option>
                    <option value="none">None</option>
                  </Select>
                </Box>
              </Flex>

              {/* Editor Theme */}
              <Flex mt="3">
                <Box sx={{ flex: '1 1 auto' }}>
                  <TooltipComponent content="Using the Dark theme will enable rich text highlighting, which compliments Smart Mode. Use Dark Basic, if you find the rich text highlighting distrating. The default is: Dark.">
                    <Label mt="2" variant="labelTooltip">
                      Theme
                    </Label>
                  </TooltipComponent>
                </Box>
                <Box>
                  <Select
                    defaultValue={editorTheme}
                    onChange={editorThemeChange}
                  >
                    <option value="notemaster-dark-nml-enabled">Dark</option>
                    <option value="notemaster-dark-nml-disabled">
                      Dark Basic
                    </option>
                  </Select>
                </Box>
              </Flex>
            </Box>

            {/* Typography Settings */}
            <Box mb="4">
              <Text mb="2" variant="group">
                Typography
              </Text>

              {/* Font */}
              <Flex mt="3">
                <Box sx={{ flex: '1 1 auto' }}>
                  <TooltipComponent content="Changes the font within the editor. The default is: Roboto.">
                    <Label mt="2" variant="labelTooltip">
                      Font
                    </Label>
                  </TooltipComponent>
                </Box>
                <Box>
                  <Select defaultValue={fontFamily} onChange={fontFamilyChange}>
                    <option value="Roboto">Roboto</option>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica Neue">Helvetica Neue</option>
                    <option value="Monospace">Monospace</option>
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="Segoe UI">Segoe UI</option>
                  </Select>
                </Box>
              </Flex>

              {/* Font Size */}
              <Flex mt="3">
                <Box sx={{ flex: '1 1 auto' }}>
                  <TooltipComponent content="You can adjust the font size within the editor. The default is: 16.">
                    <Label mt="2" variant="labelTooltip">
                      Font Size
                    </Label>
                  </TooltipComponent>
                </Box>
                <Box>
                  <Input
                    type="number"
                    defaultValue={fontSize}
                    onChange={fontSizeChange}
                    sx={{ width: '72px' }}
                  />
                </Box>
              </Flex>

              {/* Font Weight */}
              <Flex mt="3">
                <Box sx={{ flex: '1 1 auto' }}>
                  <TooltipComponent content="Changes the font thickness within the editor. The default is: Regular.">
                    <Label mt="2" variant="labelTooltip">
                      Font Weight
                    </Label>
                  </TooltipComponent>
                </Box>
                <Box>
                  <Select defaultValue={fontWeight} onChange={fontWeightChange}>
                    <option value="100">Thin</option>
                    <option value="200">Extra Light</option>
                    <option value="300">Light</option>
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semi-Bold</option>
                    <option value="700">Bold</option>
                    <option value="800">Extra Bold</option>
                    <option value="900">Black</option>
                  </Select>
                </Box>
              </Flex>

              {/* Line Height */}
              <Flex mt="3">
                <Box sx={{ flex: '1 1 auto' }}>
                  <TooltipComponent content="Change the line height within the editor. The default is: 24.">
                    <Label mt="2" variant="labelTooltip">
                      Line Height
                    </Label>
                  </TooltipComponent>
                </Box>
                <Box>
                  <Input
                    type="number"
                    defaultValue={lineHeight}
                    onChange={lineHeightChange}
                    sx={{ width: '72px' }}
                  />
                </Box>
              </Flex>

              {/*
              <Label mt="2" mb="1">
                Font Ligatures
              </Label>
              <Select
                defaultValue={fontLigatures ? 'true' : 'false'}
                onChange={fontLigaturesChange}
              >
                <option value="true">On</option>
                <option value="false">Off</option>
              </Select> */}
            </Box>

            {/* System */}
            <Box mb="4">
              <Text mb="2" variant="group">
                SYSTEM
              </Text>

              {/* Auto Launch */}
              <Flex mt="3">
                <Box sx={{ flex: '1 1 auto' }}>
                  <TooltipComponent content="When enabled, NoteMaster will be launched on startup. The default is: On.">
                    <Label mt="2" variant="labelTooltip">
                      Auto Launch
                    </Label>
                  </TooltipComponent>
                </Box>
                <Box>
                  <Select
                    defaultValue={autoLaunch ? 'true' : 'false'}
                    onChange={autoLaunchChange}
                  >
                    <option value="false">Off</option>
                    <option value="true">On</option>
                  </Select>
                </Box>
              </Flex>
            </Box>

            {/* Creation Rights */}
            <Box
              p={3}
              color="text"
              bg="#27292C"
              mb="1"
              sx={{ borderRadius: 3 }}
            >
              Thank you for downloading NoteMaster, an open-source project
              created and maintained by{' '}
              <Link href="https://github.com/LiamRiddell" target="_blank">
                Liam Riddell
              </Link>{' '}
              ❤️
            </Box>
          </ContainerComponent>
        </ScrollableContentComponent>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  preferences: state.preferences
});

const mapDispatchToProps = dispatch => ({
  updatePreferences: payload => dispatch(preferencesSave(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesRoute);
