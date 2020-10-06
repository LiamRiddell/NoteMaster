// https://github.com/Microsoft/vscode/blob/master/src/vs/editor/standalone/common/themes.ts

export const NUMER_DARK_THEME_NML_ENABLED = {
  base: 'vs-dark',
  inherit: false,
  rules: [
    // Default
    { token: '', foreground: 'C5C6C7' },
    { token: 'header', foreground: '9EA4AE' },
    { token: 'comment', foreground: '74B478' },
    { token: 'link', foreground: '358FEB' },
    { token: 'variable', foreground: 'F2C94C' },
    { token: 'label', foreground: 'F2C94C' },
    // Operators
    { token: 'operator', foreground: 'C5C6C7' },
    // Constant
    { token: 'constant', foreground: 'E9C273' },
    // Functions
    { token: 'function', foreground: 'F2C94C' },
    // Keywords
    { token: 'keyword', foreground: 'CD9965' },
    // Units
    { token: 'currency', foreground: '93C2F1' },
    // { token: 'date', foreground: '93C2F1' },
    { token: 'hex', foreground: '93C2F1' },
    { token: 'unit', foreground: '93C2F1' },
    // Data Types
    { token: 'decimal', foreground: 'C5C6C7' },
    { token: 'integer', foreground: 'C5C6C7' },
    { token: 'integer.posneg', foreground: 'C5C6C7' },
    { token: 'percent', foreground: 'C5C6C7' },
    // Underline
    { token: 'underline', foreground: 'F2C94C', fontStyle: 'underline' }
  ],
  colors: {
    'editor.background': '#15181C',

    // Selecttion
    'editor.selectionBackground': '#162A4E',

    // Line Numbers
    'editorGutter.background': '#27292C',
    'editor.lineHighlightBackground': '#ffffff08',
    'editorLineNumber.foreground': '#9CA5AB',

    // Cursor
    'editorCursor.foreground': '#666666',
    'editorWhitespace.foreground': '#ffffff08',

    // Scrolling Shadow
    'scrollbar.shadow': '#00000000',

    // Links
    'textLink.foreground': '#358FEB', // Foreground color for links in text.
    'textLink.activeForeground': '#358FEB', // Foreground color for active links in text.
    'editorLink.activeForeground': '#358FEB',

    // Context Menu
    'dropdown.background': '#202225', // Dropdown background.
    'dropdown.foreground': '#d0d0d0', // Dropdown foreground.
    'dropdown.border': '#202225' // Dropdown border.
  }
};

export const NUMER_DARK_THEME_NML_DISABLED = {
  base: 'vs-dark',
  inherit: false,
  rules: [
    // Default
    { token: '', foreground: 'C5C6C7' },
    { token: 'header', foreground: '9EA4AE' },
    { token: 'comment', foreground: '74B478' },
    { token: 'link', foreground: '358FEB' },
    { token: 'variable', foreground: 'C5C6C7' },
    { token: 'label', foreground: 'F2C94C' },
    // Operators
    { token: 'operator', foreground: 'C5C6C7' },
    // Constant
    { token: 'constant', foreground: 'C5C6C7' },
    // Functions
    { token: 'function', foreground: 'C5C6C7' },
    // Keywords
    { token: 'keyword', foreground: 'C5C6C7' },
    // Units
    { token: 'currency', foreground: 'C5C6C7' },
    // { token: 'date', foreground: '93C2F1' },
    { token: 'hex', foreground: 'C5C6C7' },
    { token: 'unit', foreground: 'C5C6C7' },
    // Data Types
    { token: 'decimal', foreground: 'C5C6C7' },
    { token: 'integer', foreground: 'C5C6C7' },
    { token: 'integer.posneg', foreground: 'C5C6C7' },
    { token: 'percent', foreground: 'C5C6C7' },
    // Underline
    { token: 'underline', foreground: 'F2C94C', fontStyle: 'underline' }
  ],
  colors: {
    'editor.background': '#15181C',

    // Selecttion
    'editor.selectionBackground': '#162A4E',

    // Line Numbers
    'editorGutter.background': '#27292C',
    'editor.lineHighlightBackground': '#ffffff08',
    'editorLineNumber.foreground': '#9CA5AB',

    // Cursor
    'editorCursor.foreground': '#666666',
    'editorWhitespace.foreground': '#ffffff08',

    // Scrolling Shadow
    'scrollbar.shadow': '#00000000',

    // Links
    'textLink.foreground': '#358FEB', // Foreground color for links in text.
    'textLink.activeForeground': '#358FEB', // Foreground color for active links in text.
    'editorLink.activeForeground': '#358FEB',

    // Context Menu
    'dropdown.background': '#202225', // Dropdown background.
    'dropdown.foreground': '#d0d0d0', // Dropdown foreground.
    'dropdown.border': '#202225' // Dropdown border.
  }
};

// rules: [
//   { token: '', foreground: 'D4D4D4', background: '1E1E1E' },
//   { token: 'invalid', foreground: 'f44747' },
//   { token: 'emphasis', fontStyle: 'italic' },
//   { token: 'strong', fontStyle: 'bold' },

//   { token: 'variable', foreground: '74B0DF' },
//   { token: 'variable.predefined', foreground: '4864AA' },
//   { token: 'variable.parameter', foreground: '9CDCFE' },
//   { token: 'constant', foreground: '569CD6' },
//   { token: 'comment', foreground: '608B4E' },
//   { token: 'number', foreground: 'B5CEA8' },
//   { token: 'number.hex', foreground: '5BB498' },
//   { token: 'regexp', foreground: 'B46695' },
//   { token: 'annotation', foreground: 'cc6666' },
//   { token: 'type', foreground: '3DC9B0' },

//   { token: 'delimiter', foreground: 'DCDCDC' },
//   { token: 'delimiter.html', foreground: '808080' },
//   { token: 'delimiter.xml', foreground: '808080' },

//   { token: 'tag', foreground: '569CD6' },
//   { token: 'tag.id.pug', foreground: '4F76AC' },
//   { token: 'tag.class.pug', foreground: '4F76AC' },
//   { token: 'meta.scss', foreground: 'A79873' },
//   { token: 'meta.tag', foreground: 'CE9178' },
//   { token: 'metatag', foreground: 'DD6A6F' },
//   { token: 'metatag.content.html', foreground: '9CDCFE' },
//   { token: 'metatag.html', foreground: '569CD6' },
//   { token: 'metatag.xml', foreground: '569CD6' },
//   { token: 'metatag.php', fontStyle: 'bold' },

//   { token: 'key', foreground: '9CDCFE' },
//   { token: 'string.key.json', foreground: '9CDCFE' },
//   { token: 'string.value.json', foreground: 'CE9178' },

//   { token: 'attribute.name', foreground: '9CDCFE' },
//   { token: 'attribute.value', foreground: 'CE9178' },
//   { token: 'attribute.value.number.css', foreground: 'B5CEA8' },
//   { token: 'attribute.value.unit.css', foreground: 'B5CEA8' },
//   { token: 'attribute.value.hex.css', foreground: 'D4D4D4' },

//   { token: 'string', foreground: 'CE9178' },
//   { token: 'string.sql', foreground: 'FF0000' },

//   { token: 'keyword', foreground: '569CD6' },
//   { token: 'keyword.flow', foreground: 'C586C0' },
//   { token: 'keyword.json', foreground: 'CE9178' },
//   { token: 'keyword.flow.scss', foreground: '569CD6' },

//   { token: 'operator.scss', foreground: '909090' },
//   { token: 'operator.sql', foreground: '778899' },
//   { token: 'operator.swift', foreground: '909090' },
//   { token: 'predefined.sql', foreground: 'FF00FF' }

// https://github.com/microsoft/monaco-editor/blob/master/test/playground.generated/customizing-the-appearence-exposed-colors.html
// // A list of color names:
// 'foreground' // Overall foreground color. This color is only used if not overridden by a component.
// 'errorForeground' // Overall foreground color for error messages. This color is only used if not overridden by a component.
// 'descriptionForeground' // Foreground color for description text providing additional information, for example for a label.
// 'focusBorder' // Overall border color for focused elements. This color is only used if not overridden by a component.
// 'contrastBorder' // An extra border around elements to separate them from others for greater contrast.
// 'contrastActiveBorder' // An extra border around active elements to separate them from others for greater contrast.
// 'selection.background' // The background color of text selections in the workbench (e.g. for input fields or text areas). Note that this does not apply to selections within the editor.
// 'textSeparator.foreground' // Color for text separators.
// 'textLink.foreground' // Foreground color for links in text.
// 'textLink.activeForeground' // Foreground color for active links in text.
// 'textPreformat.foreground' // Foreground color for preformatted text segments.
// 'textBlockQuote.background' // Background color for block quotes in text.
// 'textBlockQuote.border' // Border color for block quotes in text.
// 'textCodeBlock.background' // Background color for code blocks in text.
// 'widget.shadow' // Shadow color of widgets such as find/replace inside the editor.
// 'input.background' // Input box background.
// 'input.foreground' // Input box foreground.
// 'input.border' // Input box border.
// 'inputOption.activeBorder' // Border color of activated options in input fields.
// 'input.placeholderForeground' // Input box foreground color for placeholder text.
// 'inputValidation.infoBackground' // Input validation background color for information severity.
// 'inputValidation.infoBorder' // Input validation border color for information severity.
// 'inputValidation.warningBackground' // Input validation background color for information warning.
// 'inputValidation.warningBorder' // Input validation border color for warning severity.
// 'inputValidation.errorBackground' // Input validation background color for error severity.
// 'inputValidation.errorBorder' // Input validation border color for error severity.
// 'dropdown.background' // Dropdown background.
// 'dropdown.foreground' // Dropdown foreground.
// 'dropdown.border' // Dropdown border.
// 'list.focusBackground' // List/Tree background color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// 'list.focusForeground' // List/Tree foreground color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// 'list.activeSelectionBackground' // List/Tree background color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// 'list.activeSelectionForeground' // List/Tree foreground color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
// 'list.inactiveSelectionBackground' // List/Tree background color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
// 'list.inactiveSelectionForeground' // List/Tree foreground color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
// 'list.hoverBackground' // List/Tree background when hovering over items using the mouse.
// 'list.hoverForeground' // List/Tree foreground when hovering over items using the mouse.
// 'list.dropBackground' // List/Tree drag and drop background when moving items around using the mouse.
// 'list.highlightForeground' // List/Tree foreground color of the match highlights when searching inside the list/tree.
// 'pickerGroup.foreground' // Quick picker color for grouping labels.
// 'pickerGroup.border' // Quick picker color for grouping borders.
// 'button.foreground' // Button foreground color.
// 'button.background' // Button background color.
// 'button.hoverBackground' // Button background color when hovering.
// 'badge.background' // Badge background color. Badges are small information labels, e.g. for search results count.
// 'badge.foreground' // Badge foreground color. Badges are small information labels, e.g. for search results count.
// 'scrollbar.shadow' // Scrollbar shadow to indicate that the view is scrolled.
// 'scrollbarSlider.background' // Slider background color.
// 'scrollbarSlider.hoverBackground' // Slider background color when hovering.
// 'scrollbarSlider.activeBackground' // Slider background color when active.
// 'progressBar.background' // Background color of the progress bar that can show for long running operations.
// 'editor.background' // Editor background color.
// 'editor.foreground' // Editor default foreground color.
// 'editorWidget.background' // Background color of editor widgets, such as find/replace.
// 'editorWidget.border' // Border color of editor widgets. The color is only used if the widget chooses to have a border and if the color is not overridden by a widget.
// 'editor.selectionBackground' // Color of the editor selection.
// 'editor.selectionForeground' // Color of the selected text for high contrast.
// 'editor.inactiveSelectionBackground' // Color of the selection in an inactive editor.
// 'editor.selectionHighlightBackground' // Color for regions with the same content as the selection.
// 'editor.findMatchBackground' // Color of the current search match.
// 'editor.findMatchHighlightBackground' // Color of the other search matches.
// 'editor.findRangeHighlightBackground' // Color the range limiting the search.
// 'editor.hoverHighlightBackground' // Highlight below the word for which a hover is shown.
// 'editorHoverWidget.background' // Background color of the editor hover.
// 'editorHoverWidget.border' // Border color of the editor hover.
// 'editorLink.activeForeground' // Color of active links.
// 'diffEditor.insertedTextBackground' // Background color for text that got inserted.
// 'diffEditor.removedTextBackground' // Background color for text that got removed.
// 'diffEditor.insertedTextBorder' // Outline color for the text that got inserted.
// 'diffEditor.removedTextBorder' // Outline color for text that got removed.
// 'editorOverviewRuler.currentContentForeground' // Current overview ruler foreground for inline merge-conflicts.
// 'editorOverviewRuler.incomingContentForeground' // Incoming overview ruler foreground for inline merge-conflicts.
// 'editorOverviewRuler.commonContentForeground' // Common ancestor overview ruler foreground for inline merge-conflicts.
// 'editor.lineHighlightBackground' // Background color for the highlight of line at the cursor position.
// 'editor.lineHighlightBorder' // Background color for the border around the line at the cursor position.
// 'editor.rangeHighlightBackground' // Background color of highlighted ranges, like by quick open and find features.
// 'editorCursor.foreground' // Color of the editor cursor.
// 'editorWhitespace.foreground' // Color of whitespace characters in the editor.
// 'editorIndentGuide.background' // Color of the editor indentation guides.
// 'editorLineNumber.foreground' // Color of editor line numbers.
// 'editorRuler.foreground' // Color of the editor rulers.
// 'editorCodeLens.foreground' // Foreground color of editor code lenses
// 'editorBracketMatch.background' // Background color behind matching brackets
// 'editorBracketMatch.border' // Color for matching brackets boxes
// 'editorOverviewRuler.border' // Color of the overview ruler border.
// 'editorGutter.background' // Background color of the editor gutter. The gutter contains the glyph margins and the line numbers.
// 'editorError.foreground' // Foreground color of error squigglies in the editor.
// 'editorError.border' // Border color of error squigglies in the editor.
// 'editorWarning.foreground' // Foreground color of warning squigglies in the editor.
// 'editorWarning.border' // Border color of warning squigglies in the editor.
// 'editorMarkerNavigationError.background' // Editor marker navigation widget error color.
// 'editorMarkerNavigationWarning.background' // Editor marker navigation widget warning color.
// 'editorMarkerNavigation.background' // Editor marker navigation widget background.
// 'editorSuggestWidget.background' // Background color of the suggest widget.
// 'editorSuggestWidget.border' // Border color of the suggest widget.
// 'editorSuggestWidget.foreground' // Foreground color of the suggest widget.
// 'editorSuggestWidget.selectedBackground' // Background color of the selected entry in the suggest widget.
// 'editorSuggestWidget.highlightForeground' // Color of the match highlights in the suggest widget.
// 'editor.wordHighlightBackground' // Background color of a symbol during read-access, like reading a variable.
// 'editor.wordHighlightStrongBackground' // Background color of a symbol during write-access, like writing to a variable.
// 'peekViewTitle.background' // Background color of the peek view title area.
// 'peekViewTitleLabel.foreground' // Color of the peek view title.
// 'peekViewTitleDescription.foreground' // Color of the peek view title info.
// 'peekView.border' // Color of the peek view borders and arrow.
// 'peekViewResult.background' // Background color of the peek view result list.
// 'peekViewResult.lineForeground' // Foreground color for line nodes in the peek view result list.
// 'peekViewResult.fileForeground' // Foreground color for file nodes in the peek view result list.
// 'peekViewResult.selectionBackground' // Background color of the selected entry in the peek view result list.
// 'peekViewResult.selectionForeground' // Foreground color of the selected entry in the peek view result list.
// 'peekViewEditor.background' // Background color of the peek view editor.
// 'peekViewEditorGutter.background' // Background color of the gutter in the peek view editor.
// 'peekViewResult.matchHighlightBackground' // Match highlight color in the peek view result list.
// 'peekViewEditor.matchHighlightBackground' // Match highlight color in the peek view editor.
