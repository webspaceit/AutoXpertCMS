import { useState, useRef, useEffect } from 'react';
import { Type } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TypographyPopupProps {
    prefix: string;
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
}

const FONT_FAMILIES = [
    { value: '', label: 'Default' },
    { value: 'Inter, sans-serif', label: 'Inter' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Courier New, monospace', label: 'Courier New' },
    { value: 'Tahoma, sans-serif', label: 'Tahoma' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
    { value: 'Noto Sans Bengali, sans-serif', label: 'Noto Sans Bengali' },
    { value: 'Hind Siliguri, sans-serif', label: 'Hind Siliguri' },
    { value: 'System UI, sans-serif', label: 'System UI' },
];

const FONT_WEIGHTS = [
    { value: '', label: 'Default' },
    { value: '100', label: 'Thin (100)' },
    { value: '200', label: 'Extra Light (200)' },
    { value: '300', label: 'Light (300)' },
    { value: '400', label: 'Normal (400)' },
    { value: '500', label: 'Medium (500)' },
    { value: '600', label: 'Semi Bold (600)' },
    { value: '700', label: 'Bold (700)' },
    { value: '800', label: 'Extra Bold (800)' },
    { value: '900', label: 'Black (900)' },
];

const TEXT_TRANSFORMS = [
    { value: '', label: 'Default' },
    { value: 'none', label: 'None' },
    { value: 'uppercase', label: 'Uppercase' },
    { value: 'lowercase', label: 'Lowercase' },
    { value: 'capitalize', label: 'Capitalize' },
];

const FONT_STYLES = [
    { value: '', label: 'Default' },
    { value: 'normal', label: 'Normal' },
    { value: 'italic', label: 'Italic' },
    { value: 'oblique', label: 'Oblique' },
];

const TEXT_DECORATIONS = [
    { value: '', label: 'Default' },
    { value: 'none', label: 'None' },
    { value: 'underline', label: 'Underline' },
    { value: 'line-through', label: 'Line Through' },
    { value: 'overline', label: 'Overline' },
];

function extractNumber(val: string): number {
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
}

export default function TypographyPopup({ prefix, data, setData }: TypographyPopupProps) {
    const [open, setOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const g = (suffix: string) => data[`${prefix}_${suffix}`] || '';

    const s = (suffix: string, value: string) => setData(`${prefix}_${suffix}`, value);

    const sliderProps = (suffix: string, min: number, max: number, step: number) => ({
        value: extractNumber(g(suffix)).toString(),
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            const num = extractNumber(e.target.value);
            if (!isNaN(num)) s(suffix, e.target.value);
        },
        min,
        max,
        step,
    });

    return (
        <div className="relative" ref={popupRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`p-1.5 rounded-md border transition ${
                    open
                        ? 'border-rose-400 bg-rose-50 text-rose-600 dark:bg-rose-950 dark:border-rose-700'
                        : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
                title="Typography settings"
            >
                <Type className="h-4 w-4" />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 z-50 w-80 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-4 space-y-3">
                    {/* Font Family */}
                    <div>
                        <label className="block text-[10px] font-semibold mb-1 text-slate-500 dark:text-slate-400">Font Family</label>
                        <Select value={g('font_family')} onValueChange={(v) => s('font_family', v)}>
                            <SelectTrigger className="w-full h-8 text-xs">
                                <SelectValue placeholder="Default" />
                            </SelectTrigger>
                            <SelectContent>
                                {FONT_FAMILIES.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Font Size */}
                    <div>
                        <label className="block text-[10px] font-semibold mb-1 text-slate-500 dark:text-slate-400">Font Size</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                {...sliderProps('font_size', 0.5, 100, 0.5)}
                                className="flex-1 accent-rose-500 h-1.5"
                            />
                            <input
                                type="text"
                                value={g('font_size')}
                                onChange={(e) => s('font_size', e.target.value)}
                                placeholder="Default"
                                className="w-16 rounded border border-slate-200 bg-white px-1.5 py-1 text-xs text-center text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Font Weight */}
                    <div>
                        <label className="block text-[10px] font-semibold mb-1 text-slate-500 dark:text-slate-400">Font Weight</label>
                        <Select value={g('font_weight')} onValueChange={(v) => s('font_weight', v)}>
                            <SelectTrigger className="w-full h-8 text-xs">
                                <SelectValue placeholder="Default" />
                            </SelectTrigger>
                            <SelectContent>
                                {FONT_WEIGHTS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Row: Text Transform | Font Style | Text Decoration */}
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="block text-[10px] font-semibold mb-1 text-slate-500 dark:text-slate-400">Transform</label>
                            <Select value={g('text_transform')} onValueChange={(v) => s('text_transform', v)}>
                                <SelectTrigger className="w-full h-8 text-[11px]">
                                    <SelectValue placeholder="-" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TEXT_TRANSFORMS.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold mb-1 text-slate-500 dark:text-slate-400">Style</label>
                            <Select value={g('font_style')} onValueChange={(v) => s('font_style', v)}>
                                <SelectTrigger className="w-full h-8 text-[11px]">
                                    <SelectValue placeholder="-" />
                                </SelectTrigger>
                                <SelectContent>
                                    {FONT_STYLES.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold mb-1 text-slate-500 dark:text-slate-400">Decoration</label>
                            <Select value={g('text_decoration')} onValueChange={(v) => s('text_decoration', v)}>
                                <SelectTrigger className="w-full h-8 text-[11px]">
                                    <SelectValue placeholder="-" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TEXT_DECORATIONS.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Line Height */}
                    <div>
                        <label className="block text-[10px] font-semibold mb-1 text-slate-500 dark:text-slate-400">Line Height</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                {...sliderProps('line_height', 0.5, 4, 0.1)}
                                className="flex-1 accent-rose-500 h-1.5"
                            />
                            <input
                                type="text"
                                value={g('line_height')}
                                onChange={(e) => s('line_height', e.target.value)}
                                placeholder="Default"
                                className="w-16 rounded border border-slate-200 bg-white px-1.5 py-1 text-xs text-center text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Letter Spacing */}
                    <div>
                        <label className="block text-[10px] font-semibold mb-1 text-slate-500 dark:text-slate-400">Letter Spacing</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                {...sliderProps('letter_spacing', -10, 20, 0.5)}
                                className="flex-1 accent-rose-500 h-1.5"
                            />
                            <input
                                type="text"
                                value={g('letter_spacing')}
                                onChange={(e) => s('letter_spacing', e.target.value)}
                                placeholder="Default"
                                className="w-16 rounded border border-slate-200 bg-white px-1.5 py-1 text-xs text-center text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Word Spacing */}
                    <div>
                        <label className="block text-[10px] font-semibold mb-1 text-slate-500 dark:text-slate-400">Word Spacing</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                {...sliderProps('word_spacing', -10, 30, 0.5)}
                                className="flex-1 accent-rose-500 h-1.5"
                            />
                            <input
                                type="text"
                                value={g('word_spacing')}
                                onChange={(e) => s('word_spacing', e.target.value)}
                                placeholder="Default"
                                className="w-16 rounded border border-slate-200 bg-white px-1.5 py-1 text-xs text-center text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
