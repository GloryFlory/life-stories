'use client';

// Sample Q&As with styling hints
const sampleQuestions = [
  {
    question: "What is your earliest childhood memory?",
    answer: "I remember playing in my grandmother's garden when I was about four years old. The roses were in full bloom, and the scent of lavender filled the warm summer air. She had this beautiful wooden swing under an old oak tree.",
    style: 'hero' // Big, bold, prominent
  },
  {
    question: "Where did you grow up?",
    answer: "Berlin.",
    style: 'minimal' // Small, subtle
  },
  {
    question: "What was your childhood home like?",
    answer: "We lived in a small apartment on the third floor of a building near the park. It had tall windows that let in the morning light, and I shared a room with my sister. The kitchen always smelled of my mother's baking, especially on Sundays when she would make fresh bread and pastries for the week ahead.",
    style: 'pullquote' // Handwritten style
  },
  {
    question: "Did you have any pets as a child?",
    answer: "Yes, a golden retriever named Max. He was my best friend growing up and would wait for me at the door every day after school.",
    style: 'sidebar' // Side emphasis
  },
  {
    question: "What was your favorite game to play?",
    answer: "Hide and seek in the neighborhood.",
    style: 'minimal'
  },
  {
    question: "Who was your best friend in childhood?",
    answer: "Anna, who lived next door. We did everything together—walked to school, played in the park, and spent countless summer afternoons exploring the neighborhood. We stayed close friends until her family moved away when we were twelve.",
    style: 'feature'
  },
];

export default function ElegantDemo() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-8">
      {/* Single A4 Landscape Page - Magazine Editorial Layout */}
      <div 
        className="bg-white shadow-2xl relative overflow-hidden"
        style={{
          width: '297mm',
          height: '210mm',
          maxWidth: '92vw',
          maxHeight: '75vh',
        }}
      >
        {/* Magazine Header */}
        <div className="border-b border-slate-200 px-12 py-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-slate-400">Mom's Story</p>
            </div>
            <div>
              <p className="font-serif text-sm italic text-slate-500">Childhood Years</p>
            </div>
            <div>
              <p className="font-sans text-xs text-slate-400">Page 1</p>
            </div>
          </div>
        </div>

        {/* Free-flowing Content */}
        <div className="p-16 space-y-12">
          
          {/* Hero Question - Spans full width, big and bold */}
          <div className="mb-10">
            <h1 className="font-sans text-5xl font-black tracking-tight text-slate-900 leading-tight mb-8">
              {sampleQuestions[0].question}
            </h1>
            <p className="font-serif text-base leading-relaxed text-slate-700 max-w-2xl">
              {sampleQuestions[0].answer}
            </p>
          </div>

          {/* Two-column section with minimal Q&As on left, pullquote on right */}
          <div className="grid grid-cols-2 gap-16">
            
            {/* Left side - stacked minimal Q&As */}
            <div className="space-y-10">
              
              <div className="bg-slate-50 p-8 rounded">
                <h3 className="font-sans text-xs uppercase tracking-widest text-slate-500 mb-4">
                  {sampleQuestions[1].question}
                </h3>
                <p className="font-serif text-sm text-slate-600 leading-loose">
                  {sampleQuestions[1].answer}
                </p>
              </div>

              <div className="border-l-4 border-amber-400 pl-8 py-3">
                <h3 className="font-sans text-xs uppercase tracking-wider text-slate-500 mb-4">
                  {sampleQuestions[4].question}
                </h3>
                <p className="font-serif text-sm text-slate-600 italic leading-loose">
                  {sampleQuestions[4].answer}
                </p>
              </div>
              
            </div>

            {/* Right side - Large pullquote */}
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 shadow-xl w-full">
                <div className="text-6xl text-amber-300 font-serif leading-none mb-4">"</div>
                <p className="font-serif text-2xl italic leading-relaxed text-slate-800 mb-8">
                  {sampleQuestions[2].answer}
                </p>
                <p className="font-sans text-xs uppercase tracking-widest text-slate-500 text-right">
                  — {sampleQuestions[2].question}
                </p>
              </div>
            </div>

          </div>

          {/* Bottom section - two feature boxes side by side */}
          <div className="grid grid-cols-2 gap-12">
            
            <div className="bg-slate-900 text-white p-10">
              <h3 className="font-sans text-lg font-semibold mb-5 leading-tight">
                {sampleQuestions[3].question}
              </h3>
              <p className="font-serif text-sm leading-loose text-slate-200">
                {sampleQuestions[3].answer}
              </p>
            </div>

            <div className="border-4 border-slate-900 p-8 bg-white">
              <h3 className="font-sans text-sm font-bold mb-4 uppercase tracking-wide text-slate-900">
                {sampleQuestions[5].question}
              </h3>
              <p className="font-serif text-sm leading-loose text-slate-700">
                {sampleQuestions[5].answer}
              </p>
            </div>

          </div>

        </div>

        {/* Page Number */}
        <div className="absolute bottom-6 right-12">
          <p className="font-sans text-xs text-slate-400">01</p>
        </div>

      </div>
    </div>
  );
}
