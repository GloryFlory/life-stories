export type Language = 'en' | 'de' | 'it' | 'no';

export const translations = {
  en: {
    // Home page
    appTitle: 'Life Stories',
    homeSubtitle: 'A place to share the stories that shaped your life',
    momCard: "Mom's Story",
    dadCard: "Dad's Story",
    momDescription: 'Share your journey, memories, and wisdom',
    dadDescription: 'Share your journey, memories, and wisdom',
    
    // Welcome page
    welcomeMom: 'Hi Mom,',
    welcomeDad: 'Hi Dad,',
    welcomeMessage: "This is your space to share the stories of your life. Take your time, answer what feels right, and know that every memory you share is a precious gift. There's no rush—you can always come back and add more whenever you'd like.",
    beginButton: 'Begin Your Story',
    continueStory: 'Continue Your Story',
    
    // Completion celebration
    storyComplete: 'Your Story is Complete!',
    storyCompleteMessage: "You've completed all 12 chapters. Your memories are preserved forever.",
    chaptersCompleted: 'Chapters Completed',
    viewYourStory: 'View Your Story',
    
    // Navigation
    chapters: 'Chapters',
    gallery: 'Gallery',
    
    // Question page
    bookTitle: "'s Life Story",
    chapterProgress: 'Chapter {current} of {total}',
    questionsAnswered: '{answered}/{total} answered',
    questionNumber: 'Question {current} of {total}',
    questionHint: 'Take your time. You can always come back and edit later.',
    answerPlaceholder: 'Share your story here... What do you remember? How did it make you feel?',
    addPhoto: 'Add photo',
    photoCount: '{count} photo',
    photoCountPlural: '{count} photos',
    saveDraft: 'Save draft',
    saveNext: 'Save & next →',
    completeChapter: 'Complete chapter ✓',
    previous: '← Previous',
    next: 'Next →',
    saved: 'Saved',
    
    // Celebration
    celebrationTitle: 'Chapter Complete! ✨',
    celebrationProgress: '{completed} of {total} chapters complete',
    
    // Progress
    overallProgress: 'Overall Progress',
    chaptersComplete: '{completed} of {total} complete',
    
    // Chapter Photo
    chapterMemory: 'Chapter Memory',
    chapterPhotoPrompt: 'Choose a photo that represents this chapter',
    chapterPhotoHint: 'Select a meaningful photo that captures the essence of this chapter in your life. You can always come back and add or change it later.',
    chapterPhotoCaption: 'Tell us about this photo (optional)',
    chapterPhotoCaptionPlaceholder: 'What makes this photo special?',
    uploadChapterPhoto: 'Upload Photo',
    changePhoto: 'Change Photo',
    skipPhoto: 'Skip for now',
    saveAndContinue: 'Save & Continue',
    compressingPhoto: 'Compressing photo...',
    noPhotoYet: 'No photo yet',
    of: 'of',
    
    // Gallery
    galleryTitle: 'Photo Gallery',
    gallerySubtitle: 'All your precious memories in one place',
    noPhotos: 'No photos yet',
    noPhotosMessage: 'Photos you upload will appear here',
    backToStory: 'Back to Story',
    
    // Chapters
    chapters_list: {
      roots: 'Family Roots',
      childhood: 'Childhood Memories',
      teenage: 'Teenage Years',
      'young-adult': 'Young Adult',
      love: 'Love Story',
      wedding: 'Wedding Day',
      parenthood: 'Becoming a Parent',
      work: 'Career & Work',
      challenges: 'Challenges & Growth',
      joy: 'Joy & Celebration',
      lessons: 'Life Lessons',
      messages: 'Messages to Loved Ones',
      photos: 'Special Photos'
    },
    
    // Auth
    welcomeBack: 'Welcome Back',
    signInToAccess: 'Sign in to access your life stories',
    emailAddress: 'Email Address',
    enterEmail: 'you@example.com',
    sendMagicLink: 'Send Magic Link',
    sending: 'Sending...',
    noPassword: "We'll send you a magic link to sign in. No password needed!",
    checkYourEmail: 'Check Your Email',
    magicLinkSent: 'A magic link has been sent to',
    clickLinkToSignIn: 'Click the link in your email to sign in securely.',
  },
  de: {
    // Home page
    appTitle: 'Lebensgeschichten',
    homeSubtitle: 'Ein Ort, um die Geschichten zu teilen, die dein Leben geprägt haben',
    momCard: 'Mamas Geschichte',
    dadCard: 'Papas Geschichte',
    momDescription: 'Teile deine Reise, Erinnerungen und Weisheit',
    dadDescription: 'Teile deine Reise, Erinnerungen und Weisheit',
    
    // Welcome page
    welcomeMom: 'Hallo Mama,',
    welcomeDad: 'Hallo Papa,',
    welcomeMessage: 'Dies ist dein Raum, um die Geschichten deines Lebens zu teilen. Nimm dir Zeit, beantworte was sich richtig anfühlt, und wisse, dass jede Erinnerung, die du teilst, ein kostbares Geschenk ist. Es gibt keine Eile—du kannst jederzeit zurückkommen und mehr hinzufügen.',
    beginButton: 'Beginne deine Geschichte',
    continueStory: 'Setze deine Geschichte fort',
    
    // Completion celebration
    storyComplete: 'Deine Geschichte ist vollständig!',
    storyCompleteMessage: 'Du hast alle 12 Kapitel abgeschlossen. Deine Erinnerungen sind für immer bewahrt.',
    chaptersCompleted: 'Kapitel Abgeschlossen',
    viewYourStory: 'Zeige deine Geschichte',
    
    // Navigation
    chapters: 'Kapitel',
    gallery: 'Galerie',
    
    // Question page
    bookTitle: 's Lebensgeschichte',
    chapterProgress: 'Kapitel {current} von {total}',
    questionsAnswered: '{answered}/{total} beantwortet',
    questionNumber: 'Frage {current} von {total}',
    questionHint: 'Nimm dir Zeit. Du kannst jederzeit zurückkommen und bearbeiten.',
    answerPlaceholder: 'Erzähle deine Geschichte hier... Woran erinnerst du dich? Wie hast du dich gefühlt?',
    addPhoto: 'Foto hinzufügen',
    photoCount: '{count} Foto',
    photoCountPlural: '{count} Fotos',
    saveDraft: 'Entwurf speichern',
    saveNext: 'Speichern & weiter →',
    completeChapter: 'Kapitel abschließen ✓',
    previous: '← Zurück',
    next: 'Weiter →',
    saved: 'Gespeichert',
    
    // Celebration
    celebrationTitle: 'Kapitel abgeschlossen! ✨',
    celebrationProgress: '{completed} von {total} Kapiteln abgeschlossen',
    
    // Progress
    overallProgress: 'Gesamtfortschritt',
    chaptersComplete: '{completed} von {total} abgeschlossen',
    
    // Chapter Photo
    chapterMemory: 'Kapitelerinnerung',
    chapterPhotoPrompt: 'Wähle ein Foto, das dieses Kapitel repräsentiert',
    chapterPhotoHint: 'Wähle ein bedeutungsvolles Foto, das die Essenz dieses Kapitels in deinem Leben einfängt. Du kannst es jederzeit später hinzufügen oder ändern.',
    chapterPhotoCaption: 'Erzähle uns von diesem Foto (optional)',
    chapterPhotoCaptionPlaceholder: 'Was macht dieses Foto besonders?',
    uploadChapterPhoto: 'Foto hochladen',
    changePhoto: 'Foto ändern',
    skipPhoto: 'Überspringen',
    saveAndContinue: 'Speichern & Fortfahren',
    compressingPhoto: 'Foto wird komprimiert...',
    noPhotoYet: 'Noch kein Foto',
    of: 'von',
    
    // Gallery
    galleryTitle: 'Fotogalerie',
    gallerySubtitle: 'All deine kostbaren Erinnerungen an einem Ort',
    noPhotos: 'Noch keine Fotos',
    noPhotosMessage: 'Hochgeladene Fotos werden hier angezeigt',
    backToStory: 'Zurück zur Geschichte',
    
    // Chapters
    chapters_list: {
      roots: 'Familienwurzeln',
      childhood: 'Kindheitserinnerungen',
      teenage: 'Teenagerjahre',
      'young-adult': 'Junger Erwachsener',
      love: 'Liebesgeschichte',
      wedding: 'Hochzeitstag',
      parenthood: 'Eltern werden',
      work: 'Karriere & Arbeit',
      challenges: 'Herausforderungen & Wachstum',
      joy: 'Freude & Feier',
      lessons: 'Lebenslektionen',
      messages: 'Botschaften an Liebste',
      photos: 'Besondere Fotos'
    },
    
    // Auth
    welcomeBack: 'Willkommen zurück',
    signInToAccess: 'Melde dich an, um auf deine Lebensgeschichten zuzugreifen',
    emailAddress: 'E-Mail-Adresse',
    enterEmail: 'du@beispiel.de',
    sendMagicLink: 'Magic Link senden',
    sending: 'Wird gesendet...',
    noPassword: 'Wir senden dir einen Magic Link zum Anmelden. Kein Passwort erforderlich!',
    checkYourEmail: 'Überprüfe deine E-Mail',
    magicLinkSent: 'Ein Magic Link wurde gesendet an',
    clickLinkToSignIn: 'Klicke auf den Link in deiner E-Mail, um dich sicher anzumelden.',
  },
  it: {
    // Home page
    appTitle: 'Storie di Vita',
    homeSubtitle: 'Un luogo per condividere le storie che hanno segnato la tua vita',
    momCard: 'Storia della Mamma',
    dadCard: 'Storia del Papà',
    momDescription: 'Condividi il tuo viaggio, i ricordi e la saggezza',
    dadDescription: 'Condividi il tuo viaggio, i ricordi e la saggezza',
    
    // Welcome page
    welcomeMom: 'Ciao Mamma,',
    welcomeDad: 'Ciao Papà,',
    welcomeMessage: 'Questo è il tuo spazio per condividere le storie della tua vita. Prenditi il tuo tempo, rispondi a ciò che ti sembra giusto e sappi che ogni ricordo che condividi è un dono prezioso. Non c\'è fretta—puoi sempre tornare e aggiungere altro quando vuoi.',
    beginButton: 'Inizia la tua Storia',
    continueStory: 'Continua la Tua Storia',
    
    // Completion celebration
    storyComplete: 'La Tua Storia è Completa!',
    storyCompleteMessage: 'Hai completato tutti i 12 capitoli. I tuoi ricordi sono conservati per sempre.',
    chaptersCompleted: 'Capitoli Completati',
    viewYourStory: 'Visualizza la Tua Storia',
    
    // Navigation
    chapters: 'Capitoli',
    gallery: 'Galleria',
    
    // Question page
    bookTitle: ' - Storia di Vita',
    chapterProgress: 'Capitolo {current} di {total}',
    questionsAnswered: '{answered}/{total} risposte',
    questionNumber: 'Domanda {current} di {total}',
    questionHint: 'Prenditi il tuo tempo. Puoi sempre tornare e modificare dopo.',
    answerPlaceholder: 'Condividi la tua storia qui... Cosa ricordi? Come ti sei sentito?',
    addPhoto: 'Aggiungi foto',
    photoCount: '{count} foto',
    photoCountPlural: '{count} foto',
    saveDraft: 'Salva bozza',
    saveNext: 'Salva e avanti →',
    completeChapter: 'Completa capitolo ✓',
    previous: '← Precedente',
    next: 'Avanti →',
    saved: 'Salvato',
    
    // Celebration
    celebrationTitle: 'Capitolo Completato! ✨',
    celebrationProgress: '{completed} di {total} capitoli completati',
    
    // Progress
    overallProgress: 'Progresso Complessivo',
    chaptersComplete: '{completed} di {total} completati',
    
    // Chapter Photo
    chapterMemory: 'Memoria del Capitolo',
    chapterPhotoPrompt: 'Scegli una foto che rappresenta questo capitolo',
    chapterPhotoHint: 'Seleziona una foto significativa che cattura l\'essenza di questo capitolo della tua vita. Puoi sempre tornare e aggiungerla o modificarla più tardi.',
    chapterPhotoCaption: 'Raccontaci di questa foto (opzionale)',
    chapterPhotoCaptionPlaceholder: 'Cosa rende speciale questa foto?',
    uploadChapterPhoto: 'Carica Foto',
    changePhoto: 'Cambia Foto',
    skipPhoto: 'Salta per ora',
    saveAndContinue: 'Salva e Continua',
    compressingPhoto: 'Compressione foto...',
    noPhotoYet: 'Nessuna foto ancora',
    of: 'di',
    
    // Gallery
    galleryTitle: 'Galleria Fotografica',
    gallerySubtitle: 'Tutti i tuoi preziosi ricordi in un unico posto',
    noPhotos: 'Nessuna foto ancora',
    noPhotosMessage: 'Le foto che carichi appariranno qui',
    backToStory: 'Torna alla Storia',
    
    // Chapters
    chapters_list: {
      roots: 'Radici Familiari',
      childhood: 'Ricordi d\'Infanzia',
      teenage: 'Anni dell\'Adolescenza',
      'young-adult': 'Giovane Adulto',
      love: 'Storia d\'Amore',
      wedding: 'Giorno del Matrimonio',
      parenthood: 'Diventare Genitore',
      work: 'Carriera e Lavoro',
      challenges: 'Sfide e Crescita',
      joy: 'Gioia e Celebrazione',
      lessons: 'Lezioni di Vita',
      messages: 'Messaggi ai Cari',
      photos: 'Foto Speciali'
    },
    
    // Auth
    welcomeBack: 'Bentornato',
    signInToAccess: 'Accedi per accedere alle tue storie di vita',
    emailAddress: 'Indirizzo Email',
    enterEmail: 'tu@esempio.it',
    sendMagicLink: 'Invia Magic Link',
    sending: 'Invio in corso...',
    noPassword: 'Ti invieremo un magic link per accedere. Nessuna password necessaria!',
    checkYourEmail: 'Controlla la tua Email',
    magicLinkSent: 'Un magic link è stato inviato a',
    clickLinkToSignIn: 'Clicca sul link nella tua email per accedere in modo sicuro.',
  },
  no: {
    // Home page
    appTitle: 'Livshistorier',
    homeSubtitle: 'Et sted å dele historiene som formet livet ditt',
    momCard: 'Mammas Historie',
    dadCard: 'Pappas Historie',
    momDescription: 'Del din reise, minner og visdom',
    dadDescription: 'Del din reise, minner og visdom',
    
    // Welcome page
    welcomeMom: 'Hei Mamma,',
    welcomeDad: 'Hei Pappa,',
    welcomeMessage: 'Dette er ditt rom for å dele livets historier. Ta deg tid, svar på det som føles riktig, og vit at hvert minne du deler er en verdifull gave. Det haster ikke—du kan alltid komme tilbake og legge til mer når du vil.',
    beginButton: 'Begynn din Historie',
    continueStory: 'Fortsett Historien Din',
    
    // Completion celebration
    storyComplete: 'Historien Din er Fullført!',
    storyCompleteMessage: 'Du har fullført alle 12 kapitlene. Minnene dine er bevart for alltid.',
    chaptersCompleted: 'Kapitler Fullført',
    viewYourStory: 'Se Historien Din',
    
    // Navigation
    chapters: 'Kapitler',
    gallery: 'Galleri',
    
    // Question page
    bookTitle: 's Livshistorie',
    chapterProgress: 'Kapittel {current} av {total}',
    questionsAnswered: '{answered}/{total} besvart',
    questionNumber: 'Spørsmål {current} av {total}',
    questionHint: 'Ta deg tid. Du kan alltid komme tilbake og redigere senere.',
    answerPlaceholder: 'Del din historie her... Hva husker du? Hvordan følte du deg?',
    addPhoto: 'Legg til bilde',
    photoCount: '{count} bilde',
    photoCountPlural: '{count} bilder',
    saveDraft: 'Lagre utkast',
    saveNext: 'Lagre og neste →',
    completeChapter: 'Fullfør kapittel ✓',
    previous: '← Forrige',
    next: 'Neste →',
    saved: 'Lagret',
    
    // Celebration
    celebrationTitle: 'Kapittel Fullført! ✨',
    celebrationProgress: '{completed} av {total} kapitler fullført',
    
    // Progress
    overallProgress: 'Samlet Fremgang',
    chaptersComplete: '{completed} av {total} fullført',
    
    // Chapter Photo
    chapterMemory: 'Kapittelminne',
    chapterPhotoPrompt: 'Velg et bilde som representerer dette kapittelet',
    chapterPhotoHint: 'Velg et meningsfullt bilde som fanger essensen av dette kapittelet i livet ditt. Du kan alltid komme tilbake og legge til eller endre det senere.',
    chapterPhotoCaption: 'Fortell oss om dette bildet (valgfritt)',
    chapterPhotoCaptionPlaceholder: 'Hva gjør dette bildet spesielt?',
    uploadChapterPhoto: 'Last opp Bilde',
    changePhoto: 'Endre Bilde',
    skipPhoto: 'Hopp over',
    saveAndContinue: 'Lagre og Fortsett',
    compressingPhoto: 'Komprimerer bilde...',
    noPhotoYet: 'Ingen bilde ennå',
    of: 'av',
    
    // Gallery
    galleryTitle: 'Bildegalleri',
    gallerySubtitle: 'Alle dine verdifulle minner på ett sted',
    noPhotos: 'Ingen bilder ennå',
    noPhotosMessage: 'Bilder du laster opp vil vises her',
    backToStory: 'Tilbake til Historien',
    
    // Chapters
    chapters_list: {
      roots: 'Familierøtter',
      childhood: 'Barndomsminner',
      teenage: 'Tenårene',
      'young-adult': 'Ung Voksen',
      love: 'Kjærlighetshistorie',
      wedding: 'Bryllupsdagen',
      parenthood: 'Å Bli Forelder',
      work: 'Karriere og Arbeid',
      challenges: 'Utfordringer og Vekst',
      joy: 'Glede og Feiring',
      lessons: 'Livsleksjoner',
      messages: 'Meldinger til Kjære',
      photos: 'Spesielle Bilder'
    },
    
    // Auth
    welcomeBack: 'Velkommen Tilbake',
    signInToAccess: 'Logg inn for å få tilgang til livshistoriene dine',
    emailAddress: 'E-postadresse',
    enterEmail: 'deg@eksempel.no',
    sendMagicLink: 'Send Magisk Lenke',
    sending: 'Sender...',
    noPassword: 'Vi sender deg en magisk lenke for å logge inn. Ikke noe passord nødvendig!',
    checkYourEmail: 'Sjekk E-posten Din',
    magicLinkSent: 'En magisk lenke har blitt sendt til',
    clickLinkToSignIn: 'Klikk på lenken i e-posten din for å logge inn sikkert.',
  }
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

export function formatTranslation(lang: Language, key: string, params: Record<string, string | number>): string {
  let text = getTranslation(lang, key);
  
  Object.entries(params).forEach(([param, value]) => {
    text = text.replace(`{${param}}`, String(value));
  });
  
  return text;
}
