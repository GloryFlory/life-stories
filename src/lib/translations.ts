export type Language = 'en' | 'de' | 'it' | 'no' | 'et' | 'uk';

export const translations = {
  en: {
    // Parent names
    mom: 'Mom',
    dad: 'Dad',
    
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
    
    // Book pages
    life_story: 'Life Story',
    welcome_subtitle: 'A collection of memories, moments, and stories from a life well-lived',
    the_end: 'The End',
    end_message: 'Thank you for sharing your story with us',
    created_with: 'Created with Life Stories',
    
    // Completion celebration
    storyComplete: 'Your Story is Complete!',
    storyCompleteMessage: "You've completed all 12 chapters. Your memories are preserved forever.",
    chaptersCompleted: 'Chapters Completed',
    viewYourStory: 'View Your Story',
    
    // Navigation
    chapters: 'Chapters',
    gallery: 'Gallery',
    viewYourLifeStory: 'View Your Life Story',
    page: 'Page',
    story: 'Story',
    noStoriesYet: 'No stories yet',
    startAddingStories: 'Start adding your stories',
    backToHome: 'Back to home',
    
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
      roots: 'Roots & Family Background',
      childhood: 'Childhood (0–12)',
      teenage: 'Teenage Years',
      'young-adult': 'Young Adulthood & Independence',
      love: 'Love, Relationships & Marriage',
      wedding: 'Wedding or Commitment',
      parenthood: 'Parenthood & Family Life',
      work: 'Work, Purpose & Passion',
      challenges: 'Challenges, Strength & Turning Points',
      joy: 'Joy, Hobbies & Everyday Life',
      lessons: 'Life Lessons, Beliefs & Looking Back',
      messages: 'Messages for the Future',
      photos: 'Photo Memories'
    },
    
    chapter_descriptions: {
      roots: 'Where you came from and the family that shaped you',
      childhood: 'Your earliest years and foundational memories',
      teenage: 'Coming of age, identity, and discovery',
      'young-adult': 'Finding your path and stepping into the world',
      love: 'Finding your person and building a life together',
      wedding: 'The day you celebrated your commitment',
      parenthood: 'Raising children and creating a family',
      work: 'Your professional journey and calling',
      challenges: 'The hard times that shaped who you are',
      joy: 'The passions and pleasures that bring you alive',
      lessons: 'Wisdom gained and reflections on your journey',
      messages: 'Words for your children and generations to come',
      photos: 'Stories behind the pictures of your life'
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
    // Parent names
    mom: 'Mama',
    dad: 'Papa',
    
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
    
    // Book pages
    life_story: 'Lebensgeschichte',
    welcome_subtitle: 'Eine Sammlung von Erinnerungen, Momenten und Geschichten aus einem gut gelebten Leben',
    the_end: 'Ende',
    end_message: 'Vielen Dank, dass du deine Geschichte mit uns geteilt hast',
    created_with: 'Erstellt mit Life Stories',
    
    // Completion celebration
    storyComplete: 'Deine Geschichte ist vollständig!',
    storyCompleteMessage: 'Du hast alle 12 Kapitel abgeschlossen. Deine Erinnerungen sind für immer bewahrt.',
    chaptersCompleted: 'Kapitel Abgeschlossen',
    viewYourStory: 'Zeige deine Geschichte',
    
    // Navigation
    chapters: 'Kapitel',
    gallery: 'Galerie',
    viewYourLifeStory: 'Deine Lebensgeschichte ansehen',
    page: 'Seite',
    story: 'Geschichte',
    noStoriesYet: 'Noch keine Geschichten',
    startAddingStories: 'Beginne deine Geschichten hinzuzufügen',
    backToHome: 'Zurück zur Startseite',
    
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
      roots: 'Wurzeln & Familienhintergrund',
      childhood: 'Kindheit (0–12)',
      teenage: 'Teenagerjahre',
      'young-adult': 'Junges Erwachsenenalter & Unabhängigkeit',
      love: 'Liebe, Beziehungen & Ehe',
      wedding: 'Hochzeit oder Verbindlichkeit',
      parenthood: 'Elternschaft & Familienleben',
      work: 'Arbeit, Bestimmung & Leidenschaft',
      challenges: 'Herausforderungen, Stärke & Wendepunkte',
      joy: 'Freude, Hobbys & Alltag',
      lessons: 'Lebenslektionen, Überzeugungen & Rückblick',
      messages: 'Botschaften für die Zukunft',
      photos: 'Foto-Erinnerungen'
    },
    
    chapter_descriptions: {
      roots: 'Woher du kommst und die Familie, die dich geprägt hat',
      childhood: 'Deine frühesten Jahre und grundlegenden Erinnerungen',
      teenage: 'Erwachsenwerden, Identität und Entdeckung',
      'young-adult': 'Deinen Weg finden und in die Welt treten',
      love: 'Deinen Menschen finden und ein gemeinsames Leben aufbauen',
      wedding: 'Der Tag, an dem du dein Versprechen gefeiert hast',
      parenthood: 'Kinder großziehen und eine Familie gründen',
      work: 'Deine berufliche Reise und Berufung',
      challenges: 'Die schweren Zeiten, die dich geprägt haben',
      joy: 'Die Leidenschaften und Freuden, die dich lebendig machen',
      lessons: 'Gewonnene Weisheit und Reflexionen über deine Reise',
      messages: 'Worte für deine Kinder und kommende Generationen',
      photos: 'Geschichten hinter den Bildern deines Lebens'
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
    // Parent names
    mom: 'Mamma',
    dad: 'Papà',
    
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
    
    // Book pages
    life_story: 'Storia di Vita',
    welcome_subtitle: 'Una raccolta di ricordi, momenti e storie di una vita ben vissuta',
    the_end: 'Fine',
    end_message: 'Grazie per aver condiviso la tua storia con noi',
    created_with: 'Creato con Life Stories',
    
    // Completion celebration
    storyComplete: 'La Tua Storia è Completa!',
    storyCompleteMessage: 'Hai completato tutti i 12 capitoli. I tuoi ricordi sono conservati per sempre.',
    chaptersCompleted: 'Capitoli Completati',
    viewYourStory: 'Visualizza la Tua Storia',
    
    // Navigation
    chapters: 'Capitoli',
    gallery: 'Galleria',
    viewYourLifeStory: 'Visualizza la tua storia di vita',
    page: 'Pagina',
    story: 'Storia',
    noStoriesYet: 'Nessuna storia ancora',
    startAddingStories: 'Inizia ad aggiungere le tue storie',
    backToHome: 'Torna alla home',
    
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
      roots: 'Radici e Retroscena Familiare',
      childhood: 'Infanzia (0–12)',
      teenage: 'Anni dell\'Adolescenza',
      'young-adult': 'Giovane Età Adulta & Indipendenza',
      love: 'Amore, Relazioni e Matrimonio',
      wedding: 'Matrimonio o Impegno',
      parenthood: 'Genitorialità e Vita Familiare',
      work: 'Lavoro, Scopo e Passione',
      challenges: 'Sfide, Forza e Punti di Svolta',
      joy: 'Gioia, Hobby e Vita Quotidiana',
      lessons: 'Lezioni di Vita, Credenze e Guardare Indietro',
      messages: 'Messaggi per il Futuro',
      photos: 'Ricordi Fotografici'
    },
    
    chapter_descriptions: {
      roots: 'Da dove vieni e la famiglia che ti ha plasmato',
      childhood: 'I tuoi primi anni e ricordi fondamentali',
      teenage: 'Crescita, identità e scoperta',
      'young-adult': 'Trovare la tua strada ed entrare nel mondo',
      love: 'Trovare la tua persona e costruire una vita insieme',
      wedding: 'Il giorno in cui hai celebrato il tuo impegno',
      parenthood: 'Crescere i figli e creare una famiglia',
      work: 'Il tuo percorso professionale e vocazione',
      challenges: 'I momenti difficili che ti hanno plasmato',
      joy: 'Le passioni e i piaceri che ti fanno sentire vivo',
      lessons: 'Saggezza acquisita e riflessioni sul tuo viaggio',
      messages: 'Parole per i tuoi figli e le generazioni future',
      photos: 'Storie dietro le immagini della tua vita'
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
    // Parent names
    mom: 'Mamma',
    dad: 'Pappa',
    
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
    
    // Book pages
    life_story: 'Livshistorie',
    welcome_subtitle: 'En samling av minner, øyeblikk og historier fra et godt levd liv',
    the_end: 'Slutten',
    end_message: 'Takk for at du delte historien din med oss',
    created_with: 'Laget med Life Stories',
    
    // Completion celebration
    storyComplete: 'Historien Din er Fullført!',
    storyCompleteMessage: 'Du har fullført alle 12 kapitlene. Minnene dine er bevart for alltid.',
    chaptersCompleted: 'Kapitler Fullført',
    viewYourStory: 'Se Historien Din',
    
    // Navigation
    chapters: 'Kapitler',
    gallery: 'Galleri',
    viewYourLifeStory: 'Se din livshistorie',
    page: 'Side',
    story: 'Historie',
    noStoriesYet: 'Ingen historier ennå',
    startAddingStories: 'Begynn å legge til historier',
    backToHome: 'Tilbake til hjem',
    
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
      roots: 'Røtter & Familiebakgrunn',
      childhood: 'Barndom (0–12)',
      teenage: 'Tenårene',
      'young-adult': 'Ung Voksen & Uavhengighet',
      love: 'Kjærlighet, Forhold & Ekteskap',
      wedding: 'Bryllup eller Forpliktelse',
      parenthood: 'Foreldreskap & Familieliv',
      work: 'Arbeid, Formål & Lidenskap',
      challenges: 'Utfordringer, Styrke & Vendepunkter',
      joy: 'Glede, Hobbyer & Hverdagsliv',
      lessons: 'Livsleksjoner, Tro & Tilbakeblikk',
      messages: 'Meldinger for Fremtiden',
      photos: 'Fotominner'
    },
    
    chapter_descriptions: {
      roots: 'Hvor du kom fra og familien som formet deg',
      childhood: 'Dine tidligste år og grunnleggende minner',
      teenage: 'Å bli voksen, identitet og oppdagelse',
      'young-adult': 'Å finne din vei og tre inn i verden',
      love: 'Å finne din person og bygge et liv sammen',
      wedding: 'Dagen du feiret ditt løfte',
      parenthood: 'Å oppdra barn og skape en familie',
      work: 'Din profesjonelle reise og kall',
      challenges: 'De vanskelige tidene som formet hvem du er',
      joy: 'Lidenskapene og gledene som gjør deg levende',
      lessons: 'Visdom oppnådd og refleksjoner over din reise',
      messages: 'Ord til dine barn og kommende generasjoner',
      photos: 'Historiene bak bildene av livet ditt'
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
  },
  et: {
    // Parent names
    mom: 'Ema',
    dad: 'Isa',
    
    // Home page
    appTitle: 'Elulood',
    homeSubtitle: 'Koht, kus jagada lugusid, mis on kujundanud sinu elu',
    momCard: 'Ema Lugu',
    dadCard: 'Isa Lugu',
    momDescription: 'Jaga oma teekonda, mälestusi ja elutarkust',
    dadDescription: 'Jaga oma teekonda, mälestusi ja elutarkust',
    
    // Welcome page
    welcomeMom: 'Tere Ema,',
    welcomeDad: 'Tere Isa,',
    welcomeMessage: 'See on sinu koht, kus jagada oma elulugusid. Võta aega, vasta nii nagu õigeks pead, ja tea, et iga jagatud mälestus on hinnaline kingitus. Kiiret ei ole—võid alati tagasi tulla ja hiljem lisada.',
    beginButton: 'Alusta Oma Lugu',
    continueStory: 'Jätka Oma Lugu',
    
    // Book pages
    life_story: 'Elulugu',
    welcome_subtitle: 'Kogu mälestusi, hetki ja lugusid hästi elatud elust',
    the_end: 'Lõpp',
    end_message: 'Täname, et jagasid oma lugu meiega',
    created_with: 'Loodud Life Stories\'iga',
    
    // Completion celebration
    storyComplete: 'Sinu Lugu on Valmis!',
    storyCompleteMessage: 'Oled lõpetanud kõik 12 peatükki. Sinu mälestused on igaveseks talletatud.',
    chaptersCompleted: 'Peatükki Lõpetatud',
    viewYourStory: 'Vaata Oma Lugu',
    
    // Navigation
    chapters: 'Peatükid',
    gallery: 'Galerii',
    viewYourLifeStory: 'Vaata Oma Elulugu',
    page: 'Lehekülg',
    story: 'Lugu',
    noStoriesYet: 'Pole veel lugusid',
    startAddingStories: 'Alusta oma lugude lisamist',
    backToHome: 'Tagasi kodulehele',
    
    // Question page
    bookTitle: ' Elulugu',
    chapterProgress: 'Peatükk {current} / {total}',
    questionsAnswered: '{answered}/{total} vastatud',
    questionNumber: 'Küsimus {current} / {total}',
    questionHint: 'Võta aega. Saad alati hiljem tagasi tulla ja muuta.',
    answerPlaceholder: 'Jaga oma lugu siin... Mida sa mäletad? Kuidas see sind tundma pani?',
    addPhoto: 'Lisa foto',
    photoCount: '{count} foto',
    photoCountPlural: '{count} fotot',
    saveDraft: 'Salvesta mustand',
    saveNext: 'Salvesta & edasi →',
    completeChapter: 'Lõpeta peatükk ✓',
    previous: '← Eelmine',
    next: 'Järgmine →',
    saved: 'Salvestatud',
    
    // Celebration
    celebrationTitle: 'Peatükk Valmis! ✨',
    celebrationProgress: '{completed} / {total} peatükki valmis',
    
    // Progress
    overallProgress: 'Üldine Edenemine',
    chaptersComplete: '{completed} / {total} valmis',
    
    // Chapter Photo
    chapterMemory: 'Peatüki Mälestus',
    chapterPhotoPrompt: 'Vali foto, mis iseloomustab seda peatükki',
    chapterPhotoHint: 'Vali tähendusrikas foto, mis tabab selle elupeatüki olemust. Saad seda alati hiljem lisada või muuta.',
    chapterPhotoCaption: 'Räägi meile sellest fotost (valikuline)',
    chapterPhotoCaptionPlaceholder: 'Mis teeb selle foto eriliseks?',
    uploadChapterPhoto: 'Lae Foto Üles',
    changePhoto: 'Muuda Fotot',
    skipPhoto: 'Jäta vahele',
    saveAndContinue: 'Salvesta & Jätka',
    compressingPhoto: 'Foto pakkimine...',
    noPhotoYet: 'Fotot pole veel',
    of: '/',
    
    // Gallery
    galleryTitle: 'Fotogalerii',
    gallerySubtitle: 'Kõik sinu hinnalised mälestused ühes kohas',
    noPhotos: 'Fotosid pole veel',
    noPhotosMessage: 'Siia ilmuvad sinu üleslaetud fotod',
    backToStory: 'Tagasi Loo Juurde',
    
    // Chapters
    chapters_list: {
      roots: 'Juured & Perekonna Taust',
      childhood: 'Lapsepõlv (0–12)',
      teenage: 'Teismeiga',
      'young-adult': 'Noor Täiskasvanuiga & Iseseisvus',
      love: 'Armastus, Suhted & Abielu',
      wedding: 'Pulmad või Kohustus',
      parenthood: 'Vanemaks Olemine & Pereelu',
      work: 'Töö, Eesmärk & Kirg',
      challenges: 'Väljakutsed, Tugevus & Pöördepunktid',
      joy: 'Rõõm, Hobid & Igapäevaelu',
      lessons: 'Eluõppetunnid, Uskumused & Tagasivaade',
      messages: 'Sõnumid Tulevikuks',
      photos: 'Fotomälestused'
    },
    
    chapter_descriptions: {
      roots: 'Kust sa tulid ja perekond, kes sind kujundas',
      childhood: 'Sinu varasemad aastad ja põhimälestused',
      teenage: 'Täiskasvanuks saamine, identiteet ja avastamine',
      'young-adult': 'Oma tee leidmine ja maailma astuminen',
      love: 'Oma inimese leidmine ja elu koos üles ehitamine',
      wedding: 'Päev, mil sa pidasid oma lubadust',
      parenthood: 'Laste kasvatamine ja perekonna loomine',
      work: 'Sinu professionaalne teekond ja kutsumus',
      challenges: 'Rasked ajad, mis kujundasid seda, kes sa oled',
      joy: 'Kirg ja rõõmud, mis teevad sind elavaks',
      lessons: 'Saadud tarkus ja mõtisklused oma teekonna üle',
      messages: 'Sõnad sinu lastele ja tuleville põlvedele',
      photos: 'Lood oma elu piltide taga'
    },
    
    // Auth
    welcomeBack: 'Tere Tulemast Tagasi',
    signInToAccess: 'Logi sisse, et näha oma elulugusid',
    emailAddress: 'E-posti Aadress',
    enterEmail: 'sina@naide.ee',
    sendMagicLink: 'Saada Maagiline Link',
    sending: 'Saatmine...',
    noPassword: 'Saadame sulle sisselogimiseks maagilise lingi. Parooli pole vaja!',
    checkYourEmail: 'Kontrolli Oma E-posti',
    magicLinkSent: 'Maagiline link saadeti aadressile',
    clickLinkToSignIn: 'Klõpsa e-kirjas olevale lingile, et turvaliselt sisse logida.',
  },
  
  uk: {
    // Parent names
    mom: 'Мама',
    dad: 'Тато',
    
    // Home page
    appTitle: 'Історії Життя',
    homeSubtitle: 'Місце для обміну історіями, які сформували ваше життя',
    momCard: 'Історія Мами',
    dadCard: 'Історія Тата',
    momDescription: 'Поділіться своєю подорожжю, спогадами та мудрістю',
    dadDescription: 'Поділіться своєю подорожжю, спогадами та мудрістю',
    
    // Welcome page
    welcomeMom: 'Привіт, Мамо,',
    welcomeDad: 'Привіт, Тату,',
    welcomeMessage: 'Це ваш простір для обміну історіями вашого життя. Не поспішайте, відповідайте на те, що вам здається правильним, і знайте, що кожен спогад, яким ви ділитеся, є дорогоцінним подарунком. Не варто поспішати—ви завжди можете повернутися і додати більше, коли захочете.',
    beginButton: 'Почати свою історію',
    continueStory: 'Продовжити свою історію',
    
    // Book pages
    life_story: 'Історія життя',
    welcome_subtitle: 'Колекція спогадів, моментів та історій добре прожитого життя',
    the_end: 'Кінець',
    end_message: 'Дякуємо, що поділилися своєю історією з нами',
    created_with: 'Створено за допомогою Life Stories',
    
    // Completion celebration
    storyComplete: 'Ваша історія завершена!',
    storyCompleteMessage: 'Ви завершили всі 12 розділів. Ваші спогади збережені назавжди.',
    chaptersCompleted: 'Розділів завершено',
    viewYourStory: 'Переглянути свою історію',
    
    // Navigation
    chapters: 'Розділи',
    gallery: 'Галерея',
    viewYourLifeStory: 'Переглянути свою історію життя',
    page: 'Сторінка',
    story: 'Історія',
    noStoriesYet: 'Поки немає історій',
    startAddingStories: 'Почніть додавати свої історії',
    backToHome: 'Назад на головну',
    
    // Question page
    bookTitle: ' - Історія життя',
    chapterProgress: 'Розділ {current} з {total}',
    questionsAnswered: '{answered}/{total} відповіли',
    questionNumber: 'Питання {current} з {total}',
    questionHint: 'Не поспішайте. Ви завжди можете повернутися та відредагувати пізніше.',
    answerPlaceholder: 'Поділіться своєю історією тут... Що ви пам\'ятаєте? Що ви відчували?',
    addPhoto: 'Додати фото',
    photoCount: '{count} фото',
    photoCountPlural: '{count} фото',
    saveDraft: 'Зберегти чернетку',
    saveNext: 'Зберегти та далі →',
    completeChapter: 'Завершити розділ ✓',
    previous: '← Назад',
    next: 'Далі →',
    saved: 'Збережено',
    
    // Celebration
    celebrationTitle: 'Розділ завершено! ✨',
    celebrationProgress: '{completed} з {total} розділів завершено',
    
    // Progress
    overallProgress: 'Загальний прогрес',
    chaptersComplete: '{completed} з {total} завершено',
    
    // Chapter Photo
    chapterMemory: 'Спогад розділу',
    chapterPhotoPrompt: 'Виберіть фото, яке представляє цей розділ',
    chapterPhotoHint: 'Виберіть значуще фото, яке відображає суть цього розділу у вашому житті. Ви завжди можете повернутися і додати або змінити його пізніше.',
    chapterPhotoCaption: 'Розкажіть нам про це фото (за бажанням)',
    chapterPhotoCaptionPlaceholder: 'Що робить це фото особливим?',
    uploadChapterPhoto: 'Завантажити фото',
    changePhoto: 'Змінити фото',
    skipPhoto: 'Пропустити зараз',
    saveAndContinue: 'Зберегти та продовжити',
    compressingPhoto: 'Стиснення фото...',
    noPhotoYet: 'Поки немає фото',
    of: 'з',
    
    // Gallery
    galleryTitle: 'Фотогалерея',
    gallerySubtitle: 'Всі ваші дорогоцінні спогади в одному місці',
    noPhotos: 'Поки немає фото',
    noPhotosMessage: 'Завантажені фото з\'являться тут',
    backToStory: 'Назад до історії',
    
    // Chapters
    chapters_list: {
      roots: 'Коріння та сімейна історія',
      childhood: 'Дитинство (0–12)',
      teenage: 'Підліткові роки',
      'young-adult': 'Молодість і незалежність',
      love: 'Кохання, стосунки та шлюб',
      wedding: 'Весілля або зобов\'язання',
      parenthood: 'Батьківство і сімейне життя',
      work: 'Робота, призначення і пристрасть',
      challenges: 'Виклики, сила і поворотні моменти',
      joy: 'Радість, хобі і повсякденне життя',
      lessons: 'Життєві уроки, переконання і роздуми',
      messages: 'Послання для майбутнього',
      photos: 'Фото-спогади'
    },
    
    chapter_descriptions: {
      roots: 'Звідки ви прийшли і сім\'я, яка вас сформувала',
      childhood: 'Ваші найперші роки і основні спогади',
      teenage: 'Дорослішання, ідентичність і відкриття',
      'young-adult': 'Пошук свого шляху і вихід у світ',
      love: 'Знайти свою людину і побудувати життя разом',
      wedding: 'День, коли ви відсвяткували своє зобов\'язання',
      parenthood: 'Виховання дітей і створення сім\'ї',
      work: 'Ваша професійна подорож і покликання',
      challenges: 'Важкі часи, які сформували вас',
      joy: 'Пристрасті і задоволення, які надихають вас',
      lessons: 'Здобута мудрість і роздуми про вашу подорож',
      messages: 'Слова для ваших дітей і майбутніх поколінь',
      photos: 'Історії за фотографіями вашого життя'
    },
    
    // Auth
    welcomeBack: 'З поверненням',
    signInToAccess: 'Увійдіть, щоб отримати доступ до своїх історій життя',
    emailAddress: 'Електронна пошта',
    enterEmail: 'vy@example.com',
    sendMagicLink: 'Надіслати магічне посилання',
    sending: 'Надсилання...',
    noPassword: 'Ми надішлемо вам магічне посилання для входу. Пароль не потрібен!',
    checkYourEmail: 'Перевірте свою електронну пошту',
    magicLinkSent: 'Магічне посилання надіслано на',
    clickLinkToSignIn: 'Натисніть посилання в листі, щоб безпечно увійти.',
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
