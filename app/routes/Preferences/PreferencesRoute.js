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
  Select
} from 'theme-ui';
import { useHistory } from 'react-router';
import { preferencesSave } from '../../redux/actions/preferences';

// LR: Import components
import TitlebarComponent from '../../components/TitlebarSimple/TitlebarSimpleComponent';
import { ScrollableContentComponent } from '../../components/ScrollableContent/ScrollableContentComponent';
import { ContainerComponent } from '../../components/Container/ContainerComponent';

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
        <Label mt="2" mb="1">
          Base Currency
        </Label>
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
              Customize NoteMaster to your desire (coming soon). This page is
              reserved for editable options that are coming soon. You can view
              the upcoming features on{' '}
              <Link
                href="https://github.com/LiamRiddell/NoteMaster/projects"
                target="_blank"
                rel="noreferer"
              >
                NoteMaster Roadmap
              </Link>
              .
            </Text>

            {/* Editor */}
            <Box mb="4">
              <Text mb="2" variant="group">
                Editor
              </Text>

              <Label mt="2" mb="1">
                Smart Mode
              </Label>
              <Select
                defaultValue={nmlEnabled ? 'true' : 'false'}
                onChange={nmlEnabledChange}
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </Select>

              {/* NoteMaster Language */}
              {renderNmlOptions()}

              <Label mt="2" mb="1">
                Line Numbers
              </Label>
              <Select defaultValue={lineNumbers} onChange={lineNumbersChange}>
                <option value="off">Off</option>
                <option value="on">On</option>
                <option value="relative">Relative</option>
                <option value="interval">Interval</option>
              </Select>

              <Label mt="2" mb="1">
                Wrapping Indent
              </Label>
              <Select
                defaultValue={wrappingIndent}
                onChange={wrappingIndentChange}
              >
                <option value="same">Same</option>
                <option value="indent">Indent</option>
                <option value="deepIndent">Deep Indent</option>
                <option value="none">None</option>
              </Select>

              <Label mt="2" mb="1">
                Theme
              </Label>
              <Select onChange={editorThemeChange}>
                <option value="notemaster-dark-nml-enabled">Dark</option>
                <option value="notemaster-dark-nml-disabled">Dark Basic</option>
              </Select>
            </Box>

            {/* Typography Settings */}
            <Box mb="4">
              <Text mb="2" variant="group">
                Typography
              </Text>

              <Label mt="2" mb="1">
                Font Family
              </Label>
              <Select defaultValue={fontFamily} onChange={fontFamilyChange}>
                <option value="Roboto">Roboto</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica Neue">Helvetica Neue</option>
                <option value="Monospace">Monospace</option>
                <option value="Ubuntu">Ubuntu</option>
                <option value="Segoe UI">Segoe UI</option>
              </Select>

              <Label mt="2" mb="1">
                Font Size
              </Label>
              <Input
                type="number"
                defaultValue={fontSize}
                onChange={fontSizeChange}
              />

              <Label mt="2" mb="1">
                Font Weight
              </Label>
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

              <Label mt="2" mb="1">
                Line Height
              </Label>
              <Input
                type="number"
                defaultValue={lineHeight}
                onChange={lineHeightChange}
              />
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

            <Box mb="4">
              <Text mb="2" variant="group">
                SYSTEM
              </Text>

              <Label mt="2" mb="1">
                Auto Launch
              </Label>
              <Select
                defaultValue={autoLaunch ? 'true' : 'false'}
                onChange={autoLaunchChange}
              >
                <option value="false">Off</option>
                <option value="true">On</option>
              </Select>
            </Box>

            {/*
              Local Storage -- hidden for now
              <Box mb="4">
                <Text mb="2" variant="group">
                  LOCAL STORAGE
                </Text>
                <Label mb="1">Delete Local Storage</Label>
                <Button variant="danger" sx={{ width: '100%' }}>
                  Clear Local Data
                </Button>
                <Text mt="1" variant="fieldDescription">
                  Clearing local data will delete your notes please be careful!
                </Text>
              </Box>
            */}
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
