const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const {JSDOM} = require('jsdom');

const openaiApiKey = process.env.OPENAI_API_KEY;

// en, ko are already written.
const languages = [
  {
    code: 'ar',
    name: 'Arabic'
  },
  {
    code: 'de',
    name: 'German'
  },
  {
    code: 'es',
    name: 'Spanish'
  },
  {
    code: 'fr',
    name: 'French'
  },
  {
    code: 'hi',
    name: 'Hindi'
  },
  {
    code: 'id',
    name: 'Indonesian'
  },
  {
    code: 'ja',
    name: 'Japanese'
  },
  {
    code: 'mr',
    name: 'Marathi'
  },
  {
    code: 'pt',
    name: 'Portuguese'
  },
  {
    code: 'ru',
    name: 'Russian'
  },
  {
    code: 'ur-IN',
    name: 'Urdu (India)'
  },
  {
    code: 'zh-Hans',
    name: 'Chinese (Simplified)'
  },
  {
    code: 'zh-Hant',
    name: 'Chinese (Traditional)'
  }
];

// List of files to translate
const files = [
  'pages/en/_meta.js',
  'pages/en/cookie.mdx'
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

// Check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Read, translate, and save the file
async function translateAndSaveFiles() {
  for (const filePath of files) {
    try {
      const fileName = path.basename(filePath);

      for (const {
        code: langCode,
        name: langName
      } of languages) {
        const langDir = `pages/${langCode}`;
        const newFilePath = path.join(langDir, fileName);

        // 파일이 이미 존재하는 경우 번역 생략
        if (await fileExists(newFilePath)) {
          console.log(`File already exists, overwriting: ${newFilePath}`);
          // continue;
        }

        // Read the original file contents
        const originalText = await fs.readFile(filePath, 'utf8');

        // Translate the contents of the file
        const translatedText = await translateText(originalText, langName);
        if (translatedText) {
          await fs.mkdir(langDir, {recursive: true}); // Create a language directory
          await fs.writeFile(newFilePath, translatedText, 'utf8');
          console.log(`Translated and saved: ${newFilePath}`);
        } else {
          console.log(`Failed to translate file: ${filePath} to ${langName}`);
        }
      }
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error.message);
    }
  }
}

translateAndSaveFiles();
