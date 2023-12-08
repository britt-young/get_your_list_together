// require packages

const userCreds = [
    {
        username: 'brittyoung',
        validate: {
            isAlphanumeric: true, // Ensures that the username only contains letters and numbers
            len: [3, 16],         // Ensures that the username is between 3 and 20 characters
          },
        password: 'password12345',
        validate: {
            len: [5],             // Ensures that the password is at least 5 characters long
          },
        email: 'brittney.r.young80@gmail.com',
    },
    {
        username: 'kregyoung',
        validate: {
            isAlphanumeric: true, // Ensures that the username only contains letters and numbers
            len: [3, 16],         // Ensures that the username is between 3 and 20 characters
          },
        password: 'password005',
        validate: {
            len: [5],             // Ensures that the password is at least 5 characters long
          },
        email: 'brittney.r.young81@gmail.com',
    },
    {
        username: 'lilyoung',
        validate: {
            isAlphanumeric: true, // Ensures that the username only contains letters and numbers
            len: [3, 16],         // Ensures that the username is between 3 and 20 characters
          },
        password: 'password100',
        validate: {
            len: [5],             // Ensures that the password is at least 5 characters long
          },
        email: 'brittney.r.young82@gmail.com',
    },
];