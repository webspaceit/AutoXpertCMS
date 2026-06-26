const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliDigits(num: number | string): string {
    return num.toString().replace(/\d/g, d => BENGALI_DIGITS[parseInt(d)]);
}

/**
 * Translate English text to Bengali using MyMemory free Translation API.
 */
export async function translateText(text: string, from = 'en', to = 'bn'): Promise<string> {
    if (!text || text.trim() === '') return '';
    
    // Check if content contains HTML elements
    const isHtml = /<[a-z][\s\S]*>/i.test(text);
    let textToTranslate = text;
    
    if (isHtml) {
        const temp = document.createElement('div');
        temp.innerHTML = text;
        textToTranslate = temp.innerText || temp.textContent || '';
    }

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${from}|${to}`);
        const data = await response.json();
        
        if (data.responseData && data.responseData.translatedText) {
            const translated = data.responseData.translatedText;
            if (isHtml) {
                // If it was HTML, we structure the translated text paragraphs back with standard HTML tags
                return translated.split('\n').map((p: string) => `<p>${p}</p>`).join('');
            }
            return translated;
        }
        throw new Error('No translation in response');
    } catch (error) {
        console.error('Translation utility error:', error);
        throw new Error('Failed to fetch translation');
    }
}
