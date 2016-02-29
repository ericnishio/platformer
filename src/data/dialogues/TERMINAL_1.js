module.exports = {
  0: {
    messagesOnSuccess: [
      'Good morning, Doctor. Doesn\'t earth look dashing today?',
      'Why don\'t you go out for a walk and get some fresh air?',
      'Haha!',
      'By the way, I need you to upload your daily log.',
      'Find your personal floppy and insert it into this terminal.'
    ]
  },
  1: {
    prerequisites: [
      {
        type: 'PLAYER_HAS_ITEM',
        params: {
          itemId: 'FLOPPY_1'
        }
      }
    ],
    messagesOnSuccess: [
      'OK. Let\'s see...'
    ],
    messagesOnRejection: [
      'Your floppy should be somewhere in your quarters.'
    ]
  }
};
