const testDataAcronyms = [
 {
   id: 1,
   acronym: 'PI',
   owner: 'abc123',
   definitions: [
     {
       id: '12345',
       owner: 'abc123',
       name: 'Personal Identity',
       description: 'A user\'s personal identity with Pearson',
       categories: ['abc'],
       likes: ['abc123', 'def456']
     },
     {
       id: '23456',
       owner: 'def456',
       name: 'Programme Increment',
       description: 'A timebox during which an Agile Release Train (ART) delivers incremental value in the form of working, tested software and systems.',
       categories: ['xyz'],
       likes: ['abc123']
     },
     {
       id: '34567',
       owner: 'abc123',
       name: 'Project Increment',
       description: 'A timebox during which an Agile Release Train (ART) delivers incremental value in the form of working, tested software and systems.',
       categories: ['xyz'],
       likes: ['abc123']
     }
   ]
 },
 {
   id: 2,
   acronym: 'GLP',
   owner: 'abc123',
   definitions: [
     {
       id: '67890',
       owner: 'abc123',
       name: 'Global Learning Platform',
       description: 'The next stage of Pearson products',
       categories: ['xyz'],
       likes: ['abc123', 'def456']
     }
   ]
 },
];

module.exports = testDataAcronyms;
