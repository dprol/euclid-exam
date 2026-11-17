// The syllabus: twenty lessons from What Schools Forget, and the exam questions on them.
//
// LESSONS  one per article: title, date, link and a line on what it argues
// QUESTIONS  each belongs to a lesson; options[0] is always the right answer
//            (they are shuffled on screen); `why` is shown once it is answered
// STEPS    Euclid I.47, drawn one step per question (see index.html)

window.LESSONS = [
  { id: 'perfect', title: 'What Makes a Number Perfect?', date: '19 Oct 2026', url: 'https://whatschoolsforget.substack.com/p/what-makes-a-number-perfect', cloth: '#2f65a7',
    about: 'A lesson that will never be on the test, and an unsolved problem a fifth grader can understand.' },
  { id: 'identities', title: 'Don’t Memorize Trigonometric Identities. Visualize Them Instead.', date: '5 Sep 2026', url: 'https://whatschoolsforget.substack.com/p/dont-memorize-trigonometric-identities', cloth: '#d9531e',
    about: 'When memorization fails, it fails completely. A picture doesn’t.' },
  { id: 'color', title: 'Color the First Book of Euclid. Then Stop.', date: '1 Sep 2026', url: 'https://whatschoolsforget.substack.com/p/color-the-first-book-of-euclid-then', cloth: '#f2bc20',
    about: 'Heath’s full translation of Book I, with colour added to the diagrams – and no Book II.' },
  { id: 'useless', title: 'Geometry Is Useless. Teach It Anyway.', date: '15 Aug 2026', url: 'https://whatschoolsforget.substack.com/p/why-teach-geometry', cloth: '#1b1b1b',
    about: 'Beauty, deduction and certainty: three reasons from ten years of teaching Euclid.' },
  { id: 'reading', title: 'The Reading List Behind Saturday’s Article', date: '12 Aug 2026', url: 'https://whatschoolsforget.substack.com/p/the-reading-list-behind-saturdays', cloth: '#2f65a7',
    about: 'The primary sources behind American schooling, from 1647 to 1987.' },
  { id: 'trust', title: 'The Two People a School Should Trust Most', date: '8 Aug 2026', url: 'https://whatschoolsforget.substack.com/p/the-two-people-a-school-should-trust', cloth: '#d9531e',
    about: 'Parents and teachers were ruled out of the decisions together.' },
  { id: 'tangent', title: 'Tangent Was Actually a Tangent. Secant Was Actually a Secant.', date: '25 Jul 2026', url: 'https://whatschoolsforget.substack.com/p/tangent-was-actually-a-tangent-secant', cloth: '#f2bc20',
    about: 'All six trig functions were once just lengths in a single diagram.' },
  { id: 'subtract', title: 'Your Grandparents Subtracted Differently', date: '18 Jul 2026', url: 'https://whatschoolsforget.substack.com/p/your-grandparents-subtracted-differently', cloth: '#1b1b1b',
    about: 'And maybe better.' },
  { id: 'sohcahtoa', title: 'Don’t Teach SOHCAHTOA. Not Yet.', date: '11 Jul 2026', url: 'https://whatschoolsforget.substack.com/p/dont-teach-sohcahtoa-not-yet', cloth: '#2f65a7',
    about: 'Before it was a ratio, sine was an arrow pulled back from a bowstring.' },
  { id: 'timeline', title: 'A Timeline of American Education in Primary Sources', date: '10 Jul 2026', url: 'https://whatschoolsforget.substack.com/p/a-timeline-of-the-history-of-education', cloth: '#d9531e',
    about: 'Ten names became fifty: the reading list that grew out of a rabbit hole.' },
  { id: 'owen', title: 'The Socialist Behind the U.S. Public Education System', date: '10 Jul 2026', url: 'https://whatschoolsforget.substack.com/p/the-socialist-behind-the-u-s-public', cloth: '#f2bc20',
    about: 'On July 4th, 1826, Robert Owen declared war on property, religion and marriage.' },
  { id: 'declaration', title: 'The Declaration of Independence Is Almost a Euclidean Proof', date: '4 Jul 2026', url: 'https://whatschoolsforget.substack.com/p/self-evident-reading-the-declaration', cloth: '#1b1b1b',
    about: 'Jefferson borrowed Euclid’s structure, axioms and all, to argue for independence.' },
  { id: 'primes', title: 'Prime Factors: The DNA of Numbers', date: '28 Jun 2026', url: 'https://whatschoolsforget.substack.com/p/prime-factors-the-dna-of-numbers', cloth: '#2f65a7',
    about: 'Not a chapter to get through, but a window into the nature of number.' },
  { id: 'fibonacci', title: 'Fibonacci’s Forgotten Division Algorithm', date: '20 Jun 2026', url: 'https://whatschoolsforget.substack.com/p/fibonaccis-forgotten-division-algorithm', cloth: '#d9531e',
    about: 'And why it needs to be recovered.' },
  { id: 'started', title: 'How It All Started', date: '16 Jun 2026', url: 'https://whatschoolsforget.substack.com/p/how-it-all-started', cloth: '#f2bc20',
    about: 'A note of gratitude to 1,000 readers.' },
  { id: 'longdiv', title: '“Long” Division', date: '13 Jun 2026', url: 'https://whatschoolsforget.substack.com/p/long-division', cloth: '#1b1b1b',
    about: 'There’s more than one way to divide.' },
  { id: 'donkeys', title: 'The Bridge of Donkeys', date: '6 Jun 2026', url: 'https://whatschoolsforget.substack.com/p/the-bridge-of-donkeys', cloth: '#2f65a7',
    about: 'Why the “obvious” parts of Euclid are the most important.' },
  { id: 'trick', title: 'The Trick That Makes Kids Hate Math', date: '30 May 2026', url: 'https://whatschoolsforget.substack.com/p/trick-that-makes-kids-hate-math', cloth: '#d9531e',
    about: 'Teaching fraction division so kids actually get it.' },
  { id: 'fractions', title: 'Don’t Teach Fractions. Not Yet.', date: '24 May 2026', url: 'https://whatschoolsforget.substack.com/p/teaching-ratios', cloth: '#f2bc20',
    about: 'Euclid spent four books on ratios. He never wrote a fraction.' },
  { id: 'study', title: 'How to Study Euclid’s Elements', date: '16 May 2026', url: 'https://whatschoolsforget.substack.com/p/how-to-study-euclid', cloth: '#1b1b1b',
    about: 'The hidden structure of the Elements.' },
];

window.QUESTIONS = [
  // What Makes a Number Perfect?
  { lesson: 'perfect', text: 'Euclid defines a perfect number as one that is…',
    options: ['Equal to its own parts', 'Divisible by every smaller number', 'The square of a prime', 'Even, and a multiple of six'],
    why: 'Book VII, Definition 22: “A perfect number is that which is equal to its own parts.” 6 = 1 + 2 + 3, and 28 = 1 + 2 + 4 + 7 + 14.' },
  { lesson: 'perfect', text: 'After 6, 28, 496 and 8,128, Nicomachus expected the next perfect number to have five digits. How many does it really have?',
    options: ['Eight: 33,550,336', 'Five: 33,550', 'Six: 335,503', 'Ten: 8,589,869,056'],
    why: 'He also guessed the last digit would keep alternating 6, 8, 6, 8. The one after, 8,589,869,056, ends in 6 again. A pattern doesn’t prove anything.' },
  { lesson: 'perfect', text: 'Euclid’s formula always makes a perfect number. Who proved that every even perfect number comes from it?',
    options: ['Leonhard Euler', 'Nicomachus', 'Fibonacci', 'René Descartes'],
    why: 'About two thousand years after Euclid. Whether an odd perfect number exists is still an open question – one a fifth grader can understand.' },

  // Trig identities
  { lesson: 'identities', text: 'Where did the memorized trig identities finally fail {author}?',
    options: ['Four hours into a quantum mechanics final at Rice', 'In front of his first eighth-grade class', 'On a backpacking trip, without a textbook', 'At the board, during an observed lesson'],
    why: 'Was sin(α + β) cosα cosβ + sinα sinβ, or sinα cosβ + cosα sinβ? Memorization fails completely. Understanding keeps the road back.' },

  // Euclid in Color
  { lesson: 'color', text: 'According to Proclus, who asked Euclid for a shortcut – and was told there is no royal road to geometry?',
    options: ['King Ptolemy I of Egypt', 'Alexander the Great', 'Plato', 'Archimedes'],
    why: 'Proclus tells the story in his commentary on Book I. Euclid in Color offers no royal road either; it only makes the start of the long one easier.' },
  { lesson: 'color', text: 'Oliver Byrne coloured Euclid in 1847. What did he take out that Heath’s Euclid in Color keeps?',
    options: ['The letters naming the points', 'The postulates', 'The definitions', 'Every proof longer than a page'],
    why: 'Byrne shortened the text and dropped the lettering. Euclid in Color keeps Heath’s complete 1908 translation with the letters intact – the points are the principles.' },

  // Geometry is useless
  { lesson: 'useless', text: 'Bertrand Russell called the beauty of mathematics “cold and austere, like that of…”',
    options: ['Sculpture', 'A winter landscape', 'Plainchant', 'A cathedral'],
    why: '“…without appeal to any part of our weaker nature, without the gorgeous trappings of painting or music, yet sublimely pure.” From The Study of Mathematics.' },
  { lesson: 'useless', text: 'How does {author} check whether a student really knows a proposition?',
    options: ['A blank sheet: draw the diagram and talk through the proof, no book', 'A multiple-choice quiz on the enunciation', 'Recite it word for word from Heath', 'Mark the steps on a printed diagram'],
    why: 'To know a proposition is to understand it and be able to produce the demonstration: scientia. “Two days ago he was confused, but now he can confidently prove a timeless truth.”' },

  // Reading list
  { lesson: 'reading', text: 'In 1913, which Rockefeller-funded body dreamed of people who “yield themselves with perfect docility to our molding hand”?',
    options: ['The General Education Board', 'The National Education Association', 'The Carnegie Foundation', 'The Committee of Ten'],
    why: '“We shall not try to make these people or any of their children into philosophers or men of learning…” One of the hard-to-find sources on {author}’s timeline.' },

  // The two people
  { lesson: 'trust', text: 'Which state passed the first compulsory school attendance law, in 1852?',
    options: ['Massachusetts', 'New York', 'Virginia', 'Pennsylvania'],
    why: 'By 1918 every state had followed, and the state’s judgement about a child’s education overrode the parents’.' },
  { lesson: 'trust', text: 'Nearly every school puts geometry between Algebra I and Algebra II. Who decided that?',
    options: ['No one can name a person or a committee', 'Horace Mann, in his annual reports', 'The College Board, to fit the SAT', 'Euclid, by the order of the Elements'],
    why: 'Ask a teacher why, and you hear about scheduling. Ask who chose it, and no one can say. The same is true of almost everything else on the schedule.' },

  // Tangent and secant
  { lesson: 'tangent', text: 'What does the “co” in cosine, cotangent and cosecant mean?',
    options: ['Complementary: the same line for the complementary angle', 'Reciprocal', 'Corresponding', 'Contrary'],
    why: 'Edmund Gunter coined “cosine” in 1620: sinus complementi, quem brevitatis causa co.sinum dicimus – the sine of the complement, which for brevity we call the co-sine.' },
  { lesson: 'tangent', text: 'Tangent and secant are Latin. What do the words mean?',
    options: ['Touching and cutting', 'Leaning and falling', 'Near and far', 'Rising and setting'],
    why: 'Tangens: the line touches the circle at one point. Secans: the line cuts across the circle – and gives the tangent its length.' },
  { lesson: 'tangent', text: 'The versine, the forgotten “arrow” of the bow-and-string picture, was called in Latin…',
    options: ['Sagitta', 'Arcus', 'Chorda', 'Nervus'],
    why: 'Indian and Arabic astronomers called it the arrow. We kept the bow. We kept the string. We dropped the arrow.' },

  // Subtraction
  { lesson: 'subtract', text: 'Which subtraction method did David Eugene Smith prefer in 1909?',
    options: ['The “Austrian” or equal-additions method', 'Decomposition, or “borrowing”', 'Complements on an abacus', 'Counting back on the fingers'],
    why: 'More natural (it is how change is made), less to memorize (only addition facts) and faster. New Math’s textbooks made decomposition universal instead.' },
  { lesson: 'subtract', text: 'Which musical comedian sang about the New Math way of subtracting?',
    options: ['Tom Lehrer', 'Victor Borge', 'Allan Sherman', 'Danny Kaye'],
    why: 'His audience followed the old shorthand with ease and found the new method hilarious. It is the method taught nationwide today.' },

  // SOHCAHTOA
  { lesson: 'sohcahtoa', text: 'Aryabhata’s word for the sine, ardha-jya, meant…',
    options: ['Half a bowstring', 'A fold of cloth', 'The shadow of a stick', 'A bay or inlet'],
    why: 'Arabic transliterated jya as jiba; later readers took it for jaib, a fold or pocket; Latin translated that as sinus. “Sine” is the translation of a mistranslation of a faulty transliteration.' },
  { lesson: 'sohcahtoa', text: 'Aryabhata’s sine table was measured on a circle of what radius?',
    options: ['3,438 units', '1 unit', '60 units', '360 units'],
    why: 'Chosen so the circumference came to 21,600 minutes of arc. His sine was a length you could check with a ruler, not a ratio.' },

  // Timeline
  { lesson: 'timeline', text: 'When it comes to the history of education, what does “do your own research” mean?',
    options: ['Read the primary sources, then draw your own conclusions', 'Ask an AI for the key quotations', 'Start from a good textbook survey', 'Search until you find the consensus'],
    why: 'The search algorithm gives you what you already think, and AI is no good for answers or quotations – only for finding out what exists. Then read the sources.' },

  // Owen
  { lesson: 'owen', text: 'If Horace Mann is the father of American public education, who does {author} call its grandfather?',
    options: ['Robert Owen', 'John Dewey', 'Johann Pestalozzi', 'Thomas Jefferson'],
    why: 'On 4 July 1826, fifty years after the Declaration, Owen called for “Mental Independence” – from private property, organized religion and marriage.' },

  // Declaration
  { lesson: 'declaration', text: 'Before he wrote “self-evident”, what did Jefferson’s draft call these truths?',
    options: ['Sacred and undeniable', 'Plain and manifest', 'Clear and certain', 'Natural and eternal'],
    why: 'He crossed it out for the word Euclid used for an axiom: a thing you don’t prove, but grant, and build everything else on.' },
  { lesson: 'declaration', text: 'Who taught Jefferson Euclid at William and Mary?',
    options: ['William Small', 'George Wythe', 'John Witherspoon', 'Benjamin Franklin'],
    why: 'Small drilled him in definitions, postulates and the long chain of justified steps. Lincoln later taught himself the same from a saddlebag copy of the Elements.' },

  // Primes
  { lesson: 'primes', text: 'A hundred bulbs, all off. On pass n you flip every n-th switch, for a hundred passes. Which bulbs end up on?',
    options: ['The perfect squares: 1, 4, 9 … 100', 'The primes', 'The even numbers', 'Only bulb number 1'],
    why: 'A bulb ends up on if it was flipped an odd number of times – if its number has an odd number of factors. Factors come in pairs, except a square’s root, which pairs with itself.' },

  // Fibonacci
  { lesson: 'fibonacci', text: 'In which book of 1202 did {author} find Fibonacci’s forgotten division algorithm?',
    options: ['Liber Abaci', 'The Elements', 'Kitab al-Jabr wa’l-Muqabala', 'Summa de arithmetica'],
    why: 'Leonardo of Pisa’s “stack ’em in order” method keeps place value at every step and lines up like the other algorithms. No half-box.' },
  { lesson: 'fibonacci', text: 'What did the Greeks call servile mathematics – calculating without thinking?',
    options: ['Logistike', 'Arithmetike', 'Geometria', 'Harmonia'],
    why: 'Arithmetike was the study of what numbers are; logistike was reckoning. “It is both useless and demeaning to teach students to perform an algorithm without thinking.”' },

  // How it all started
  { lesson: 'started', text: 'What was the faculty at {author}’s school reading when it all started?',
    options: ['Plato’s Republic', 'Aristotle’s Ethics', 'Augustine’s Confessions', 'Newman’s Idea of a University'],
    why: 'After the Allegory of the Cave, Socrates argues that mathematics is the study that most compels the soul towards truth. Weekly hour-long meetings with the headmaster followed.' },
  { lesson: 'started', text: 'Classical education as most schools practise it today traces back to one 1947 essay. Whose?',
    options: ['Dorothy Sayers', 'C. S. Lewis', 'Mortimer Adler', 'G. K. Chesterton'],
    why: '“The Lost Tools of Learning” – which makes the movement a twentieth-century one. The treasure, {author} says, is further back: the liberal arts.' },
  { lesson: 'started', text: 'Which article brought a hundred new readers in a single week?',
    options: ['The one-room schoolhouse', 'SOHCAHTOA and the bowstring', 'Perfect numbers', 'The Declaration as a proof'],
    why: 'July 23. “I still don’t fully understand why that article struck such a chord.”' },

  // Long division
  { lesson: 'longdiv', text: 'First year of teaching, a fresh master’s in applied physics – and which problem stumped {author} in study hall?',
    options: ['2,756 ÷ 13', 'A partial differential equation', '√144 ÷ 150', '654 ÷ 45'],
    why: 'Complex analysis? No problem. Long division? Nothing. Nobody had taught him why it works, so he couldn’t remember it. (It’s 212.)' },

  // Bridge of donkeys
  { lesson: 'donkeys', text: 'Which proposition is the pons asinorum, the “bridge of donkeys”?',
    options: ['I.5: the base angles of an isosceles triangle are equal', 'I.1: the equilateral triangle', 'I.47: the Pythagorean theorem', 'I.4: side-angle-side'],
    why: 'Named for the bridge-shaped diagram and for how hard it is. Plenty of students have stalled at it.' },
  { lesson: 'donkeys', text: 'Who, substituting in {author}’s class, declared: “Isn’t it obvious? A triangle with equal sides must have equal angles!”?',
    options: ['The art teacher', 'The headmaster', 'A visiting parent', 'The basketball coach'],
    why: 'He could not separate the definition of an isosceles triangle from one of its properties. Euclid takes nothing for granted.' },
  { lesson: 'donkeys', text: 'Whose words close the article: “To begin is for everyone. To persevere is for saints.”?',
    options: ['St. Josemaría, The Way', 'Aristotle, Politics', 'St. Thomas Aquinas, Summa Theologiae', 'Proclus, Commentary on Euclid'],
    why: 'The Way, 290. Aristotle supplied the other half: “Well begun is half done.”' },

  // The trick
  { lesson: 'trick', text: 'Which trick does {author} still regret handing his fifth graders?',
    options: ['Invert and multiply', 'Cross-multiplication', 'FOIL', 'Carry the one'],
    why: 'The room was buzzing – “You can’t divide by a fraction!” – and the trick silenced it. Students should earn the algorithm, not be handed a spell.' },

  // Fractions
  { lesson: 'fractions', text: 'How many books of the Elements does Euclid give to ratios – and how many fractions does he write?',
    options: ['Four books, and not one fraction', 'One book, and a few fractions', 'Two books, with fractions in Book X', 'Thirteen books, with fractions throughout'],
    why: 'Books V to VIII. For the Greeks it was absurd to split the unit. Ratio came first in history, and it should come first for children.' },
  { lesson: 'fractions', text: 'Ben adds blue and red marbles 2 to 3. Paul adds them 5 to 6. What is the ratio of blue to red in the box?',
    options: ['7 : 9', '3 : 2', '9 : 6', '10 : 18'],
    why: 'Ratios combine by adding their terms: 2 + 5 to 3 + 6. Add them like fractions (2/3 + 5/6 = 3/2) and you get it wrong.' },

  // How to study Euclid
  { lesson: 'study', text: 'A theorem ends with Q.E.D. How does a problem – a construction – end?',
    options: ['Q.E.F., quod erat faciendum', 'Q.E.I., quod erat inveniendum', 'Q.E.D., just the same', 'Q.E.C., quod erat construendum'],
    why: '“We did what we said we would do.” Mixing up Q.E.F. and Q.E.D. is like stumbling across the finish line.' },
  { lesson: 'study', text: 'Proclus counts six parts in a complete proposition. Which part do modern editions add as a seventh?',
    options: ['The justifications in the margin', 'The diagram', 'The corollary', 'The lemma'],
    why: 'Post. 3, Def. 15, C.N. 1… Euclid’s manuscripts don’t have them, but for a student facing a wall of text they work as an outline. Read them first.' },
];

// Proposition I.47, one step per question, after Heath's wording.
window.STEPS = [
  'Let BC be the side subtending the right angle.',
  'Join BA.',
  'Join AC: the triangle ABC.',
  'Let the angle BAC be right.',
  'On BA describe the square GB.',
  'On AC describe the square HC.',
  'On BC describe the square BDEC.',
  'Through A draw AL parallel to BD.',
  'The parallelogram BL…',
  '… and the parallelogram CL.',
  'Join AD, FC: the triangles ABD, FBC are equal.',
  'Join AE, BK: the triangles ACE, KCB are equal.',
  'Therefore the square on BC is equal to the squares on BA, AC.',
];
