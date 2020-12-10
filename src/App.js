import React from 'react'
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'

import tinymce from 'tinymce/tinymce' // eslint-disable-line no-unused-vars
import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/help'
import { Editor } from '@tinymce/tinymce-react'

import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/skins/ui/oxide/content.inline.css'
import './App.css'

function VisualEditor(props) {
  return (
    <Editor
      init={{
        skin: false,
        //content_css:
        //  'https://cdn.jcu.edu.au/cookbook/2.0/css/cookbook.min.css,https://cdn.jcu.edu.au/cookbook/2.0/css/fonts.min.css',
        //content_css_cors: true,
        content_style: `body { font-family: sans-serif; }`,
        max_height: '90vh',
        autoresize_bottom_margin: 0,
        body_class: '',
        menubar: false,
        statusbar: false,
        branding: false,
        plugins: [
          'autoresize',
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'searchreplace',
          'code',
          'fullscreen',
          'paste',
          'help',
        ],
        toolbar:
          'undo redo searchreplace | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | removeformat | code | help',
        help_tabs: [
          {
            name: 'about',
            title: 'About This App',
            items: [
              {
                type: 'htmlpanel',
                html: `
                <p>This editor is for modifying descriptions used in Research Data JCU.</p>
                <p>This visual HTML editor is configured to work for:</p>
                <ul>
                  <li><strong>Labels</strong>: simple text-based messages which are typically short, single-line strings (allowed content are <strong>bold</strong>, <em>italic</em> and <a href="#">linked text</a>), and</li>
                  <li><strong>Rich HTML:</strong> more complicated messages that contain multiple paragraphs, styling, headings, bullets, numbering and more.</li>
                </ul>
                <p>Because this visual HTML editor needs to work for both types of message, hitting <kbd>Enter</kbd> or <kbd>Return</kbd> will insert a Line Break (<code>&lt;br&gt;</code>) rather than a new Paragraph (<code>&lt;p&gt;</code>). To create a new paragraph, use <kbd>Shift</kbd> + <kbd>Enter/Return</kbd> when entering text.</p>
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
        <Row as="main">
          <Col>
            <VisualEditor />
          </Col>
        </Row>
        <Row as="footer" className="pt-3 border-top">
          <Col className="text-center text-muted">
            <ul class="list-inline">
              <li class="list-inline-item mr-2 pr-2 border-right">
                Made by the{' '}
                <a href="https://github.com/jcu-eresearch">
                  JCU eResearch Centre
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
