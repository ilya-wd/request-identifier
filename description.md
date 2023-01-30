## How I understood the problem
I had to implement a class that would identify requests. The way I interpreted it, the class shouldn't be used to build objects, but only used for its methods.

Moreover, I assumed:
- An uri can be in wrong format, that's why I throw exceptionds
- There should be separate methods for path and parameters identification
- URIs can change, eg there are more than 3 configurations
- Client (meaning something that calls functions from RequestIdentifier aka RI) is supposed to be a class
- Schema and allowed paths are predefined

## What challenged did I have
- I didn't manage to fix all eslint complaints
- Figure out if I could optimize the code better
- Couldn't use static keyword properly

## What could I improve
Hard to tell, since the question doesn't specify if we are talking about 3 hours timespan or longer
- Use a better tool for testing and displaying results than dev tools in browser, eg rendering result in HTML or using terminal for it
- Fix eslint errors in RequestIdentifier.js
