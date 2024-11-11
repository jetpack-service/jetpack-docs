const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const {JSDOM} = require('jsdom');

const openaiApiKey = process.env.OPENAI_API_KEY;

const languages = [
  {
    code: 'zh-cn',
    name: 'Chinese (Simplified)',
  },
  {
    code: 'jp',
    name: 'Japanese',
  },
];

// List of files to translate
const files = [
  'pages/en/_meta.js',
  'pages/en/design.mdx',
  'pages/en/distribution.mdx',
  'pages/en/index.mdx',
  'pages/en/roadmap.mdx'
];

// Translate text via OpenAI API (using Chat Completion)
async function translateText(text, targetLangName) {
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful translation assistant.',
    },
    {
      role: 'user',
      content: `Translate the following text to ${targetLangName}, keeping the formatting and code blocks intact. Don't translate JetPack. Provide only the translated text:\n---\n${text}`,
    },
  ];

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o',
      messages: messages,
      temperature: 0,
      max_tokens: 16383,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
    });

    let content = response.data.choices[0].message.content.trim();

    // Remove code blocks starting with ```{filetype}
    if (/^```[\w\s]*\n/.test(content) && /\n```$/.test(content)) {
      content = content.replace(/^```[\w\s]*\n/, '').replace(/\n```$/, '').trim();
    }
    // Remove first line `---`
    if (content.startsWith('---\n')) {
      content = content.replace(/^---\n/, '').trim();
    }

    return content;
  } catch (error) {
    console.error(`Error translating text to ${targetLangName}:`, error.response ? error.response.data : error.message);
    return null;
  }
}

// Read, translate, and save the file
async function translateAndSaveFiles() {
  for (const filePath of files) {
    try {
      const fileName = path.basename(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const isImage = [
        '.svg'
      ].includes(ext);

      for (const {
        code: langCode,
        name: langName
      } of languages) {
        if (isImage && ext === '.svg') {
          // Handle SVG image translation
          const svgContent = await fs.readFile(filePath, 'utf8');
          const dom = new JSDOM(svgContent, {contentType: 'image/svg+xml'});
          const document = dom.window.document;

          // Find all text elements in the SVG
          const textElements = document.querySelectorAll('text');
          for (const elem of textElements) {
            const originalText = elem.textContent;
            const translatedText = await translateText(originalText, langName);
            if (translatedText) {
              elem.textContent = translatedText;
            } else {
              console.log(`Failed to translate SVG text: "${originalText}" to ${langName}`);
            }
          }

          const serializedSVG = dom.serialize();
          const newFileDir = path.dirname(filePath).replace(/\/ko/, `/${langCode}`);
          await fs.mkdir(newFileDir, {recursive: true});
          const newFilePath = path.join(newFileDir, fileName);
          await fs.writeFile(newFilePath, serializedSVG, 'utf8');
          console.log(`Translated and saved SVG: ${newFilePath}`);
        } else {
          // Read the original file contents
          const originalText = await fs.readFile(filePath, 'utf8');

          // Translate the contents of the file
          const translatedText = await translateText(originalText, langName);
          if (translatedText) {
            const langDir = `pages/${langCode}`;
            await fs.mkdir(langDir, {recursive: true}); // Create a language directory
            const newFilePath = path.join(langDir, fileName);
            await fs.writeFile(newFilePath, translatedText, 'utf8');
            console.log(`Translated and saved: ${newFilePath}`);
          } else {
            console.log(`Failed to translate file: ${filePath} to ${langName}`);
          }
        }
      }
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error.message);
    }
  }
}

translateAndSaveFiles();
