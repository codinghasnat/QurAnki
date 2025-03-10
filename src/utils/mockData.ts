// Mock data for development purposes

export interface Ayah {
    id: number;
    arabic: string;
    english: string;
    words: {
        arabic: string;
        english: string;
    }[];
}

export interface Surah {
    id: string;
    name: string;
    nameArabic: string;
    numberOfAyahs: number;
    ayahs: Ayah[];
}

export const surahs: Surah[] = [
    {
        id: "1",
        name: "Al-Fatihah",
        nameArabic: "الفاتحة",
        numberOfAyahs: 7,
        ayahs: [
            {
                id: 1,
                arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                english:
                    "In the name of Allah, the Entirely Merciful, the Especially Merciful",
                words: [
                    { arabic: "بِسْمِ", english: "In the name" },
                    { arabic: "اللَّهِ", english: "of Allah" },
                    {
                        arabic: "الرَّحْمَٰنِ",
                        english: "the Entirely Merciful",
                    },
                    {
                        arabic: "الرَّحِيمِ",
                        english: "the Especially Merciful",
                    },
                ],
            },
            {
                id: 2,
                arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
                english: "All praise is due to Allah, Lord of the worlds",
                words: [
                    { arabic: "الْحَمْدُ", english: "All praise" },
                    { arabic: "لِلَّهِ", english: "is due to Allah" },
                    { arabic: "رَبِّ", english: "Lord" },
                    { arabic: "الْعَالَمِينَ", english: "of the worlds" },
                ],
            },
            {
                id: 3,
                arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
                english: "The Entirely Merciful, the Especially Merciful",
                words: [
                    {
                        arabic: "الرَّحْمَٰنِ",
                        english: "The Entirely Merciful",
                    },
                    {
                        arabic: "الرَّحِيمِ",
                        english: "the Especially Merciful",
                    },
                ],
            },
            {
                id: 4,
                arabic: "مَالِكِ يَوْمِ الدِّينِ",
                english: "Sovereign of the Day of Recompense",
                words: [
                    { arabic: "مَالِكِ", english: "Sovereign" },
                    { arabic: "يَوْمِ", english: "of the Day" },
                    { arabic: "الدِّينِ", english: "of Recompense" },
                ],
            },
            {
                id: 5,
                arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
                english: "It is You we worship and You we ask for help",
                words: [
                    { arabic: "إِيَّاكَ", english: "It is You" },
                    { arabic: "نَعْبُدُ", english: "we worship" },
                    { arabic: "وَإِيَّاكَ", english: "and You" },
                    { arabic: "نَسْتَعِينُ", english: "we ask for help" },
                ],
            },
            {
                id: 6,
                arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
                english: "Guide us to the straight path",
                words: [
                    { arabic: "اهْدِنَا", english: "Guide us" },
                    { arabic: "الصِّرَاطَ", english: "to the path" },
                    { arabic: "الْمُسْتَقِيمَ", english: "the straight" },
                ],
            },
            {
                id: 7,
                arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
                english:
                    "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray",
                words: [
                    { arabic: "صِرَاطَ", english: "The path" },
                    { arabic: "الَّذِينَ", english: "of those" },
                    {
                        arabic: "أَنْعَمْتَ",
                        english: "You have bestowed favor",
                    },
                    { arabic: "عَلَيْهِمْ", english: "upon them" },
                    { arabic: "غَيْرِ", english: "not" },
                    {
                        arabic: "الْمَغْضُوبِ",
                        english: "of those who have evoked [Your] anger",
                    },
                    { arabic: "عَلَيْهِمْ", english: "upon them" },
                    { arabic: "وَلَا", english: "nor of" },
                    { arabic: "الضَّالِّينَ", english: "those who are astray" },
                ],
            },
        ],
    },
    {
        id: "112",
        name: "Al-Ikhlas",
        nameArabic: "الإخلاص",
        numberOfAyahs: 4,
        ayahs: [
            {
                id: 1,
                arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
                english: 'Say, "He is Allah, [who is] One',
                words: [
                    { arabic: "قُلْ", english: "Say" },
                    { arabic: "هُوَ", english: "He is" },
                    { arabic: "اللَّهُ", english: "Allah" },
                    { arabic: "أَحَدٌ", english: "[who is] One" },
                ],
            },
            {
                id: 2,
                arabic: "اللَّهُ الصَّمَدُ",
                english: "Allah, the Eternal Refuge",
                words: [
                    { arabic: "اللَّهُ", english: "Allah" },
                    { arabic: "الصَّمَدُ", english: "the Eternal Refuge" },
                ],
            },
            {
                id: 3,
                arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
                english: "He neither begets nor is born",
                words: [
                    { arabic: "لَمْ", english: "He neither" },
                    { arabic: "يَلِدْ", english: "begets" },
                    { arabic: "وَلَمْ", english: "nor" },
                    { arabic: "يُولَدْ", english: "is born" },
                ],
            },
            {
                id: 4,
                arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
                english: "Nor is there to Him any equivalent",
                words: [
                    { arabic: "وَلَمْ", english: "Nor" },
                    { arabic: "يَكُن", english: "is there" },
                    { arabic: "لَّهُ", english: "to Him" },
                    { arabic: "كُفُوًا", english: "any equivalent" },
                    { arabic: "أَحَدٌ", english: "anyone" },
                ],
            },
        ],
    },
];
