---
path: /blog/mock-api-calls-cra
date: 2020-01-11
tags: [testing, mock, react, jest]
title: Mocking API Calls in Create React App using Jest
summary: Most any web app you build is going to contain some sort of api call, but when you are doing testing you most likely do not want to be hitting your real API routes, particularly not for unit testing your front end. Luckily Jest has some tools that can be used to solve just that problem.
---

Most any web app you build is going to contain some sort of api call, but when you are doing testing you most likely do not want to be hitting your real API routes, particularly not for unit testing your front end. Luckily Jest has some tools that can be used to solve just that problem.

## Setting up your __mocks__

For the project I am working on I am using [axios]([https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)) for my API calls, so I am going to create a mock version of that module that will act in place of the actual module in our tests.  We are going to do this by creating a folder named `__mocks__` in our apps `src` folder.  Since the module we are replacing is axios we are going to write a file axios.js in this folder that will export a module that will return Promises resolving to the data equivalent to what we expect our API to for instance:
```javascript
./src/__mocks/axios.js
module.exports  =  {
	get:  jest.fn(()  =>  Promise.resolve({data:  {user:{name:{first:"David",last:"Spade"},_id:"ABCDE"}}});
}
```
This is fine for one use case, for getting user data, but since you should be writing tests for all parts of your app you will likely want a little more flexibility.  I acheived this flexibility with a Switch statement like so:
```javascript
module.exports  =  {
	get:  jest.fn((url)  =>  {
		switch (url){
			case('/auth/user'):
				return  Promise.resolve({data:  {user:{name:{first:"David",last:"Spade"},_id:"ABCDE"}}});
			case('/trackerapi/activities'):
				return  Promise.resolve({data:[
					{
						beg:  "2019-09-02T13:00:00.000Z",
						end:  "2019-09-02T21:00:00.000Z",
						Activity:  "Code"
					},
					{
						beg:  "2019-09-29T14:00:00.000Z",
						end:  "2019-09-29T18:00:00.000Z",
						Activity:  "hang out"
					}
				]})
		}
	})
};
```

This mocked iteration of the axios module can return results to the component we are testing depending on the URL, so we can use it for testing different routes used by different parts of our app.  Now that we have built this out let's write some tests that use it.

## Writing tests that use our mocked axios module
Nice! you have your mocks all set up and ready to go, time to integrate them into our test!  By default Jest as it is integrated into Create-React-App will look for and run test files that end in ``.test.js`` or are in the directory ``./__tests__`` for this exercise I am going to write tests for components in the same folder as the component that is being tested.  For instance let's say we have a component tasklist and it's componentDidMount() calls an API using axios like '/trackerapi/activities' we could test that like so.

```javascript
./src/components/tasklist/tasklist.test.js

import Tasklist from './Trasklist'
import  axios  from  'axios';
import  {  mount  }  from  '../../enzyme'

jest.mock('axios');
const  axiosSpy  =  jest.spyOn(axios,  'get')
it(`calls '/trackerapi/activities' on mount`, ()=>{
	mount(<Tasklist/>)
	expect(axiosSpy).toHaveBeenCalledWith("/trackerapi/activities")
})
```
So what is happening here is ``jest.mock('axios')`` tells jest that for the purposes of running these tests we want the mocked axios we set up above.  Spying on our axios module like so here ``const  axiosSpy  =  jest.spyOn(axios,  'get')`` is going to let us keep track of when and with what arguments the get method of our axios module.  Using that we can write this test and confirm that our component when mounted called our API which is the expected behavior.

