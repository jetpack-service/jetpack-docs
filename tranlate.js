const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const {JSDOM} = require('jsdom');

const openaiApiKey = process.env.OPENAI_API_KEY;

// en, ko are already written.
const languages = [
  // {
  //   code: 'en',
  //   name: 'English'
  // },
  // {
  //   code: 'ko',
  //   name: 'Korean'
  // },
  {
    code: 'af',
    name: 'Afrikaans'
  },
  {
    code: 'ak',
    name: 'Akan'
  },
  {
    code: 'sq',
    name: 'Albanian'
  },
  {
    code: 'am',
    name: 'Amharic'
  },
  {
    code: 'ar',
    name: 'Arabic'
  },
  {
    code: 'hy',
    name: 'Armenian'
  },
  {
    code: 'az',
    name: 'Azerbaijani'
  },
  {
    code: 'eu',
    name: 'Basque'
  },
  {
    code: 'be',
    name: 'Belarusian'
  },
  {
    code: 'bn',
    name: 'Bengali'
  },
  {
    code: 'bi',
    name: 'Bislama'
  },
  {
    code: 'bs',
    name: 'Bosnian'
  },
  {
    code: 'br',
    name: 'Breton'
  },
  {
    code: 'bg',
    name: 'Bulgarian'
  },
  {
    code: 'my',
    name: 'Burmese'
  },
  {
    code: 'ca',
    name: 'Catalan'
  },
  {
    code: 'ny',
    name: 'Chichewa'
  },
  // {
  //   code: 'zh-Hans',
  //   name: 'Chinese (Simplified)'
  // },
  {
    code: 'zh-Hant',
    name: 'Chinese (Traditional)'
  },
  {
    code: 'hr',
    name: 'Croatian'
  },
  {
    code: 'cs',
    name: 'Czech'
  },
  {
    code: 'da',
    name: 'Danish'
  },
  {
    code: 'fa-AF',
    name: 'Dari'
  },
  {
    code: 'dv',
    name: 'Dhivehi'
  },
  {
    code: 'nl',
    name: 'Dutch'
  },
  {
    code: 'eo',
    name: 'Esperanto'
  },
  {
    code: 'et',
    name: 'Estonian'
  },
  {
    code: 'ee',
    name: 'Ewe'
  },
  {
    code: 'fil',
    name: 'Filipino'
  },
  {
    code: 'fi',
    name: 'Finnish'
  },
  {
    code: 'fr',
    name: 'French'
  },
  {
    code: 'gl',
    name: 'Galician'
  },
  {
    code: 'ka',
    name: 'Georgian'
  },
  {
    code: 'de',
    name: 'German'
  },
  {
    code: 'ki',
    name: 'Gilbertese'
  },
  {
    code: 'el',
    name: 'Greek'
  },
  {
    code: 'gu',
    name: 'Gujarati'
  },
  {
    code: 'ha',
    name: 'Hausa'
  },
  {
    code: 'he',
    name: 'Hebrew'
  },
  {
    code: 'hi',
    name: 'Hindi'
  },
  {
    code: 'hu',
    name: 'Hungarian'
  },
  {
    code: 'ig',
    name: 'Igbo'
  },
  {
    code: 'id',
    name: 'Indonesian'
  },
  {
    code: 'it',
    name: 'Italian'
  },
  // {
  //   code: 'ja',
  //   name: 'Japanese'
  // },
  {
    code: 'kn',
    name: 'Kannada'
  },
  {
    code: 'kk',
    name: 'Kazakh'
  },
  {
    code: 'km',
    name: 'Khmer'
  },
  {
    code: 'ku',
    name: 'Kurdish'
  },
  {
    code: 'ky',
    name: 'Kyrgyz'
  },
  {
    code: 'lv',
    name: 'Latvian'
  },
  {
    code: 'lt',
    name: 'Lithuanian'
  },
  {
    code: 'lb',
    name: 'Luxembourgish'
  },
  {
    code: 'mk',
    name: 'Macedonian'
  },
  {
    code: 'mai',
    name: 'Maithili'
  },
  {
    code: 'ms',
    name: 'Malay'
  },
  {
    code: 'ml',
    name: 'Malayalam'
  },
  {
    code: 'mr',
    name: 'Marathi'
  },
  {
    code: 'mn',
    name: 'Mongolian'
  },
  {
    code: 'ne',
    name: 'Nepali'
  },
  {
    code: 'pcm',
    name: 'Nigerian Pidgin'
  },
  {
    code: 'no',
    name: 'Norwegian'
  },
  {
    code: 'or',
    name: 'Odia'
  },
  {
    code: 'ps',
    name: 'Pashto'
  },
  {
    code: 'fa',
    name: 'Persian'
  },
  {
    code: 'pl',
    name: 'Polish'
  },
  {
    code: 'pt',
    name: 'Portuguese'
  },
  {
    code: 'pt-BR',
    name: 'Portuguese (Brazil)'
  },
  {
    code: 'pa',
    name: 'Punjabi'
  },
  {
    code: 'ro',
    name: 'Romanian'
  },
  {
    code: 'ru',
    name: 'Russian'
  },
  {
    code: 'sat',
    name: 'Santali'
  },
  {
    code: 'sr-Latn',
    name: 'Serbian (Latin)'
  },
  {
    code: 'sn',
    name: 'Shona'
  },
  {
    code: 'si',
    name: 'Sinhala'
  },
  {
    code: 'sk',
    name: 'Slovak'
  },
  {
    code: 'sl',
    name: 'Slovenian'
  },
  {
    code: 'so',
    name: 'Somali'
  },
  {
    code: 'es',
    name: 'Spanish'
  },
  {
    code: 'sw',
    name: 'Swahili'
  },
  {
    code: 'sv',
    name: 'Swedish'
  },
  {
    code: 'tl',
    name: 'Tagalog'
  },
  {
    code: 'tg',
    name: 'Tajik'
  },
  {
    code: 'ta',
    name: 'Tamil'
  },
  {
    code: 'te',
    name: 'Telugu'
  },
  {
    code: 'th',
    name: 'Thai'
  },
  {
    code: 'ti',
    name: 'Tigrinya'
  },
  {
    code: 'tr',
    name: 'Turkish'
  },
  {
    code: 'tk',
    name: 'Turkmen'
  },
  {
    code: 'uk',
    name: 'Ukrainian'
  },
  {
    code: 'ur-IN',
    name: 'Urdu (India)'
  },
  {
    code: 'ur-PK',
    name: 'Urdu (Pakistan)'
  },
  {
    code: 'uz',
    name: 'Uzbek'
  },
  {
    code: 'vi',
    name: 'Vietnamese'
  },
  {
    code: 'yo',
    name: 'Yoruba'
  },
  {
    code: 'zu',
    name: 'Zulu'
  }
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
          console.log(`File already exists, skipping: ${newFilePath}`);
          continue;
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
