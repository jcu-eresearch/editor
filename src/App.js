import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import tinymce from 'tinymce/tinymce' // eslint-disable-line no-unused-vars
import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/plugins/table'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/image'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/help'
import { Editor } from '@tinymce/tinymce-react'

import { version } from '../package.json'

import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.inline.min.css'
import './App.css'

function VisualEditor(props) {
  return (
    <Editor
      init={{
        skin: false,
        content_css: false,
        content_style: `body { font-family: sans-serif; }`,
        height: '85vh',
        body_class: '',
        menubar: true,
        statusbar: false,
        branding: false,
        plugins: [
          'table',
          'advlist',
          'autolink',
          'lists',
          'link',
          'searchreplace',
          'charmap',
          'image',
          'code',
          'fullscreen',
          'paste',
          'help',
        ],
        toolbar:
          'undo redo | formatselect | bold italic | superscript subscript | alignleft aligncenter alignright | bullist numlist outdent indent | link image table charmap | code | htmlCopy',
        toolbar_mode: 'sliding',
        contextmenu: 'link image table',
        // Prevent Links opening in new window
        target_list: false,
        setup: editor => {
          editor.ui.registry.addButton('htmlCopy', {
            icon: 'copy',
            text: 'Copy all',
            tooltip: 'Copy all as HTML source',
            onAction: () =>
              navigator.clipboard.writeText(editor.getContent()).then(
                () =>
                  editor.notificationManager.open({
                    text: 'Content copied to clipboard! Switch back to Research Data JCU and paste it into the relevant field.',
                    type: 'info',
                    timeout: 3000,
                    closeButton: false,
                  }),
                () =>
                  editor.notificationManager.open({
                    text: 'Could not copy to clipboard. Use the Code <> button and copy manually.',
                    type: 'error',
                    timeout: 3000,
                    closeButton: false,
                  })
              ),
          })
        },
        help_tabs: [
          {
            name: 'about',
            title: 'About This App',
            items: [
              {
                type: 'htmlpanel',
                html: `
                <p>This editor is for modifying rich text descriptions used in <a href="https://research.jcu.edu.au/data/">Research Data JCU</a>.</p>
                <p>This visual editor is configured to allow you to flexibily create rich content such as styled text, links, tables and more when describing your Data Records or Data Publications.</p>
                <p>Because of current limitations in the Research Data JCU platform, you can use this editor to prepare your content from scratch, by pasting in content from external applications, or by copy and pasting existing content in from Research Data JCU records</p>
                <p>When you're done editing, click the <kbd>Copy all</kbd> button on the toolbar and switch back to Research Data JCU where you can paste the HTML-formatted content into the Description or Descriptor field you're editing.</p>
                <p>Other help documentation for this visual editor, including shortcuts, is available from the links in this Help panel.</p>
                `,
              },
            ],
          },
          'shortcuts',
          'keyboardnav',
          'plugins',
        ],
      }}
      {...props}
    />
  )
}

function App() {
  window.onbeforeunload = () => true

  return (
    <div className="App my-1">
      <Container fluid>
        <Row as="header">
          <Col>
            <h1 className="lead">Research Data JCU – Visual Editor</h1>
          </Col>
        </Row>
        <Row as="main">
          <Col>
            <VisualEditor />
          </Col>
        </Row>
        <Row as="footer" className="pt-2">
          <Col className="text-center text-muted">
            <ul className="list-inline">
              <li className="list-inline-item me-2 pe-2 border-right">
                Need help? Ask the{' '}
                <a href="mailto:researchdata@jcu.edu.au">
                  Research Data JCU team
                </a>
              </li>
              <li className="list-inline-item">v{version}</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
